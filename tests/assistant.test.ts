import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  rm,
  symlink,
  stat,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Context } from "@deepseek-ai/cordis";
import { ToolRuntime } from "@deepseek-ai/dsh-tools";
import { SystemPrompt } from "@deepseek-ai/dsh-system-prompt";
import { SkillRegistry } from "@deepseek-ai/dsh-skill";
import { LocalAttachmentStore } from "@deepseek-ai/dsh-attachment-local";
import type { ToolCallId } from "@deepseek-ai/dsh-llm";
import { LibraryService } from "../src/host/service.ts";
import { registerAssistant } from "../src/host/assistant.ts";
import { Imports } from "../src/host/imports.ts";

const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP9sAAAAASUVORK5CYII=",
  "base64",
);
const signal = () => new AbortController().signal;
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "asset-assistant-"));
  const service = new LibraryService(join(root, "machine"), {
    read: async () => undefined,
    write: async () => {},
    clear: async () => {},
  });
  await service.init();
  const { id } = await service.library({
    action: "create",
    path: join(root, "library"),
    name: "Test",
  });
  await mkdir(join(root, "source", "nested"), { recursive: true });
  return {
    root,
    service,
    id: id!,
    cleanup: async () => {
      await service.dispose();
      await rm(root, { recursive: true, force: true });
    },
  };
}
async function wait<T>(get: () => T | Promise<T>, until: (v: T) => boolean) {
  for (let i = 0; i < 250; i++) {
    const v = await get();
    if (until(v)) return v;
    await new Promise((r) => setTimeout(r, 20));
  }
  throw new Error("timed out");
}

test("folder import plans, resumes, deduplicates, preserves sources and reports each result", async () => {
  const f = await fixture();
  try {
    await writeFile(join(f.root, "source", "first.png"), png);
    await writeFile(join(f.root, "source", "nested", "same.png"), png);
    await writeFile(join(f.root, "source", "notes.txt"), "ignored");
    await symlink(
      join(f.root, "source", "first.png"),
      join(f.root, "source", "link.png"),
    );
    const plan = await f.service.imports.scan(
      {
        libraryId: f.id,
        paths: [join(f.root, "source")],
        recursive: true,
        tags: ["blue"],
        collectionIds: [],
      },
      signal(),
    );
    assert.equal(plan.total, 2);
    assert.equal(plan.skipped, 2);
    assert.equal(plan.status, "paused");
    assert.equal((await f.service.search({ query: "" }, signal())).total, 0);
    await f.service.imports.control(plan.id, "resume");
    const done = await wait(
      () => f.service.imports.get(plan.id),
      (j) => ["completed", "failed"].includes(j.status),
    );
    assert.equal(done.status, "completed", done.error ?? "");
    assert.equal(done.added, 1);
    assert.equal(done.duplicates, 1);
    assert.deepEqual(await readFile(join(f.root, "source", "first.png")), png);
    await wait(
      () => f.service.snapshot(),
      (s) => s.tasks.some((t) => t.assetId && t.status === "failed"),
    );
    const hit = (
      await f.service.search({ query: "", tags: ["blue"] }, signal())
    ).hits[0];
    assert.ok(hit);
    const repeat = await f.service.imports.scan(
      {
        libraryId: f.id,
        paths: [join(f.root, "source", "first.png")],
        recursive: true,
        tags: ["do-not-overwrite"],
        collectionIds: [],
      },
      signal(),
    );
    await f.service.imports.control(repeat.id, "resume");
    await wait(
      () => f.service.imports.get(repeat.id),
      (j) => j.status === "completed",
    );
    assert.deepEqual(
      (await f.service.search({ query: "" }, signal())).hits[0].tags,
      ["blue"],
    );
    assert.ok(
      (await f.service.snapshot()).notices.some((n) => n.id === plan.id),
    );
    await f.service.acknowledge({ ids: [plan.id] });
    assert.ok(
      !(await f.service.snapshot()).notices.some((n) => n.id === plan.id),
    );
  } finally {
    await f.cleanup();
  }
});

