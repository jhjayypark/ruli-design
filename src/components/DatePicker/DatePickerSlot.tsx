"use client";

import { type FC } from "react";

export type SlotType =
  | "default"
  | "muted"
  | "today"
  | "selected"
  | "rangeStart"
  | "rangeEnd"
  | "inBetween";

export interface DatePickerSlotProps {
  day: number;
  type?: SlotType;
  onClick?: () => void;
  className?: string;
}

const DatePickerSlot: FC<DatePickerSlotProps> = ({
  day,
  type = "default",
  onClick,
  className,
}) => {
  const slotStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 0",
    aspectRatio: "1",
    minWidth: 0,
    minHeight: 1,
    overflow: "hidden",
    position: "relative",
    boxSizing: "border-box",
    padding: "var(--spacing-1-5, 6px)",
    cursor: onClick ? "pointer" : undefined,
    ...getSlotBackground(type),
    ...getSlotBorderRadius(type),
  };

  /* Today — red circle */
  if (type === "today") {
    return (
      <div className={className} style={slotStyle} onClick={onClick}>
        <div style={innerCircleStyle("#dc455a")}>
          <span style={textStyle("white")}>{day}</span>
        </div>
      </div>
    );
  }

  /* Selected / Range endpoints — dark rounded rect */
  if (type === "selected" || type === "rangeStart" || type === "rangeEnd") {
    return (
      <div className={className} style={slotStyle} onClick={onClick}>
        <div style={innerRectStyle}>
          <span style={textStyle("white")}>{day}</span>
        </div>
      </div>
    );
  }

  /* In-between range — gray bg, normal text in 25×25 circle area */
  if (type === "inBetween") {
    return (
      <div className={className} style={slotStyle} onClick={onClick}>
        <span style={textStyle("primary")}>{day}</span>
      </div>
    );
  }

  /* Default / Muted — plain text */
  return (
    <div className={className} style={slotStyle} onClick={onClick}>
      <span style={textStyle(type === "muted" ? "muted" : "primary")}>
        {day}
      </span>
    </div>
  );
};

export default DatePickerSlot;

/* ─── Helpers ─── */

function textStyle(
  color: "primary" | "white" | "muted",
): React.CSSProperties {
  const colorMap = {
    primary: "var(--color-text-primary, #24231f)",
    white: "var(--color-text-static, white)",
    muted: "var(--color-text-muted, #ccc8c3)",
  };
  return {
    fontFamily: "var(--font-sans, 'Inter', sans-serif)",
    fontSize: 13,
    fontWeight: 450,
    lineHeight: "13px",
    letterSpacing: "-0.039px",
    textAlign: "center",
    whiteSpace: "nowrap",
    color: colorMap[color],
    flexShrink: 0,
  };
}

function innerCircleStyle(bg: string): React.CSSProperties {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 0",
    width: "100%",
    minWidth: 0,
    minHeight: 1,
    borderRadius: "var(--radius-full, 100px)",
    background: `var(--color-fill-bold-danger-static, ${bg})`,
  };
}

const innerRectStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: "1 0 0",
  width: "100%",
  minWidth: 0,
  minHeight: 1,
  borderRadius: "var(--radius-md, 6px)",
  background: "var(--color-fill-bold-neutral-static, #56534b)",
};

function getSlotBackground(type: SlotType): React.CSSProperties {
  if (
    type === "rangeStart" ||
    type === "rangeEnd" ||
    type === "inBetween"
  ) {
    return {
      background: "var(--color-fill-levels-engraved-lg, #f0f0ef)",
    };
  }
  return {};
}

function getSlotBorderRadius(type: SlotType): React.CSSProperties {
  if (type === "selected") {
    return { borderRadius: "var(--radius-xl, 12px)" };
  }
  if (type === "rangeStart") {
    return {
      borderTopLeftRadius: "var(--radius-xl, 12px)",
      borderBottomLeftRadius: "var(--radius-xl, 12px)",
    };
  }
  if (type === "rangeEnd") {
    return {
      borderTopRightRadius: "var(--radius-xl, 12px)",
      borderBottomRightRadius: "var(--radius-xl, 12px)",
    };
  }
  return {};
}
