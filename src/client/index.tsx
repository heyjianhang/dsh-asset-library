import type { Context } from "@deepseek-ai/cordis";
import type {} from "@deepseek-ai/dsh-api-remotes/client";
import type {} from "@deepseek-ai/dsh-client-locale/client";
import type {} from "@deepseek-ai/dsh-client-ui-renderer/client";
import type {} from "@deepseek-ai/dsh-client-ui-sidebar/client";
import type {} from "@deepseek-ai/dsh-client-ui-settings/client";
import type { MainPanelId } from "@deepseek-ai/dsh-client-ui-layout/client";
import { IconFolderOpenOutlineRegular } from "@deepseek-ai/dsh-client-ui-primitives";
import { createSnapshotStore } from "@deepseek-ai/dsh-client-store";
import type { PropsRuntime } from "@deepseek-ai/dsh-client-ui-slots";
import {
  contribution,
  type Input,
  type Method,
  type Output,
} from "../shared/contracts.ts";
import { zh, en } from "./locales.ts";
import { Page, Sidebar } from "./views.tsx";
import { LibraryNotifications } from "./notifications.tsx";
import { SettingsPage } from "./settings.tsx";
import { createViewStore } from "./view-store.ts";
import type { Catalog, Injected, Request } from "./props.ts";
import { cssText } from "./library.module.css";
import { AssetEditor, type EditorSnapshot } from "./asset-editor.ts";
export const inject = ["slots", "layout", "locale", "remote"];
const PANEL = "asset-library" as MainPanelId;
function LibraryIcon(p: PropsRuntime<"sidebar.panellist">) {
  return <IconFolderOpenOutlineRegular size={p.size} />;
}
export async function apply(ctx: Context) {
  ctx.effect(() => ctx.locale.register("asset-library", { zh, en }));
  ctx.effect(() => {
    const s = document.createElement("style");
    s.dataset.plugin = "dsh-asset-library";
    s.textContent = cssText;
    document.head.append(s);
    return () => s.remove();
  });
  await ctx.remote.$mount(contribution);
  ctx.inject(["remote.assetLibrary"], (ctx) => {
    const store = createViewStore(),
      catalog = createSnapshotStore<Catalog>({}),
      edits = createSnapshotStore<EditorSnapshot>({});
    let ended = false,
      reading = false,
      previous: MainPanelId | null =
        ctx.layout.panelInfo.getSnapshot().activePanelId;
    const abort = new AbortController();
    const request: Request = async <K extends Method>(
      method: K,
      input: Input<K>,
      signal?: AbortSignal,
    ) => {
      if (method === "library") {
        const operation = input as Input<"library">;
        if (operation.action === "close") {
          await editor.flushAll();
          if (
            Object.values(edits.getSnapshot()).some(
              (edit) =>
                edit.target.libraryId === operation.id &&
                edit.status === "error",
            )
          )
            throw new Error(
              "\u8fd8\u6709\u4fee\u6539\u672a\u4fdd\u5b58\uff0c\u8bf7\u5148\u91cd\u8bd5\u540e\u518d\u5173\u95ed\u7d20\u6750\u5e93",
            );
        }
      }
      if (
        method === "collection" &&
        (input as Input<"collection">).action === "delete"
      ) {
        await editor.flushAll();
        const libraryId = (input as Input<"collection">).libraryId;
        if (
          Object.values(edits.getSnapshot()).some(
            (edit) =>
              edit.target.libraryId === libraryId && edit.status === "error",
          )
        )
          throw new Error(
            ctx.locale.bind("asset-library")("deletePendingEdits"),
          );
      }
      const call = ctx.remote.assetLibrary[method] as (
        request: Input<K>,
        signal?: AbortSignal,
      ) => Promise<
        { ok: true; value: Output<K> } | { ok: false; error: Error }
      >;
      const result = await call(
        input,
        signal ? AbortSignal.any([abort.signal, signal]) : abort.signal,
      );
      if (!result.ok) throw result.error;
      return result.value;
    };
    const readCatalog = async (force = false) => {
      if (ended || reading) return;
      reading = true;
      try {
        const data = await request("snapshot", {});
        if (
          !ended &&
          (force ||
            catalog.getSnapshot().error ||
            JSON.stringify(catalog.getSnapshot().data) !== JSON.stringify(data))
        )
          catalog.set({
            data,
            revision: (catalog.getSnapshot().revision ?? 0) + 1,
          });
      } catch (e) {
        if (!ended)
          catalog.set({
            ...catalog.getSnapshot(),
            error: e instanceof Error ? e.message : zh.error,
          });
      } finally {
        reading = false;
      }
    };
    const refresh = () => readCatalog(true);
    const draftKey = "dsh.asset-library.pending-edits";
    const editor = new AssetEditor({
      write: async (target, patch) => {
        if (
          patch.tags &&
          (patch.tags.length > 50 || patch.tags.some((tag) => tag.length > 80))
        )
          throw new Error(
            "\u6807\u7b7e\u6700\u591a 50 \u4e2a\uff0c\u6bcf\u4e2a\u6807\u7b7e\u6700\u591a 80 \u4e2a\u5b57\u7b26\uff0c\u8bf7\u7f29\u77ed\u540e\u91cd\u8bd5\u3002",
          );
        if (patch.notes && patch.notes.length > 10000)
          throw new Error(
            "\u5907\u6ce8\u6700\u591a 10000 \u4e2a\u5b57\u7b26\uff0c\u8bf7\u7f29\u77ed\u540e\u91cd\u8bd5\u3002",
          );
        if (patch.collectionIds && patch.collectionIds.length > 100)
          throw new Error(
            "\u4e00\u4e2a\u7d20\u6750\u6700\u591a\u52a0\u5165 100 \u4e2a\u6536\u85cf\u5939\uff0c\u8bf7\u51cf\u5c11\u5df2\u9009\u9879\u3002",
          );
        return request("editAsset", {
          libraryId: target.libraryId,
          id: target.id,
          ...patch,
        });
      },
      publish: (value) => edits.set(value),
      refresh,
      persist: (value) => {
        if (value.length) localStorage.setItem(draftKey, JSON.stringify(value));
        else localStorage.removeItem(draftKey);
      },
    });
    try {
      const pending = JSON.parse(localStorage.getItem(draftKey) ?? "[]");
      if (Array.isArray(pending)) editor.restore(pending);
    } catch {
      /* A malformed browser draft must not stop the plugin. */
    }
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (editor.hasPending()) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    ctx.effect(() => () => {
      editor.dispose();
      window.removeEventListener("beforeunload", beforeUnload);
    });
    const back = () => {
      try {
        ctx.layout.selectPanel(previous === PANEL ? null : previous);
      } catch {
        ctx.layout.selectPanel(null);
      }
    };
    let chooseDirectory: (() => Promise<string | undefined>) | undefined;
    ctx.inject(["remote.directoryPicker"], (pickerCtx) => {
      chooseDirectory = async () => {
        const result = await pickerCtx.remote.directoryPicker.pick();
        if (!result.ok) throw result.error;
        return result.value ?? undefined;
      };
      return () => {
        chooseDirectory = undefined;
      };
    });
    const injected = (): Injected => ({
      hooks: { catalog, edits },
      editAsset: (target, patch, immediate) =>
        editor.stage(target, patch, immediate),
      flushEdits: (key) =>
        key ? editor.flush(key) : editor.flushAll().then(() => {}),
      request,
      refresh,
      onBack: back,
      onToggle: () => ctx.layout.toggleSidebar(),
      openLibraryPanel: () => ctx.layout.selectPanel(PANEL),
      pickDirectory: async () => {
        if (!chooseDirectory)
          throw new Error(ctx.locale.bind("asset-library")("folderHint"));
        return chooseDirectory();
      },
    });
    ctx.slots.inject("shell.overlay", () =>
      ctx.slots.register(
        {
          name: "shell.overlay",
          id: "asset-library.notifications",
          locale: "asset-library",
          store,
          inject: injected,
        },
        LibraryNotifications,
      ),
    );
    ctx.slots.inject("settings.section", () =>
      ctx.slots.register(
        {
          name: "settings.section",
          id: "asset-library",
          order: 60,
          label: () => ctx.locale.bind("asset-library")("title"),
          locale: "asset-library",
          store,
          inject: injected,
        },
        SettingsPage,
      ),
    );
    ctx.slots.inject("main", () =>
      ctx.slots.register(
        {
          name: "main",
          key: PANEL,
          locale: "asset-library",
          store,
          inject: injected,
        },
        Page,
      ),
    );
    ctx.slots.inject("sidebar.panellist", () =>
      ctx.slots.register(
        {
          name: "sidebar.panellist",
          id: PANEL,
          order: 15,
          locale: "asset-library",
          label: () => ctx.locale.bind("asset-library")("title"),
        },
        LibraryIcon,
      ),
    );
    let removeSidebar: (() => unknown) | undefined;
    ctx.slots.inject("sidebar", () => {
      const sync = () => {
        const id = ctx.layout.panelInfo.getSnapshot().activePanelId;
        if (id === PANEL && !removeSidebar)
          removeSidebar = ctx.slots.register(
            {
              name: "sidebar",
              priority: -50,
              locale: "asset-library",
              store,
              inject: injected,
            },
            Sidebar,
          );
        else if (id !== PANEL) {
          removeSidebar?.();
          removeSidebar = undefined;
          previous = id;
        }
      };
      const off = ctx.layout.panelInfo.subscribe(sync);
      sync();
      return () => {
        off();
        removeSidebar?.();
        removeSidebar = undefined;
      };
    });
    void refresh();
    const timer = setInterval(() => {
      void readCatalog();
    }, 1500);
    ctx.effect(() => () => {
      ended = true;
      abort.abort();
      clearInterval(timer);
      if (ctx.layout.panelInfo.getSnapshot().activePanelId === PANEL) back();
    });
  });
}
