import test from "node:test";
import { DatabaseSync } from "node:sqlite";
import assert from "node:assert/strict";
import {
  mkdtemp,
  rm,
  readFile,
  rename,
  mkdir,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { LibraryService, defaults } from "../src/host/service.ts";
import { LibraryDB, safePath } from "../src/host/storage.ts";
import { embed, WorkError, fingerprint } from "../src/host/ark.ts";
import { run } from "../src/host/media.ts";
const signal = () => new AbortController().signal;
const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP9sAAAAASUVORK5CYII=",
  "base64",
);

test("legacy favorites migrate once into a protected default collection without losing memberships", async () => {
  const f = await fixture();
  try {
    const item = await upload(f.service, f.id);
    await f.service.collection({
      libraryId: f.id,
      action: "create",
      name: "Project",
    });
    const cols = (await f.service.snapshot()).collections;
    const system = cols.find((c) => c.isDefault)!;
    const custom = cols.find((c) => c.name === "Project")!;
    await f.service.editAsset({
      libraryId: f.id,
      id: item.assetId,
      notes: "keep notes",
      collectionIds: [custom.id],
    });
    await f.service.library({ action: "close", id: f.id });
    const db = new DatabaseSync(join(f.root, "library", "library.sqlite"));
    db.exec(
      "DROP INDEX one_default_collection; ALTER TABLE collections DROP COLUMN is_default; PRAGMA user_version=2;",
    );
    db.prepare(
      "UPDATE assets SET data=json_set(data,'$.favorite',1) WHERE id=?",
    ).run(item.assetId);
    db.close();
    for (let i = 0; i < 2; i++) {
      await f.service.library({
        action: "open",
        path: join(f.root, "library"),
      });
      const snapshot = await f.service.snapshot();
      assert.equal(snapshot.collections.filter((c) => c.isDefault).length, 1);
      assert.equal(
        snapshot.collections.find((c) => c.isDefault)!.id,
        system.id,
      );
      const asset = (await f.service.search({ query: "" }, signal())).hits[0];
      assert.deepEqual(
        new Set(asset.collectionIds),
        new Set([system.id, custom.id]),
      );
      assert.equal(asset.favorite, true);
      assert.equal(asset.notes, "keep notes");
      if (i === 0) await f.service.library({ action: "close", id: f.id });
    }
    for (const action of ["delete", "rename"] as const)
      await assert.rejects(
        f.service.collection({
          libraryId: f.id,
          id: system.id,
          action,
          name: "renamed",
        }),
        /默认收藏夹/,
      );
    const target = { libraryId: f.id, id: item.assetId };
    await f.service.editAsset({ ...target, favorite: false });
    let asset = (await f.service.search({ query: "" }, signal())).hits[0];
    assert.deepEqual(asset.collectionIds, []);
    assert.equal(asset.favorite, false);
    await f.service.editAsset({ ...target, favorite: true });
    asset = (await f.service.search({ query: "" }, signal())).hits[0];
    assert.deepEqual(asset.collectionIds, [system.id]);
    await f.service.setCollections({ ...target, collectionIds: [custom.id] });
    assert.equal(
      (await f.service.search({ query: "", favorite: true }, signal())).total,
      1,
    );
    await f.service.collection({
      libraryId: f.id,
      id: custom.id,
      action: "delete",
    });
    assert.equal(
      (await f.service.search({ query: "", favorite: true }, signal())).total,
      0,
    );
    assert.equal((await f.service.search({ query: "" }, signal())).total, 1);
  } finally {
    await f.cleanup();
  }
});

