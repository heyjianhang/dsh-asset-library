import { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Switch,
  IconFolderOpenOutlineRegular,
} from "@deepseek-ai/dsh-client-ui-primitives";
import type { PropsRuntime } from "@deepseek-ai/dsh-client-ui-slots";
import type {} from "@deepseek-ai/dsh-client-ui-settings/client";
import type { SharedProps } from "./props.ts";
import type { Settings, Input as RequestInput } from "../shared/contracts.ts";
import type { Key } from "./locales.ts";
import { TransferDialog, TransferList } from "./transfers.tsx";
import css from "./library.module.css";

export function SettingsPage(
  p: PropsRuntime<"settings.section"> & SharedProps,
) {
  const data = p.useCatalog((s) => s.data);
  return data ? (
    <SettingsForm {...p} initial={data.settings} />
  ) : (
    <p>{p.t("busy")}</p>
  );
}
function SettingsForm(p: SharedProps & { initial: Settings }) {
  const data = p.useCatalog((s) => s.data);
  const [value, setValue] = useState(p.initial),
    [secret, setSecret] = useState({
      apiKey: "",
      accessKeyId: "",
      secretAccessKey: "",
      sessionToken: "",
    });
  const [status, setStatus] = useState<Key>("saved"),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false);
  const [errorTarget, setErrorTarget] = useState<{
    kind: "ark" | "s3";
    test: boolean;
  }>();
  const [transfer, setTransfer] = useState<{
    kind: "import" | "export";
    libraryId?: string;
  }>();
  const sequence = useRef(Promise.resolve()),
    revision = useRef(0),
    saved = useRef(JSON.stringify(p.initial));
  const pending = useRef<(() => void) | undefined>();
  const queue = (payload: RequestInput<"saveSettings">) => {
    const current = ++revision.current;
    setStatus("autoSaving");
    setError("");
    setErrorTarget(undefined);
    const next = sequence.current
      .catch(() => {})
      .then(async () => {
        await p.request("saveSettings", payload);
        saved.current = JSON.stringify(value);
        if (current === revision.current) setStatus("saved");
        await p.refresh();
      });
    sequence.current = next;
    void next.catch((e) => {
      if (current === revision.current) {
        setStatus("saveFailed");
        setError(e.message);
      }
    });
    return next;
  };
  pending.current = () => {
    if (JSON.stringify(value) !== saved.current)
      void queue(value).catch(() => {});
  };
  useEffect(() => () => pending.current?.(), []);
  useEffect(() => {
    if (JSON.stringify(value) === saved.current) return;
    setStatus("unsaved");
    const timer = setTimeout(() => {
      void queue(value).catch(() => {});
    }, 750);
    return () => clearTimeout(timer);
  }, [value]);
  const change = <K extends keyof Settings>(key: K, next: Settings[K]) =>
    setValue((v) => ({ ...v, [key]: next }));
  const input = (
    key:
      | "model"
      | "baseUrl"
      | "concurrency"
      | "maxRetries"
      | "segmentSeconds"
      | "ffmpegPath"
      | "ffprobePath",
    label: Key,
    type = "text",
    min?: number,
    max?: number,
  ) => (
    <label>
      {p.t(label)}
      <Input
        type={type}
        min={min}
        max={max}
        value={value[key]}
        onChange={(e) =>
          change(
            key,
            (type === "number"
              ? Number(e.target.value)
              : e.target.value) as never,
          )
        }
      />
    </label>
  );
  const s3input = (
    key: "endpoint" | "region" | "bucket" | "prefix",
    label: Key,
    placeholder?: string,
  ) => (
    <label>
      {p.t(label)}
      <Input
        value={value.s3[key]}
        placeholder={placeholder}
        onChange={(e) => change("s3", { ...value.s3, [key]: e.target.value })}
      />
    </label>
  );
  const credentials = (
    key: keyof typeof secret,
    label: Key,
    placeholder?: string,
  ) => (
    <label>
      {p.t(label)}
      <Input
        type="password"
        autoComplete="off"
        value={secret[key]}
        placeholder={placeholder}
        onChange={(e) => setSecret((s) => ({ ...s, [key]: e.target.value }))}
      />
    </label>
  );
  const connect = async (kind: "ark" | "s3", test: boolean) => {
    setBusy(true);
    setNotice("");
    try {
      await queue({
        ...value,
        ...(kind === "ark"
          ? { apiKey: secret.apiKey || undefined }
          : {
              accessKeyId: secret.accessKeyId || undefined,
              secretAccessKey: secret.secretAccessKey || undefined,
              sessionToken: secret.sessionToken || undefined,
            }),
      });
      setSecret((s) =>
        kind === "ark"
          ? { ...s, apiKey: "" }
          : { ...s, accessKeyId: "", secretAccessKey: "", sessionToken: "" },
      );
      if (test)
        await p.request(kind === "ark" ? "testConnection" : "testS3", {});
      setNotice(p.t(test ? "connected" : "settingsSaved"));
    } catch (e) {
      setError((e as Error).message);
      setErrorTarget({ kind, test });
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className={css.settingsPage}>
      <header className={css.settingsHeading}>
        <div>
          <h2>{p.t("title")}</h2>
        </div>
        <span role="status" className={css.meta}>
          {p.t(status)}
        </span>
      </header>
      {error && (
        <div role="alert" className={css.error}>
          {error}
          <Button
            size="sm"
            disabled={busy}
            onClick={() => {
              if (errorTarget) void connect(errorTarget.kind, errorTarget.test);
              else void queue(value).catch(() => {});
            }}
          >
            {p.t("retry")}
          </Button>
        </div>
      )}
      {notice && (
        <p role="status" className={css.muted}>
          {notice}
        </p>
      )}
      <section className={css.settingSection}>
        <h3>{p.t("storageTitle")}</h3>
        <p>{p.t("storageHelp")}</p>
        <div className={css.storageChoices}>
          {(["local", "s3"] as const).map((mode) => (
            <Button
              key={mode}
              variant="outline"
              aria-pressed={value.storageMode === mode}
              className={value.storageMode === mode ? css.storageSelected : ""}
              onClick={() => change("storageMode", mode)}
            >
              <strong>
                {p.t(mode === "local" ? "localStorage" : "s3Storage")}
              </strong>
              <span>{p.t(mode === "local" ? "localHelp" : "s3Help")}</span>
            </Button>
          ))}
        </div>
      </section>
      {value.storageMode === "local" ? (
        <section className={css.settingSection}>
          <h3>{p.t("localFolderTitle")}</h3>
          <div className={css.form}>
            <label>
              {p.t("localFolderLabel")}
              <div className={css.folderField}>
                <Input
                  value={value.localDirectory}
                  placeholder={p.t("localFolderPlaceholder")}
                  onChange={(e) => change("localDirectory", e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    void p
                      .pickDirectory()
                      .then((path) => {
                        if (path) change("localDirectory", path);
                      })
                      .catch((e) => setError(e.message))
                  }
                >
                  {p.t("chooseFolder")}
                </Button>
              </div>
            </label>
          </div>
        </section>
      ) : (
        <section className={css.settingSection}>
          <div className={css.settingTitle}>
            <h3>{p.t("s3Connection")}</h3>
            <span className={css.meta}>
              {p.t(data?.s3Configured ? "keySaved" : "keyMissing")}
            </span>
          </div>
          <div className={css.form}>
            {s3input("endpoint", "s3Endpoint", "https://s3.example.com")}
            <div className={css.twoColumns}>
              {s3input("bucket", "s3Bucket")}
              {s3input("region", "s3Region", "us-east-1")}
            </div>
            {s3input("prefix", "s3Prefix")}
            <div className={css.settingRow}>
              <div>
                <strong>{p.t("s3PathStyle")}</strong>
                <p>{p.t("s3PathHelp")}</p>
              </div>
              <Switch
                checked={value.s3.forcePathStyle}
                onChange={(checked) =>
                  change("s3", { ...value.s3, forcePathStyle: checked })
                }
                label={p.t("s3PathStyle")}
              />
            </div>
            <div className={css.twoColumns}>
              {credentials("accessKeyId", "accessKeyId")}
              {credentials("secretAccessKey", "secretAccessKey")}
            </div>
            <details>
              <summary>{p.t("temporaryToken")}</summary>
              {credentials("sessionToken", "sessionToken")}
            </details>
            <p className={css.muted}>{p.t("s3SecretHelp")}</p>
            <div className={css.row}>
              <Button
                variant="outline"
                disabled={
                  busy || !secret.accessKeyId || !secret.secretAccessKey
                }
                onClick={() => void connect("s3", false)}
              >
                {p.t("saveCredentials")}
              </Button>
              <Button disabled={busy} onClick={() => void connect("s3", true)}>
                {p.t("testS3")}
              </Button>
            </div>
          </div>
        </section>
      )}
      <section className={css.settingSection}>
        <h3>{p.t("aiConnection")}</h3>
        <div className={css.form}>
          {credentials(
            "apiKey",
            "apiKey",
            p.t(data?.keyConfigured ? "keySaved" : "keyMissing"),
          )}
          <p className={css.muted}>{p.t("credentialHint")}</p>
          {input("model", "model")}
          {input("baseUrl", "baseUrl")}
          <div className={css.row}>
            <Button
              variant="outline"
              disabled={busy || !secret.apiKey}
              onClick={() => void connect("ark", false)}
            >
              {p.t("saveCredentials")}
            </Button>
            <Button disabled={busy} onClick={() => void connect("ark", true)}>
              {p.t("test")}
            </Button>
          </div>
        </div>
      </section>
      <section className={css.settingSection}>
        <h3>{p.t("processingTitle")}</h3>
        <div className={css.form}>
          <div className={css.twoColumns}>
            {input("concurrency", "concurrency", "number", 1, 4)}
            {input("maxRetries", "retries", "number", 0, 5)}
          </div>
          {input("segmentSeconds", "segment", "number", 5, 60)}
          <details>
            <summary>{p.t("advancedTools")}</summary>
            <div className={css.form}>
              {input("ffmpegPath", "ffmpeg")}
              {input("ffprobePath", "ffprobe")}
            </div>
          </details>
        </div>
      </section>
      <section className={css.settingSection}>
        <div className={css.settingTitle}>
          <h3>{p.t("libraryMigration")}</h3>
          <Button
            variant="outline"
            onClick={() => setTransfer({ kind: "import" })}
          >
            {p.t("importZip")}
          </Button>
        </div>
        {data?.libraries.map((lib) => (
          <div key={lib.id} className={css.settingLibrary}>
            <IconFolderOpenOutlineRegular />
            <div>
              <strong>{lib.name}</strong>
              <span>
                {p.t(lib.storage.mode === "s3" ? "s3Storage" : "localStorage")}{" "}
                · {lib.count} {p.t("items")}
              </span>
            </div>
            <Button
              disabled={!lib.available}
              onClick={() => setTransfer({ kind: "export", libraryId: lib.id })}
            >
              {p.t("exportZip")}
            </Button>
          </div>
        ))}
        <TransferList {...p} />
      </section>
      {transfer && (
        <TransferDialog
          {...p}
          {...transfer}
          storageMode={value.storageMode}
          onClose={() => setTransfer(undefined)}
        />
      )}
    </div>
  );
}
