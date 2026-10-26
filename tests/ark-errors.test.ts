import test from "node:test";
import assert from "node:assert/strict";
import { embed, WorkError } from "../src/host/ark.ts";
import { defaults } from "../src/host/service.ts";

const key = "test-key-do-not-display";
function request(response: Response) {
  return embed(
    defaults,
    key,
    { text: "connection test" },
    AbortSignal.timeout(1000),
    (async () => response) as typeof fetch,
  );
}

test("Ark distinguishes model activation, access and routing errors at HTTP 404", async () => {
  for (const [code, expected] of [
    ["ModelNotOpen", /尚未开通此嵌入模型/],
    ["InvalidEndpointOrModel.NotFound", /不存在.*无权访问/],
    ["InvalidEndpointOrModel.ModelIDAccessDisabled", /推理接入点 ID/],
    ["PathNotFound", /API 路径不存在/],
    ["UnsupportedModel", /不支持此套餐/],
  ] as const) {
    await assert.rejects(
      request(
        Response.json(
          { error: { code, message: key + " private-account" } },
          { status: 404 },
        ),
      ),
      (error) =>
        error instanceof WorkError &&
        !error.retryable &&
        expected.test(error.message) &&
        !error.message.includes(key) &&
        !error.message.includes("private-account"),
    );
  }
});

test("Ark preserves HTTP fallback and never exposes unknown provider messages", async () => {
  for (const response of [
    Response.json(
      { error: { code: key, message: "private-account" } },
      { status: 404 },
    ),
    new Response("<html>private-account</html>", { status: 404 }),
  ]) {
    await assert.rejects(
      request(response),
      (error) =>
        error instanceof WorkError &&
        /HTTP 404/.test(error.message) &&
        !error.message.includes(key) &&
        !error.message.includes("private-account"),
    );
  }
});

test("Ark bounds error bodies, cancels the stream and retains Retry-After", async () => {
  let cancelled = false;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("x".repeat(16385)));
    },
    cancel() {
      cancelled = true;
    },
  });
  await assert.rejects(
    request(
      new Response(body, { status: 429, headers: { "retry-after": "2" } }),
    ),
    (error) =>
      error instanceof WorkError &&
      error.retryable &&
      error.retryAfter === 2000,
  );
  assert.equal(cancelled, true);
});
