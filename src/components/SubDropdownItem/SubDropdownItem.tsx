"use client";

import { type FC, type ReactNode, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";

interface SubDropdownItemProps {
  label?: string;
  state?: "default" | "hover" | "selected";
  danger?: boolean;
  checkbox?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const SubDropdownItem: FC<SubDropdownItemProps> = ({
  label = "Label",
  state = "default",
  danger = false,
  checkbox = false,
  leftIcon,
  rightIcon,
  onClick,
  className,
}) => {
  const [naturalHovered, setNaturalHovered] = useState(false);
  const isHovered = state === "hover" || naturalHovered;
  const isActive = isHovered || state === "selected";

  return (
    <div
      className={className}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onMouseEnter={() => setNaturalHovered(true)}
      onMouseLeave={() => setNaturalHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        width: "100%",
        borderRadius: "var(--radius-md, 6px)",
        boxSizing: "border-box",
        cursor: onClick ? "pointer" : undefined,
        padding: 6,
        ...getBackground(isActive, danger),
      }}
    >
      {/* Checkbox */}
      {checkbox && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            margin: -6,
          }}
        >
          <Checkbox
            checked={state === "selected"}
            _hovered={isHovered}
          />
        </div>
      )}

      {/* Left Icon */}
      {leftIcon && (
        <div
          style={{
            width: 13,
            height: 13,
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {leftIcon}
        </div>
      )}

      {/* Label */}
      <span
        style={{
          flex: "1 1 0",
          minWidth: 0,
          fontFamily: "var(--font-sans, 'Inter', sans-serif)",
          fontSize: 13,
          fontWeight: 450,
          lineHeight: "13px",
          letterSpacing: "-0.039px",
          color: danger
            ? "var(--color-text-danger-secondary, #dc455a)"
            : "var(--color-text-primary, #24231f)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      {/* Right Icon */}
      {rightIcon && (
        <div
          style={{
            width: 13,
            height: 13,
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default SubDropdownItem;

/* ─── Helpers ─── */

function getBackground(
  isActive: boolean,
  danger: boolean,
): React.CSSProperties {
  if (!isActive) return {};

  if (danger) {
    return {
      background: "var(--color-fill-light-danger-static, #ffe0e1)",
      boxShadow:
        "inset 0 0 0 0.5px var(--color-fill-light-danger-static, #ffe0e1)",
    };
  }

  return {
    background: "var(--color-fill-levels-natural-lg, #f0f0ef)",
    boxShadow:
      "inset 0 0 0 0.5px var(--color-fill-levels-natural-lg, #f0f0ef)",
  };
}
