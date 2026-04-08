"use client";

import { type FC, type ReactNode } from "react";

type TextAlign = "left" | "center" | "right";
type TextPresetSize = "sm" | "md";

interface TextPresetProps {
  /** Primary (bold) text */
  primaryText?: ReactNode;
  /** Support / secondary text */
  supportText?: ReactNode;
  /** Text alignment */
  align?: TextAlign;
  /** Size — sm: 13px primary, md: 15px primary */
  size?: TextPresetSize;
  /** When true, primary text appears first; when false, support text first */
  primaryFirst?: boolean;
  /** When true, support text wraps across multiple lines;
   *  when false, support text is truncated to a single line */
  multiLine?: boolean;
  className?: string;
}

const TextPreset: FC<TextPresetProps> = ({
  primaryText = "Primary text",
  supportText = "Support text for users. Just an example we'll be using for this preset so it's easier to use this component",
  align = "left",
  size = "sm",
  primaryFirst = true,
  multiLine = false,
  className,
}) => {
  const isMd = size === "md";

  /* ── Gap between primary & support ── */
  const gap = multiLine
    ? isMd
      ? "var(--spacing-4)" /* 16px */
      : "var(--spacing-3)" /* 12px */
    : isMd
      ? "var(--spacing-2-5)" /* 10px */
      : "var(--spacing-1-75)"; /* 7px */

  /* ── Primary text element ── */
  const primary = primaryText != null && (
    <p
      style={{
        margin: 0,
        width: "100%",
        flexShrink: 0,
        fontFamily: "var(--font-sans)",
        fontSize: isMd ? "var(--text-md)" : "var(--text-sm)",
        fontWeight: "var(--font-weight-medium)",
        lineHeight: isMd
          ? "var(--leading-single-md)"
          : "var(--leading-single-sm)",
        letterSpacing: isMd ? "var(--tracking-md)" : "var(--tracking-sm)",
        color: "var(--color-text-primary)",
        textAlign: align,
      }}
    >
      {primaryText}
    </p>
  );

  /* ── Support text element ── */
  const support = supportText != null && (
    multiLine ? (
      /* Multi-line: wrapping body with 21px line-height, py 2px container */
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          paddingTop: "var(--spacing-0-5)",
          paddingBottom: "var(--spacing-0-5)",
          width: "100%",
          flexShrink: 0,
        }}
      >
        <p
          style={{
            margin: 0,
            flex: "1 0 0",
            minWidth: 0,
            minHeight: 1,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            lineHeight: "var(--leading-multi-sm)",
            letterSpacing: "var(--tracking-sm)",
            color: "var(--color-text-secondary)",
            textAlign: align,
          }}
        >
          {supportText}
        </p>
      </div>
    ) : (
      /* Single-line: truncated with ellipsis */
      <p
        style={{
          margin: 0,
          width: "100%",
          flexShrink: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-regular)",
          lineHeight: "var(--leading-single-sm)",
          letterSpacing: "var(--tracking-sm)",
          color: "var(--color-text-secondary)",
          textAlign: align,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {supportText}
      </p>
    )
  );

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: 280,
        gap,
      }}
    >
      {primaryFirst ? (
        <>
          {primary}
          {support}
        </>
      ) : (
        <>
          {support}
          {primary}
        </>
      )}
    </div>
  );
};

export default TextPreset;
