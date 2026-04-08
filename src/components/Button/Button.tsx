import { type FC, type ReactNode } from "react";

type ButtonVariant = "bold" | "outline" | "light" | "ghost";
type ButtonIntent = "neutral" | "danger" | "brand";
type ButtonSize = "sm" | "lg";

interface ButtonProps {
  /** Visual type */
  variant?: ButtonVariant;
  /** Color intent */
  intent?: ButtonIntent;
  /** Size */
  size?: ButtonSize;
  /** Loading state — shows spinner, disables interaction */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Left icon slot */
  leftIcon?: ReactNode;
  /** Right icon slot */
  rightIcon?: ReactNode;
  /** Keyboard shortcut label (e.g. "⌘⏎") */
  shortcut?: string;
  /** Force hover appearance (for Storybook demos) */
  forceHover?: boolean;
  /** Button label */
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

/* ─── Loader icon (8-spoke radial spinner matching Figma 16px_loader) ─── */
function LoaderIcon({ size = 13 }: { size?: number }) {
  const opacities = [1, 0.875, 0.75, 0.625, 0.5, 0.375, 0.25, 0.125];
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
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
type VariantDef = { base: string; hover: string; hoverForced: string };

const VARIANTS: Record<string, VariantDef> = {
  // — Neutral —
  "neutral-bold": {
    base: "bg-fill-bold-neutral-static border-[0.5px] border-solid border-fill-bold-neutral-static text-text-static",
    hover: "hover:bg-fill-bold-neutral-hover hover:border-fill-bold-neutral-pressed",
    hoverForced: "bg-fill-bold-neutral-hover border-[0.5px] border-solid border-fill-bold-neutral-pressed text-text-static",
  },
  "neutral-outline": {
    base: "bg-fill-levels-floating-md border-[0.5px] border-solid border-border-medium text-text-primary",
    hover: "hover:bg-fill-light-neutral-hover hover:border-fill-light-neutral-hover",
    hoverForced: "bg-fill-light-neutral-hover border-[0.5px] border-solid border-fill-light-neutral-hover text-text-primary",
  },
  "neutral-light": {
    base: "bg-fill-light-neutral-static border-[0.5px] border-solid border-fill-light-neutral-static text-text-primary",
    hover: "hover:bg-fill-light-neutral-hover hover:border-fill-light-neutral-hover",
    hoverForced: "bg-fill-light-neutral-hover border-[0.5px] border-solid border-fill-light-neutral-hover text-text-primary",
  },
  "neutral-ghost": {
    base: "text-text-secondary",
    hover: "hover:bg-fill-light-neutral-static hover:text-text-primary",
    hoverForced: "bg-fill-light-neutral-static text-text-primary",
  },
  // — Danger —
  "danger-bold": {
    base: "bg-fill-bold-danger-static border-[0.5px] border-solid border-fill-bold-danger-static text-text-static",
    hover: "hover:bg-fill-bold-danger-hover hover:border-fill-bold-danger-hover",
    hoverForced: "bg-fill-bold-danger-hover border-[0.5px] border-solid border-fill-bold-danger-hover text-text-static",
  },
  "danger-outline": {
    base: "bg-fill-levels-floating-md border-[0.5px] border-solid border-fill-bold-danger-static text-text-danger-secondary",
    hover: "hover:bg-fill-light-danger-static",
    hoverForced: "bg-fill-light-danger-static border-[0.5px] border-solid border-fill-bold-danger-static text-text-danger-secondary",
  },
  "danger-ghost": {
    base: "text-text-danger-secondary",
    hover: "hover:bg-fill-light-danger-static",
    hoverForced: "bg-fill-light-danger-static text-text-danger-secondary",
  },
  // — Brand —
  "brand-bold": {
    base: "bg-fill-bold-brand-static border-[0.5px] border-solid border-fill-bold-brand-static text-text-static",
    hover: "hover:bg-fill-bold-brand-hover hover:border-fill-bold-brand-hover",
    hoverForced: "bg-fill-bold-brand-hover border-[0.5px] border-solid border-fill-bold-brand-hover text-text-static",
  },
};

function getButtonClasses(
  intent: ButtonIntent,
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  loading: boolean,
  forceHover: boolean,
): string {
  const shared = [
    "inline-flex items-center justify-center gap-1-5 rounded-md",
    "font-sans text-sm font-medium leading-single-sm tracking-sm whitespace-nowrap",
    "select-none",
    size === "sm" ? "p-1-5" : "p-2",
  ];

  // Disabled overrides everything
  if (disabled) {
    return [
      ...shared,
      "bg-fill-disabled border-[0.5px] border-solid border-border-light text-text-pale",
      "cursor-not-allowed",
    ].join(" ");
  }

  // Loading overrides everything
  if (loading) {
    return [
      ...shared,
      "bg-fill-loading border-[0.5px] border-solid border-fill-loading text-text-pale",
      "pointer-events-none",
    ].join(" ");
  }

  const key = `${intent}-${variant}`;
  const v = VARIANTS[key] ?? VARIANTS["neutral-bold"]!;

  if (forceHover) {
    return [...shared, v.hoverForced, "cursor-pointer"].join(" ");
  }

  return [
    ...shared,
    v.base,
    v.hover,
    // Pressed: scale(0.97) instant — per agency annotation
    "active:scale-[0.97]",
    "cursor-pointer",
  ].join(" ");
}

const Button: FC<ButtonProps> = ({
  variant = "bold",
  intent = "neutral",
  size = "sm",
  loading = false,
  disabled = false,
  forceHover = false,
  leftIcon,
  rightIcon,
  shortcut,
  children,
  onClick,
  className,
}) => {
  const classes = getButtonClasses(intent, variant, size, disabled, loading, forceHover);

  return (
    <button
      className={`${classes} ${className ?? ""}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {/* Left icon or loader spinner */}
      {(loading || leftIcon) && (
        <span className="shrink-0 size-[13px] flex items-center justify-center overflow-hidden">
          {loading ? <LoaderIcon /> : leftIcon}
        </span>
      )}

      {/* Label + shortcut */}
      {children != null && (
        <span className="flex items-center justify-center gap-1">
          <span>{children}</span>
          {shortcut && !loading && (
            <span className="opacity-70">[{shortcut}]</span>
          )}
        </span>
      )}

      {/* Right icon */}
      {rightIcon && !loading && (
        <span className="shrink-0 size-[13px] flex items-center justify-center overflow-hidden">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
