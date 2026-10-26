import test from "node:test";
import assert from "node:assert/strict";
import { nextGridIndex } from "../src/client/keyboard.ts";
test("grid navigation follows responsive rows and clamps incomplete last rows", () => {
  const layout = (columns: number) =>
    Array.from({ length: 5 }, (_, i) => ({
      left: (i % columns) * 120,
      top: Math.floor(i / columns) * 100,
      width: 100,
      height: 80,
    }));
  assert.equal(nextGridIndex(layout(3), 1, "ArrowDown"), 4);
  assert.equal(nextGridIndex(layout(3), 2, "ArrowDown"), 4);
  assert.equal(nextGridIndex(layout(2), 1, "ArrowDown"), 3);
  assert.equal(nextGridIndex(layout(3), 4, "ArrowUp"), 1);
  assert.equal(nextGridIndex(layout(3), 4, "ArrowRight"), 4);
  assert.equal(nextGridIndex(layout(3), 0, "ArrowLeft"), 0);
  assert.equal(nextGridIndex([], -1, "ArrowDown"), -1);
});
