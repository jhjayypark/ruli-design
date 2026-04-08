"use client";

import { type FC } from "react";

export type TooltipDirection = "left" | "right" | "up" | "down";

export interface TooltipProps {
  /** Tooltip text content */
  label: string;
  /** Direction the caret points (where the caret sits on the tooltip) */
  direction?: TooltipDirection;
  /** Enable multi-line mode for longer descriptions */
  multiLine?: boolean;
  className?: string;
}

/* ─── Caret (10×7 original SVG asset, rotated per direction) ─── */
const CARET_PATH =
  "M8.43665 0C9.69469 0.000218891 10.4193 1.30178 9.7388 2.24811L9.66852 2.3385L6.23198 6.44091C5.6072 7.18587 4.39235 7.18711 3.76739 6.44012L0.331686 2.3385C-0.465365 1.38707 0.264069 0.000243637 1.56271 0L8.43665 0Z";

function Caret({ direction }: { direction: TooltipDirection }) {
  const isVertical = direction === "up" || direction === "down";
  const rotation = { down: 0, up: 180, left: 90, right: -90 }[direction];

  const svg = (
    <svg
      width={10}
      height={7}
      viewBox="0 0 10 7"
      fill="none"
      style={{
        display: "block",
        transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
      }}
    >
      <path d={CARET_PATH} style={{ fill: "var(--color-text-muted, #ccc8c3)" }} />
    </svg>
  );

  if (isVertical) return <div style={{ flexShrink: 0 }}>{svg}</div>;

  /* For left/right, wrap in 7×10 container to match rotated layout */
  return (
    <div style={{ width: 7, height: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {svg}
    </div>
  );
}

/* ─── Tooltip ─── */
const Tooltip: FC<TooltipProps> = ({
  label,
  direction = "down",
  multiLine = false,
  className,
}) => {
  const isVertical = direction === "up" || direction === "down";

  return (
    <div
      className={`
        flex items-center justify-center
        ${isVertical ? "flex-col" : ""}
        ${className ?? ""}
      `}
      style={{ gap: 4 }}
    >
      {(direction === "left" || direction === "up") && <Caret direction={direction} />}

      <div
        className="bg-fill-bold-neutral-static border-[0.5px] border-solid border-fill-bold-neutral-static backdrop-blur-[24px] flex flex-col items-start justify-center"
        style={
          multiLine
            ? { padding: 10, borderRadius: 10, maxWidth: 384, minWidth: 224, width: 290 }
            : { padding: 6, borderRadius: 6, maxWidth: 256 }
        }
      >
        <div
          className="flex items-center justify-center w-full"
          style={multiLine ? { paddingTop: 1, paddingBottom: 1 } : { paddingLeft: 1, paddingRight: 1 }}
        >
          <p
            className={`
              flex-1 font-sans text-text-static
              ${multiLine
                ? ""
                : "text-center whitespace-nowrap overflow-hidden text-ellipsis"
              }
            `}
            style={{
              fontSize: 13,
              fontWeight: 450,
              letterSpacing: "-0.039px",
              lineHeight: multiLine ? "21px" : "13px",
            }}
          >
            {label}
          </p>
        </div>
      </div>

      {(direction === "right" || direction === "down") && <Caret direction={direction} />}
    </div>
  );
};

export default Tooltip;
