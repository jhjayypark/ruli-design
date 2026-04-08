"use client";

import { type FC, useState } from "react";

interface RadioButtonProps {
  checked?: boolean;
  disabled?: boolean;
  /** @internal Force hover visual state (for Storybook) */
  _hovered?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  className?: string;
}

const RadioButton: FC<RadioButtonProps> = ({
  checked = false,
  disabled = false,
  _hovered: forceHovered,
  onChange,
  name,
  value,
  className,
}) => {
  const [naturalHovered, setNaturalHovered] = useState(false);
  const hovered = forceHovered ?? naturalHovered;

  return (
    <label
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 25,
        height: 25,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={() => !disabled && setNaturalHovered(true)}
      onMouseLeave={() => setNaturalHovered(false)}
    >
      <input
        type="radio"
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
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
          borderRadius: "var(--radius-full, 100px)",
          flexShrink: 0,
          ...getBoxStyle(checked, disabled, hovered),
        }}
      >
        {checked && (
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "var(--radius-full, 100px)",
              backgroundColor: getDotFill(disabled),
              flexShrink: 0,
            }}
          />
        )}
      </div>
    </label>
  );
};

export default RadioButton;

/* ─── Box style per state ─── */

function getBoxStyle(
  checked: boolean,
  disabled: boolean,
  hovered: boolean,
): React.CSSProperties {
  if (disabled) {
    return {
      background: "var(--color-fill-levels-natural-lg, #f0f0ef)",
      boxShadow: "inset 0 0 0 0.5px var(--color-border-medium, #d6d4d2)",
    };
  }

  if (checked) {
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

function getDotFill(disabled: boolean): string {
  return disabled
    ? "var(--color-text-muted, #ccc8c3)"
    : "var(--color-fill-levels-floating-lg, #fff)";
}
