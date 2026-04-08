"use client";

import { type FC } from "react";
import DatePickerSlot, { type SlotType } from "./DatePickerSlot";

interface DatePickerProps {
  /** 4-digit year */
  year?: number;
  /** 0-indexed month (0 = January) */
  month?: number;
  /** Day of month marked as "today" */
  today?: number;
  /** Single-selected day */
  selectedDate?: number;
  /** Range start day (inclusive) */
  rangeStart?: number;
  /** Range end day (inclusive) */
  rangeEnd?: number;
  /** Show Clear / Apply footer */
  showFooter?: boolean;
  onDateClick?: (day: number) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onClear?: () => void;
  onApply?: () => void;
  className?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

const DatePicker: FC<DatePickerProps> = ({
  year = 2025,
  month = 11,
  today,
  selectedDate,
  rangeStart,
  rangeEnd,
  showFooter = false,
  onDateClick,
  onPrevMonth,
  onNextMonth,
  onClear,
  onApply,
  className,
}) => {
  const weeks = buildCalendarGrid(year, month);

  function getSlotType(day: number, isCurrentMonth: boolean): SlotType {
    if (!isCurrentMonth) return "muted";
    if (selectedDate === day) return "selected";
    if (rangeStart != null && rangeEnd != null) {
      if (day === rangeStart) return "rangeStart";
      if (day === rangeEnd) return "rangeEnd";
      if (day > rangeStart && day < rangeEnd) return "inBetween";
    }
    if (today === day) return "today";
    return "default";
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: 248,
        borderRadius: "var(--radius-xl, 12px)",
        background: "var(--color-fill-levels-floating-md, white)",
        boxShadow: [
          "0px 12px 24px 0px var(--color-shadow-xs, rgba(36,35,31,0.08))",
          "0px 6px 12px -6px var(--color-shadow-xxs, rgba(36,35,31,0.05))",
          "0px 0px 0px 0.5px var(--color-shadow-border, rgba(36,35,31,0.1))",
        ].join(", "),
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "6px 6px 6px 12px",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            flex: "1 0 0",
            minWidth: 0,
            minHeight: 1,
            ...labelStyle,
            color: "var(--color-text-primary, #24231f)",
          }}
        >
          {MONTH_NAMES[month]} {year}
        </span>

        <div style={{ display: "flex", gap: 0, alignItems: "flex-start", flexShrink: 0 }}>
          <NavButton direction="left" onClick={onPrevMonth} />
          <NavButton direction="right" onClick={onNextMonth} />
        </div>
      </div>

      {/* Weekday header */}
      <div style={weekRowStyle}>
        {WEEKDAYS.map((d, i) => (
          <div key={i} style={weekdayCellStyle}>
            <span
              style={{
                ...labelStyle,
                color: "var(--color-text-pale, #9c9891)",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      {weeks.map((week, wi) => (
        <div key={wi} style={weekRowStyle}>
          {week.map((cell, di) => (
            <DatePickerSlot
              key={`${wi}-${di}`}
              day={cell.day}
              type={getSlotType(cell.day, cell.currentMonth)}
              onClick={
                cell.currentMonth && onDateClick
                  ? () => onDateClick(cell.day)
                  : undefined
              }
            />
          ))}
        </div>
      ))}

      {/* Footer */}
      {showFooter && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 6,
            padding: 6,
            width: "100%",
            boxSizing: "border-box",
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={onClear}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: 6,
              borderRadius: "var(--radius-md, 6px)",
              border: "0.5px solid var(--color-border-medium, #d6d4d2)",
              background: "var(--color-fill-levels-floating-md, white)",
              cursor: "pointer",
              ...labelStyle,
              color: "var(--color-text-primary, #24231f)",
            }}
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onApply}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: 6,
              borderRadius: "var(--radius-md, 6px)",
              border: "0.5px solid var(--color-fill-bold-brand-static, #8a5fe2)",
              background: "var(--color-fill-bold-brand-static, #8a5fe2)",
              cursor: "pointer",
              ...labelStyle,
              color: "var(--color-text-static, white)",
            }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

/* ─── Shared styles ─── */

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
  fontSize: 13,
  fontWeight: 450,
  lineHeight: "13px",
  letterSpacing: "-0.039px",
};

const weekRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 0,
  padding: 0,
  width: "100%",
  flexShrink: 0,
};

const weekdayCellStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: "1 0 0",
  aspectRatio: "1",
  minWidth: 0,
  minHeight: 1,
  overflow: "hidden",
};

/* ─── Sub-components ─── */

function NavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick?: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: 6,
        borderRadius: "var(--radius-md, 6px)",
        cursor: onClick ? "pointer" : undefined,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 13,
          height: 13,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {direction === "left" ? <ArrowLeftSvg /> : <ArrowRightSvg />}
      </div>
    </div>
  );
}

function ArrowLeftSvg() {
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
        d="M8.75 3.5L5.25 7L8.75 10.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightSvg() {
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

/* ─── Calendar utility ─── */

interface CalendarCell {
  day: number;
  currentMonth: boolean;
}

function buildCalendarGrid(year: number, month: number): CalendarCell[][] {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Monday = 0, Tuesday = 1, ..., Sunday = 6
  const startDow = (firstOfMonth.getDay() + 6) % 7;

  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  // Leading days from previous month
  for (let i = startDow - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, currentMonth: false });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true });
  }

  // Trailing days from next month
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, currentMonth: false });
  }

  // Split into weeks
  const weeks: CalendarCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
}
