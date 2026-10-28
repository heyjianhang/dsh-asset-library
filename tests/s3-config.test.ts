import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { s3Schema, storageSchema } from "../src/shared/contracts.ts";
import {
  connectionId,
  Objects,
  validateS3,
  type S3Secret,
} from "../src/host/objects.ts";
import { defaults, LibraryService } from "../src/host/service.ts";

test("remote HTTP requires explicit opt-in while HTTPS and loopback keep working", () => {
  const config = s3Schema.parse({
    endpoint: "http://minio.example.test:9000",
    bucket: "assets",
  });
  assert.equal(config.allowInsecureHttp, false);
  assert.throws(() => validateS3(config), /允许 HTTP/);
  assert.doesNotThrow(() => validateS3({ ...config, allowInsecureHttp: true }));
  for (const endpoint of [
    "",
    "https://minio.example.test",
    "http://localhost:9000",
    "http://127.0.0.1:9000",
    "http://[::1]:9000",
  ])
    assert.doesNotThrow(() => validateS3({ ...config, endpoint }));
  for (const endpoint of [
    "ftp://minio.example.test",
    "http://user:secret@minio.example.test",
    "http://minio.example.test?key=secret",
    "http://minio.example.test#fragment",
  ])
    assert.throws(
      () => validateS3({ ...config, endpoint, allowInsecureHttp: true }),
      /HTTP\(S\)/,
    );
  assert.throws(
    () =>
      validateS3({ ...config, prefix: "../other", allowInsecureHttp: true }),
    /前缀/,
  );
  const legacy = storageSchema.parse({
    mode: "s3",
    s3: { endpoint: "https://minio.example.test", bucket: "assets" },
  });
  assert.equal(legacy.mode === "s3" && legacy.s3.allowInsecureHttp, false);
});

test("S3 transport checks HTTP permission before reading credentials", async () => {
  const s3 = s3Schema.parse({
    endpoint: "http://minio.example.test:9000",
    bucket: "assets",
  });
  let reads = 0;
  const credentials = {
    readS3: async () => {
      reads++;
      return { accessKeyId: "test-id", secretAccessKey: "test-secret" };
    },
    writeS3: async () => {},
    clearS3: async () => {},
  };
  await assert.rejects(
    new Objects("/unused", "library", { mode: "s3", s3 }, credentials).client(),
    /允许 HTTP/,
  );
  assert.equal(reads, 0);
  const permitted = { ...s3, allowInsecureHttp: true };
  assert.equal(connectionId(s3), connectionId(permitted));
  const client = await new Objects(
    "/unused",
    "library",
    { mode: "s3", s3: permitted },
    credentials,
  ).client();
  try {
    assert.equal((await client.config.endpoint!()).protocol, "http:");
    assert.equal(reads, 1);
  } finally {
    client.destroy();
  }
});

test("HTTP opt-in survives settings and library reopen, legacy settings stay off", async () => {
  const root = await mkdtemp(join(tmpdir(), "dsh-http-config-"));
  const secrets = new Map<string, S3Secret>();
  const credentials = {
    read: async () => undefined,
    write: async () => {},
    clear: async () => {},
    readS3: async (id: string) => secrets.get(id),
    writeS3: async (id: string, value: S3Secret) => {
      secrets.set(id, value);
    },
    clearS3: async (id: string) => {
      secrets.delete(id);
    },
  };
  let service = new LibraryService(join(root, "machine"), credentials);
  const s3 = s3Schema.parse({
    endpoint: "http://minio.example.test:9000",
    bucket: "assets",
  });
  try {
    await service.init();
    await assert.rejects(
      service.saveSettings({ ...defaults, storageMode: "s3", s3 }),
      /允许 HTTP/,
    );
    assert.equal(
      (await service.snapshot()).settings.s3.allowInsecureHttp,
      false,
    );
    const permitted = { ...s3, allowInsecureHttp: true };
    await service.saveSettings({
      ...defaults,
      storageMode: "s3",
      s3: permitted,
      accessKeyId: "test-id",
      secretAccessKey: "test-secret",
    });
    const { id } = await service.library({
      action: "create",
      path: join(root, "library"),
      name: "HTTP MinIO",
    });
    await service.dispose();
    service = new LibraryService(join(root, "machine"), credentials);
    await service.init();
    const state = await service.snapshot();
    assert.equal(state.settings.s3.allowInsecureHttp, true);
    assert.equal(state.s3Configured, true);
    const library = state.libraries.find((l) => l.id === id)!;
    assert.equal(
      library.storage.mode === "s3" && library.storage.s3.allowInsecureHttp,
      true,
    );
    await service.saveSettings({ ...defaults });
    assert.equal((await service.snapshot()).s3Configured, false);
    assert.deepEqual(
      (await service.snapshot()).libraries[0].storage,
      library.storage,
    );
    await service.dispose();
    const path = join(root, "machine", "settings.json");
    const legacy = JSON.parse(await readFile(path, "utf8"));
    delete legacy.settings.s3.allowInsecureHttp;
    await writeFile(path, JSON.stringify(legacy));
    service = new LibraryService(join(root, "machine"), credentials);
    await service.init();
    assert.equal(
      (await service.snapshot()).settings.s3.allowInsecureHttp,
      false,
    );
    const manifest = await readFile(
      join(root, "library", "library.json"),
      "utf8",
    );
    assert.equal(manifest.includes("test-secret"), false);
    assert.equal(manifest.includes("test-id"), false);
  } finally {
    await service.dispose();
    await rm(root, { recursive: true, force: true });
  }
});
