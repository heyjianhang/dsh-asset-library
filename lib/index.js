// src/host/index.ts
import {
  bindTypertRemote,
  RemoteError
} from "@deepseek-ai/dsh-typert-protocol";
import { credentialKey } from "@deepseek-ai/dsh-credentials";
import { defineTool } from "@deepseek-ai/dsh-tools";
import { homedir } from "node:os";
import { join as join6 } from "node:path";

// src/shared/contracts.ts
import { z } from "zod";
var s3Schema = z.object({
  endpoint: z.string().max(2e3).default(""),
  region: z.string().trim().min(1).max(100).default("us-east-1"),
  bucket: z.string().trim().max(255).default(""),
  prefix: z.string().trim().max(500).default("asset-library"),
  forcePathStyle: z.boolean().default(true)
});
var storageSchema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("local") }),
  z.object({ mode: z.literal("s3"), s3: s3Schema })
]);
var transferSchema = z.object({
  id: z.string(),
  kind: z.enum(["export", "import"]),
  name: z.string(),
  libraryId: z.string().optional(),
  path: z.string(),
  archiveId: z.string().optional(),
  storage: storageSchema.optional(),
  status: z.enum([
    "queued",
    "running",
    "paused",
    "completed",
    "failed",
    "cancelled"
  ]),
  progress: z.number(),
  detail: z.string(),
  error: z.string().nullable(),
  result: z.string().optional(),
  acknowledged: z.boolean().optional(),
  updatedAt: z.string()
});
var librarySchema = z.object({
  id: z.string(),
  name: z.string(),
  path: z.string(),
  available: z.boolean(),
  count: z.number(),
  error: z.string().optional(),
  storage: storageSchema.default({ mode: "local" })
});
var assetSchema = z.object({
  id: z.string(),
  libraryId: z.string(),
  name: z.string(),
  kind: z.enum(["image", "video"]),
  mime: z.string(),
  size: z.number(),
  relativePath: z.string(),
  tags: z.array(z.string()),
  notes: z.string(),
  favorite: z.boolean(),
  createdAt: z.string(),
  status: z.string(),
  duration: z.number().nullable(),
  thumbnail: z.string().nullable(),
  collectionIds: z.array(z.string()).default([])
});
var taskSchema = z.object({
  id: z.string(),
  libraryId: z.string(),
  assetId: z.string(),
  name: z.string(),
  stage: z.string(),
  status: z.enum([
    "queued",
    "running",
    "paused",
    "retrying",
    "completed",
    "failed",
    "cancelled"
  ]),
  progress: z.number(),
  attempts: z.number(),
  error: z.string().nullable(),
  nextRunAt: z.number(),
  updatedAt: z.string()
});
var settingsSchema = z.object({
  baseUrl: z.string().url(),
  model: z.string().trim().min(1).max(200),
  concurrency: z.number().int().min(1).max(4),
  maxRetries: z.number().int().min(0).max(5),
  segmentSeconds: z.number().int().min(5).max(60),
  ffmpegPath: z.string().max(2e3),
  ffprobePath: z.string().max(2e3),
  storageMode: z.enum(["local", "s3"]).default("local"),
  localDirectory: z.string().max(4e3).default(""),
  s3: s3Schema.default({
    endpoint: "",
    region: "us-east-1",
    bucket: "",
    prefix: "asset-library",
    forcePathStyle: true
  })
});
var searchInput = z.object({
  query: z.string().max(2e3),
  libraryId: z.string().optional(),
  kind: z.enum(["all", "image", "video"]).default("all"),
  ai: z.boolean().default(false),
  favorite: z.boolean().default(false),
  recent: z.boolean().default(false),
  collectionId: z.string().optional(),
  collectionIds: z.array(z.string()).max(100).default([]),
  tags: z.array(z.string().trim().min(1).max(80)).max(50).default([]),
  withinDays: z.number().int().min(0).max(36500).default(0),
  indexState: z.enum(["all", "indexed", "unindexed"]).default("all"),
  sort: z.enum(["default", "newest", "oldest", "name", "size"]).default("default"),
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0)
});
var hitSchema = assetSchema.extend({
  score: z.number(),
  start: z.number().nullable(),
  end: z.number().nullable()
});
var empty = z.object({}).strict();
var success = z.object({ ok: z.literal(true) });
var endpoints = {
  snapshot: {
    input: empty,
    output: z.object({
      libraries: z.array(librarySchema),
      tasks: z.array(taskSchema),
      keyConfigured: z.boolean(),
      s3Configured: z.boolean(),
      transfers: z.array(transferSchema),
      settings: settingsSchema,
      notices: z.array(
        z.object({ id: z.string(), text: z.string(), createdAt: z.string() })
      ),
      tags: z.array(
        z.object({
          libraryId: z.string(),
          name: z.string(),
          count: z.number()
        })
      ),
      collections: z.array(
        z.object({
          id: z.string(),
          libraryId: z.string(),
          name: z.string(),
          count: z.number(),
          isDefault: z.boolean().default(false)
        })
      )
    })
  },
  library: {
    input: z.object({
      action: z.enum(["create", "open", "close"]),
      path: z.string().max(4e3).optional(),
      name: z.string().trim().min(1).max(120).optional(),
      id: z.string().optional(),
      storageMode: z.enum(["local", "s3"]).optional()
    }).strict(),
    output: z.object({ ok: z.literal(true), id: z.string().optional() })
  },
  search: {
    input: searchInput,
    output: z.object({
      hits: z.array(hitSchema),
      total: z.number(),
      unindexed: z.number()
    })
  },
  updateAsset: {
    input: z.object({
      libraryId: z.string(),
      id: z.string(),
      tags: z.array(z.string().trim().min(1).max(80)).max(50),
      notes: z.string().max(1e4),
      favorite: z.boolean()
    }).strict(),
    output: success
  },
  editAsset: {
    input: z.object({
      libraryId: z.string(),
      id: z.string(),
      tags: z.array(z.string().trim().min(1).max(80)).max(50).optional(),
      notes: z.string().max(1e4).optional(),
      favorite: z.boolean().optional(),
      collectionIds: z.array(z.string()).max(100).optional()
    }).strict(),
    output: assetSchema
  },
  collection: {
    input: z.object({
      libraryId: z.string(),
      action: z.enum(["create", "rename", "delete"]),
      id: z.string().optional(),
      name: z.string().trim().min(1).max(80).optional()
    }).strict(),
    output: success
  },
  setCollections: {
    input: z.object({
      libraryId: z.string(),
      id: z.string(),
      collectionIds: z.array(z.string()).max(100)
    }).strict(),
    output: success
  },
  task: {
    input: z.object({
      libraryId: z.string(),
      id: z.string(),
      action: z.enum(["pause", "resume", "retry", "cancel"])
    }).strict(),
    output: success
  },
  saveSettings: {
    input: settingsSchema.extend({
      apiKey: z.string().max(2048).optional(),
      clearKey: z.boolean().optional(),
      accessKeyId: z.string().max(2048).optional(),
      secretAccessKey: z.string().max(4096).optional(),
      sessionToken: z.string().max(16384).optional(),
      clearS3: z.boolean().optional()
    }).strict(),
    output: success
  },
  testConnection: {
    input: empty,
    output: z.object({ dimensions: z.number() })
  },
  testS3: { input: empty, output: success },
  archiveUpload: {
    input: z.object({
      action: z.enum(["begin", "chunk", "cancel"]),
      id: z.string().uuid().optional(),
      size: z.number().int().positive().max(1024 ** 4).optional(),
      offset: z.number().int().min(0).optional(),
      data: z.string().max(15e5).optional()
    }).strict(),
    output: z.object({ id: z.string(), offset: z.number() })
  },
  startTransfer: {
    input: z.object({
      kind: z.enum(["export", "import"]),
      libraryId: z.string().optional(),
      archiveId: z.string().uuid().optional(),
      path: z.string().min(1).max(4e3),
      storageMode: z.enum(["local", "s3"]).default("local")
    }).strict(),
    output: z.object({ id: z.string() })
  },
  transfer: {
    input: z.object({ id: z.string(), action: z.enum(["retry", "cancel"]) }).strict(),
    output: success
  },
  beginUpload: {
    input: z.object({
      libraryId: z.string(),
      name: z.string().min(1).max(255),
      size: z.number().int().positive().max(100 * 1024 ** 3)
    }).strict(),
    output: z.object({ id: z.string(), offset: z.number() })
  },
  uploadChunk: {
    input: z.object({
      libraryId: z.string(),
      id: z.string(),
      offset: z.number().int().min(0),
      data: z.string().max(15e5)
    }).strict(),
    output: z.object({ offset: z.number() })
  },
  finishUpload: {
    input: z.object({ libraryId: z.string(), id: z.string() }).strict(),
    output: z.object({ assetId: z.string(), duplicate: z.boolean() })
  },
  media: {
    input: z.object({
      libraryId: z.string(),
      id: z.string(),
      preview: z.boolean().default(true),
      offset: z.number().int().min(0).default(0)
    }).strict(),
    output: z.object({
      data: z.string(),
      mime: z.string(),
      size: z.number(),
      nextOffset: z.number()
    })
  },
  acknowledge: {
    input: z.object({ ids: z.array(z.string()).max(1e3) }).strict(),
    output: success
  }
};
var contribution = {
  package: "dsh-asset-library",
  descriptors: Object.entries(endpoints).map(([method, schema]) => ({
    id: `dsh-asset-library#assetLibrary/${method}`,
    service: "assetLibrary",
    namespace: "assetLibrary",
    method,
    invocation: { kind: "direct" },
    cancellation: { parameter: "signal" },
    parameters: [
      {
        name: "request",
        wire: "request",
        source: "json",
        codec: {
          mode: "strict",
          typeSymbol: `dsh-asset-library#${method}Input`,
          create: () => schema.input
        }
      }
    ],
    result: {
      mode: "strict",
      typeSymbol: `dsh-asset-library#${method}Output`,
      create: () => schema.output
    }
  }))
};

// src/host/service.ts
import { randomUUID as randomUUID5, createHash as createHash3 } from "node:crypto";
import { createReadStream as createReadStream3 } from "node:fs";
import {
  mkdir as mkdir6,
  readFile as readFile5,
  stat as stat5,
  rename as rename4,
  unlink as unlink5,
  open as open3,
  writeFile as writeFile4,
  lstat as lstat4
} from "node:fs/promises";
import { join as join5, extname, basename, isAbsolute as isAbsolute3 } from "node:path";

