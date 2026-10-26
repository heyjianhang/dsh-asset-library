import { useRef, useState, type ReactNode } from "react";
import {
  Button,
  Menu,
  IconChevronDownOutlineRegular,
} from "@deepseek-ai/dsh-client-ui-primitives";
import css from "./library.module.css";

/** Host menu with one selected value; portaling keeps it clear of inspectors. */
export function ChoiceMenu<T extends string>(p: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange(value: T): void;
  disabled?: boolean;
  compact?: boolean;
  prefix?: string;
  icon?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  return (
    <div ref={anchor} className={p.compact ? css.compactChoice : css.choice}>
      <Menu
        open={open}
        onClose={() => setOpen(false)}
        portal
        autoFocus
        selectedId={p.value}
        className={css.choiceMenu}
        listClassName={css.choiceList}
        anchor={
          <Button
            variant={p.compact ? "ghost" : "outline"}
            size={p.compact ? "sm" : "md"}
            className={css.choiceTrigger}
            disabled={p.disabled}
            aria-label={p.label}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => {
              setWidth(anchor.current?.getBoundingClientRect().width ?? 0);
              setOpen(!open);
            }}
          >
            {p.icon}
            {p.prefix && <small>{p.prefix}</small>}
            <span>{p.options.find((o) => o.id === p.value)?.label}</span>
            <IconChevronDownOutlineRegular size={14} />
          </Button>
        }
        onSelect={(id) => {
          p.onChange(id as T);
          setOpen(false);
        }}
        items={p.options}
      >
        {/* A width spacer inherits neither theme nor layout from the portal's parent. */}
        <div
          aria-hidden
          style={{ width: Math.max(152, width - 8), height: 0, flex: "none" }}
        />
      </Menu>
    </div>
  );
}
