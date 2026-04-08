"use client";

import { type FC, type ReactNode } from "react";

export type ToastButtonVariant = "bold" | "light" | "ghost";
export type ToastButtonIntent = "neutral" | "danger";

export interface ToastButtonProps {
  /** Visual type */
  variant?: ToastButtonVariant;
  /** Color intent — danger only applies to light variant */
  intent?: ToastButtonIntent;
  /** Loading state — shows spinner */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Left icon slot */
  leftIcon?: ReactNode;
  /** Right icon slot */
  rightIcon?: ReactNode;
  /** Keyboard shortcut label (e.g. "⌘⏎") */
  shortcut?: string;
  /** Button label */
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

/* ─── Loader (8-spoke spinner matching Figma 16px_loader) ─── */
function LoaderIcon() {
  const opacities = [1, 0.875, 0.75, 0.625, 0.5, 0.375, 0.25, 0.125];
  return (
    <svg
      className="animate-spin"
      width={13}
      height={13}
      viewBox="0 0 16 16"
      fill="none"
    >
      {opacities.map((opacity, i) => (
        <line
          key={i}
          x1="8"
          y1="2.4"
          x2="8"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity={opacity}
          transform={`rotate(${i * 45} 8 8)`}
        />
      ))}
    </svg>
  );
}

/* ─── Variant style lookup ─── */
type StyleDef = {
  base: string;
  hover: string;
  loading: string;
  disabled: string;
};

const STYLES: Record<string, StyleDef> = {
  "neutral-bold": {
    base: "bg-fill-bold-inverse border-[0.5px] border-solid border-fill-bold-inverse text-text-toast",
    hover: "hover:border-[#d3d3d2] active:border-[#bdbdbc]",
    loading:
      "bg-fill-bold-inverse border-[0.5px] border-solid border-fill-bold-inverse text-text-toast",
    disabled:
      "bg-fill-bold-inverse border-[0.5px] border-solid border-fill-bold-inverse text-text-toast",
  },
  "neutral-light": {
    base: "bg-beta-200 border-[0.5px] border-solid border-transparent text-text-static",
    hover: "hover:bg-beta-300 hover:border-transparent active:bg-beta-400 active:border-transparent",
    loading:
      "bg-beta-300 border-[0.5px] border-solid border-transparent text-beta-500",
    disabled:
      "bg-beta-300 border-[0.5px] border-solid border-transparent text-beta-400",
  },
  "neutral-ghost": {
    base: "border-[0.5px] border-solid border-transparent text-text-static",
    hover:
      "hover:bg-beta-300 hover:border-beta-300 active:bg-beta-400 active:border-beta-400",
    loading: "border-[0.5px] border-solid border-transparent text-beta-400",
    disabled: "border-[0.5px] border-solid border-transparent text-beta-400",
  },
  "danger-light": {
    base: "bg-fill-bold-danger-static border-[0.5px] border-solid border-fill-bold-danger-static text-text-static",
    hover:
      "hover:bg-fill-bold-danger-hover hover:border-fill-bold-danger-hover active:bg-fill-bold-danger-pressed active:border-fill-bold-danger-pressed",
    loading:
      "bg-beta-300 border-[0.5px] border-solid border-transparent text-beta-500",
    disabled:
      "bg-beta-300 border-[0.5px] border-solid border-transparent text-beta-400",
  },
};

function getClasses(
  variant: ToastButtonVariant,
  intent: ToastButtonIntent,
  disabled: boolean,
  loading: boolean,
): { button: string; contentDim: boolean } {
  const shared =
    "inline-flex items-center justify-center gap-1-5 rounded-md p-1-5 font-sans text-sm font-medium leading-single-sm tracking-sm whitespace-nowrap select-none";

  const key = `${intent}-${variant}`;
  const v = STYLES[key] ?? STYLES["neutral-bold"]!;

  if (disabled) {
    return {
      button: `${shared} ${v.disabled} cursor-not-allowed`,
      contentDim: variant === "bold",
    };
  }

  if (loading) {
    return {
      button: `${shared} ${v.loading} pointer-events-none`,
      contentDim: variant === "bold",
    };
  }

  return {
    button: `${shared} ${v.base} ${v.hover} active:scale-[0.97] cursor-pointer`,
    contentDim: false,
  };
}

const ToastButton: FC<ToastButtonProps> = ({
  variant = "bold",
  intent = "neutral",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  shortcut,
  children,
  onClick,
  className,
}) => {
  const { button, contentDim } = getClasses(
    variant,
    intent,
    disabled,
    loading,
  );
  const dim = contentDim ? "opacity-40" : "";

  return (
    <button
      className={`${button} ${className ?? ""}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {/* Loader (replaces left icon) */}
      {loading && (
        <span className="shrink-0 size-[13px] flex items-center justify-center overflow-hidden">
          <LoaderIcon />
        </span>
      )}

      {/* Left icon (hidden during loading) */}
      {!loading && leftIcon && (
        <span
          className={`shrink-0 size-[13px] flex items-center justify-center overflow-hidden ${dim}`}
        >
          {leftIcon}
        </span>
      )}

      {/* Label + shortcut */}
      {children != null && (
        <span className={`flex items-center justify-center gap-1 ${dim}`}>
          <span>{children}</span>
          {shortcut && !loading && (
            <span className="opacity-70">[{shortcut}]</span>
          )}
        </span>
      )}

      {/* Right icon */}
      {rightIcon && (
        <span
          className={`shrink-0 size-[13px] flex items-center justify-center overflow-hidden ${dim}`}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default ToastButton;
