import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import {
  mkdtemp,
  rm,
  readFile,
  writeFile,
  mkdir,
  stat,
} from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomBytes, randomUUID, createHash } from "node:crypto";
import { ZipFile } from "yazl";
import { LibraryService, defaults } from "../src/host/service.ts";
import { Objects, connectionId, type S3Secret } from "../src/host/objects.ts";
import { Transfers } from "../src/host/transfers.ts";
import { importArchive } from "../src/host/archive.ts";
import { LibraryDB } from "../src/host/storage.ts";

const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP9sAAAAASUVORK5CYII=",
  "base64",
);
const signal = () => AbortSignal.timeout(30000);
async function until<T>(read: () => Promise<T>, predicate: (r: T) => boolean) {
  for (let i = 0; i < 300; i++) {
    const r = await read();
    if (predicate(r)) return r;
    await new Promise((r) => setTimeout(r, 25));
  }
  throw new Error("Timed out");
}
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "dsh-storage-")),
    secrets = new Map<string, S3Secret>();
  let key: string | undefined = "test-ark-secret-never-export";
  let embeddingCalls = 0;
  const credentials = {
    read: async () => key,
    write: async (v: string) => {
      key = v;
    },
    clear: async () => {
      key = undefined;
    },
    readS3: async (id: string) => secrets.get(id),
    writeS3: async (id: string, v: S3Secret) => {
      secrets.set(id, v);
    },
    clearS3: async (id: string) => {
      secrets.delete(id);
    },
  };
  const service = new LibraryService(
    join(root, "machine"),
    credentials,
    (async () => {
      embeddingCalls++;
      return new Response(JSON.stringify({ data: { embedding: [1, 0, 0] } }), {
        status: 200,
      });
    }) as typeof fetch,
  );
  await service.init();
  return {
    root,
    service,
    credentials,
    embeddingCalls: () => embeddingCalls,
    cleanup: async () => {
      await service.dispose();
      await rm(root, { recursive: true, force: true });
    },
  };
}
async function upload(service: LibraryService, libraryId: string) {
  const u = await service.beginUpload({
    libraryId,
    name: "sample.png",
    size: png.length,
  });
  await service.uploadChunk({
    libraryId,
    id: u.id,
    offset: 0,
    data: png.toString("base64"),
  });
  return service.finishUpload({ libraryId, id: u.id }, signal());
}
async function finish(service: LibraryService, id: string) {
  const data = await until(
    () => service.snapshot(),
    (s) =>
      !!s.transfers.find(
        (t) => t.id === id && ["failed", "completed"].includes(t.status),
      ),
  );
  const job = data.transfers.find((t) => t.id === id)!;
  assert.equal(job.status, "completed", job.error ?? "");
  return job;
}
async function ingestZip(service: LibraryService, file: string) {
  const bytes = await readFile(file);
  const u = await service.archiveUpload({
    action: "begin",
    size: bytes.length,
  });
  for (let offset = 0; offset < bytes.length; offset += 1024 ** 2)
    await service.archiveUpload({
      action: "chunk",
      id: u.id,
      offset,
      data: bytes.subarray(offset, offset + 1024 ** 2).toString("base64"),
    });
  return u.id;
}
test("complete ZIP roundtrip preserves metadata, collections, vectors and media with a new library identity", async () => {
  const f = await fixture();
  try {
    const { id } = await f.service.library({
      action: "create",
      path: join(f.root, "source"),
      name: "Portable",
    });
    const { assetId } = await upload(f.service, id!);
    await until(
      () => f.service.snapshot(),
      (s) =>
        s.tasks.some((t) => t.assetId === assetId && t.status === "completed"),
    );
    await f.service.collection({
      libraryId: id!,
      action: "create",
      name: "Product",
    });
    const collectionId = (await f.service.snapshot()).collections.find(
      (c) => c.name === "Product",
    )!.id;
    await f.service.editAsset({
      libraryId: id!,
      id: assetId,
      tags: ["blue"],
      notes: "keep me",
      favorite: true,
      collectionIds: [collectionId],
    });
    const job = await f.service.startTransfer({
      kind: "export",
      libraryId: id,
      path: f.root,
    });
    const exported = await finish(f.service, job.id);
    const archiveId = await ingestZip(f.service, exported.result!);
    const imported = await finish(
      f.service,
      (
        await f.service.startTransfer({
          kind: "import",
          archiveId,
          path: join(f.root, "restored"),
          storageMode: "local",
        })
      ).id,
    );
    assert.notEqual(imported.result, id);
    assert.equal(
      (await f.service.snapshot()).collections.filter(
        (c) => c.libraryId === imported.result && c.isDefault,
      ).length,
      1,
    );
    const result = await f.service.search(
      { query: "blue", libraryId: imported.result, ai: true },
      signal(),
    );
    assert.equal(result.hits.length, 1);
    assert.equal(result.unindexed, 0);
    assert.equal(result.hits[0].notes, "keep me");
    assert.equal(result.hits[0].favorite, true);
    assert.deepEqual(result.hits[0].collectionIds, [collectionId]);
    assert.equal(
      (await f.service.snapshot()).collections.filter(
        (c) => c.libraryId === imported.result && c.id === collectionId,
      )[0].count,
      1,
    );
    assert.deepEqual(
      Buffer.from(
        (
          await f.service.media({
            libraryId: imported.result!,
            id: assetId,
            preview: false,
          })
        ).data,
        "base64",
      ),
      png,
    );
    assert.ok(
      !(await readFile(exported.result!)).includes(
        Buffer.from("test-ark-secret"),
      ),
    );
    await assert.rejects(
      importArchive(
        exported.result!,
        join(f.root, "source"),
        { mode: "local" },
        signal(),
        () => {},
      ),
      /文件夹/,
    );
  } finally {
    await f.cleanup();
  }
});
async function makeZip(
  path: string,
  entries: { path: string; bytes: Buffer; mode?: number }[],
) {
  const zip = new ZipFile(),
    writing = pipeline(zip.outputStream, createWriteStream(path));
  for (const e of entries)
    zip.addBuffer(e.bytes, e.path, { mode: e.mode, compress: false });
  zip.end();
  await writing;
}
test("legacy ZIP favorites gain a default collection while existing memberships survive", async () => {
  const f = await fixture();
  let restored: LibraryDB | undefined;
  try {
    const hash = createHash("sha256").update(png).digest("hex");
    const assetId = randomUUID(),
      collectionId = randomUUID();
    const path = `originals/${hash}.png`;
    const catalog = {
      format: "dsh-asset-library-zip",
      version: 1,
      name: "Legacy ZIP",
      assets: [
        {
          hash,
          asset: {
            id: assetId,
            libraryId: randomUUID(),
            name: "sample.png",
            kind: "image",
            mime: "image/png",
            size: png.length,
            relativePath: path,
            tags: ["keep"],
            notes: "legacy notes",
            favorite: true,
            createdAt: new Date().toISOString(),
            status: "ready",
            duration: null,
            thumbnail: null,
            collectionIds: [collectionId],
          },
        },
      ],
      collections: [
        {
          id: collectionId,
          name: "Project",
          created_at: new Date().toISOString(),
        },
      ],
      vectors: [],
      files: [{ path, size: png.length, sha256: hash }],
    };
    const archive = join(f.root, "legacy.zip"),
      destination = join(f.root, "restored-legacy");
    await makeZip(archive, [
      { path: "catalog.json", bytes: Buffer.from(JSON.stringify(catalog)) },
      { path, bytes: png },
    ]);
    await importArchive(
      archive,
      destination,
      { mode: "local" },
      signal(),
      () => {},
    );
    restored = await LibraryDB.open(destination);
    const system = restored.collections().find((c) => c.isDefault)!;
    assert.ok(system);
    const asset = restored.asset(assetId);
    assert.deepEqual(
      new Set(asset.collectionIds),
      new Set([collectionId, system.id]),
    );
    assert.equal(asset.notes, "legacy notes");
    assert.equal(asset.favorite, true);
    assert.deepEqual(await readFile(join(destination, path)), png);
  } finally {
    await restored?.close();
    await f.cleanup();
  }
});
test("ZIP rejects symlinks, traversal, duplicate paths, missing catalog and incomplete uploads without publishing a library", async () => {
  const f = await fixture();
  try {
    for (const [i, entries] of [
      [
        {
          path: "originals/link.png",
          bytes: Buffer.from("/etc/passwd"),
          mode: 0o120777,
        },
      ],
      [
        { path: "originals/a.png", bytes: png },
        { path: "originals/a.png", bytes: png },
      ],
      [{ path: "originals/a.png", bytes: png }],
    ].entries()) {
      const path = join(f.root, `${i}.zip`);
      await makeZip(path, entries);
      await assert.rejects(
        importArchive(
          path,
          join(f.root, "bad" + i),
          { mode: "local" },
          signal(),
          () => {},
        ),
      );
      await assert.rejects(stat(join(f.root, "bad" + i)), { code: "ENOENT" });
    }
    const path = join(f.root, "traversal.zip");
    await makeZip(path, [{ path: "aa/a.png", bytes: png }]);
    const raw = await readFile(path);
    await writeFile(
      path,
      Buffer.from(
        raw.toString("latin1").replaceAll("aa/a.png", "../a.png"),
        "latin1",
      ),
    );
    await assert.rejects(
      importArchive(
        path,
        join(f.root, "bad"),
        { mode: "local" },
        signal(),
        () => {},
      ),
    );
    const u = await f.service.archiveUpload({ action: "begin", size: 100 });
    await f.service.archiveUpload({
      action: "chunk",
      id: u.id,
      offset: 0,
      data: png.toString("base64"),
    });
    await assert.rejects(
      f.service.startTransfer({
        kind: "import",
        archiveId: u.id,
        path: join(f.root, "incomplete"),
      }),
      /完整/,
    );
  } finally {
    await f.cleanup();
  }
});
test("transfer queue cancellation, failed retry and restart preserve durable state", async () => {
  const root = await mkdtemp(join(tmpdir(), "dsh-transfer-"));
  let started = false;
  const queue = new Transfers(root, async (_job, s) => {
    started = true;
    await new Promise((_, reject) =>
      s.addEventListener("abort", () => reject(s.reason), { once: true }),
    );
    return "";
  });
  await queue.init();
  const job = await queue.add({ kind: "export", name: "test", path: root });
  await until(async () => started, Boolean);
  await queue.dispose();
  const resumed = new Transfers(root, async () => "complete.zip");
  await resumed.init();
  assert.equal(resumed.rows[0].status, "paused");
  await resumed.control({ id: job.id, action: "retry" });
  await until(
    async () => resumed.rows[0].status,
    (s) => s === "completed",
  );
  await resumed.dispose();
  await rm(root, { recursive: true, force: true });
});
test("S3 signed transport and ZIP migration across local and different S3 targets preserve complete libraries", async () => {
  const f = await fixture(),
    objects = new Map<string, Buffer>(),
    parts = new Map<string, Map<number, Buffer>>();
  let signed = 0,
    gets = 0,
    multipart = 0;
  let denyWrites = false;
  const server = createServer(async (req, res) => {
    try {
      if (req.headers.authorization?.startsWith("AWS4-HMAC-SHA256")) signed++;
      const u = new URL(req.url!, "http://localhost"),
        key = decodeURIComponent(u.pathname);
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(Buffer.from(chunk));
      const body = Buffer.concat(chunks);
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      if (req.method === "POST" && u.searchParams.has("uploads")) {
        multipart++;
        const id = randomUUID();
        parts.set(id, new Map());
        res.setHeader("Content-Type", "application/xml");
        res.end(
          `<InitiateMultipartUploadResult><Bucket>test-bucket</Bucket><Key>${key}</Key><UploadId>${id}</UploadId></InitiateMultipartUploadResult>`,
        );
        return;
      }
      if (req.method === "PUT") {
        if (denyWrites) {
          res.statusCode = 403;
          res.setHeader("Content-Type", "application/xml");
          res.end("<Error><Code>AccessDenied</Code></Error>");
          return;
        }
        const uploadId = u.searchParams.get("uploadId");
        if (uploadId)
          parts
            .get(uploadId)!
            .set(Number(u.searchParams.get("partNumber")), body);
        else objects.set(key, body);
        res.setHeader("ETag", '"test-etag"');
        res.end();
        return;
      }
      if (req.method === "POST") {
        const uploadId = u.searchParams.get("uploadId")!;
        objects.set(
          key,
          Buffer.concat(
            [...parts.get(uploadId)!.entries()]
              .sort(([a], [b]) => a - b)
              .map(([, data]) => data),
          ),
        );
        res.setHeader("Content-Type", "application/xml");
        res.end(
          '<CompleteMultipartUploadResult><ETag>"test-etag"</ETag></CompleteMultipartUploadResult>',
        );
        return;
      }
      if (req.method === "DELETE") {
        parts.delete(u.searchParams.get("uploadId")!);
        res.end();
        return;
      }
      const file = objects.get(key);
      if (!file) {
        res.statusCode = 404;
        res.end();
        return;
      }
      gets++;
      const range = req.headers.range?.match(/bytes=(\d+)-(\d+)/);
      if (range) {
        const start = Number(range[1]),
          end = Math.min(file.length - 1, Number(range[2]));
        res.statusCode = 206;
        res.setHeader("Content-Range", `bytes ${start}-${end}/${file.length}`);
        res.setHeader("Content-Length", end - start + 1);
        res.end(file.subarray(start, end + 1));
      } else {
        res.setHeader("Content-Length", file.length);
        res.end(file);
      }
    } catch {
      res.statusCode = 500;
      res.end();
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const endpoint = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
    const s3 = { ...defaults.s3, endpoint, bucket: "test-bucket" };
    await f.service.saveSettings({
      ...defaults,
      storageMode: "s3",
      s3,
      accessKeyId: "test-access",
      secretAccessKey: "test-secret",
    });
    await f.service.testS3({}, signal());
    const { id } = await f.service.library({
      action: "create",
      name: "Cloud",
      path: join(f.root, "cloud"),
    });
    const { assetId } = await upload(f.service, id!);
    const state = await until(
      () => f.service.snapshot(),
      (s) =>
        s.tasks.some(
          (t) =>
            t.assetId === assetId && ["completed", "failed"].includes(t.status),
        ),
    );
    assert.equal(
      state.tasks[0].status,
      "completed",
      state.tasks[0].error ?? "",
    );
    const hit = (await f.service.search({ query: "", libraryId: id }, signal()))
      .hits[0];
    await assert.rejects(stat(join(f.root, "cloud", hit.relativePath)), {
      code: "ENOENT",
    });
    assert.deepEqual(
      Buffer.from(
        (
          await f.service.media(
            { libraryId: id!, id: assetId, preview: false },
            signal(),
          )
        ).data,
        "base64",
      ),
      png,
    );
    await f.service.collection({
      libraryId: id!,
      action: "create",
      name: "Keep collection",
    });
    const collectionId = (await f.service.snapshot()).collections.find(
      (c) => c.libraryId === id && c.name === "Keep collection",
    )!.id;
    await f.service.editAsset({
      libraryId: id!,
      id: assetId,
      tags: ["portable"],
      notes: "preserved across storage",
      collectionIds: [collectionId],
    });
    const preview = Buffer.from(
      (
        await f.service.media(
          { libraryId: id!, id: assetId, preview: true },
          signal(),
        )
      ).data,
      "base64",
    );
    const exported = await finish(
      f.service,
      (
        await f.service.startTransfer({
          kind: "export",
          libraryId: id,
          path: f.root,
        })
      ).id,
    );
    assert.ok(gets >= 2);
    assert.ok(signed >= 5);
    const archiveId = await ingestZip(f.service, exported.result!);
    await f.credentials.clearS3(connectionId(s3));
    const imported = await finish(
      f.service,
      (
        await f.service.startTransfer({
          kind: "import",
          archiveId,
          path: join(f.root, "offline"),
          storageMode: "local",
        })
      ).id,
    );
    assert.deepEqual(
      Buffer.from(
        (
          await f.service.media({
            libraryId: imported.result!,
            id: assetId,
            preview: false,
          })
        ).data,
        "base64",
      ),
      png,
    );
    // A local library exports without the old cloud credentials, even when S3 is the default.
    const localExport = await finish(
      f.service,
      (
        await f.service.startTransfer({
          kind: "export",
          libraryId: imported.result!,
          path: f.root,
        })
      ).id,
    );
    const cases = [
      {
        label: "S3 to another S3",
        zip: exported.result!,
        bucket: "other-cloud",
        prefix: "moved/cloud",
      },
      {
        label: "local to S3",
        zip: localExport.result!,
        bucket: "from-local",
        prefix: "moved/local",
      },
    ];
    for (const [index, migration] of cases.entries()) {
      const target = {
        ...s3,
        bucket: migration.bucket,
        prefix: migration.prefix,
      };
      await f.service.saveSettings({
        ...defaults,
        storageMode: "s3",
        s3: target,
        accessKeyId: "destination-access",
        secretAccessKey: "destination-secret",
      });
      const destination = join(f.root, `cloud-restored-${index}`);
      const archive = await ingestZip(f.service, migration.zip);
      const callsBeforeImport = f.embeddingCalls();
      const job = await finish(
        f.service,
        (
          await f.service.startTransfer({
            kind: "import",
            archiveId: archive,
            path: destination,
            storageMode: "s3",
          })
        ).id,
      );
      assert.notEqual(job.result, id, migration.label);
      assert.notEqual(job.result, imported.result, migration.label);
      const state = await until(
        () => f.service.snapshot(),
        (state) =>
          state.tasks.some(
            (t) =>
              t.libraryId === job.result &&
              ["completed", "failed"].includes(t.status),
          ),
      );
      const task = state.tasks.find((t) => t.libraryId === job.result)!;
      assert.equal(task.status, "completed", task.error ?? migration.label);
      assert.equal(
        f.embeddingCalls(),
        callsBeforeImport,
        "matching vectors must not be charged for again",
      );
      assert.deepEqual(
        state.libraries.find((l) => l.id === job.result)!.storage,
        { mode: "s3", s3: target },
      );
      const migrated = (
        await f.service.search(
          { query: "portable", libraryId: job.result, ai: true },
          signal(),
        )
      ).hits[0];
      assert.ok(migrated, migration.label);
      assert.equal(migrated.notes, "preserved across storage");
      assert.deepEqual(migrated.collectionIds, [collectionId]);
      assert.equal(migrated.favorite, true);
      assert.equal(migrated.status, "ready");
      await assert.rejects(stat(join(destination, migrated.relativePath)), {
        code: "ENOENT",
      });
      const objectPrefix = `/${target.bucket}/${target.prefix}/${job.result}/`;
      assert.deepEqual(objects.get(objectPrefix + migrated.relativePath), png);
      assert.deepEqual(
        objects.get(objectPrefix + migrated.thumbnail!),
        preview,
      );
      // Force preview reads through S3, rather than passing from the import cache.
      await rm(join(destination, migrated.thumbnail!));
      for (const isPreview of [false, true]) {
        const bytes = Buffer.from(
          (
            await f.service.media(
              { libraryId: job.result!, id: assetId, preview: isPreview },
              signal(),
            )
          ).data,
          "base64",
        );
        assert.deepEqual(bytes, isPreview ? preview : png);
      }
      // Changing defaults does not retarget an existing library, including after reopening it.
      await f.service.saveSettings({ ...defaults, storageMode: "local" });
      await f.service.library({ action: "close", id: job.result! });
      await f.service.library({ action: "open", path: destination });
      assert.deepEqual(
        (await f.service.snapshot()).libraries.find((l) => l.id === job.result)!
          .storage,
        { mode: "s3", s3: target },
      );
      assert.deepEqual(
        Buffer.from(
          (
            await f.service.media(
              { libraryId: job.result!, id: assetId, preview: false },
              signal(),
            )
          ).data,
          "base64",
        ),
        png,
      );
    }
    await f.service.saveSettings({
      ...defaults,
      storageMode: "s3",
      s3,
      accessKeyId: "test-access",
      secretAccessKey: "test-secret",
    });
    const big = randomBytes(9 * 1024 ** 2),
      local = join(f.root, "big");
    await mkdir(join(local, "originals"), { recursive: true });
    await writeFile(join(local, "originals/large.mp4"), big);
    const store = new Objects(
      local,
      "multipart-test",
      { mode: "s3", s3 },
      f.credentials,
    );
    await store.upload("originals/large.mp4", signal());
    assert.equal(multipart, 1);
    assert.deepEqual(
      objects.get(
        "/test-bucket/asset-library/multipart-test/originals/large.mp4",
      ),
      big,
    );
    const failedLib = await f.service.library({
      action: "create",
      name: "Denied",
      path: join(f.root, "denied"),
    });
    denyWrites = true;
    const failedAsset = await upload(f.service, failedLib.id!);
    const failedState = await until(
      () => f.service.snapshot(),
      (s) =>
        s.tasks.some(
          (t) => t.assetId === failedAsset.assetId && t.status === "failed",
        ),
    );
    const failedTask = failedState.tasks.find(
      (t) => t.assetId === failedAsset.assetId,
    )!;
    assert.match(failedTask.error!, /S3/);
    const preserved = (
      await f.service.search({ query: "", libraryId: failedLib.id }, signal())
    ).hits[0];
    assert.deepEqual(
      await readFile(join(f.root, "denied", preserved.relativePath)),
      png,
    );
    denyWrites = false;
    await f.service.task({
      libraryId: failedLib.id!,
      id: failedTask.id,
      action: "retry",
    });
    await until(
      () => f.service.snapshot(),
      (s) =>
        s.tasks.some((t) => t.id === failedTask.id && t.status === "completed"),
    );
    await assert.rejects(stat(join(f.root, "denied", preserved.relativePath)), {
      code: "ENOENT",
    });
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await f.cleanup();
  }
});
