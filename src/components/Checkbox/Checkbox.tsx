"use client";

import { type FC, useRef, useEffect, useState } from "react";

interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  preview?: boolean;
  /** @internal Force hover visual state (for Storybook) */
  _hovered?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  preview = false,
  _hovered: forceHovered,
  onChange,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [naturalHovered, setNaturalHovered] = useState(false);
  const hovered = forceHovered ?? naturalHovered;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const filled = checked || indeterminate;
  const showCheck = checked && !indeterminate;
  const showMinus = indeterminate;

  return (
    <label
      className={className}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 25, height: 25, cursor: disabled ? "not-allowed" : "pointer" }}
      onMouseEnter={() => !disabled && setNaturalHovered(true)}
      onMouseLeave={() => setNaturalHovered(false)}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          opacity: 0,
          cursor: "inherit",
          WebkitAppearance: "none",
          appearance: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          boxSizing: "border-box",
          width: 13,
          height: 13,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "var(--radius-rounded, 4px)",
          flexShrink: 0,
          ...getBoxStyle(filled, disabled, preview, hovered),
        }}
      >
        {showCheck && <CheckSvg fill={getIconFill(disabled, preview)} />}
        {showMinus && <MinusBar fill={getIconFill(disabled, preview)} />}
      </div>
    </label>
  );
};

export default Checkbox;

/* ─── Box style per state ─── */

function getBoxStyle(
  filled: boolean,
  disabled: boolean,
  preview: boolean,
  hovered: boolean,
): React.CSSProperties {
  if (disabled) {
    return {
      background: "var(--color-fill-levels-natural-lg, #f0f0ef)",
      boxShadow: "inset 0 0 0 0.5px var(--color-border-medium, #d6d4d2)",
    };
  }

  if (preview && filled) {
    return {
      background: "var(--color-alpha-100, rgba(36,35,31,0.1))",
    };
  }

  if (filled) {
    return {
      background: hovered
        ? "var(--color-fill-bold-neutral-hover, #3b3934)"
        : "var(--color-fill-bold-neutral-static, #56534b)",
    };
  }

  // unchecked
  return {
    background: "var(--color-fill-levels-floating-sm, #fff)",
    boxShadow: hovered
      ? "inset 0 0 0 2px var(--color-border-highlight, #9c9891)"
      : "inset 0 0 0 2px var(--color-border-high, #ccc8c3)",
  };
}

function getIconFill(disabled: boolean, preview: boolean): string {
  return disabled || preview ? "#9C9891" : "#fff";
}

/* ─── Icons — exact Figma paths ─── */

function CheckSvg({ fill }: { fill: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="6"
      viewBox="0 0 6.65 5.95"
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M5.089.332C5.389-.047 5.939-.111 6.318.189 6.697.489 6.76 1.04 6.461 1.419L3.136 5.618C2.976 5.82 2.735 5.942 2.478 5.95 2.22 5.958 1.972 5.852 1.8 5.66L.225 3.91C-.099 3.551-.07 2.998.29 2.675.649 2.351 1.202 2.38 1.525 2.74L2.407 3.719 5.089.332Z"
        fill={fill}
      />
    </svg>
  );
}

function MinusBar({ fill }: { fill: string }) {
  return (
    <div
      style={{
        width: 7,
        height: 2,
        borderRadius: 1,
        backgroundColor: fill,
        flexShrink: 0,
      }}
    />
  );
}
