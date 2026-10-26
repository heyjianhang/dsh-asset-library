import test from "node:test";
import assert from "node:assert/strict";
import {
  AssetEditor,
  editKey,
  type AssetPatch,
  type EditorSnapshot,
} from "../src/client/asset-editor.ts";
const target = { libraryId: "library", id: "asset", name: "sample.png" };
const tick = () => new Promise<void>((resolve) => setImmediate(resolve));

test("autosave serializes rapid edits and flush waits for an active write", async () => {
  const writes: AssetPatch[] = [];
  let release!: () => void;
  let state: EditorSnapshot = {};
  const editor = new AssetEditor({
    delay: 60_000,
    publish: (s) => {
      state = s;
    },
    refresh: async () => {},
    write: async (_, patch) => {
      writes.push(patch);
      if (writes.length === 1)
        await new Promise<void>((r) => {
          release = r;
        });
    },
  });
  try {
    editor.stage(target, { notes: "first" }, true);
    await tick();
    editor.stage(target, { notes: "latest", tags: ["tag"] }, true);
    editor.stage(target, { favorite: true }, true);
    assert.equal(writes.length, 1);
    let flushed = false;
    const flushing = editor.flushAll().then(() => {
      flushed = true;
    });
    await tick();
    assert.equal(flushed, false);
    release();
    await flushing;
    assert.deepEqual(writes, [
      { notes: "first" },
      { notes: "latest", tags: ["tag"], favorite: true },
    ]);
    assert.equal(state[editKey(target)].status, "saved");
    assert.equal(editor.hasPending(), false);
    editor.stage(target, { notes: "active only" }, true);
    await tick();
    await editor.flushAll();
  } finally {
    editor.dispose();
  }
});

test("failed autosave preserves the newest draft for explicit retry and restart", async () => {
  let release!: () => void;
  let persisted: { target: typeof target; patch: AssetPatch }[] = [];
  let state: EditorSnapshot = {};
  const editor = new AssetEditor({
    delay: 60_000,
    publish: (s) => {
      state = s;
    },
    persist: (rows) => {
      persisted = structuredClone(rows);
    },
    refresh: async () => {},
    write: async () => {
      await new Promise<void>((r) => {
        release = r;
      });
      throw new Error("offline");
    },
  });
  editor.stage(target, { notes: "old", tags: ["retained"] }, true);
  await tick();
  editor.stage(target, { notes: "new" });
  release();
  await editor.flushAll();
  assert.equal(state[editKey(target)].status, "error");
  assert.deepEqual(persisted[0].patch, { notes: "new", tags: ["retained"] });
  editor.dispose();
  const writes: AssetPatch[] = [];
  const restored = new AssetEditor({
    publish: (s) => {
      state = s;
    },
    persist: (rows) => {
      persisted = structuredClone(rows);
    },
    refresh: async () => {},
    write: async (_, patch) => {
      writes.push(patch);
    },
  });
  try {
    restored.restore(persisted);
    assert.equal(writes.length, 0);
    assert.equal(state[editKey(target)].status, "error");
    await restored.flushAll();
    assert.deepEqual(writes, [{ notes: "new", tags: ["retained"] }]);
    assert.equal(persisted.length, 0);
  } finally {
    restored.dispose();
  }
});

test("selection changes do not cancel debounced edits to different assets", async () => {
  const saved = new Map<string, AssetPatch>();
  const editor = new AssetEditor({
    delay: 10,
    publish: () => {},
    refresh: async () => {},
    write: async (t, patch) => {
      saved.set(t.id, patch);
    },
  });
  try {
    editor.stage(target, { notes: "one" });
    editor.stage({ ...target, id: "second" }, { notes: "two" });
    await new Promise((resolve) => setTimeout(resolve, 40));
    assert.equal(saved.get("asset")?.notes, "one");
    assert.equal(saved.get("second")?.notes, "two");
  } finally {
    editor.dispose();
  }
});
