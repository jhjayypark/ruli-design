"use client";

import { type FC, useState } from "react";

interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Toggle: FC<ToggleProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  className,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const checked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleChange = () => {
    if (disabled) return;
    const next = !checked;
    if (controlledChecked === undefined) setInternalChecked(next);
    onChange?.(next);
  };

  /* ── Track background ── */
  const trackBg = checked
    ? "var(--color-fill-bold-brand-static)"
    : "var(--color-fill-levels-natural-xxl)";

  /* ── Knob position: fixed at endpoints ── */
  const knobLeft = checked ? 10 : 2;

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
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
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

      {/* Track */}
      <div
        style={{
          position: "relative",
          width: 21,
          height: 13,
          borderRadius: "var(--radius-full)",
          background: trackBg,
          overflow: "hidden",
          transition: "background 150ms ease",
        }}
      >
        {/* Knob — spring animation on toggle */}
        <div
          style={{
            position: "absolute",
            top: 2,
            left: knobLeft,
            width: 9,
            height: 9,
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--color-text-static)",
            transition: "left 300ms cubic-bezier(0.34, 1.56, 0.45, 1)",
          }}
        />
      </div>
    </label>
  );
};

export default Toggle;
