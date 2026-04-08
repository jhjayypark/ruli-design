import { type FC, type ReactNode } from "react";
import { IconCircleDashed } from "nucleo-micro-bold";

export type TagColor =
  | "neutral"
  | "blue"
  | "purple"
  | "red"
  | "amber"
  | "green";

export interface TagProps {
  /** Label text */
  label: string;
  /** Color variant */
  color?: TagColor;
  /** Highlight mode — vivid text for colored variants, filled bg for neutral */
  highlight?: boolean;
  /** Left icon slot. Pass `false` to hide. Defaults to circle-dashed. */
  icon?: ReactNode | false;
  className?: string;
}

/* ─── Per-color style definitions ─── */
type ColorDef = {
  bg: string;
  bgHighlight: string;
  text: string;
  textHighlight: string;
};

const STYLES: Record<TagColor, ColorDef> = {
  neutral: {
    bg: "border-[0.5px] border-solid border-border-medium",
    bgHighlight:
      "bg-fill-light-neutral-inverse border-[0.5px] border-solid border-border-light",
    text: "text-text-secondary",
    textHighlight: "text-text-secondary",
  },
  blue: {
    bg: "bg-fill-light-blue-static",
    bgHighlight: "bg-fill-light-blue-static",
    text: "text-text-blue-primary",
    textHighlight: "text-text-blue-secondary",
  },
  purple: {
    bg: "bg-fill-light-brand-static",
    bgHighlight: "bg-fill-light-brand-static",
    text: "text-text-brand-primary",
    textHighlight: "text-text-brand-secondary",
  },
  red: {
    bg: "bg-fill-light-danger-static",
    bgHighlight: "bg-fill-light-danger-static",
    text: "text-text-danger-primary",
    textHighlight: "text-text-danger-secondary",
  },
  amber: {
    bg: "bg-fill-light-amber-static",
    bgHighlight: "bg-fill-light-amber-static",
    text: "text-text-amber-primary",
    textHighlight: "text-text-amber-secondary",
  },
  green: {
    bg: "",
    bgHighlight: "bg-fill-light-success-static",
    text: "text-text-success-primary",
    textHighlight: "text-text-success-secondary",
  },
};

/* Green non-highlight uses a muted gradient from Figma */
const GREEN_MUTED_BG =
  "linear-gradient(90deg, rgba(36, 35, 31, 0.075) 0%, rgba(36, 35, 31, 0.075) 100%), linear-gradient(90deg, rgb(207, 244, 207) 0%, rgb(207, 244, 207) 100%)";

const Tag: FC<TagProps> = ({
  label,
  color = "neutral",
  highlight = false,
  icon = <IconCircleDashed size="13px" />,
  className,
}) => {
  const s = STYLES[color];
  const bgClass = highlight ? s.bgHighlight : s.bg;
  const textClass = highlight ? s.textHighlight : s.text;

  const inlineStyle =
    color === "green" && !highlight
      ? { backgroundImage: GREEN_MUTED_BG }
      : undefined;

  return (
    <span
      className={`inline-flex items-center justify-center gap-[3px] p-1 rounded-[var(--radius-1-5)] ${bgClass} ${textClass} ${className ?? ""}`}
      style={inlineStyle}
    >
      {icon !== false && icon && (
        <span className="shrink-0 size-[13px] flex items-center justify-center overflow-hidden">
          {icon}
        </span>
      )}

      <span className="shrink-0 flex items-center justify-center max-w-[138px] px-px">
        <span className="max-w-[136px] shrink-0 font-sans text-sm font-medium leading-single-sm tracking-sm whitespace-nowrap overflow-hidden text-ellipsis text-center">
          {label}
        </span>
      </span>
    </span>
  );
};

export default Tag;