// src/host/storage.ts
import { DatabaseSync } from "node:sqlite";
import { randomUUID } from "node:crypto";
import { hostname } from "node:os";
import { resolve, join, relative, isAbsolute } from "node:path";
import {
  mkdir,
  readFile,
  writeFile,
  rename,
  realpath,
  readdir,
  open,
  unlink,
  lstat
} from "node:fs/promises";
async function atomicJSON(path, value) {
  const temp = path + "." + randomUUID() + ".tmp";
  await writeFile(temp, JSON.stringify(value, null, 2), { mode: 384 });
  await rename(temp, path);
}
function safePath(root, path) {
  const target = resolve(root, path), rel = relative(root, target);
  if (isAbsolute(path) || rel.startsWith("..") || isAbsolute(rel))
    throw new Error("\u5E93\u5185\u8DEF\u5F84\u4E0D\u5408\u6CD5");
  return target;
}
var now = () => (/* @__PURE__ */ new Date()).toISOString();
var LibraryDB = class _LibraryDB {
  constructor(root, id, name2, lockToken, storage) {
    this.root = root;
    this.id = id;
    this.name = name2;
    this.lockToken = lockToken;
    this.storage = storage;
    this.db = new DatabaseSync(join(root, "library.sqlite"));
    const version = Number(
      this.db.prepare("PRAGMA user_version").get().user_version
    );
    if (version > 3) {
      this.db.close();
      throw new Error("\u7D20\u6750\u5E93\u7531\u66F4\u65B0\u7248\u672C\u521B\u5EFA\uFF0C\u8BF7\u5347\u7EA7\u63D2\u4EF6");
    }
    this.db.exec(`PRAGMA journal_mode=WAL;PRAGMA foreign_keys=ON;PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS assets(id TEXT PRIMARY KEY,hash TEXT UNIQUE NOT NULL,data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS tasks(id TEXT PRIMARY KEY,data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS uploads(id TEXT PRIMARY KEY,name TEXT NOT NULL,size INTEGER NOT NULL,offset INTEGER NOT NULL DEFAULT 0,result TEXT);
      CREATE TABLE IF NOT EXISTS vectors(asset_id TEXT NOT NULL,segment INTEGER NOT NULL,fingerprint TEXT NOT NULL,start REAL,end REAL,vector TEXT NOT NULL,PRIMARY KEY(asset_id,segment,fingerprint));
      CREATE TABLE IF NOT EXISTS notices(id TEXT PRIMARY KEY,text TEXT NOT NULL,createdAt TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS collections(id TEXT PRIMARY KEY,name TEXT NOT NULL UNIQUE,created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS collection_assets(collection_id TEXT NOT NULL REFERENCES collections(id),asset_id TEXT NOT NULL REFERENCES assets(id),PRIMARY KEY(collection_id,asset_id));
      `);
    if (!this.db.prepare("PRAGMA table_info(uploads)").all().some((c) => c.name === "prepared"))
      this.db.exec("ALTER TABLE uploads ADD COLUMN prepared TEXT");
    if (version < 3) {
      this.transaction(() => {
        this.db.exec(
          "ALTER TABLE collections ADD COLUMN is_default INTEGER NOT NULL DEFAULT 0"
        );
        this.ensureDefaultCollection(true);
        this.db.exec(
          "CREATE UNIQUE INDEX one_default_collection ON collections(is_default) WHERE is_default=1; PRAGMA user_version=3;"
        );
      });
    }
    for (const task of this.tasks()) {
      if (task.status === "running") {
        task.status = "queued";
        task.error = "\u4E0A\u6B21\u8FD0\u884C\u4E2D\u65AD\uFF0C\u5DF2\u4ECE\u4FDD\u5B58\u7684\u9636\u6BB5\u6062\u590D";
        this.saveTask(task);
      }
    }
  }
  db;
  static async open(path, createName, storage = { mode: "local" }) {
    if (!isAbsolute(path)) throw new Error("\u8BF7\u9009\u62E9\u7EDD\u5BF9\u6587\u4EF6\u5939\u8DEF\u5F84");
    if (createName) {
      await mkdir(path, { recursive: true });
      const entries = (await readdir(path)).filter((x) => x !== ".DS_Store");
      if (entries.length) throw new Error("\u65B0\u5EFA\u5E93\u9700\u8981\u7A7A\u6587\u4EF6\u5939\uFF0C\u8BF7\u9009\u62E9\u5176\u4ED6\u4F4D\u7F6E");
      await atomicJSON(join(path, "library.json"), {
        format: "dsh-asset-library",
        version: storage.mode === "s3" ? 2 : 1,
        id: randomUUID(),
        name: createName,
        storage
      });
    }
    const root = await realpath(path);
    const manifest = JSON.parse(
      await readFile(join(root, "library.json"), "utf8")
    );
    if (manifest.format !== "dsh-asset-library" || ![1, 2].includes(manifest.version) || typeof manifest.id !== "string" || typeof manifest.name !== "string")
      throw new Error("\u65E0\u6CD5\u6253\u5F00\uFF1A\u4E0D\u662F\u53D7\u652F\u6301\u7684\u7D20\u6750\u5E93");
    const lock = join(root, ".library-lock"), token = randomUUID();
    try {
      const old = JSON.parse(await readFile(lock, "utf8"));
      if (old.host !== hostname())
        throw new Error("\u6B64\u5E93\u672A\u5B89\u5168\u5173\u95ED\uFF0C\u8BF7\u5728\u539F\u7535\u8111\u5173\u95ED\u540E\u91CD\u65B0\u8FC1\u79FB");
      try {
        process.kill(old.pid, 0);
        throw new Error("\u7D20\u6750\u5E93\u5DF2\u88AB\u5176\u4ED6\u7A97\u53E3\u6216\u8FDB\u7A0B\u6253\u5F00");
      } catch (e) {
        if (e.code !== "ESRCH") throw e;
      }
      await unlink(lock);
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
    const file = await open(lock, "wx", 384);
    await file.writeFile(
      JSON.stringify({ pid: process.pid, host: hostname(), token })
    );
    await file.close();
    try {
      for (const dir of ["originals", "previews", "staging"]) {
        await mkdir(join(root, dir), { recursive: true });
        if ((await lstat(join(root, dir))).isSymbolicLink())
          throw new Error("\u7D20\u6750\u5E93\u5185\u90E8\u76EE\u5F55\u4E0D\u80FD\u662F\u7B26\u53F7\u94FE\u63A5");
      }
      return new _LibraryDB(
        root,
        manifest.id,
        manifest.name,
        token,
        storageSchema.parse(manifest.storage ?? { mode: "local" })
      );
    } catch (e) {
      await unlink(lock);
      throw e;
    }
  }
  info() {
    return {
      id: this.id,
      name: this.name,
      path: this.root,
      available: true,
      storage: this.storage,
      count: Number(
        this.db.prepare("SELECT count(*) n FROM assets").get().n
      )
    };
  }
  assets() {
    return this.db.prepare("SELECT data FROM assets").all().map((r) => this.withCollections(JSON.parse(r.data)));
  }
  asset(id) {
    const row = this.db.prepare("SELECT data FROM assets WHERE id=?").get(id);
    if (!row) throw new Error("\u7D20\u6750\u4E0D\u5B58\u5728");
    return this.withCollections(JSON.parse(row.data));
  }
  withCollections(asset) {
    const collectionIds = this.db.prepare("SELECT collection_id FROM collection_assets WHERE asset_id=?").all(asset.id).map((r) => String(r.collection_id));
    return {
      ...asset,
      favorite: collectionIds.length > 0,
      collectionIds
    };
  }
  ensureDefaultCollection(migrateFavorites = false) {
    let row = this.db.prepare("SELECT id FROM collections WHERE is_default=1").get();
    if (!row) {
      row = this.db.prepare("SELECT id FROM collections WHERE name=?").get("\u9ED8\u8BA4\u6536\u85CF\u5939");
      if (row)
        this.db.prepare("UPDATE collections SET is_default=1 WHERE id=?").run(row.id);
      else {
        row = { id: randomUUID() };
        this.db.prepare(
          "INSERT INTO collections(id,name,created_at,is_default) VALUES(?,?,?,1)"
        ).run(row.id, "\u9ED8\u8BA4\u6536\u85CF\u5939", now());
      }
    }
    if (migrateFavorites)
      this.db.prepare(
        "INSERT OR IGNORE INTO collection_assets SELECT ?,id FROM assets WHERE json_extract(data,'$.favorite')=1"
      ).run(row.id);
    return String(row.id);
  }
  tags() {
    return this.db.prepare(
      `
      SELECT tag.value name, count(DISTINCT assets.id) count
      FROM assets, json_each(assets.data, '$.tags') tag
      WHERE tag.type = 'text' AND length(trim(tag.value)) > 0
      GROUP BY tag.value ORDER BY count DESC, tag.value
    `
    ).all().map((row) => ({
      libraryId: this.id,
      name: String(row.name),
      count: Number(row.count)
    }));
  }
  collections() {
    return this.db.prepare(
      "SELECT c.id,c.name,c.is_default,count(ca.asset_id) count FROM collections c LEFT JOIN collection_assets ca ON c.id=ca.collection_id GROUP BY c.id ORDER BY c.is_default DESC,c.created_at"
    ).all().map((r) => ({
      id: String(r.id),
      libraryId: this.id,
      name: String(r.name),
      count: Number(r.count),
      isDefault: !!r.is_default
    }));
  }
  hash(hash) {
    const row = this.db.prepare("SELECT data FROM assets WHERE hash=?").get(hash);
    return row ? JSON.parse(row.data) : void 0;
  }
  saveAsset(asset, hash) {
    if (hash)
      this.db.prepare("INSERT INTO assets VALUES(?,?,?)").run(asset.id, hash, JSON.stringify(asset));
    else
      this.db.prepare("UPDATE assets SET data=? WHERE id=?").run(JSON.stringify(asset), asset.id);
  }
  tasks() {
    return this.db.prepare("SELECT data FROM tasks").all().map((r) => JSON.parse(r.data));
  }
  saveTask(task) {
    task.updatedAt = now();
    this.db.prepare(
      "INSERT INTO tasks VALUES(?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data"
    ).run(task.id, JSON.stringify(task));
  }
  transaction(fn) {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const result = fn();
      this.db.exec("COMMIT");
      return result;
    } catch (e) {
      this.db.exec("ROLLBACK");
      throw e;
    }
  }
  notice(text) {
    this.db.prepare("INSERT INTO notices VALUES(?,?,?)").run(randomUUID(), text, now());
  }
  async close() {
    this.db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
    this.db.close();
    const lock = join(this.root, ".library-lock");
    try {
      const stored = JSON.parse(await readFile(lock, "utf8"));
      if (stored.token === this.lockToken) await unlink(lock);
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
  }
};

// src/host/ark.ts
var WorkError = class extends Error {
  constructor(message2, retryable = false, retryAfter = 0) {
    super(message2);
    this.retryable = retryable;
    this.retryAfter = retryAfter;
  }
};
var fingerprint = (s) => `${s.baseUrl.replace(/\/$/, "")}|${s.model}|${s.segmentSeconds}|v1`;
async function errorCode(response) {
  const reader = response.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let body = "", size = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > 16384) return;
      body += decoder.decode(chunk.value, { stream: true });
    }
    const value = JSON.parse(body + decoder.decode());
    return typeof value?.error?.code === "string" ? value.error.code : void 0;
  } catch {
    return;
  } finally {
    await reader.cancel().catch(() => {
    });
    reader.releaseLock();
  }
}
function errorMessage(status, code) {
  switch (code) {
    case "ModelNotOpen":
      return "\u5F53\u524D\u8D26\u53F7\u5C1A\u672A\u5F00\u901A\u6B64\u5D4C\u5165\u6A21\u578B\uFF0C\u8BF7\u5728\u706B\u5C71\u65B9\u821F\u300C\u5F00\u901A\u7BA1\u7406\u300D\u4E2D\u5F00\u901A\u540E\u91CD\u8BD5";
    case "InvalidEndpointOrModel.NotFound":
      return "\u6A21\u578B\u6216\u63A5\u5165\u70B9\u4E0D\u5B58\u5728\uFF0C\u6216\u5F53\u524D\u5BC6\u94A5\u65E0\u6743\u8BBF\u95EE\uFF0C\u8BF7\u68C0\u67E5\u6A21\u578B ID \u4E0E\u6A21\u578B\u6743\u9650";
    case "InvalidEndpointOrModel.ModelIDAccessDisabled":
      return "\u5F53\u524D\u8D26\u53F7\u4E0D\u652F\u6301\u76F4\u63A5\u4F7F\u7528\u6A21\u578B ID\uFF0C\u8BF7\u586B\u5199\u6709\u6743\u9650\u7684\u63A8\u7406\u63A5\u5165\u70B9 ID";
    case "PathNotFound":
    case "InvalidAction":
      return "\u706B\u5C71 API \u8DEF\u5F84\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5 API \u5730\u5740\uFF0C\u5E94\u586B\u5199\u5230 /api/v3";
    case "UnsupportedModel":
      return "\u5F53\u524D\u6A21\u578B\u4E0D\u652F\u6301\u6B64\u5957\u9910\uFF0C\u8BF7\u4F7F\u7528\u652F\u6301\u5D4C\u5165\u6A21\u578B\u7684\u706B\u5C71\u65B9\u821F API Key";
    case "AccountOverdueError":
      return "\u706B\u5C71\u8D26\u53F7\u6B20\u8D39\u6216\u5C1A\u672A\u5F00\u901A\u5BF9\u5E94\u8BA1\u8D39\u9879\uFF0C\u8BF7\u68C0\u67E5\u8D26\u53F7\u72B6\u6001";
    case "InvalidEndpoint.ClosedEndpoint":
      return "\u63A8\u7406\u63A5\u5165\u70B9\u5DF2\u5173\u95ED\u6216\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u68C0\u67E5\u63A5\u5165\u70B9\u72B6\u6001";
  }
  if (status === 401) return "API Key \u65E0\u6548\u6216\u5DF2\u5931\u6548\uFF0C\u8BF7\u68C0\u67E5\u5BC6\u94A5";
  if (status === 403) return "\u706B\u5C71\u62D2\u7EDD\u8BBF\u95EE\uFF0C\u8BF7\u68C0\u67E5\u5BC6\u94A5\u6743\u9650\u4E0E\u8D26\u53F7\u72B6\u6001";
  if (status === 404)
    return "\u672A\u627E\u5230\u6A21\u578B\u6216\u63A5\u53E3\uFF0C\u8BF7\u68C0\u67E5 API \u5730\u5740\u3001\u6A21\u578B ID \u548C\u6A21\u578B\u5F00\u901A\u72B6\u6001\uFF08HTTP 404\uFF09";
  return `\u706B\u5C71\u670D\u52A1\u8FD4\u56DE HTTP ${status}${status === 429 || status >= 500 ? "\uFF0C\u7A0D\u540E\u53EF\u91CD\u8BD5" : "\uFF0C\u8BF7\u68C0\u67E5\u6A21\u578B\u548C\u8F93\u5165\u683C\u5F0F"}`;
}
async function embed(settings, key, input, signal, fetcher = fetch) {
  if (!key) throw new WorkError("\u5C1A\u672A\u914D\u7F6E\u706B\u5C71 API Key\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u4FDD\u5B58\u540E\u91CD\u8BD5");
  const url = new URL(
    settings.baseUrl.replace(/\/$/, "") + "/embeddings/multimodal"
  );
  if (url.protocol !== "https:") throw new WorkError("API \u5730\u5740\u5FC5\u987B\u4F7F\u7528 HTTPS");
  let response;
  try {
    response = await fetcher(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key}`
      },
      redirect: "error",
      signal: AbortSignal.any([signal, AbortSignal.timeout(6e4)]),
      body: JSON.stringify({
        model: settings.model,
        encoding_format: "float",
        input: [
          "text" in input ? { type: "text", text: input.text } : { type: "image_url", image_url: { url: input.image } }
        ]
      })
    });
  } catch (e) {
    signal.throwIfAborted();
    throw new WorkError(
      "\u706B\u5C71\u8BF7\u6C42\u8D85\u65F6\u6216\u7F51\u7EDC\u4E0D\u53EF\u7528\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u548C API \u5730\u5740",
      true
    );
  }
  if (!response.ok) {
    const retryable = response.status === 429 || response.status >= 500;
    const retryHeader = response.headers.get("retry-after") ?? "0";
    const retryMillis = /^\d+(\.\d+)?$/.test(retryHeader) ? Number(retryHeader) * 1e3 : Date.parse(retryHeader) - Date.now();
    const retryAfter = Math.min(
      12e4,
      Math.max(0, Number.isFinite(retryMillis) ? retryMillis : 0)
    );
    const code = await errorCode(response);
    signal.throwIfAborted();
    throw new WorkError(
      errorMessage(response.status, code),
      retryable,
      retryAfter
    );
  }
  const value = await response.json().catch(() => {
    throw new WorkError("\u706B\u5C71\u8FD4\u56DE\u683C\u5F0F\u65E0\u6548\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5", true);
  });
  const vector = Array.isArray(value.data) ? value.data[0]?.embedding : value.data?.embedding;
  if (!Array.isArray(vector) || vector.length < 2 || vector.length > 65536 || vector.some((n) => typeof n !== "number" || !Number.isFinite(n)))
    throw new WorkError("\u706B\u5C71\u8FD4\u56DE\u4E86\u65E0\u6548\u5411\u91CF\uFF0C\u8BF7\u68C0\u67E5\u6A21\u578B\u7C7B\u578B");
  const norm = Math.sqrt(vector.reduce((s, n) => s + n * n, 0));
  if (!norm || !Number.isFinite(norm))
    throw new WorkError("\u706B\u5C71\u8FD4\u56DE\u4E86\u96F6\u5411\u91CF\u6216\u65E0\u6548\u5411\u91CF");
  return vector.map((n) => n / norm);
}
function similarity(a, b) {
  if (a.length !== b.length) return -1;
  return a.reduce((s, n, i) => s + n * b[i], 0);
}

// src/host/media.ts
import ffmpeg from "@ffmpeg-installer/ffmpeg";
import ffprobe from "@ffprobe-installer/ffprobe";
import { spawn } from "node:child_process";
import { mkdir as mkdir2, readFile as readFile2, stat, chmod, access } from "node:fs/promises";
import { join as join2 } from "node:path";
var mediaTypes = {
  ".jpg": { mime: "image/jpeg", kind: "image" },
  ".jpeg": { mime: "image/jpeg", kind: "image" },
  ".png": { mime: "image/png", kind: "image" },
  ".webp": { mime: "image/webp", kind: "image" },
  ".mp4": { mime: "video/mp4", kind: "video" },
  ".mov": { mime: "video/quicktime", kind: "video" },
  ".mkv": { mime: "video/x-matroska", kind: "video" },
  ".webm": { mime: "video/webm", kind: "video" }
};
async function run(binary, args, signal) {
  const bundled = binary === "ffmpeg" ? ffmpeg.path : binary === "ffprobe" ? ffprobe.path : void 0;
  if (bundled && process.platform !== "win32") {
    try {
      await access(bundled, 1);
    } catch {
      await chmod(bundled, (await stat(bundled)).mode | 64);
    }
  }
  return new Promise((resolve2, reject) => {
    const executable = binary === "ffmpeg" ? ffmpeg.path : binary === "ffprobe" ? ffprobe.path : binary;
    const child = spawn(executable, args, {
      windowsHide: true,
      signal: AbortSignal.any([signal, AbortSignal.timeout(12e4)]),
      stdio: ["ignore", "pipe", "pipe"]
    });
    let out = "", err = "";
    child.stdout.on("data", (d) => {
      out += d;
      if (out.length > 1024 * 1024) child.kill();
    });
    child.stderr.on("data", (d) => {
      err = (err + d).slice(-4e3);
    });
    child.on(
      "error",
      (e) => reject(
        e.code === "ENOENT" ? new WorkError(
          `\u627E\u4E0D\u5230 ${binary}\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u6307\u5B9A FFmpeg / FFprobe \u8DEF\u5F84`
        ) : e
      )
    );
    child.on(
      "close",
      (code) => code === 0 ? resolve2(out) : reject(
        new WorkError("\u5A92\u4F53\u65E0\u6CD5\u5904\u7406\uFF1A\u6587\u4EF6\u53EF\u80FD\u635F\u574F\u3001\u683C\u5F0F\u4E0D\u53D7\u652F\u6301\u6216\u5904\u7406\u8D85\u65F6")
      )
    );
  });
}
async function prepare(root, asset, settings, signal) {
  const original = safePath(root, asset.relativePath), folder = join2(root, "previews", asset.id);
  await mkdir2(folder, { recursive: true });
  if (asset.kind === "image") {
    const path = `previews/${asset.id}/cover.jpg`;
    try {
      await run(
        settings.ffmpegPath,
        [
          "-nostdin",
          "-v",
          "error",
          "-y",
          "-i",
          original,
          "-frames:v",
          "1",
          "-vf",
          "scale=1024:1024:force_original_aspect_ratio=decrease",
          safePath(root, path)
        ],
        signal
      );
      return {
        segments: [
          { index: 0, start: null, end: null, path, mime: "image/jpeg" }
        ],
        duration: null,
        thumbnail: path
      };
    } catch (e) {
      signal.throwIfAborted();
      if (e instanceof WorkError && e.message.startsWith("\u627E\u4E0D\u5230 ") && (await stat(original)).size <= 10 * 1024 ** 2)
        return {
          segments: [
            {
              index: 0,
              start: null,
              end: null,
              path: asset.relativePath,
              mime: asset.mime
            }
          ],
          duration: null,
          thumbnail: asset.relativePath
        };
      throw e;
    }
  }
  const probe = JSON.parse(
    await run(
      settings.ffprobePath,
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "json",
        original
      ],
      signal
    )
  );
  const duration = Number(probe.format?.duration);
  if (!Number.isFinite(duration) || duration <= 0)
    throw new WorkError("\u65E0\u6CD5\u8BFB\u53D6\u89C6\u9891\u65F6\u957F");
  if (Math.ceil(duration / settings.segmentSeconds) > 2e3)
    throw new WorkError("\u89C6\u9891\u7247\u6BB5\u8D85\u8FC7 2000 \u4E2A\uFF0C\u8BF7\u589E\u5927\u7247\u6BB5\u957F\u5EA6\u540E\u91CD\u8BD5");
  const segments = [];
  for (let start = 0, index = 0; start < duration; start += settings.segmentSeconds, index++) {
    signal.throwIfAborted();
    const end = Math.min(duration, start + settings.segmentSeconds), path = `previews/${asset.id}/${index}.jpg`;
    await run(
      settings.ffmpegPath,
      [
        "-nostdin",
        "-v",
        "error",
        "-y",
        "-ss",
        String((start + end) / 2),
        "-i",
        original,
        "-frames:v",
        "1",
        "-vf",
        "scale=1024:1024:force_original_aspect_ratio=decrease",
        safePath(root, path)
      ],
      signal
    );
    segments.push({ index, start, end, path, mime: "image/jpeg" });
  }
  return { segments, duration, thumbnail: segments[0].path };
}
async function imageData(root, s) {
  const b = await readFile2(safePath(root, s.path));
  if (b.length > 10 * 1024 ** 2)
    throw new WorkError("\u56FE\u7247\u8D85\u8FC7 10 MB\uFF0C\u8BF7\u914D\u7F6E FFmpeg \u751F\u6210\u8F83\u5C0F\u9884\u89C8");
  return `data:${s.mime};base64,${b.toString("base64")}`;
}

// src/host/objects.ts
import {
  S3Client,
  GetObjectCommand,
  HeadBucketCommand
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream, createWriteStream } from "node:fs";
import { mkdir as mkdir3, rename as rename2, unlink as unlink2, lstat as lstat2, stat as stat2 } from "node:fs/promises";
import { dirname } from "node:path";
import { pipeline } from "node:stream/promises";
import { createHash, randomUUID as randomUUID2 } from "node:crypto";
function connectionId(c) {
  return createHash("sha256").update(JSON.stringify([c.endpoint.replace(/\/$/, ""), c.region, c.bucket])).digest("hex");
}
function validateS3(c) {
  if (!c.bucket || !/^[a-zA-Z0-9][a-zA-Z0-9._-]{1,254}$/.test(c.bucket))
    throw new WorkError("\u8BF7\u586B\u5199\u6709\u6548\u7684 S3 Bucket");
  if (c.endpoint) {
    const u = new URL(c.endpoint);
    if (u.username || u.password || u.search || u.hash || !["http:", "https:"].includes(u.protocol))
      throw new WorkError(
        "S3 Endpoint \u53EA\u80FD\u662F HTTP(S) \u5730\u5740\uFF0C\u4E0D\u80FD\u5305\u542B\u51ED\u636E\u6216\u67E5\u8BE2\u53C2\u6570"
      );
    if (u.protocol === "http:" && !["localhost", "127.0.0.1", "[::1]"].includes(u.hostname))
      throw new WorkError("\u8FDC\u7A0B S3 Endpoint \u5FC5\u987B\u4F7F\u7528 HTTPS");
  }
  if (c.prefix.split("/").some((x) => x === "." || x === "..") || c.prefix.includes("\\"))
    throw new WorkError("S3 \u524D\u7F00\u4E0D\u5408\u6CD5");
}
function remoteError(e) {
  const code = e.$metadata?.httpStatusCode;
  if (code === 401 || code === 403)
    throw new WorkError("S3 \u8BBF\u95EE\u88AB\u62D2\u7EDD\uFF0C\u8BF7\u68C0\u67E5\u5BC6\u94A5\u548C Bucket \u8BFB\u5199\u6743\u9650");
  if (code === 404)
    throw new WorkError("S3 \u4E2D\u627E\u4E0D\u5230\u7D20\u6750\u6216 Bucket\uFF0C\u8BF7\u68C0\u67E5\u5B58\u50A8\u914D\u7F6E");
  if (code === 429 || code && code >= 500 || ["TimeoutError", "RequestTimeout", "NetworkingError"].includes(
    e.name
  ) || ["ECONNREFUSED", "ECONNRESET", "ETIMEDOUT", "ENOTFOUND"].includes(
    e.code ?? ""
  ))
    throw new WorkError("S3 \u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u7A0D\u540E\u81EA\u52A8\u91CD\u8BD5", true);
  if (e.name === "AbortError") throw e;
  throw new WorkError("S3 \u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5 Endpoint\u3001\u533A\u57DF\u4E0E\u51ED\u636E");
}
var Objects = class {
  constructor(root, id, storage, credentials) {
    this.root = root;
    this.id = id;
    this.storage = storage;
    this.credentials = credentials;
  }
  async client() {
    if (this.storage.mode !== "s3") throw new WorkError("\u6B64\u5E93\u4F7F\u7528\u672C\u5730\u5B58\u50A8");
    const c = this.storage.s3;
    validateS3(c);
    const secret = await this.credentials?.readS3(connectionId(c));
    if (!secret)
      throw new WorkError("\u5C1A\u672A\u914D\u7F6E\u6B64 S3 \u8FDE\u63A5\u7684\u8BBF\u95EE\u5BC6\u94A5\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u914D\u7F6E");
    return new S3Client({
      region: c.region,
      ...c.endpoint ? { endpoint: c.endpoint } : {},
      forcePathStyle: c.forcePathStyle,
      credentials: secret,
      maxAttempts: 3,
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED"
    });
  }
  key(path) {
    safePath(this.root, path);
    const prefix = this.storage.mode === "s3" ? this.storage.s3.prefix.replace(/^\/+|\/+$/g, "") : "";
    return [prefix, this.id, path].filter(Boolean).join("/");
  }
  async test(signal) {
    const client = await this.client();
    try {
      await client.send(
        new HeadBucketCommand({
          Bucket: this.storage.mode === "s3" ? this.storage.s3.bucket : ""
        }),
        { abortSignal: signal }
      );
    } catch (e) {
      remoteError(e);
    } finally {
      client.destroy();
    }
  }
  async upload(path, signal, progress) {
    if (this.storage.mode !== "s3") return;
    const file = safePath(this.root, path);
    if (!(await lstat2(file)).isFile())
      throw new WorkError("\u7D20\u6750\u5FC5\u987B\u662F\u666E\u901A\u6587\u4EF6");
    const size = (await stat2(file)).size, client = await this.client();
    const body = createReadStream(file, { signal });
    const upload = new Upload({
      client,
      params: {
        Bucket: this.storage.s3.bucket,
        Key: this.key(path),
        Body: body,
        ContentLength: size
      },
      queueSize: 2,
      partSize: 8 * 1024 ** 2,
      leavePartsOnError: false
    });
    upload.on("httpUploadProgress", (e) => progress?.(e.loaded ?? 0, size));
    const abort = () => {
      void upload.abort().catch(() => {
      });
    };
    signal.addEventListener("abort", abort, { once: true });
    try {
      signal.throwIfAborted();
      await upload.done();
    } catch (e) {
      signal.throwIfAborted();
      remoteError(e);
    } finally {
      signal.removeEventListener("abort", abort);
      body.destroy();
      client.destroy();
    }
  }
  async stream(path, signal, range) {
    const file = safePath(this.root, path);
    if (!range) {
      try {
        const info = await lstat2(file);
        if (!info.isFile()) throw new WorkError("\u7D20\u6750\u5FC5\u987B\u662F\u666E\u901A\u6587\u4EF6");
        return { stream: createReadStream(file, { signal }), size: info.size };
      } catch (e) {
        if (e.code !== "ENOENT") throw e;
      }
    }
    if (this.storage.mode !== "s3") throw new WorkError("\u7D20\u6750\u6587\u4EF6\u4E0D\u5B58\u5728");
    const client = await this.client();
    try {
      const result = await client.send(
        new GetObjectCommand({
          Bucket: this.storage.s3.bucket,
          Key: this.key(path),
          Range: range
        }),
        { abortSignal: signal }
      );
      const stream = result.Body;
      if (!stream) throw new Error("empty body");
      stream.once("close", () => client.destroy());
      const size = result.ContentRange ? Number(result.ContentRange.split("/").pop()) : result.ContentLength ?? 0;
      return { stream, size };
    } catch (e) {
      client.destroy();
      signal.throwIfAborted();
      remoteError(e);
    }
  }
  async hydrate(path, signal) {
    const target = safePath(this.root, path);
    try {
      if (!(await lstat2(target)).isFile())
        throw new WorkError("\u7D20\u6750\u5FC5\u987B\u662F\u666E\u901A\u6587\u4EF6");
      return;
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
    const temp = target + "." + randomUUID2() + ".part";
    await mkdir3(dirname(target), { recursive: true });
    try {
      const { stream } = await this.stream(path, signal);
      await pipeline(
        stream,
        createWriteStream(temp, { flags: "wx", mode: 384 }),
        { signal }
      );
      await rename2(temp, target);
    } finally {
      await unlink2(temp).catch(() => {
      });
    }
  }
};

// src/host/transfers.ts
import { randomUUID as randomUUID3 } from "node:crypto";
import {
  mkdir as mkdir4,
  readFile as readFile3,
  writeFile as writeFile2,
  stat as stat3,
  open as open2,
  unlink as unlink3
} from "node:fs/promises";
import { join as join3 } from "node:path";
var Transfers = class {
  constructor(root, execute) {
    this.root = root;
    this.execute = execute;
  }
  rows = [];
  active;
  writes = Promise.resolve();
  closing = false;
  uploadLocks = /* @__PURE__ */ new Map();
  async init() {
    await mkdir4(this.root, { recursive: true });
    try {
      this.rows = transferSchema.array().parse(
        JSON.parse(await readFile3(join3(this.root, "jobs.json"), "utf8"))
      );
    } catch (e) {
      if (e.code !== "ENOENT")
        throw new WorkError("\u4F20\u8F93\u4EFB\u52A1\u8BB0\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u5DF2\u4FDD\u7559\u539F\u6587\u4EF6");
    }
    for (const row of this.rows)
      if (["running", "queued"].includes(row.status)) {
        row.status = "paused";
        row.error = "\u4E0A\u6B21\u4F20\u8F93\u4E2D\u65AD\uFF0C\u70B9\u51FB\u91CD\u8BD5\u7EE7\u7EED";
      }
    await this.save();
  }
  save() {
    const rows = structuredClone(this.rows);
    const next = this.writes.catch(() => {
    }).then(() => atomicJSON(join3(this.root, "jobs.json"), rows));
    this.writes = next;
    return next;
  }
  async add(input) {
    if (this.rows.filter((x) => ["queued", "running"].includes(x.status)).length >= 20)
      throw new WorkError("\u7B49\u5F85\u4E2D\u7684\u8FC1\u79FB\u4EFB\u52A1\u8FC7\u591A\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
    const row = {
      ...input,
      id: randomUUID3(),
      status: "queued",
      progress: 0,
      detail: "\u7B49\u5F85\u5904\u7406",
      error: null,
      updatedAt: now()
    };
    this.rows.unshift(row);
    await this.save();
    this.tick();
    return { id: row.id };
  }
  async control(r) {
    const row = this.rows.find((x) => x.id === r.id);
    if (!row) throw new WorkError("\u4F20\u8F93\u4EFB\u52A1\u4E0D\u5B58\u5728");
    if (r.action === "cancel") {
      if (row.status === "completed") throw new WorkError("\u4EFB\u52A1\u5DF2\u7ECF\u5B8C\u6210");
      row.status = "cancelled";
      if (this.active?.id === row.id) {
        this.active.abort.abort();
        await this.active.promise;
      }
    } else {
      if (["running", "queued", "completed"].includes(row.status))
        throw new WorkError("\u4EFB\u52A1\u6B63\u5728\u5904\u7406\u6216\u5DF2\u5B8C\u6210");
      row.status = "queued";
      row.error = null;
      row.progress = 0;
      row.acknowledged = false;
    }
    row.updatedAt = now();
    await this.save();
    this.tick();
    return { ok: true };
  }
  tick() {
    if (this.active || this.closing) return;
    const row = this.rows.find((x) => x.status === "queued");
    if (!row) return;
    const abort = new AbortController();
    row.status = "running";
    const promise = (async () => {
      try {
        await this.save();
        const result = await this.execute(row, abort.signal, (n, detail) => {
          row.progress = Math.min(99, Math.max(0, n));
          row.detail = detail;
        });
        row.result = result;
        row.status = "completed";
        row.progress = 100;
        row.detail = "\u5DF2\u5B8C\u6210";
        row.error = null;
      } catch (e) {
        if (abort.signal.aborted) {
          if (row.status !== "cancelled") row.status = "paused";
          row.error = row.status === "paused" ? "\u4F20\u8F93\u5DF2\u6682\u505C\uFF0C\u53EF\u91CD\u8BD5" : null;
        } else {
          row.status = "failed";
          const code = e.code;
          row.error = code === "ENOSPC" ? "\u78C1\u76D8\u7A7A\u95F4\u4E0D\u8DB3\uFF0C\u8BF7\u6E05\u7406\u7A7A\u95F4\u540E\u91CD\u8BD5" : code === "ENOENT" ? "\u6E90\u6587\u4EF6\u6216\u76EE\u6807\u6587\u4EF6\u5939\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u8DEF\u5F84" : ["EACCES", "EPERM"].includes(code ?? "") ? "\u6CA1\u6709\u6587\u4EF6\u8BBF\u95EE\u6743\u9650\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u5939\u6743\u9650" : e.name === "ZodError" ? "ZIP \u7D20\u6750\u76EE\u5F55\u4E0D\u7B26\u5408\u5F53\u524D\u683C\u5F0F\uFF0C\u8BF7\u68C0\u67E5\u5BFC\u51FA\u5305" : e instanceof Error ? e.message.slice(0, 300) : "\u4F20\u8F93\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5";
        }
      } finally {
        row.updatedAt = now();
        await this.save();
      }
    })().catch(() => {
      row.status = "failed";
      row.error = "\u4EFB\u52A1\u8BB0\u5F55\u65E0\u6CD5\u4FDD\u5B58\uFF0C\u8BF7\u68C0\u67E5\u78C1\u76D8\u7A7A\u95F4";
    }).finally(() => {
      this.active = void 0;
      this.tick();
    });
    this.active = { id: row.id, abort, promise };
  }
  async acknowledge(ids) {
    for (const row of this.rows)
      if (ids.includes("transfer-" + row.id)) row.acknowledged = true;
    await this.save();
  }
  archivePath(id) {
    if (!/^[a-f0-9-]{36}$/i.test(id)) throw new WorkError("ZIP \u4E0A\u4F20\u8EAB\u4EFD\u4E0D\u5408\u6CD5");
    return join3(this.root, id + ".zip");
  }
  async upload(r) {
    const id = r.id ?? randomUUID3();
    const previous = this.uploadLocks.get(id) ?? Promise.resolve();
    const action = previous.catch(() => {
    }).then(async () => {
      const path = this.archivePath(id), info = path + ".json";
      if (r.action === "begin") {
        if (!r.size) throw new WorkError("\u8BF7\u9009\u62E9 ZIP \u6587\u4EF6");
        await writeFile2(path, "", { flag: "wx", mode: 384 });
        await atomicJSON(info, { size: r.size });
        return { id, offset: 0 };
      }
      if (this.rows.some((x) => x.archiveId === id))
        throw new WorkError("ZIP \u5DF2\u52A0\u5165\u8FC1\u79FB\u961F\u5217");
      if (r.action === "cancel") {
        await unlink3(path).catch(() => {
        });
        await unlink3(info).catch(() => {
        });
        return { id, offset: 0 };
      }
      const { size } = JSON.parse(await readFile3(info, "utf8"));
      if (!r.data || !/^[A-Za-z0-9+/]*={0,2}$/.test(r.data))
        throw new WorkError("ZIP \u5206\u5757\u4E0D\u5408\u6CD5");
      const data = Buffer.from(r.data, "base64"), offset = (await stat3(path)).size;
      if (!data.length || data.length > 1024 ** 2 || r.offset === void 0)
        throw new WorkError("ZIP \u5206\u5757\u4E0D\u5408\u6CD5");
      const file = await open2(path, "r+");
      try {
        if (r.offset < offset) {
          const buffer = Buffer.alloc(data.length);
          await file.read(buffer, 0, data.length, r.offset);
          if (!buffer.equals(data)) throw new WorkError("ZIP \u91CD\u590D\u5206\u5757\u4E0D\u4E00\u81F4");
          return { id, offset };
        }
        if (r.offset !== offset || offset + data.length > size)
          throw new WorkError("ZIP \u5206\u5757\u504F\u79FB\u4E0D\u4E00\u81F4");
        await file.write(data, 0, data.length, offset);
        await file.sync();
        return { id, offset: offset + data.length };
      } finally {
        await file.close();
      }
    });
    this.uploadLocks.set(id, action);
    try {
      return await action;
    } finally {
      if (this.uploadLocks.get(id) === action) this.uploadLocks.delete(id);
    }
  }
  async ready(id) {
    const path = this.archivePath(id), { size } = JSON.parse(await readFile3(path + ".json", "utf8"));
    if ((await stat3(path)).size !== size)
      throw new WorkError("ZIP \u5C1A\u672A\u4E0A\u4F20\u5B8C\u6574");
  }
  async dispose() {
    this.closing = true;
    this.active?.abort.abort();
    await this.active?.promise;
    await this.writes;
    await Promise.allSettled(this.uploadLocks.values());
  }
};

// src/host/archive.ts
import { createReadStream as createReadStream2, createWriteStream as createWriteStream2 } from "node:fs";
import {
  mkdir as mkdir5,
  readFile as readFile4,
  writeFile as writeFile3,
  rm,
  stat as stat4,
  lstat as lstat3,
  link,
  unlink as unlink4,
  rename as rename3
} from "node:fs/promises";
import { join as join4, dirname as dirname2, isAbsolute as isAbsolute2 } from "node:path";
import { createHash as createHash2, randomUUID as randomUUID4 } from "node:crypto";
import { Transform } from "node:stream";
import { pipeline as pipeline2 } from "node:stream/promises";
import { ZipFile as Writer } from "yazl";
import { open as openZip } from "yauzl";
import { z as z2 } from "zod";
var filePath = z2.string().regex(/^(originals|previews)\/[a-zA-Z0-9._/-]+$/).refine((p) => !p.split("/").some((x) => !x || x === "." || x === ".."));
var identifier = z2.string().uuid();
var metadataSchema = z2.object({
  format: z2.literal("dsh-asset-library-zip"),
  version: z2.literal(1),
  name: z2.string().min(1).max(120),
  assets: z2.array(
    z2.object({
      asset: assetSchema.extend({
        id: identifier,
        relativePath: filePath,
        thumbnail: filePath.nullable()
      }),
      hash: z2.string().regex(/^[a-f0-9]{64}$/)
    })
  ),
  collections: z2.array(
    z2.object({
      id: identifier,
      name: z2.string().min(1).max(80),
      created_at: z2.string(),
      is_default: z2.number().int().min(0).max(1).default(0)
    })
  ),
  vectors: z2.array(
    z2.object({
      asset_id: identifier,
      segment: z2.number().int().nonnegative(),
      fingerprint: z2.string().max(2500),
      start: z2.number().nullable(),
      end: z2.number().nullable(),
      vector: z2.array(z2.number().finite()).min(2).max(65536)
    })
  ),
  files: z2.array(
    z2.object({
      path: filePath,
      size: z2.number().int().nonnegative().max(100 * 1024 ** 3),
      sha256: z2.string().regex(/^[a-f0-9]{64}$/)
    })
  )
});
async function digest(path, signal) {
  const hash = createHash2("sha256");
  for await (const data of createReadStream2(path, { signal }))
    hash.update(data);
  return hash.digest("hex");
}
async function exportArchive(lib, objects, destination, scratch, signal, report) {
  if (!isAbsolute2(destination))
    throw new WorkError("\u8BF7\u9009\u62E9\u5BFC\u51FA\u6587\u4EF6\u5939\u7684\u7EDD\u5BF9\u8DEF\u5F84");
  if (!(await stat4(destination)).isDirectory())
    throw new WorkError("\u5BFC\u51FA\u4F4D\u7F6E\u5FC5\u987B\u662F\u6587\u4EF6\u5939");
  const catalog = lib.transaction(() => ({
    format: "dsh-asset-library-zip",
    version: 1,
    name: lib.name,
    assets: lib.db.prepare("SELECT data,hash FROM assets").all().map((row) => ({
      asset: lib.asset(JSON.parse(String(row.data)).id),
      hash: String(row.hash)
    })),
    collections: lib.db.prepare("SELECT * FROM collections").all(),
    vectors: lib.db.prepare("SELECT * FROM vectors").all().map((row) => ({ ...row, vector: JSON.parse(String(row.vector)) })),
    files: []
  }));
  const paths = /* @__PURE__ */ new Set();
  for (const { asset } of catalog.assets) {
    paths.add(asset.relativePath);
    if (asset.thumbnail) paths.add(asset.thumbnail);
  }
  await mkdir5(scratch, { recursive: true });
  let done = 0;
  const filename = `${lib.name.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}-${randomUUID4().slice(0, 8)}.zip`;
  const result = join4(destination, filename), partial = result + ".part";
  try {
    for (const path of paths) {
      signal.throwIfAborted();
      filePath.parse(path);
      const target = safePath(scratch, path), hash = createHash2("sha256");
      await mkdir5(dirname2(target), { recursive: true });
      const source = await objects.stream(path, signal);
      let loaded = 0;
      const meter = new Transform({
        transform(chunk, _encoding, cb) {
          hash.update(chunk);
          loaded += chunk.length;
          report(
            Math.round(
              (done + Math.min(1, loaded / Math.max(1, source.size))) / Math.max(1, paths.size) * 75
            ),
            "\u6B63\u5728\u6536\u96C6\u7D20\u6750"
          );
          cb(null, chunk);
        }
      });
      await pipeline2(
        source.stream,
        meter,
        createWriteStream2(target, { flags: "wx", mode: 384 }),
        { signal }
      );
      const sha256 = hash.digest("hex");
      const original = catalog.assets.find(
        (x) => x.asset.relativePath === path
      );
      if (original && original.hash !== sha256)
        throw new WorkError(
          "\u539F\u6587\u4EF6\u6821\u9A8C\u5931\u8D25\uFF0C\u5BFC\u51FA\u5DF2\u505C\u6B62\uFF1A" + original.asset.name
        );
      catalog.files.push({ path, size: loaded, sha256 });
      done++;
    }
    const encoded = Buffer.from(JSON.stringify(metadataSchema.parse(catalog)));
    if (encoded.length > 64 * 1024 ** 2)
      throw new WorkError("\u5E93\u76EE\u5F55\u8D85\u8FC7\u5F53\u524D ZIP \u683C\u5F0F\u7684 64 MB \u4E0A\u9650");
    const zip = new Writer();
    zip.on(
      "error",
      (error) => zip.outputStream.destroy(error)
    );
    let zipped = 0;
    const expected = catalog.files.reduce((n, f) => n + f.size, encoded.length);
    const zipProgress = new Transform({
      transform(chunk, _encoding, cb) {
        zipped += chunk.length;
        report(
          80 + Math.min(19, Math.round(zipped / Math.max(1, expected) * 19)),
          "\u6B63\u5728\u5199\u5165 ZIP"
        );
        cb(null, chunk);
      }
    });
    const writing = pipeline2(
      zip.outputStream,
      zipProgress,
      createWriteStream2(partial, { flags: "wx", mode: 384 }),
      { signal }
    );
    writing.catch(() => {
    });
    for (const file of catalog.files)
      zip.addFile(safePath(scratch, file.path), file.path, { compress: false });
    zip.addBuffer(encoded, "catalog.json");
    report(80, "\u6B63\u5728\u5199\u5165 ZIP");
    zip.end({ forceZip64Format: true, comment: "" });
    await writing;
    signal.throwIfAborted();
    await link(partial, result);
    await unlink4(partial);
    return result;
  } finally {
    await rm(scratch, { recursive: true, force: true });
    await unlink4(partial).catch(() => {
    });
  }
}
async function extract(source, target, signal, report) {
  const zip = await new Promise(
    (resolve2, reject) => openZip(
      source,
      { lazyEntries: true, strictFileNames: true, validateEntrySizes: true },
      (e, zip2) => e ? reject(e) : resolve2(zip2)
    )
  );
  const names = /* @__PURE__ */ new Set();
  let bytes = 0, count = 0;
  return new Promise((resolve2, reject) => {
    let settled = false, working;
    const fail = (error) => {
      if (settled) return;
      settled = true;
      zip.close();
      signal.removeEventListener("abort", abort);
      void Promise.resolve(working).catch(() => {
      }).then(() => reject(error));
    };
    const abort = () => fail(signal.reason);
    signal.addEventListener("abort", abort, { once: true });
    zip.on("error", fail);
    zip.on("end", () => {
      if (settled) return;
      settled = true;
      signal.removeEventListener("abort", abort);
      resolve2(names);
    });
    zip.on("entry", (entry) => {
      working = (async () => {
        signal.throwIfAborted();
        const name2 = entry.fileName, mode = entry.externalFileAttributes >>> 16 & 61440;
        if (mode && mode !== 32768 || entry.isEncrypted() || name2 !== "catalog.json" && !filePath.safeParse(name2).success)
          throw new WorkError("ZIP \u5305\u542B\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u8DEF\u5F84\u6216\u94FE\u63A5");
        if (names.has(name2.toLocaleLowerCase()))
          throw new WorkError("ZIP \u4E2D\u6709\u91CD\u590D\u8DEF\u5F84");
        names.add(name2.toLocaleLowerCase());
        bytes += entry.uncompressedSize;
        if (++count > 2e5 || bytes > 1024 ** 4 || name2 === "catalog.json" && entry.uncompressedSize > 64 * 1024 ** 2 || entry.uncompressedSize > 100 * 1024 ** 3)
          throw new WorkError("ZIP \u8D85\u8FC7\u652F\u6301\u7684\u5BFC\u5165\u5927\u5C0F");
        const path = safePath(target, name2);
        await mkdir5(dirname2(path), { recursive: true });
        signal.throwIfAborted();
        const input = await new Promise(
          (res, rej) => zip.openReadStream(
            entry,
            (e, stream) => e ? rej(e) : res(stream)
          )
        );
        await pipeline2(
          input,
          createWriteStream2(path, { flags: "wx", mode: 384 }),
          { signal }
        );
        report(
          Math.round(count / Math.max(1, zip.entryCount) * 65),
          "\u6B63\u5728\u89E3\u538B\u7D20\u6750"
        );
        if (!settled) zip.readEntry();
      })();
      void working.catch(fail);
    });
    if (signal.aborted) abort();
    else zip.readEntry();
  });
}
async function importArchive(source, destination, storage, signal, report, operationId) {
  if (!isAbsolute2(destination)) throw new WorkError("\u8BF7\u9009\u62E9\u65B0\u5E93\u7684\u7EDD\u5BF9\u8DEF\u5F84");
  if (operationId) {
    try {
      const previous = JSON.parse(
        await readFile4(join4(destination, "library.json"), "utf8")
      );
      if (previous.importOperation === operationId && typeof previous.id === "string")
        return previous.id;
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
  }
  try {
    await lstat3(destination);
    throw new WorkError("\u5BFC\u5165\u9700\u8981\u65B0\u7684\u6587\u4EF6\u5939\uFF0C\u8BF7\u586B\u5199\u5C1A\u4E0D\u5B58\u5728\u7684\u5B50\u6587\u4EF6\u5939");
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
  }
  await mkdir5(dirname2(destination), { recursive: true });
  const scratch = join4(dirname2(destination), ".asset-import-" + randomUUID4());
  await mkdir5(scratch, { mode: 448 });
  let lib;
  try {
    const names = await extract(source, scratch, signal, report);
    const catalog = metadataSchema.parse(
      JSON.parse(await readFile4(join4(scratch, "catalog.json"), "utf8"))
    );
    if (names.size !== catalog.files.length + 1 || new Set(catalog.files.map((f) => f.path.toLowerCase())).size !== catalog.files.length)
      throw new WorkError("ZIP \u6587\u4EF6\u6E05\u5355\u4E0D\u5B8C\u6574\u6216\u91CD\u590D");
    const files = new Map(catalog.files.map((f) => [f.path, f]));
    for (const [index, file] of catalog.files.entries()) {
      if (!names.has(file.path.toLowerCase()) || (await stat4(safePath(scratch, file.path))).size !== file.size || await digest(safePath(scratch, file.path), signal) !== file.sha256)
        throw new WorkError("ZIP \u7D20\u6750\u6821\u9A8C\u5931\u8D25");
      report(
        65 + Math.round((index + 1) / Math.max(1, catalog.files.length) * 25),
        "\u6B63\u5728\u6821\u9A8C\u7D20\u6750"
      );
    }
    const assets = new Set(catalog.assets.map((x) => x.asset.id));
    const collections = new Set(catalog.collections.map((x) => x.id));
    if (assets.size !== catalog.assets.length || collections.size !== catalog.collections.length)
      throw new WorkError("ZIP \u76EE\u5F55\u5B58\u5728\u91CD\u590D\u8EAB\u4EFD");
    for (const { asset, hash } of catalog.assets) {
      if (files.get(asset.relativePath)?.sha256 !== hash || files.get(asset.relativePath)?.size !== asset.size || asset.thumbnail && !files.has(asset.thumbnail) || asset.collectionIds.some((id2) => !collections.has(id2)))
        throw new WorkError("ZIP \u7D20\u6750\u76EE\u5F55\u4E0E\u6587\u4EF6\u4E0D\u4E00\u81F4");
    }
    if (catalog.vectors.some((v) => !assets.has(v.asset_id)))
      throw new WorkError("ZIP \u7D22\u5F15\u7F3A\u5C11\u5BF9\u5E94\u7D20\u6750");
    const id = randomUUID4();
    await writeFile3(
      join4(scratch, "library.json"),
      JSON.stringify({
        format: "dsh-asset-library",
        version: storage.mode === "s3" ? 2 : 1,
        id,
        name: catalog.name,
        storage,
        importOperation: operationId
      }),
      { mode: 384 }
    );
    lib = await LibraryDB.open(scratch);
    const db = lib;
    db.transaction(() => {
      db.db.exec("DELETE FROM collections");
      for (const c of catalog.collections)
        db.db.prepare(
          "INSERT INTO collections(id,name,created_at,is_default) VALUES(?,?,?,?)"
        ).run(c.id, c.name, c.created_at, c.is_default);
      for (const { asset, hash } of catalog.assets) {
        db.saveAsset({ ...asset, libraryId: id }, hash);
        for (const c of asset.collectionIds)
          db.db.prepare("INSERT INTO collection_assets VALUES(?,?)").run(c, asset.id);
        if (storage.mode === "s3" || asset.status !== "ready")
          db.saveTask({
            id: randomUUID4(),
            libraryId: id,
            assetId: asset.id,
            name: asset.name,
            stage: "preview",
            status: storage.mode === "s3" ? "queued" : "paused",
            progress: 0,
            attempts: 0,
            error: null,
            nextRunAt: 0,
            updatedAt: now()
          });
      }
      db.ensureDefaultCollection(
        !catalog.collections.some((c) => c.is_default)
      );
      for (const v of catalog.vectors)
        db.db.prepare("INSERT INTO vectors VALUES(?,?,?,?,?,?)").run(
          v.asset_id,
          v.segment,
          v.fingerprint,
          v.start,
          v.end,
          JSON.stringify(v.vector)
        );
    });
    await lib.close();
    lib = void 0;
    await unlink4(join4(scratch, "catalog.json"));
    signal.throwIfAborted();
    try {
      await lstat3(destination);
      throw new WorkError("\u76EE\u6807\u6587\u4EF6\u5939\u5DF2\u7ECF\u5B58\u5728\uFF0C\u8BF7\u66F4\u6362\u4F4D\u7F6E");
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
    await rename3(scratch, destination);
    return id;
  } finally {
    if (lib) await lib.close();
    await rm(scratch, { recursive: true, force: true });
  }
}

// src/host/service.ts
var defaults = {
  baseUrl: "https://ark.cn-beijing.volces.com/api/v3",
  model: "doubao-embedding-vision-251215",
  concurrency: 2,
  maxRetries: 3,
  segmentSeconds: 10,
  ffmpegPath: "ffmpeg",
  ffprobePath: "ffprobe",
  storageMode: "local",
  localDirectory: "",
  s3: {
    endpoint: "",
    region: "us-east-1",
    bucket: "",
    prefix: "asset-library",
    forcePathStyle: true
  }
};
var LibraryService = class {
  constructor(dataDir, credentials, fetcher = fetch) {
    this.dataDir = dataDir;
    this.credentials = credentials;
    this.fetcher = fetcher;
    this.transfers = new Transfers(
      join5(dataDir, "transfers"),
      async (job, signal, report) => {
        if (job.kind === "export") {
          const lib = this.get(job.libraryId);
          this.exporting.add(lib.id);
          try {
            await this.stopLibrary(lib.id);
            return await exportArchive(
              lib,
              this.objects(lib),
              job.path,
              join5(dataDir, "transfer-" + job.id + "-" + randomUUID5()),
              signal,
              report
            );
          } finally {
            this.exporting.delete(lib.id);
            this.tick();
          }
        }
        await importArchive(
          this.transfers.archivePath(job.archiveId),
          job.path,
          job.storage ?? { mode: "local" },
          signal,
          report,
          job.id
        );
        const result = await this.library({ action: "open", path: job.path });
        return result.id;
      }
    );
  }
  state = { version: 1, libraries: [], settings: defaults };
  libraries = /* @__PURE__ */ new Map();
  errors = /* @__PURE__ */ new Map();
  running = /* @__PURE__ */ new Map();
  locked = /* @__PURE__ */ new Map();
  closed = false;
  faulted = /* @__PURE__ */ new Set();
  exporting = /* @__PURE__ */ new Set();
  timer;
  queryCache = /* @__PURE__ */ new Map();
  transfers;
  objects(lib) {
    return new Objects(
      lib.root,
      lib.id,
      lib.storage,
      this.credentials.readS3 ? this.credentials : void 0
    );
  }
  async selectedStorage(mode) {
    if (mode === "local") return { mode };
    const s3 = { ...this.state.settings.s3 };
    validateS3(s3);
    if (!await this.credentials.readS3?.(connectionId(s3)))
      throw new WorkError("\u8BF7\u5148\u5728 DSH \u8BBE\u7F6E \u2192 \u7D20\u6750\u5E93\u4E2D\u914D\u7F6E S3 \u8FDE\u63A5\u4E0E\u5BC6\u94A5");
    return { mode, s3 };
  }
  async init() {
    await mkdir6(this.dataDir, { recursive: true });
    try {
      this.state = JSON.parse(
        await readFile5(join5(this.dataDir, "settings.json"), "utf8")
      );
      if (this.state.version !== 1 || !Array.isArray(this.state.libraries))
        throw new Error("\u7248\u672C\u4E0D\u53D7\u652F\u6301");
      this.state.settings = settingsSchema.parse(this.state.settings);
    } catch (e) {
      if (e.code !== "ENOENT")
        throw new Error("\u672C\u673A\u7D20\u6750\u5E93\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u539F\u6587\u4EF6\u5DF2\u4FDD\u7559");
    }
    for (const row of this.state.libraries) {
      try {
        const lib = await LibraryDB.open(row.path);
        if (lib.id !== row.id) {
          await lib.close();
          throw new Error("\u6587\u4EF6\u5939\u4E2D\u7684\u5E93\u8EAB\u4EFD\u5DF2\u6539\u53D8");
        }
        this.libraries.set(lib.id, lib);
      } catch (e) {
        this.errors.set(row.id, message(e));
      }
    }
    await this.transfers.init();
    this.timer = setInterval(() => this.tick(), 800);
    this.timer.unref();
    this.tick();
  }
  save() {
    return atomicJSON(join5(this.dataDir, "settings.json"), this.state);
  }
  get(id) {
    const lib = this.libraries.get(id);
    if (!lib) throw new WorkError("\u7D20\u6750\u5E93\u672A\u6253\u5F00\uFF0C\u8BF7\u68C0\u67E5\u5E93\u7684\u4F4D\u7F6E");
    return lib;
  }
  async exclusive(key, fn) {
    const before = this.locked.get(key) ?? Promise.resolve();
    const next = before.catch(() => {
    }).then(fn);
    this.locked.set(key, next);
    try {
      return await next;
    } finally {
      if (this.locked.get(key) === next) this.locked.delete(key);
    }
  }
  async dispatch(method, raw, signal) {
    signal.throwIfAborted();
    if (this.closed) throw new WorkError("\u63D2\u4EF6\u6B63\u5728\u5173\u95ED");
    const request = endpoints[method].input.parse(raw);
    const fn = this[method];
    return endpoints[method].output.parse(
      await fn.call(this, request, signal)
    );
  }
  async snapshot() {
    return {
      libraries: this.state.libraries.map(
        (row) => (this.faulted.has(row.id) ? void 0 : this.libraries.get(row.id)?.info()) ?? {
          ...row,
          available: false,
          count: 0,
          error: this.errors.get(row.id) ?? "\u5E93\u4E0D\u53EF\u7528",
          storage: { mode: "local" }
        }
      ),
      tasks: [...this.libraries.values()].flatMap((l) => l.tasks()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 500),
      keyConfigured: !!await this.credentials.read(),
      s3Configured: !!await this.credentials.readS3?.(
        connectionId(this.state.settings.s3)
      ),
      transfers: structuredClone(this.transfers.rows),
      settings: { ...this.state.settings },
      collections: [...this.libraries.values()].flatMap((l) => l.collections()),
      tags: [...this.libraries.values()].flatMap((l) => l.tags()),
      notices: [...this.libraries.values()].flatMap(
        (l) => l.db.prepare(
          "SELECT * FROM notices ORDER BY createdAt DESC LIMIT 100"
        ).all()
      ).concat(
        this.transfers.rows.filter(
          (j) => !j.acknowledged && ["completed", "failed"].includes(j.status)
        ).map((j) => ({
          id: "transfer-" + j.id,
          text: `${j.kind === "export" ? "\u5BFC\u51FA" : "\u5BFC\u5165"}${j.status === "completed" ? "\u5B8C\u6210" : "\u5931\u8D25"}\uFF1A${j.name}${j.error ? "\u3002" + j.error : ""}`,
          createdAt: j.updatedAt
        }))
      )
    };
  }
  async library(r) {
    return this.exclusive("registry", async () => {
      if (r.action === "close") {
        if (!r.id) throw new WorkError("\u8BF7\u9009\u62E9\u7D20\u6750\u5E93");
        if (this.transfers.rows.some(
          (j) => j.libraryId === r.id && ["running", "queued"].includes(j.status)
        ))
          throw new WorkError("\u8BF7\u7B49\u5F85\u5BFC\u51FA\u5B8C\u6210\u6216\u5728\u4EFB\u52A1\u4E2D\u5FC3\u53D6\u6D88\u540E\u518D\u5173\u95ED\u7D20\u6750\u5E93");
        await this.exclusive("library:" + r.id, async () => {
          await this.stopLibrary(r.id);
          const lib2 = this.libraries.get(r.id);
          if (lib2) await lib2.close();
          this.libraries.delete(r.id);
        });
        this.state.libraries = this.state.libraries.filter(
          (x) => x.id !== r.id
        );
        await this.save();
        return { ok: true };
      }
      if (!r.path) throw new WorkError("\u8BF7\u9009\u62E9\u5E93\u6587\u4EF6\u5939");
      const existing = this.state.libraries.find(
        (x) => x.path === r.path && this.libraries.has(x.id)
      );
      if (existing) return { ok: true, id: existing.id };
      const lib = await LibraryDB.open(
        r.path,
        r.action === "create" ? r.name ?? "\u7D20\u6750\u5E93" : void 0,
        r.action === "create" ? await this.selectedStorage(
          r.storageMode ?? this.state.settings.storageMode
        ) : void 0
      );
      if (this.libraries.has(lib.id)) {
        await lib.close();
        throw new WorkError("\u540C\u4E00\u4E2A\u5E93\u5DF2\u6253\u5F00\uFF0C\u8BF7\u5148\u5173\u95ED\u65E7\u4F4D\u7F6E\u518D\u6253\u5F00\u526F\u672C");
      }
      this.libraries.set(lib.id, lib);
      this.errors.delete(lib.id);
      this.faulted.delete(lib.id);
      this.state.libraries = this.state.libraries.filter(
        (x) => x.id !== lib.id
      );
      this.state.libraries.push({ id: lib.id, name: lib.name, path: lib.root });
      await this.save();
      this.tick();
      return { ok: true, id: lib.id };
    });
  }
  async saveSettings(r) {
    return this.exclusive("registry", async () => {
      const settings = settingsSchema.parse(r);
      if (settings.localDirectory && !isAbsolute3(settings.localDirectory))
        throw new WorkError("\u7D20\u6750\u5E93\u9ED8\u8BA4\u4F4D\u7F6E\u9700\u8981\u7EDD\u5BF9\u6587\u4EF6\u5939\u8DEF\u5F84");
      if (new URL(settings.baseUrl).protocol !== "https:")
        throw new WorkError("API \u5730\u5740\u5FC5\u987B\u4F7F\u7528 HTTPS");
      if (r.clearKey) await this.credentials.clear();
      else if (r.apiKey?.trim()) await this.credentials.write(r.apiKey.trim());
      if (settings.s3.bucket) validateS3(settings.s3);
      if (r.clearS3)
        await this.credentials.clearS3?.(connectionId(settings.s3));
      else if (r.accessKeyId?.trim() || r.secretAccessKey?.trim()) {
        if (!r.accessKeyId?.trim() || !r.secretAccessKey?.trim())
          throw new WorkError("\u8BF7\u540C\u65F6\u586B\u5199 Access Key ID \u548C Secret Access Key");
        validateS3(settings.s3);
        if (!this.credentials.writeS3)
          throw new WorkError("\u5F53\u524D\u5BBF\u4E3B\u4E0D\u652F\u6301 S3 \u51ED\u636E\u5B58\u50A8");
        await this.credentials.writeS3(connectionId(settings.s3), {
          accessKeyId: r.accessKeyId.trim(),
          secretAccessKey: r.secretAccessKey.trim(),
          ...r.sessionToken?.trim() ? { sessionToken: r.sessionToken.trim() } : {}
        });
      }
      this.state.settings = settings;
      this.queryCache.clear();
      await this.save();
      return { ok: true };
    });
  }
  async testConnection(_r, signal) {
    const vector = await embed(
      this.state.settings,
      await this.credentials.read(),
      { text: "\u7D20\u6750\u5E93\u8FDE\u63A5\u6D4B\u8BD5" },
      signal,
      this.fetcher
    );
    return { dimensions: vector.length };
  }
  async testS3(_r, signal) {
    const storage = await this.selectedStorage("s3");
    await new Objects(
      this.dataDir,
      "connection-test",
      storage,
      this.credentials
    ).test(signal);
    return { ok: true };
  }
  archiveUpload(r) {
    return this.transfers.upload(r);
  }
  transfer(r) {
    return this.transfers.control(r);
  }
  async startTransfer(r) {
    if (r.kind === "export") {
      if (!r.libraryId) throw new WorkError("\u8BF7\u9009\u62E9\u5BFC\u51FA\u7684\u7D20\u6750\u5E93");
      const lib = this.get(r.libraryId);
      return this.transfers.add({
        kind: "export",
        libraryId: lib.id,
        path: r.path,
        name: lib.name
      });
    }
    if (!r.archiveId) throw new WorkError("\u8BF7\u9009\u62E9\u5DF2\u4E0A\u4F20\u7684 ZIP");
    await this.transfers.ready(r.archiveId);
    return this.transfers.add({
      kind: "import",
      archiveId: r.archiveId,
      path: r.path,
      name: basename(r.path),
      storage: await this.selectedStorage(r.storageMode ?? "local")
    });
  }
  async updateAsset(r) {
    await this.editAsset(r);
    return { ok: true };
  }
  async editAsset(raw) {
    const r = endpoints.editAsset.input.parse(raw);
    return this.exclusive("library:" + r.libraryId, async () => {
      const lib = this.get(r.libraryId), asset = lib.asset(r.id);
      let ids = r.collectionIds ? [...new Set(r.collectionIds)] : void 0;
      if (!ids && r.favorite !== void 0)
        ids = r.favorite ? asset.collectionIds.length ? asset.collectionIds : [lib.ensureDefaultCollection()] : [];
      if (ids && ids.some((id) => !lib.collections().some((c) => c.id === id)))
        throw new WorkError("\u6536\u85CF\u5939\u4E0D\u5B58\u5728\u6216\u4E0D\u5C5E\u4E8E\u5F53\u524D\u7D20\u6750\u5E93");
      lib.transaction(() => {
        lib.saveAsset({
          ...asset,
          ...r.tags !== void 0 ? { tags: [...new Set(r.tags)] } : {},
          ...r.notes !== void 0 ? { notes: r.notes } : {},
          ...ids !== void 0 ? { favorite: ids.length > 0 } : {}
        });
        if (ids) {
          lib.db.prepare("DELETE FROM collection_assets WHERE asset_id=?").run(r.id);
          for (const id of ids)
            lib.db.prepare("INSERT INTO collection_assets VALUES(?,?)").run(id, r.id);
        }
      });
      return lib.asset(r.id);
    });
  }
  async collection(r) {
    const lib = this.get(r.libraryId);
    if (r.action !== "create" && lib.collections().some((c) => c.id === r.id && c.isDefault))
      throw new WorkError("\u9ED8\u8BA4\u6536\u85CF\u5939\u4E0D\u80FD\u91CD\u547D\u540D\u6216\u5220\u9664");
    if (r.action === "delete") {
      if (!r.id || !lib.collections().some((c) => c.id === r.id))
        throw new WorkError("\u6536\u85CF\u5939\u4E0D\u5B58\u5728\u6216\u4E0D\u5C5E\u4E8E\u5F53\u524D\u7D20\u6750\u5E93");
      lib.transaction(() => {
        lib.db.prepare("DELETE FROM collection_assets WHERE collection_id=?").run(r.id);
        lib.db.prepare("DELETE FROM collections WHERE id=?").run(r.id);
      });
      return { ok: true };
    }
    if (!r.name?.trim()) throw new WorkError("\u8BF7\u8F93\u5165\u6536\u85CF\u5939\u540D\u79F0");
    if (lib.collections().some((c) => c.name === r.name && c.id !== r.id))
      throw new WorkError("\u5DF2\u7ECF\u6709\u540C\u540D\u6536\u85CF\u5939");
    if (r.action === "create")
      lib.db.prepare("INSERT INTO collections(id,name,created_at) VALUES(?,?,?)").run(randomUUID5(), r.name, now());
    else {
      if (!r.id || !lib.collections().some((c) => c.id === r.id))
        throw new WorkError("\u6536\u85CF\u5939\u4E0D\u5B58\u5728");
      lib.db.prepare("UPDATE collections SET name=? WHERE id=?").run(r.name, r.id);
    }
    return { ok: true };
  }
  async setCollections(r) {
    await this.editAsset(r);
    return { ok: true };
  }
  async beginUpload(r) {
    return this.exclusive("library:" + r.libraryId, async () => {
      const lib = this.get(r.libraryId);
      const name2 = basename(r.name.replace(/\\/g, "/"));
      if (!mediaTypes[extname(name2).toLowerCase()])
        throw new WorkError("\u652F\u6301 JPG\u3001PNG\u3001WebP\u3001MP4\u3001MOV\u3001MKV \u548C WebM");
      const id = randomUUID5();
      await writeFile4(join5(lib.root, "staging", id), new Uint8Array(), {
        flag: "wx",
        mode: 384
      });
      lib.db.prepare("INSERT INTO uploads(id,name,size) VALUES(?,?,?)").run(id, name2, r.size);
      return { id, offset: 0 };
    });
  }
  async uploadChunk(r) {
    return this.exclusive("library:" + r.libraryId, async () => {
      const lib = this.get(r.libraryId), row = lib.db.prepare("SELECT * FROM uploads WHERE id=?").get(r.id);
      if (!row || row.result) throw new WorkError("\u5BFC\u5165\u5DF2\u5B8C\u6210\u6216\u4E0D\u5B58\u5728");
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(r.data))
        throw new WorkError("\u4E0A\u4F20\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E");
      const data = Buffer.from(r.data, "base64");
      if (!data.length || data.length > 1024 * 1024)
        throw new WorkError("\u4E0A\u4F20\u5206\u5757\u5927\u5C0F\u4E0D\u6B63\u786E");
      const path = join5(lib.root, "staging", row.id);
      const offset = (await stat5(path)).size;
      if (r.offset < offset) {
        const file2 = await open3(path, "r");
        try {
          const previous = Buffer.alloc(data.length);
          await file2.read(previous, 0, data.length, r.offset);
          if (!previous.equals(data)) throw new WorkError("\u91CD\u590D\u5206\u5757\u5185\u5BB9\u4E0D\u4E00\u81F4");
          return { offset };
        } finally {
          await file2.close();
        }
      }
      if (r.offset !== offset || offset + data.length > row.size)
        throw new WorkError("\u4E0A\u4F20\u504F\u79FB\u4E0D\u4E00\u81F4\uFF0C\u8BF7\u91CD\u65B0\u5BFC\u5165");
      const file = await open3(path, "a");
      try {
        await file.write(data);
        await file.sync();
      } finally {
        await file.close();
      }
      lib.db.prepare("UPDATE uploads SET offset=? WHERE id=?").run(offset + data.length, row.id);
      return { offset: offset + data.length };
    });
  }
  async finishUpload(r, signal) {
    return this.exclusive("library:" + r.libraryId, async () => {
      const lib = this.get(r.libraryId), row = lib.db.prepare("SELECT * FROM uploads WHERE id=?").get(r.id);
      if (!row) throw new WorkError("\u5BFC\u5165\u4E0D\u5B58\u5728");
      if (row.result) return JSON.parse(row.result);
      const temp = join5(lib.root, "staging", row.id);
      let planned;
      if (row.prepared) planned = JSON.parse(row.prepared);
      else {
        if ((await stat5(temp)).size !== row.size)
          throw new WorkError("\u6587\u4EF6\u5C1A\u672A\u4E0A\u4F20\u5B8C\u6574");
        const hash = createHash3("sha256");
        for await (const chunk of createReadStream3(temp, { signal }))
          hash.update(chunk);
        signal.throwIfAborted();
        const digest3 = hash.digest("hex"), ext2 = extname(row.name).toLowerCase();
        planned = {
          digest: digest3,
          id: randomUUID5(),
          ext: ext2,
          relativePath: `originals/${digest3}${ext2}`
        };
        lib.db.prepare("UPDATE uploads SET prepared=? WHERE id=?").run(JSON.stringify(planned), row.id);
      }
      const { digest: digest2, id, ext, relativePath } = planned, duplicate = lib.hash(digest2);
      if (duplicate) {
        const result2 = { assetId: duplicate.id, duplicate: true };
        lib.db.prepare("UPDATE uploads SET result=? WHERE id=?").run(JSON.stringify(result2), row.id);
        await unlink5(temp).catch((e) => {
          if (e.code !== "ENOENT") throw e;
        });
        return result2;
      }
      const destination = safePath(lib.root, relativePath), type = mediaTypes[ext];
      try {
        await rename4(temp, destination);
      } catch (e) {
        if (e.code !== "ENOENT" || (await stat5(destination)).size !== row.size)
          throw e;
      }
      const asset = {
        id,
        libraryId: lib.id,
        name: row.name,
        ...type,
        size: row.size,
        relativePath,
        tags: [],
        notes: "",
        favorite: false,
        createdAt: now(),
        status: "pending",
        duration: null,
        thumbnail: type.kind === "image" ? relativePath : null,
        collectionIds: []
      };
      const task = {
        id: randomUUID5(),
        libraryId: lib.id,
        assetId: id,
        name: row.name,
        stage: "preview",
        status: "queued",
        progress: 0,
        attempts: 0,
        error: null,
        nextRunAt: 0,
        updatedAt: now()
      };
      const result = { assetId: id, duplicate: false };
      lib.transaction(() => {
        lib.saveAsset(asset, digest2);
        lib.saveTask(task);
        lib.db.prepare("UPDATE uploads SET result=? WHERE id=?").run(JSON.stringify(result), row.id);
      });
      this.tick();
      return result;
    });
  }
  async media(r, signal = AbortSignal.timeout(12e4)) {
    const lib = this.get(r.libraryId), asset = lib.asset(r.id), path = safePath(
      lib.root,
      r.preview ? asset.thumbnail ?? asset.relativePath : asset.relativePath
    );
    const local = await lstat4(path).catch((e) => {
      if (e.code === "ENOENT") return void 0;
      throw e;
    });
    if (!local && lib.storage.mode === "s3") {
      const relative2 = r.preview ? asset.thumbnail ?? asset.relativePath : asset.relativePath;
      const offset = r.offset ?? 0;
      const { stream, size: size2 } = await this.objects(lib).stream(
        relative2,
        signal,
        `bytes=${offset}-${offset + 1024 ** 2 - 1}`
      );
      const chunks = [];
      let bytes = 0;
      for await (const chunk of stream) {
        bytes += chunk.length;
        if (bytes > 1024 ** 2) {
          stream.destroy();
          throw new WorkError("S3 \u670D\u52A1\u6CA1\u6709\u6B63\u786E\u54CD\u5E94\u5206\u5757\u8BFB\u53D6");
        }
        chunks.push(Buffer.from(chunk));
      }
      return {
        data: Buffer.concat(chunks).toString("base64"),
        mime: r.preview && asset.thumbnail?.endsWith(".jpg") ? "image/jpeg" : asset.mime,
        size: size2,
        nextOffset: offset + bytes
      };
    }
    if (local?.isSymbolicLink()) throw new WorkError("\u7D20\u6750\u6587\u4EF6\u4E0D\u80FD\u662F\u7B26\u53F7\u94FE\u63A5");
    const size = (await stat5(path)).size;
    const file = await open3(path, "r");
    try {
      const buffer = Buffer.alloc(
        Math.min(1024 * 1024, Math.max(0, size - (r.offset ?? 0)))
      );
      const { bytesRead } = await file.read(
        buffer,
        0,
        buffer.length,
        r.offset ?? 0
      );
      return {
        data: buffer.subarray(0, bytesRead).toString("base64"),
        mime: r.preview && asset.thumbnail?.endsWith(".jpg") ? "image/jpeg" : asset.mime,
        size,
        nextOffset: (r.offset ?? 0) + bytesRead
      };
    } finally {
      await file.close();
    }
  }
  async acknowledge(r) {
    await this.transfers.acknowledge(r.ids);
    for (const lib of this.libraries.values())
      for (const id of r.ids)
        lib.db.prepare("DELETE FROM notices WHERE id=?").run(id);
    return { ok: true };
  }
  async task(r) {
    const lib = this.get(r.libraryId), task = lib.tasks().find((t) => t.id === r.id);
    if (!task) throw new WorkError("\u4EFB\u52A1\u4E0D\u5B58\u5728");
    const active = this.running.get(task.id);
    if (r.action === "pause" || r.action === "cancel") {
      task.status = r.action === "pause" ? "paused" : "cancelled";
      lib.saveTask(task);
      active?.abort.abort();
      await active?.promise;
    } else {
      if (active) throw new WorkError("\u4EFB\u52A1\u4ECD\u5728\u505C\u6B62\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
      task.status = "queued";
      task.error = null;
      task.attempts = 0;
      task.nextRunAt = 0;
      if (r.action === "retry" || task.stage === "done") task.stage = "preview";
      lib.saveTask(task);
      this.tick();
    }
    return { ok: true };
  }
  async search(raw, signal) {
    const r = searchInput.parse(raw), libs = r.libraryId ? [this.get(r.libraryId)] : [...this.libraries.values()];
    const terms = r.query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean), fp = fingerprint(this.state.settings);
    let vector;
    if (r.ai && r.query.trim()) {
      const cacheKey = fp + "|" + r.query.trim();
      vector = this.queryCache.get(cacheKey);
      if (!vector) {
        vector = await embed(
          { ...this.state.settings },
          await this.credentials.read(),
          { text: r.query.trim() },
          signal,
          this.fetcher
        );
        signal.throwIfAborted();
        this.queryCache.set(cacheKey, vector);
        if (this.queryCache.size > 100)
          this.queryCache.delete(this.queryCache.keys().next().value);
      }
    }
    const hits = [];
    let unindexed = 0;
    for (const lib of libs) {
      for (const asset of lib.assets()) {
        signal.throwIfAborted();
        if (r.kind !== "all" && asset.kind !== r.kind || r.favorite && !asset.favorite || r.recent && Date.now() - Date.parse(asset.createdAt) > 7 * 864e5 || r.collectionId && !asset.collectionIds.includes(r.collectionId) || r.collectionIds.length > 0 && !r.collectionIds.some((id) => asset.collectionIds.includes(id)) || r.withinDays > 0 && Date.now() - Date.parse(asset.createdAt) > r.withinDays * 864e5 || !r.tags.every(
          (tag) => asset.tags.some(
            (value) => value.toLocaleLowerCase() === tag.toLocaleLowerCase()
          )
        ))
          continue;
        const haystack = [asset.name, ...asset.tags, asset.notes].join(" ").toLocaleLowerCase();
        const keyword = terms.length ? terms.every((t) => haystack.includes(t)) : true;
        const vectors = lib.db.prepare(
          "SELECT start,end,vector FROM vectors WHERE asset_id=? AND fingerprint=?"
        ).all(asset.id, fp);
        if (r.indexState === "indexed" && !vectors.length || r.indexState === "unindexed" && vectors.length)
          continue;
        if (!vectors.length) unindexed++;
        if (!vector) {
          if (keyword)
            hits.push({
              ...asset,
              score: terms.reduce((score, term) => {
                const name2 = asset.name.toLocaleLowerCase();
                return score + (name2 === term ? 5 : name2.startsWith(term) ? 4 : name2.includes(term) ? 3 : asset.tags.some(
                  (tag) => tag.toLocaleLowerCase().includes(term)
                ) ? 2 : 1);
              }, 0),
              start: null,
              end: null
            });
          continue;
        }
        let best = -1, start = null, end = null;
        for (const row of vectors) {
          const score = similarity(vector, JSON.parse(row.vector));
          if (score > best) {
            best = score;
            start = row.start;
            end = row.end;
          }
        }
        if (best >= 0 || keyword)
          hits.push({
            ...asset,
            score: (best < 0 ? 0 : best) + (keyword ? 0.12 : 0),
            start,
            end
          });
      }
    }
    hits.sort((a, b) => {
      let difference = 0;
      if (r.sort === "name")
        difference = a.name.localeCompare(b.name, void 0, { numeric: true });
      else if (r.sort === "size") difference = b.size - a.size;
      else if (r.sort === "oldest")
        difference = a.createdAt.localeCompare(b.createdAt);
      else if (r.sort === "default" && terms.length)
        difference = b.score - a.score || b.createdAt.localeCompare(a.createdAt);
      else difference = b.createdAt.localeCompare(a.createdAt);
      return difference || a.id.localeCompare(b.id);
    });
    return {
      hits: hits.slice(r.offset, r.offset + r.limit),
      total: hits.length,
      unindexed
    };
  }
  tick() {
    if (this.closed) return;
    for (const lib of this.libraries.values()) {
      if (this.faulted.has(lib.id) || this.exporting.has(lib.id)) continue;
      try {
        for (const task of lib.tasks()) {
          if (this.running.size >= this.state.settings.concurrency) return;
          if (this.running.has(task.id) || !["queued", "retrying"].includes(task.status) || task.nextRunAt > Date.now())
            continue;
          const abort = new AbortController();
          task.status = "running";
          lib.saveTask(task);
          const promise = Promise.resolve().then(() => this.process(lib, task, abort.signal)).catch((e) => {
            this.errors.set(lib.id, message(e));
            this.faulted.add(lib.id);
          }).finally(() => this.running.delete(task.id));
          this.running.set(task.id, { abort, promise, libraryId: lib.id });
        }
      } catch (e) {
        this.errors.set(lib.id, message(e));
        this.faulted.add(lib.id);
      }
    }
  }
  async process(lib, task, signal) {
    try {
      let asset = lib.asset(task.assetId);
      const settings = { ...this.state.settings };
      const segmentsPath = join5(
        lib.root,
        "previews",
        asset.id,
        "segments.json"
      );
      const fp = fingerprint(settings);
      let segments = [];
      if (task.stage !== "preview") {
        try {
          const cached = JSON.parse(await readFile5(segmentsPath, "utf8"));
          if (cached.fingerprint === fp && Array.isArray(cached.segments))
            segments = cached.segments;
          else task.stage = "preview";
        } catch {
          task.stage = "preview";
        }
      }
      if (task.stage === "preview") {
        await this.objects(lib).hydrate(asset.relativePath, signal);
        const result = await prepare(lib.root, asset, settings, signal);
        signal.throwIfAborted();
        segments = result.segments;
        await atomicJSON(segmentsPath, { fingerprint: fp, segments });
        asset = {
          ...asset,
          thumbnail: result.thumbnail,
          duration: result.duration
        };
        lib.saveAsset(asset);
        task.stage = lib.storage.mode === "s3" ? "upload" : "embed";
        task.progress = 20;
        lib.saveTask(task);
      }
      if (task.stage === "upload") {
        const objects = this.objects(lib);
        const paths = [
          asset.relativePath,
          ...new Set(
            segments.map((s) => s.path).filter((p) => p !== asset.relativePath)
          ),
          `previews/${asset.id}/segments.json`
        ];
        let savedAt = 0;
        for (let i = 0; i < paths.length; i++) {
          await objects.upload(paths[i], signal, (loaded, total) => {
            task.progress = 20 + Math.round(
              (i + loaded / Math.max(1, total)) / paths.length * 20
            );
            if (Date.now() - savedAt > 500 && !signal.aborted) {
              lib.saveTask(task);
              savedAt = Date.now();
            }
          });
        }
        task.stage = "embed";
        lib.saveTask(task);
        if (lib.storage.mode === "s3")
          await unlink5(safePath(lib.root, asset.relativePath)).catch((e) => {
            if (e.code !== "ENOENT") throw e;
          });
      }
      let completed = 0;
      for (const segment of segments) {
        signal.throwIfAborted();
        if (!lib.db.prepare(
          "SELECT 1 FROM vectors WHERE asset_id=? AND segment=? AND fingerprint=?"
        ).get(asset.id, segment.index, fp)) {
          await this.objects(lib).hydrate(segment.path, signal);
          const vector = await embed(
            settings,
            await this.credentials.read(),
            { image: await imageData(lib.root, segment) },
            signal,
            this.fetcher
          );
          signal.throwIfAborted();
          lib.db.prepare("INSERT OR REPLACE INTO vectors VALUES(?,?,?,?,?,?)").run(
            asset.id,
            segment.index,
            fp,
            segment.start,
            segment.end,
            JSON.stringify(vector)
          );
        }
        task.progress = 20 + Math.round(++completed / segments.length * 80);
        lib.saveTask(task);
      }
      signal.throwIfAborted();
      task.status = "completed";
      task.stage = "done";
      task.error = null;
      task.progress = 100;
      lib.transaction(() => {
        lib.saveTask(task);
        lib.saveAsset({ ...lib.asset(asset.id), status: "ready" });
        lib.notice(`\u5DF2\u5B8C\u6210\uFF1A${task.name}`);
      });
    } catch (e) {
      const current = lib.tasks().find((t) => t.id === task.id);
      if (!current) return;
      if (signal.aborted) {
        if (current.status === "running") {
          current.status = "queued";
          lib.saveTask(current);
        }
        return;
      }
      current.attempts++;
      current.error = message(e);
      if (e instanceof WorkError && e.retryable && current.attempts <= this.state.settings.maxRetries) {
        current.status = "retrying";
        current.nextRunAt = Date.now() + Math.max(
          e.retryAfter,
          Math.min(6e4, 1e3 * 2 ** current.attempts) + Math.random() * 500
        );
      } else {
        current.status = "failed";
        lib.notice(`\u5904\u7406\u5931\u8D25\uFF1A${task.name}\u3002${current.error}`);
      }
      lib.saveTask(current);
      lib.saveAsset({ ...lib.asset(task.assetId), status: "pending" });
    }
  }
  async stopLibrary(id) {
    const jobs = [...this.running.values()].filter((x) => x.libraryId === id);
    for (const job of jobs) job.abort.abort();
    await Promise.all(jobs.map((j) => j.promise));
  }
  async dispose() {
    this.closed = true;
    clearInterval(this.timer);
    await this.transfers.dispose();
    for (const job of this.running.values()) job.abort.abort();
    await Promise.allSettled([...this.running.values()].map((x) => x.promise));
    await Promise.allSettled([...this.locked.values()]);
    for (const lib of this.libraries.values()) await lib.close();
    this.libraries.clear();
  }
};
function message(e) {
  if (e instanceof WorkError) return e.message;
  if (e instanceof Error) {
    if (e.code === "ENOSPC")
      return "\u78C1\u76D8\u7A7A\u95F4\u4E0D\u8DB3\uFF0C\u8BF7\u6E05\u7406\u7A7A\u95F4\u540E\u91CD\u8BD5";
    if (e.code === "ENOENT")
      return "\u6587\u4EF6\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u5E93\u4F4D\u7F6E\u548C\u539F\u59CB\u7D20\u6750";
    if (e.code === "EACCES" || e.code === "EPERM")
      return "\u6CA1\u6709\u6587\u4EF6\u8BBF\u95EE\u6743\u9650\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u5939\u6743\u9650";
    return e.message.replace(/(Bearer\s+)[^\s]+/gi, "$1[\u5DF2\u9690\u85CF]").slice(0, 300);
  }
  return "\u5904\u7406\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5";
}

// src/host/index.ts
var name = "asset-library";
var inject = ["typert", "credentials"];
async function apply(ctx, config = {}) {
  const key = credentialKey("asset-library", "volcengine");
  const library = new LibraryService(
    config.dataDir ?? join6(process.env.DSH_HOME ?? join6(homedir(), ".dsh"), "asset-library"),
    {
      read: async () => {
        const value = await ctx.credentials.readRecord(key);
        const payload = value?.kind === "grant" ? value.payload : void 0;
        return payload && typeof payload === "object" && "apiKey" in payload && typeof payload.apiKey === "string" ? payload.apiKey : void 0;
      },
      write: async (apiKey) => {
        await ctx.credentials.modifyRecord(key, async () => ({
          kind: "grant",
          payload: { apiKey }
        }));
      },
      clear: () => ctx.credentials.deleteRecord(key),
      readS3: async (id) => {
        const value = await ctx.credentials.readRecord(
          credentialKey("asset-library", "s3-" + id)
        );
        const p = value?.kind === "grant" ? value.payload : void 0;
        if (!p || typeof p !== "object" || !("accessKeyId" in p) || !("secretAccessKey" in p) || typeof p.accessKeyId !== "string" || typeof p.secretAccessKey !== "string")
          return void 0;
        return {
          accessKeyId: p.accessKeyId,
          secretAccessKey: p.secretAccessKey,
          ..."sessionToken" in p && typeof p.sessionToken === "string" ? { sessionToken: p.sessionToken } : {}
        };
      },
      writeS3: async (id, payload) => {
        await ctx.credentials.modifyRecord(
          credentialKey("asset-library", "s3-" + id),
          async () => ({ kind: "grant", payload })
        );
      },
      clearS3: (id) => ctx.credentials.deleteRecord(
        credentialKey("asset-library", "s3-" + id)
      )
    }
  );
  await library.init();
  ctx.effect(() => () => library.dispose());
  const service = { ctx };
  for (const method of Object.keys(endpoints))
    service[method] = async (request, signal) => {
      try {
        return await library.dispatch(method, request, signal);
      } catch (e) {
        signal.throwIfAborted();
        throw new RemoteError("asset-library/operation-failed", message(e), {
          retryable: false
        });
      }
    };
  service.typertRemote = bindTypertRemote(service, "assetLibrary");
  ctx.provide("assetLibrary", service);
  ctx.effect(
    () => ctx.typert.register({
      package: contribution.package,
      face: "host",
      schemas: [],
      model: { services: [], events: [], objects: [] },
      invocations: contribution.descriptors
    })
  );
  ctx.inject(["tools"], (ctx2) => {
    ctx2.tools.register(
      defineTool({
        name: "asset_library_list",
        description: "\u5217\u51FA\u672C\u673A\u6253\u5F00\u7684\u7D20\u6750\u5E93\uFF0C\u641C\u7D22\u524D\u53EF\u83B7\u53D6\u5E93 ID\u3002\u4E0D\u8FD4\u56DE API Key\u3002",
        parameters: {},
        output: {
          schema: { type: "string" },
          render: (_args, value) => [{ type: "text", text: value }]
        },
        execute: async () => JSON.stringify((await library.snapshot()).libraries)
      })
    );
    ctx2.tools.register(
      defineTool({
        name: "asset_library_search",
        description: "\u641C\u7D22\u7528\u6237\u672C\u5730\u56FE\u7247\u548C\u89C6\u9891\u3002\u9ED8\u8BA4\u5339\u914D\u6587\u4EF6\u540D\u3001\u6807\u7B7E\u548C\u5907\u6CE8\uFF1Bai=true \u4F7F\u7528\u706B\u5C71\u8BED\u4E49\u641C\u7D22\uFF0C\u4F1A\u4EA7\u751F\u6A21\u578B\u8C03\u7528\u3002\u8FD4\u56DE\u5E93 ID\u3001\u7D20\u6750 ID\u3001\u76F8\u5BF9\u8DEF\u5F84\u548C\u89C6\u9891\u547D\u4E2D\u65F6\u95F4\u6BB5\u3002",
        parameters: {
          query: {
            type: "string",
            required: true,
            description: "\u5173\u952E\u8BCD\u6216\u753B\u9762\u63CF\u8FF0"
          },
          library_id: {
            type: "string",
            description: "\u53EF\u9009\u5E93 ID\uFF0C\u7701\u7565\u5219\u641C\u7D22\u5168\u90E8\u5E93"
          },
          ai: { type: "boolean", description: "\u662F\u5426\u4F7F\u7528 AI \u641C\u7D22\uFF0C\u9ED8\u8BA4 false" }
        },
        output: {
          schema: { type: "string" },
          render: (_args, value) => [{ type: "text", text: value }]
        },
        execute: async (args) => JSON.stringify(
          await library.search(
            {
              query: args.query,
              ...args.library_id ? { libraryId: args.library_id } : {},
              ai: args.ai ?? false,
              limit: 20
            },
            AbortSignal.timeout(65e3)
          )
        )
      })
    );
  });
}
export {
  apply,
  inject,
  name
};
//# sourceMappingURL=index.js.map
