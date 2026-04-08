"use client";

import {
  type FC,
  type ReactNode,
  type ChangeEvent,
  useId,
  useState,
} from "react";
import { IconPlus, IconGlobe, IconNote, IconArrowUp } from "nucleo-micro-bold";
import { Button } from "../Button";
import { FileCard } from "../FileCard";
import { type FileType } from "../FileIcon";

export type ChatInputState = "default" | "hover" | "focused" | "typing";

export interface ChatInputAttachment {
  label: string;
  fileType?: FileType;
}

export interface ChatInputProps {
  state?: ChatInputState;
  attached?: boolean;
  value?: string;
  placeholder?: string;
  suggestions?: string[];
  attachments?: ChatInputAttachment[];
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSend?: () => void;
  onAttach?: () => void;
  onWeb?: () => void;
  onNote?: () => void;
  onRemoveAttachment?: (index: number) => void;
  className?: string;
}

const ChatInput: FC<ChatInputProps> = ({
  state = "default",
  attached = false,
  value,
  placeholder = "Ask anything...",
  suggestions = ["Summarize", "Find risks", "Comment insights"],
  attachments = [],
  onChange,
  onFocus,
  onBlur,
  onSend,
  onAttach,
  onWeb,
  onNote,
  onRemoveAttachment,
  className,
}) => {
  const uid = useId();
  const placeholderClass = `ruli-chat-${uid.replace(/:/g, "")}`;

  const isTyping = state === "typing";
  const hasContent = isTyping && value && value.length > 0;
  const showTags = !isTyping;

  /* Send button active when typing with content, or when attached with content */
  const sendActive = hasContent || (attached && attachments.length > 0);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: 350,
      }}
    >
      {/* Placeholder style */}
      <style>{`
        .${placeholderClass}::placeholder {
          color: ${state === "hover"
            ? "var(--color-text-secondary, #56534b)"
            : "var(--color-text-pale, #9c9891)"};
          opacity: 1;
        }
      `}</style>

      {/* Background layer with shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "var(--radius-2xl, 16px)",
          background: "var(--color-fill-levels-inverse-xl, white)",
          border: "0.5px solid var(--color-border-light, #e8e6e4)",
          boxShadow: getShadow(state),
          pointerEvents: "none",
        }}
      />

      {/* Content container */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
        }}
      >
        {/* Tags row — suggestion chips or file attachments */}
        {showTags && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 12px 0 12px",
              flexWrap: "wrap",
            }}
          >
            {attached && attachments.length > 0
              ? attachments.map((att, i) => (
                  <FileCard
                    key={i}
                    label={att.label}
                    fileType={att.fileType ?? "PDF"}
                    size="micro"
                    onRemove={
                      onRemoveAttachment
                        ? () => onRemoveAttachment(i)
                        : undefined
                    }
                  />
                ))
              : suggestions.map((s) => (
                  <Button key={s} variant="light" intent="neutral" size="sm">
                    {s}
                  </Button>
                ))}
          </div>
        )}

        {/* Textarea area */}
        <div
          style={{
            padding: isTyping ? "12px 16px" : "8px 16px",
          }}
        >
          <textarea
            className={placeholderClass}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            rows={isTyping ? 5 : 2}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              padding: 0,
              margin: 0,
              width: "100%",
              resize: "none",
              boxSizing: "border-box",
              ...baseTextStyle,
              lineHeight: "20px",
              color: "var(--color-text-primary, #24231f)",
              caretColor: "var(--color-border-focus-brand, #8a5fe2)",
            }}
          />
        </div>

        {/* Actions bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px 10px 10px",
          }}
        >
          {/* Left icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ActionButton onClick={onAttach} aria-label="Attach">
              <IconPlus size="13px" />
            </ActionButton>
            <ActionButton onClick={onWeb} aria-label="Web">
              <IconGlobe size="13px" />
            </ActionButton>
            <ActionButton onClick={onNote} aria-label="Note">
              <IconNote size="13px" />
            </ActionButton>
          </div>

          {/* Send button */}
          <button
            onClick={onSend}
            disabled={!sendActive}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 25,
              height: 25,
              borderRadius: "var(--radius-md, 6px)",
              border: "none",
              outline: "none",
              cursor: sendActive ? "pointer" : "default",
              background: getSendBackground(state, sendActive, attached),
              padding: 0,
              flexShrink: 0,
              color: sendActive ? "white" : "var(--color-text-pale, #9c9891)",
            }}
          >
            <IconArrowUp size="13px" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

/* ─── Shared styles ─── */

const baseTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
  fontSize: 13,
  fontWeight: 450,
  letterSpacing: "-0.039px",
};

/* ─── Sub-components ─── */

function ActionButton({
  children,
  onClick,
  ...rest
}: {
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 25,
        height: 25,
        borderRadius: "var(--radius-md, 6px)",
        border: "none",
        outline: "none",
        cursor: "pointer",
        background: hovered
          ? "var(--color-fill-levels-engraved-lg, #f0f0ef)"
          : "transparent",
        padding: 0,
        color: "var(--color-text-pale, #9c9891)",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ─── Helpers ─── */

function getShadow(state: ChatInputState): string {
  switch (state) {
    case "hover":
    case "focused":
    case "typing":
      return "0px 16px 32px rgba(36, 35, 31, 0.08), 0px 0px 0px 0.5px var(--color-border-light, #e8e6e4)";
    default:
      return "none";
  }
}

function getSendBackground(
  state: ChatInputState,
  active: boolean,
  attached: boolean,
): string {
  if (!active) {
    return "var(--color-fill-levels-engraved-lg, #f0f0ef)";
  }
  if (state === "typing") {
    return "var(--color-fill-bold-brand-static, #8a5fe2)";
  }
  if (attached) {
    if (state === "hover" || state === "focused") {
      return "var(--color-fill-bold-neutral-static, #56534b)";
    }
    return "var(--color-fill-bold-brand-static, #8a5fe2)";
  }
  return "var(--color-fill-bold-brand-static, #8a5fe2)";
}