test("text relevance ranks filenames before tags and notes regardless of import order", async () => {
  const f = await fixture();
  try {
    const name = await upload(f.service, f.id, png, "ocean.png");
    const tag = await upload(
      f.service,
      f.id,
      Buffer.concat([png, Buffer.from([0])]),
      "tag.png",
    );
    const note = await upload(
      f.service,
      f.id,
      Buffer.concat([png, Buffer.from([1])]),
      "note.png",
    );
    await f.service.editAsset({
      libraryId: f.id,
      id: tag.assetId,
      tags: ["ocean"],
    });
    await f.service.editAsset({
      libraryId: f.id,
      id: note.assetId,
      notes: "ocean",
    });
    assert.deepEqual(
      (
        await f.service.search({ query: "ocean", sort: "default" }, signal())
      ).hits.map((h) => h.id),
      [name.assetId, tag.assetId, note.assetId],
    );
  } finally {
    await f.cleanup();
  }
});
async function waitUntil<T>(read: () => Promise<T>, accept: (v: T) => boolean) {
  for (let i = 0; i < 150; i++) {
    const value = await read();
    if (accept(value)) return value;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("task did not settle");
}
async function fixture(fetcher?: typeof fetch) {
  const root = await mkdtemp(join(tmpdir(), "dsh-assets-test-"));
  let key: string | undefined;
  const credentials = {
    read: async () => key,
    write: async (v: string) => {
      key = v;
    },
    clear: async () => {
      key = undefined;
    },
  };
  const service = new LibraryService(
    join(root, "machine"),
    credentials,
    fetcher,
  );
  await service.init();
  await service.library({
    action: "create",
    path: join(root, "library"),
    name: "测试库",
  });
  const id = (await service.snapshot()).libraries[0].id;
  return {
    root,
    service,
    id,
    credentials,
    async cleanup() {
      await service.dispose();
      await rm(root, { recursive: true, force: true });
    },
  };
}
async function upload(
  service: LibraryService,
  id: string,
  bytes = png,
  name = "海边.png",
) {
  const u = await service.beginUpload({
    libraryId: id,
    name,
    size: bytes.length,
  });
  await service.uploadChunk({
    libraryId: id,
    id: u.id,
    offset: 0,
    data: bytes.toString("base64"),
  });
  return service.finishUpload({ libraryId: id, id: u.id }, signal());
}

test("portable library: import, deduplication, metadata, close, move, reopen without credentials", async () => {
  const f = await fixture();
  try {
    const first = await upload(f.service, f.id),
      second = await upload(f.service, f.id);
    assert.equal(second.duplicate, true);
    assert.equal(first.assetId, second.assetId);
    await f.service.updateAsset({
      libraryId: f.id,
      id: first.assetId,
      tags: ["海边", "旅行"],
      notes: "夏日",
      favorite: true,
    });
    const result = await f.service.search(
      { query: "旅行", ai: false },
      signal(),
    );
    assert.equal(result.total, 1);
    assert.equal(result.hits[0].favorite, true);
    assert.equal(result.hits[0].relativePath.startsWith("originals/"), true);
    const path = join(f.root, "moved");
    await f.service.library({ action: "close", id: f.id });
    await rename(join(f.root, "library"), path);
    await f.service.library({ action: "open", path });
    assert.equal(
      (await f.service.search({ query: "夏日" }, signal())).hits[0].id,
      first.assetId,
    );
    assert.equal((await f.service.snapshot()).keyConfigured, false);
    await assert.rejects(LibraryDB.open(path), /已被/);
    assert.throws(() => safePath(path, "../outside"), /路径/);
  } finally {
    await f.cleanup();
  }
});

test("chunk retries are idempotent and wrong offsets cannot corrupt imported data", async () => {
  const f = await fixture();
  try {
    const u = await f.service.beginUpload({
      libraryId: f.id,
      name: "图片.png",
      size: png.length,
    });
    const request = {
      libraryId: f.id,
      id: u.id,
      offset: 0,
      data: png.toString("base64"),
    };
    await f.service.uploadChunk(request);
    assert.equal((await f.service.uploadChunk(request)).offset, png.length);
    await assert.rejects(
      f.service.uploadChunk({ ...request, offset: png.length + 1 }),
      /偏移/,
    );
    const r = await f.service.finishUpload(
      { libraryId: f.id, id: u.id },
      signal(),
    );
    const media = await f.service.media({
      libraryId: f.id,
      id: r.assetId,
      preview: false,
    });
    assert.deepEqual(Buffer.from(media.data, "base64"), png);
    assert.equal(
      (await f.service.finishUpload({ libraryId: f.id, id: u.id }, signal()))
        .assetId,
      r.assetId,
    );
  } finally {
    await f.cleanup();
  }
});

test("missing key fails visibly, manual search works, retry indexes and secrets never enter library", async () => {
  const requests: unknown[] = [];
  const fetcher = (async (_url, init) => {
    requests.push(JSON.parse(init!.body as string));
    return Response.json({ data: { embedding: [1, 0, 0] } });
  }) as typeof fetch;
  const f = await fixture(fetcher);
  try {
    // Generate a valid preview with the real platform binary.
    const file = join(f.root, "blue.png");
    await run(
      "ffmpeg",
      [
        "-nostdin",
        "-v",
        "error",
        "-y",
        "-f",
        "lavfi",
        "-i",
        "color=blue:s=32x32",
        "-frames:v",
        "1",
        file,
      ],
      signal(),
    );
    await upload(f.service, f.id, await readFile(file), "蓝色.png");
    let snapshot = await waitUntil(
      () => f.service.snapshot(),
      (s) => s.tasks.some((t) => t.status === "failed"),
    );
    assert.match(snapshot.tasks[0].error!, /API Key/);
    assert.equal(requests.length, 0);
    assert.equal(
      (await f.service.search({ query: "蓝色" }, signal())).total,
      1,
    );
    await f.service.saveSettings({
      ...defaults,
      apiKey: "test-secret-never-export",
    });
    await f.service.task({
      libraryId: f.id,
      id: snapshot.tasks[0].id,
      action: "retry",
    });
    snapshot = await waitUntil(
      () => f.service.snapshot(),
      (s) => s.tasks[0].status === "completed",
    );
    assert.equal(snapshot.tasks[0].progress, 100);
    assert.equal(JSON.stringify(snapshot).includes("test-secret"), false);
    assert.equal(
      (await f.service.search({ query: "大海", ai: true }, signal())).hits
        .length,
      1,
    );
    const before = requests.length;
    await f.service.search({ query: "大海", ai: true }, signal());
    assert.equal(requests.length, before);
    await f.service.search(
      { query: " 大海 ", ai: true, kind: "image", withinDays: 7, sort: "size" },
      signal(),
    );
    assert.equal(requests.length, before);
    const meta = await readFile(
      join(f.root, "library", "library.json"),
      "utf8",
    );
    assert.equal(meta.includes("test-secret"), false);
  } finally {
    await f.cleanup();
  }
});

test("Ark classifies auth/429 and rejects invalid vectors without exposing key", async () => {
  for (const [code, retry] of [
    [401, false],
    [429, true],
    [500, true],
  ] as const) {
    await assert.rejects(
      embed(
        defaults,
        "secret",
        { text: "hello" },
        signal(),
        (async () => new Response("secret", { status: code })) as typeof fetch,
      ),
      (e) =>
        e instanceof WorkError &&
        e.retryable === retry &&
        !e.message.includes("secret"),
    );
  }
  await assert.rejects(
    embed(defaults, "secret", { text: "hello" }, signal(), (async () =>
      Response.json({ data: { embedding: [0, 0] } })) as typeof fetch),
    /零向量/,
  );
});

test("real video segmentation produces time-addressed semantic hits", async () => {
  let imageRequest = 0;
  const fetcher = (async (_url, init) => {
    const b = JSON.parse(init!.body as string);
    return Response.json({
      data: {
        embedding:
          b.input[0].type === "text"
            ? [0, 1]
            : ++imageRequest === 1
              ? [1, 0]
              : [0, 1],
      },
    });
  }) as typeof fetch;
  const f = await fixture(fetcher);
  try {
    const video = join(f.root, "clip.mp4");
    await run(
      "ffmpeg",
      [
        "-nostdin",
        "-v",
        "error",
        "-y",
        "-f",
        "lavfi",
        "-i",
        "testsrc=size=64x64:rate=2",
        "-t",
        "12",
        "-pix_fmt",
        "yuv420p",
        video,
      ],
      signal(),
    );
    await f.service.saveSettings({
      ...defaults,
      apiKey: "test-key",
      segmentSeconds: 5,
    });
    await upload(f.service, f.id, await readFile(video), "测试视频.mp4");
    const s = await waitUntil(
      () => f.service.snapshot(),
      (s) => ["completed", "failed"].includes(s.tasks[0]?.status),
    );
    assert.equal(s.tasks[0].status, "completed", s.tasks[0].error ?? "");
    assert.equal(imageRequest, 3);
    const r = await f.service.search(
      { query: "第二个画面", ai: true },
      signal(),
    );
    assert.equal(r.hits[0].start, 5);
    assert.equal(r.hits[0].end, 10);
  } finally {
    await f.cleanup();
  }
});

test("cancel running embedding and resume after service restart from durable checkpoint", async () => {
  let started = false;
  const fetcher = (async (_url, init) => {
    started = true;
    return new Promise<Response>((_resolve, reject) =>
      init!.signal!.addEventListener(
        "abort",
        () => reject(new Error("aborted")),
        { once: true },
      ),
    );
  }) as typeof fetch;
  const f = await fixture(fetcher);
  let next: LibraryService | undefined;
  try {
    const file = join(f.root, "x.png");
    await run(
      "ffmpeg",
      [
        "-nostdin",
        "-v",
        "error",
        "-y",
        "-f",
        "lavfi",
        "-i",
        "color=red:s=32x32",
        "-frames:v",
        "1",
        file,
      ],
      signal(),
    );
    await f.service.saveSettings({ ...defaults, apiKey: "test" });
    await upload(f.service, f.id, await readFile(file));
    await waitUntil(
      async () => started,
      (v) => v,
    );
    let snapshot = await f.service.snapshot();
    await f.service.task({
      libraryId: f.id,
      id: snapshot.tasks[0].id,
      action: "pause",
    });
    assert.equal((await f.service.snapshot()).tasks[0].status, "paused");
    await f.service.dispose();
    next = new LibraryService(
      join(f.root, "machine"),
      f.credentials,
      (async () =>
        Response.json({ data: { embedding: [1, 1] } })) as typeof fetch,
    );
    await next.init();
    snapshot = await next.snapshot();
    assert.equal(snapshot.tasks[0].status, "paused");
    await next.task({
      libraryId: f.id,
      id: snapshot.tasks[0].id,
      action: "resume",
    });
    assert.equal(
      (
        await waitUntil(
          () => next!.snapshot(),
          (s) => s.tasks[0].status === "completed",
        )
      ).tasks[0].progress,
      100,
    );
  } finally {
    await next?.dispose();
    await f.cleanup();
  }
});

test("transient errors retry only up to the configured bound and preserve originals", async () => {
  let calls = 0;
  const f = await fixture((async () => {
    calls++;
    return new Response("unavailable", { status: 503 });
  }) as typeof fetch);
  try {
    const file = join(f.root, "retry.png");
    await run(
      "ffmpeg",
      [
        "-nostdin",
        "-v",
        "error",
        "-y",
        "-f",
        "lavfi",
        "-i",
        "color=red:s=32x32",
        "-frames:v",
        "1",
        file,
      ],
      signal(),
    );
    const bytes = await readFile(file);
    await f.service.saveSettings({
      ...defaults,
      apiKey: "fake-test-key",
      maxRetries: 1,
    });
    const imported = await upload(f.service, f.id, bytes, "retry.png");
    const s = await waitUntil(
      () => f.service.snapshot(),
      (s) => s.tasks[0]?.status === "failed",
    );
    assert.equal(calls, 2);
    assert.equal(s.tasks[0].attempts, 2);
    assert.match(s.tasks[0].error!, /503/);
    const original = await f.service.media({
      libraryId: f.id,
      id: imported.assetId,
      preview: false,
    });
    assert.deepEqual(Buffer.from(original.data, "base64"), bytes);
  } finally {
    await f.cleanup();
  }
});

test("collections are many-to-many, isolated per library, and survive folder migration", async () => {
  const f = await fixture();
  try {
    const item = await upload(f.service, f.id);
    await f.service.collection({
      libraryId: f.id,
      action: "create",
      name: "Project",
    });
    await f.service.collection({
      libraryId: f.id,
      action: "create",
      name: "Backgrounds",
    });
    const cols = (await f.service.snapshot()).collections.filter(
      (c) => !c.isDefault,
    );
    await f.service.setCollections({
      libraryId: f.id,
      id: item.assetId,
      collectionIds: cols.map((c) => c.id),
    });
    assert.equal(
      (
        await f.service.search(
          { query: "", collectionId: cols[0].id },
          signal(),
        )
      ).total,
      1,
    );
    assert.equal(
      (await f.service.snapshot()).collections.find((c) => c.id === cols[1].id)!
        .count,
      1,
    );
    assert.equal((await f.service.snapshot()).libraries[0].count, 1);
    await assert.rejects(
      f.service.setCollections({
        libraryId: f.id,
        id: item.assetId,
        collectionIds: ["foreign"],
      }),
      /不存在/,
    );
    await f.service.collection({
      libraryId: f.id,
      action: "rename",
      id: cols[0].id,
      name: "Travel",
    });
    await f.service.library({ action: "close", id: f.id });
    await rename(join(f.root, "library"), join(f.root, "relocated"));
    await f.service.library({
      action: "open",
      path: join(f.root, "relocated"),
    });
    assert.equal(
      (await f.service.snapshot()).collections.find((c) => c.id === cols[0].id)!
        .name,
      "Travel",
    );
    assert.equal(
      (
        await f.service.search(
          { query: "", collectionId: cols[1].id },
          signal(),
        )
      ).hits[0].collectionIds.length,
      2,
    );
    await assert.rejects(
      f.service.collection({
        libraryId: f.id,
        action: "delete",
        id: "foreign",
      }),
      /不存在/,
    );
    await f.service.collection({
      libraryId: f.id,
      action: "delete",
      id: cols[0].id,
    });
    const afterDelete = await f.service.search({ query: "" }, signal());
    assert.equal(
      afterDelete.total,
      1,
      "deleting a collection must preserve the original asset",
    );
    assert.deepEqual(afterDelete.hits[0].collectionIds, [cols[1].id]);
    assert.equal((await f.service.snapshot()).collections.length, 2);
    await f.service.library({ action: "close", id: f.id });
    await f.service.library({
      action: "open",
      path: join(f.root, "relocated"),
    });
    assert.equal(
      (await f.service.snapshot()).collections.find((c) => c.id === cols[1].id)!
        .name,
      cols[1].name,
    );
  } finally {
    await f.cleanup();
  }
});

test("partial autosave keeps other fields and rejects invalid membership atomically", async () => {
  const f = await fixture();
  try {
    const item = await upload(f.service, f.id);
    const target = { libraryId: f.id, id: item.assetId };
    await f.service.collection({
      libraryId: f.id,
      action: "create",
      name: "Project",
    });
    const collection = (await f.service.snapshot()).collections.find(
      (c) => c.name === "Project",
    )!;
    await f.service.editAsset({
      ...target,
      tags: ["tag"],
      notes: "original",
      collectionIds: [collection.id],
    });
    await Promise.all([
      f.service.editAsset({ ...target, notes: "edited" }),
      f.service.editAsset({ ...target, favorite: true }),
    ]);
    await assert.rejects(
      f.service.editAsset({
        ...target,
        notes: "invalid",
        collectionIds: ["missing"],
      }),
      /不存在/,
    );
    const asset = (await f.service.search({ query: "edited" }, signal()))
      .hits[0];
    assert.equal(asset.notes, "edited");
    assert.equal(asset.favorite, true);
    assert.deepEqual(asset.tags, ["tag"]);
    assert.deepEqual(asset.collectionIds, [collection.id]);
    const cleared = await f.service.editAsset({ ...target, collectionIds: [] });
    assert.deepEqual(cleared.collectionIds, []);
    assert.equal(cleared.notes, "edited");
  } finally {
    await f.cleanup();
  }
});

test("filters compose across metadata and model index before sorting and pagination", async () => {
  const f = await fixture();
  try {
    const first = await upload(
      f.service,
      f.id,
      Buffer.concat([png, Buffer.from("a")]),
      "a.png",
    );
    const second = await upload(
      f.service,
      f.id,
      Buffer.concat([png, Buffer.from("bb")]),
      "b.png",
    );
    const third = await upload(
      f.service,
      f.id,
      Buffer.concat([png, Buffer.from("ccc")]),
      "c.png",
    );
    for (const task of (await f.service.snapshot()).tasks)
      await f.service.task({ libraryId: f.id, id: task.id, action: "pause" });
    await f.service.collection({
      libraryId: f.id,
      action: "create",
      name: "A",
    });
    await f.service.collection({
      libraryId: f.id,
      action: "create",
      name: "B",
    });
    const collections = (await f.service.snapshot()).collections.map(
      (c) => c.id,
    );
    await f.service.editAsset({
      libraryId: f.id,
      id: first.assetId,
      favorite: true,
      tags: ["blue", "Background"],
      collectionIds: collections,
    });
    await f.service.editAsset({
      libraryId: f.id,
      id: second.assetId,
      tags: ["blue"],
      collectionIds: [collections[1]],
    });
    const db = new DatabaseSync(join(f.root, "library", "library.sqlite"));
    try {
      for (const [id, days] of [
        [first.assetId, 20],
        [second.assetId, 1],
        [third.assetId, 2],
      ] as const)
        db.prepare(
          "UPDATE assets SET data=json_set(data,'$.createdAt',?) WHERE id=?",
        ).run(new Date(Date.now() - days * 86400000).toISOString(), id);
      db.prepare("INSERT INTO vectors VALUES(?,?,?,?,?,?)").run(
        first.assetId,
        0,
        fingerprint(defaults),
        null,
        null,
        "[1,0,0]",
      );
      db.prepare("INSERT INTO vectors VALUES(?,?,?,?,?,?)").run(
        second.assetId,
        0,
        "outdated-model",
        null,
        null,
        "[1,0,0]",
      );
    } finally {
      db.close();
    }
    assert.deepEqual(
      (await f.service.snapshot()).tags.map(({ name, count, libraryId }) => ({
        name,
        count,
        libraryId,
      })),
      [
        { name: "blue", count: 2, libraryId: f.id },
        { name: "Background", count: 1, libraryId: f.id },
      ],
    );
    const combined = {
      query: "",
      favorite: true,
      collectionIds: collections,
      tags: ["BLUE", "background"],
      withinDays: 30,
      indexState: "indexed" as const,
    };
    assert.deepEqual(
      (await f.service.search(combined, signal())).hits.map((a) => a.id),
      [first.assetId],
    );
    assert.equal(
      (await f.service.search({ ...combined, withinDays: 7 }, signal())).total,
      0,
    );
    assert.equal(
      (await f.service.search({ query: "", indexState: "unindexed" }, signal()))
        .total,
      2,
    );
    const page = await f.service.search(
      {
        query: "",
        collectionIds: collections,
        sort: "name",
        offset: 1,
        limit: 1,
      },
      signal(),
    );
    assert.equal(page.total, 2);
    assert.equal(page.hits[0].id, second.assetId);
    assert.equal(
      (await f.service.search({ query: "", sort: "size" }, signal())).hits[0]
        .id,
      third.assetId,
    );
    assert.equal(
      (await f.service.search({ query: "", sort: "oldest" }, signal())).hits[0]
        .id,
      first.assetId,
    );
    assert.equal(
      (await f.service.search({ query: "", sort: "newest" }, signal())).hits[0]
        .id,
      second.assetId,
    );
    assert.equal(
      (await f.service.search({ query: "", kind: "video" }, signal())).total,
      0,
    );
  } finally {
    await f.cleanup();
  }
});