test("changed sources fail individually, bad memberships fail before scan, library internals are skipped", async () => {
  const f = await fixture();
  try {
    await writeFile(join(f.root, "source", "x.png"), png);
    await assert.rejects(
      f.service.imports.scan(
        {
          libraryId: f.id,
          paths: [join(f.root, "source")],
          recursive: true,
          tags: [],
          collectionIds: ["foreign"],
        },
        signal(),
      ),
      /收藏夹/,
    );
    const input = {
      libraryId: f.id,
      paths: [join(f.root, "source")],
      recursive: true,
      tags: [],
      collectionIds: [],
    };
    const plan = await f.service.imports.scan(input, signal());
    await writeFile(
      join(f.root, "source", "x.png"),
      Buffer.concat([png, Buffer.from("changed")]),
    );
    await f.service.imports.control(plan.id, "resume");
    const failed = await wait(
      () => f.service.imports.get(plan.id),
      (j) => j.status === "failed",
    );
    assert.equal(failed.failed, 1);
    assert.match(failed.files[0].error!, /改变/);
    assert.equal((await f.service.search({ query: "" }, signal())).total, 0);
    const skipped = await f.service.imports.scan(
      { ...input, paths: [join(f.root, "library")] },
      signal(),
    );
    assert.equal(skipped.total, 0);
  } finally {
    await f.cleanup();
  }
});

test("batch editing is atomic and additive; inspection produces a real bounded JPEG", async () => {
  const f = await fixture();
  try {
    const source = join(f.root, "source", "x.png");
    await writeFile(source, png);
    const job = await f.service.imports.scan(
      {
        libraryId: f.id,
        paths: [source],
        recursive: false,
        tags: ["keep"],
        collectionIds: [],
      },
      signal(),
    );
    await f.service.imports.control(job.id, "resume");
    const result = await wait(
      () => f.service.imports.get(job.id),
      (j) => j.status === "completed",
    );
    const id = result.files[0].assetId!;
    await f.service.collection({
      libraryId: f.id,
      action: "create",
      name: "Nature",
    });
    const collection = (await f.service.snapshot()).collections.find(
      (c) => c.name === "Nature",
    )!;
    await assert.rejects(
      f.service.editBatch(
        {
          libraryId: f.id,
          changes: [
            { id, name: "bad-name" },
            { id: "missing", addTags: ["bad"] },
          ],
        },
        signal(),
      ),
    );
    assert.equal(
      (await f.service.search({ query: "" }, signal())).hits[0].name,
      "x.png",
    );
    const changed = await f.service.editBatch(
      {
        libraryId: f.id,
        changes: [
          {
            id,
            name: "Nature.png",
            addTags: ["new"],
            addCollections: [collection.id],
          },
        ],
      },
      signal(),
    );
    assert.deepEqual(changed[0].tags, ["keep", "new"]);
    assert.equal(changed[0].favorite, true);
    const view = await f.service.inspectAsset(
      { libraryId: f.id, id },
      signal(),
    );
    assert.equal(view.width, 1);
    assert.equal(view.frames.length, 1);
    const bytes = await readFile(view.frames[0].path);
    assert.equal(bytes[0], 255);
    assert.equal(bytes[1], 216);
    assert.ok(bytes.length < 1024 ** 2);
  } finally {
    await f.cleanup();
  }
});

