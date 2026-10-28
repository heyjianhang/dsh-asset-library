import type { Context } from "@deepseek-ai/cordis";
import {
  bindTypertRemote,
  RemoteError,
} from "@deepseek-ai/dsh-typert-protocol";
import type {} from "@deepseek-ai/dsh-typert-registry";
import { credentialKey } from "@deepseek-ai/dsh-credentials";
import { registerAssistant } from "./assistant.ts";
import { homedir } from "node:os";
import { join } from "node:path";
import { contribution, endpoints, type Method } from "../shared/contracts.ts";
import { LibraryService, message } from "./service.ts";
declare module "@deepseek-ai/dsh-typert-protocol" {
  interface RemoteErrorDetailsMap {
    "asset-library/operation-failed": { retryable: boolean };
  }
}
export const name = "asset-library";
export const inject = ["typert", "credentials"];
export async function apply(ctx: Context, config: { dataDir?: string } = {}) {
  const key = credentialKey("asset-library", "volcengine");
  const library = new LibraryService(
    config.dataDir ??
      join(process.env.DSH_HOME ?? join(homedir(), ".dsh"), "asset-library"),
    {
      read: async () => {
        const value = await ctx.credentials.readRecord(key);
        const payload = value?.kind === "grant" ? value.payload : undefined;
        return payload &&
          typeof payload === "object" &&
          "apiKey" in payload &&
          typeof payload.apiKey === "string"
          ? payload.apiKey
          : undefined;
      },
      write: async (apiKey) => {
        await ctx.credentials.modifyRecord(key, async () => ({
          kind: "grant",
          payload: { apiKey },
        }));
      },
      clear: () => ctx.credentials.deleteRecord(key),
      readS3: async (id) => {
        const value = await ctx.credentials.readRecord(
          credentialKey("asset-library", "s3-" + id),
        );
        const p = value?.kind === "grant" ? value.payload : undefined;
        if (
          !p ||
          typeof p !== "object" ||
          !("accessKeyId" in p) ||
          !("secretAccessKey" in p) ||
          typeof p.accessKeyId !== "string" ||
          typeof p.secretAccessKey !== "string"
        )
          return undefined;
        return {
          accessKeyId: p.accessKeyId,
          secretAccessKey: p.secretAccessKey,
          ...("sessionToken" in p && typeof p.sessionToken === "string"
            ? { sessionToken: p.sessionToken }
            : {}),
        };
      },
      writeS3: async (id, payload) => {
        await ctx.credentials.modifyRecord(
          credentialKey("asset-library", "s3-" + id),
          async () => ({ kind: "grant", payload }),
        );
      },
      clearS3: (id) =>
        ctx.credentials.deleteRecord(
          credentialKey("asset-library", "s3-" + id),
        ),
    },
  );
  await library.init();
  ctx.effect(() => () => library.dispose());
  const service: Record<string, unknown> = { ctx };
  for (const method of Object.keys(endpoints) as Method[])
    service[method] = async (request: never, signal: AbortSignal) => {
      try {
        return await library.dispatch(method, request, signal);
      } catch (e) {
        signal.throwIfAborted();
        throw new RemoteError("asset-library/operation-failed", message(e), {
          retryable: false,
        });
      }
    };
  service.typertRemote = bindTypertRemote(service, "assetLibrary");
  ctx.provide("assetLibrary", service);
  ctx.effect(() =>
    ctx.typert.register({
      package: contribution.package,
      face: "host",
      schemas: [],
      model: { services: [], events: [], objects: [] },
      invocations: contribution.descriptors,
    }),
  );
  await registerAssistant(ctx, library);
}
