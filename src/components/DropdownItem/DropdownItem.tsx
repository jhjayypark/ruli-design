"use client";

import { type FC, type ReactNode, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import Avatar from "../Avatar/Avatar";

type AvatarType = "green" | "amber" | "purple" | "blue" | "red" | "photo";

interface DropdownItemProps {
  label?: string;
  supportText?: string;
  helpText?: string;
  state?: "default" | "hover" | "selected";
  danger?: boolean;
  avatar?: { type?: AvatarType; text?: string; src?: string };
  checkbox?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  subItems?: boolean;
  onClick?: () => void;
  className?: string;
}

const DropdownItem: FC<DropdownItemProps> = ({
  label = "Label",
  supportText,
  helpText,
  state = "default",
  danger = false,
  avatar,
  checkbox = false,
  leftIcon,
  rightIcon,
  subItems = false,
  onClick,
  className,
}) => {
  const [naturalHovered, setNaturalHovered] = useState(false);
  const isHovered = state === "hover" || naturalHovered;
  const isActive = isHovered || state === "selected";
  const hasAvatar = !!avatar;

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
        cursor: onClick || subItems ? "pointer" : undefined,
        padding: hasAvatar ? "4px 6px 4px 4px" : 6,
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
            paddingLeft: hasAvatar ? 2 : 0,
          }}
        >
          <Checkbox
            checked={state === "selected"}
            _hovered={isHovered}
          />
        </div>
      )}

      {/* Avatar */}
      {hasAvatar && (
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <Avatar
            size="xs"
            type={avatar.type ?? "amber"}
            text={avatar.text ?? "A"}
            src={avatar.src}
          />
        </div>
      )}

      {/* Left Icon */}
      {leftIcon && !hasAvatar && (
        <IconContainer color={danger ? "var(--color-text-danger-secondary, #dc455a)" : "var(--color-text-pale, #9c9891)"}>{leftIcon}</IconContainer>
      )}

      {/* Text */}
      <div
        style={{
          flex: "1 1 0",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: supportText ? 6 : 0,
        }}
      >
        <span
          style={{
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

        {supportText && (
          <span
            style={{
              fontFamily: "var(--font-sans, 'Inter', sans-serif)",
              fontSize: 13,
              fontWeight: 400,
              lineHeight: "13px",
              letterSpacing: "-0.039px",
              color: "var(--color-text-secondary, #56534b)",
            }}
          >
            {supportText}
          </span>
        )}
      </div>

      {/* Help Text */}
      {helpText && (
        <span
          style={{
            flexShrink: 0,
            fontFamily: "var(--font-sans, 'Inter', sans-serif)",
            fontSize: 13,
            fontWeight: 450,
            lineHeight: "13px",
            letterSpacing: "-0.039px",
            color: "var(--color-text-pale, #9c9891)",
            whiteSpace: "nowrap",
          }}
        >
          {helpText}
        </span>
      )}

      {/* Right Icon / Chevron */}
      {subItems ? (
        <IconContainer>
          <ChevronRightSvg />
        </IconContainer>
      ) : rightIcon ? (
        <IconContainer>{rightIcon}</IconContainer>
      ) : null}
    </div>
  );
};

export default DropdownItem;

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

/* ─── Sub-components ─── */

function IconContainer({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <div
      style={{
        width: 13,
        height: 13,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        color,
      }}
    >
      {children}
    </div>
  );
}

function ChevronRightSvg() {
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
      <path
        d="M5.25 3.5L8.75 7L5.25 10.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Placeholder dashed-circle icon for demos */
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

/** Placeholder danger icon for demos */
export function PlaceholderDangerIcon() {
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
        stroke="var(--color-text-danger-secondary, #dc455a)"
        strokeWidth="1.2"
        strokeDasharray="2.5 2"
        strokeLinecap="round"
        opacity={0.45}
      />
    </svg>
  );
}