test("interrupted copies resume from the same upload and completed finish is replayed without rereading", async () => {
  const root = await mkdtemp(join(tmpdir(), "asset-import-resume-"));
  let queue: Imports | undefined;
  try {
    const file = join(root, "x.png");
    await writeFile(file, Buffer.alloc(2 * 1024 ** 2, 7));
    let begins = 0,
      offset = 0,
      hold!: () => void,
      finished = false;
    const runner = {
      excludedRoots: () => [],
      validate: () => {},
      begin: async () => {
        begins++;
        return "upload";
      },
      ready: () => finished,
      chunk: async (_l: string, _id: string, p: number, b: Buffer) => {
        if (offset === 0)
          await new Promise<void>((r) => {
            hold = r;
          });
        offset = Math.max(offset, p + b.length);
        return offset;
      },
      finish: async () => {
        finished = true;
        return { assetId: "asset", duplicate: false };
      },
      decorate: async () => {},
    };
    queue = new Imports(join(root, "queue"), runner);
    await queue.init();
    const plan = await queue.scan(
      {
        libraryId: "library",
        paths: [file],
        recursive: true,
        tags: [],
        collectionIds: [],
      },
      signal(),
    );
    await queue.control(plan.id, "resume");
    await wait(() => !!hold, Boolean);
    const stopping = queue.dispose();
    hold();
    await stopping;
    queue = new Imports(join(root, "queue"), runner);
    await queue.init();
    assert.equal(queue.get(plan.id).status, "paused");
    await queue.control(plan.id, "resume");
    await wait(
      () => queue!.get(plan.id),
      (j) => j.status === "completed",
    );
    assert.equal(begins, 1);
    assert.equal(queue.get(plan.id).added, 1);
  } finally {
    await queue?.dispose();
    await rm(root, { recursive: true, force: true });
  }
});

test("native DSH registry discovers bundled Skill, executes guarded tools, and unloads both", async () => {
  const f = await fixture(),
    ctx = new Context();
  try {
    await ctx.plugin(SystemPrompt, {});
    await ctx.plugin(ToolRuntime, { mode: "native" });
    await ctx.plugin(SkillRegistry);
    await ctx.plugin(LocalAttachmentStore, {
      dshHome: join(f.root, "attachments-home"),
    });
    const plugin = await ctx.plugin(async (ctx) =>
      registerAssistant(
        ctx,
        f.service,
        new URL("../skills/asset-library-assistant/SKILL.md", import.meta.url),
      ),
    );
    await wait(() => ctx.tools.get("asset_library_search"), Boolean);
    const skill = await ctx.skills.get("asset-library-assistant");
    assert.equal(skill?.source, "bundled");
    assert.match(skill!.content, /去重/);
    assert.equal(skill!.invocation.modelInvocable, true);
    let guarded = 0;
    ctx.on("tools/pre-execute", async (_exec, next) => {
      guarded++;
      return next();
    });
    const result = await ctx.tools.execute({
      callId: "assistant-test" as ToolCallId,
      name: "asset_library_list",
      arguments: {},
      signal: signal(),
    });
    assert.equal(result.isError, false, JSON.stringify(result));
    assert.equal(guarded, 1);
    assert.equal(JSON.stringify(result).includes("secret"), false);
    const cancelled = new AbortController();
    cancelled.abort();
    const stopped = await ctx.tools.execute({
      callId: "cancel-test" as ToolCallId,
      name: "asset_library_manage",
      arguments: { action: "create", path: join(f.root, "forbidden") },
      signal: cancelled.signal,
    });
    assert.equal(stopped.isError, true);
    await assert.rejects(stat(join(f.root, "forbidden")));
    const local = join(f.root, "source", "view.png");
    await writeFile(local, png);
    const plan = await f.service.imports.scan(
      {
        libraryId: f.id,
        paths: [local],
        recursive: false,
        tags: [],
        collectionIds: [],
      },
      signal(),
    );
    await f.service.imports.control(plan.id, "resume");
    const done = await wait(
      () => f.service.imports.get(plan.id),
      (j) => j.status === "completed",
    );
    const view = await ctx.tools.execute({
      callId: "inspect-test" as ToolCallId,
      name: "asset_library_inspect",
      arguments: { library_id: f.id, id: done.files[0].assetId },
      signal: signal(),
    });
    assert.equal(view.isError, false, JSON.stringify(view));
    const image = view.content.find((c) => c.type === "image");
    assert.ok(image && image.type === "image");
    const saved = await ctx.attachments.readImage(image.attachment);
    assert.equal(saved.data[0], 255);
    assert.equal(JSON.stringify(view).includes("base64"), false);
    await plugin.dispose();
    assert.equal(ctx.tools.get("asset_library_list"), undefined);
    assert.equal(await ctx.skills.get("asset-library-assistant"), undefined);
  } finally {
    await ctx.fiber.dispose();
    await f.cleanup();
  }
});
