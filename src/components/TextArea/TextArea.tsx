"use client";

import { type FC, type ChangeEvent, useId } from "react";

type TextAreaState =
  | "default"
  | "hover"
  | "focused"
  | "typing"
  | "filled"
  | "disabled"
  | "typingError"
  | "filledError";

interface TextAreaProps {
  label?: string;
  hint?: string;
  helpText?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  /** Override default width (default: 320) */
  width?: number | string;
  /** Override default height when rows not specified (default: 96) */
  height?: number | string;
  state?: TextAreaState;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

const TextArea: FC<TextAreaProps> = ({
  label,
  hint,
  helpText,
  placeholder = "Placeholder",
  value,
  rows,
  width: widthProp,
  height: heightProp,
  state = "default",
  onChange,
  onFocus,
  onBlur,
  className,
}) => {
  const uid = useId();
  const isDisabled = state === "disabled";
  const isError = state === "typingError" || state === "filledError";

  const placeholderClass = `ruli-textarea-${uid.replace(/:/g, "")}`;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 8,
        width: widthProp ?? 320,
      }}
    >
      {/* Placeholder color style */}
      <style>{`
        .${placeholderClass}::placeholder {
          color: var(--color-text-pale, #9c9891);
          opacity: 1;
        }
      `}</style>

      {/* Label row */}
      {label && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            width: "100%",
            ...baseTextStyle,
            color: isDisabled
              ? "var(--color-text-pale, #9c9891)"
              : "var(--color-text-primary, #24231f)",
          }}
        >
          <span
            style={{
              flex: "1 0 0",
              minWidth: 0,
              minHeight: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              lineHeight: "13px",
            }}
          >
            {label}
          </span>
          {hint && (
            <span
              style={{
                flexShrink: 0,
                whiteSpace: "nowrap",
                color: "var(--color-text-pale, #9c9891)",
                lineHeight: "13px",
              }}
            >
              {hint}
            </span>
          )}
        </div>
      )}

      {/* Textarea box */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: 6,
          width: "100%",
          height: rows ? undefined : (heightProp ?? 96),
          boxSizing: "border-box",
          overflow: "hidden",
          borderRadius: "var(--radius-lg, 8px)",
          border: `0.5px solid ${getBorderColor(state)}`,
          background: getBackground(state),
          flexShrink: 0,
        }}
      >
        <textarea
          className={placeholderClass}
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          rows={rows}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            padding: 0,
            margin: 0,
            flex: "1 0 0",
            minWidth: 0,
            minHeight: 1,
            height: "100%",
            boxSizing: "border-box",
            resize: "none",
            ...baseTextStyle,
            lineHeight: "var(--leading-multi-sm, 21px)",
            color: "var(--color-text-primary, #24231f)",
            caretColor: isError
              ? "var(--color-border-focus-brand, #8a5fe2)"
              : "var(--color-border-focus-neutral, #24231f)",
            cursor: isDisabled ? "not-allowed" : undefined,
          }}
        />
      </div>

      {/* Help text */}
      {helpText && (
        <span
          style={{
            ...baseTextStyle,
            lineHeight: "13px",
            height: 13,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: isError
              ? "var(--color-text-danger-secondary, #dc455a)"
              : "var(--color-text-pale, #9c9891)",
          }}
        >
          {helpText}
        </span>
      )}
    </div>
  );
};

export default TextArea;

/* ─── Shared styles ─── */

const baseTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
  fontSize: 13,
  fontWeight: 450,
  letterSpacing: "-0.039px",
};

/* ─── Helpers ─── */

function getBorderColor(state: TextAreaState): string {
  switch (state) {
    case "hover":
      return "var(--color-border-high, #ccc8c3)";
    case "focused":
    case "typing":
      return "var(--color-border-focus-neutral, #24231f)";
    case "typingError":
    case "filledError":
      return "var(--color-border-focus-error, #dc455a)";
    default:
      return "var(--color-border-medium, #d6d4d2)";
  }
}

function getBackground(state: TextAreaState): string {
  switch (state) {
    case "hover":
    case "focused":
    case "typing":
    case "typingError":
    case "disabled":
      return "var(--color-fill-levels-natural-depth, #fcfcfb)";
    default:
      return "var(--color-fill-levels-inverse-xl, white)";
  }
}
