"use client";

import { type FC, type ReactNode, useState } from "react";

/* ─── Segment item ─── */

export interface SegmentItem {
  label: ReactNode;
  value: string;
}

/* ─── Props ─── */

interface SegmentedControlProps {
  items: SegmentItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const SegmentedControl: FC<SegmentedControlProps> = ({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? items[0]?.value ?? "",
  );
  const activeValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  const handleSelect = (val: string) => {
    if (controlledValue === undefined) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div
      className={`inline-flex items-center rounded-md ${className ?? ""}`}
      style={{
        background: "var(--color-fill-levels-engraved-md)",
        boxShadow: "inset 0 0 0 0.5px var(--color-border-medium)",
      }}
    >
      {items.map((item) => {
        const isActive = item.value === activeValue;

        return (
          <ControlItem
            key={item.value}
            active={isActive}
            onClick={() => handleSelect(item.value)}
          >
            {item.label}
          </ControlItem>
        );
      })}
    </div>
  );
};

export default SegmentedControl;

/* ─── ControlItem (building block) ─── */

interface ControlItemProps {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}

const ControlItem: FC<ControlItemProps> = ({ active, children, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-md shrink-0 cursor-pointer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--spacing-1-5)",
        background: active
          ? "var(--color-fill-levels-floating-lg)"
          : "transparent",
        boxShadow: active
          ? "inset 0 0 0 0.5px var(--color-border-medium)"
          : "none",
        color:
          active || hovered
            ? "var(--color-text-primary)"
            : "var(--color-text-secondary)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--font-weight-medium)",
        letterSpacing: "var(--tracking-sm)",
        lineHeight: "var(--leading-single-sm)",
        border: "none",
        outline: "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
};
