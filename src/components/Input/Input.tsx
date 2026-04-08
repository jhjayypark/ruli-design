"use client";

import { type FC, type ReactNode, type ChangeEvent, useId } from "react";

type InputState =
  | "default"
  | "hover"
  | "focused"
  | "typing"
  | "filled"
  | "disabled"
  | "typingError"
  | "filledError";

interface InputProps {
  label?: string;
  hint?: string;
  helpText?: string;
  placeholder?: string;
  value?: string;
  size?: "sm" | "lg";
  state?: InputState;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

const Input: FC<InputProps> = ({
  label,
  hint,
  helpText,
  placeholder = "Placeholder",
  value,
  size = "sm",
  state = "default",
  leftIcon,
  rightIcon,
  onChange,
  onFocus,
  onBlur,
  className,
}) => {
  const uid = useId();
  const isSmall = size === "sm";
  const isDisabled = state === "disabled";
  const isError = state === "typingError" || state === "filledError";

  const gap = isSmall ? 8 : 10;
  const boxPadding = isSmall ? 6 : 8;
  const boxGap = isSmall ? 6 : 8;
  const boxRadius = isSmall
    ? "var(--radius-md, 6px)"
    : "var(--radius-1-5md, 7px)";

  const placeholderClass = `ruli-input-${uid.replace(/:/g, "")}`;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap,
        width: "100%",
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

      {/* Input box */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: boxGap,
          padding: boxPadding,
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
          borderRadius: boxRadius,
          border: `0.5px solid ${getBorderColor(state)}`,
          background: getBackground(state, size),
          flexShrink: 0,
        }}
      >
        {/* Left Icon */}
        {leftIcon && <IconContainer>{leftIcon}</IconContainer>}

        {/* Input element */}
        <input
          type="text"
          className={placeholderClass}
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
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
            boxSizing: "border-box",
            ...baseTextStyle,
            lineHeight: "13px",
            color: "var(--color-text-primary, #24231f)",
            caretColor: isError
              ? "var(--color-border-focus-brand, #8a5fe2)"
              : "var(--color-border-focus-neutral, #24231f)",
            cursor: isDisabled ? "not-allowed" : undefined,
          }}
        />

        {/* Right Icon */}
        {rightIcon && <IconContainer>{rightIcon}</IconContainer>}
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

export default Input;

/* ─── Shared styles ─── */

const baseTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
  fontSize: 13,
  fontWeight: 450,
  letterSpacing: "-0.039px",
};

/* ─── Sub-components ─── */

function IconContainer({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: 13,
        height: 13,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Helpers ─── */

function getBorderColor(state: InputState): string {
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

function getBackground(state: InputState, size: "sm" | "lg"): string {
  switch (state) {
    case "hover":
    case "typing":
    case "typingError":
    case "disabled":
      return "var(--color-fill-levels-natural-depth, #fcfcfb)";
    case "focused":
      return size === "lg"
        ? "var(--color-fill-levels-natural-depth, #fcfcfb)"
        : "var(--color-fill-levels-inverse-lg, white)";
    default:
      return "var(--color-fill-levels-inverse-xl, white)";
  }
}

/* ─── Placeholder icons for stories ─── */

export function PlaceholderIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <circle
        cx="7"
        cy="7"
        r="5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="2.5 2"
        strokeLinecap="round"
        opacity={0.45}
      />
    </svg>
  );
}
