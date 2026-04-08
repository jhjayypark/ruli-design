"use client";

import { type FC, type ReactNode } from "react";

interface DropdownGroupProps {
  header?: string;
  children: ReactNode;
  className?: string;
}

const DropdownGroup: FC<DropdownGroupProps> = ({
  header,
  children,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "var(--spacing-1, 4px)",
        padding: "var(--spacing-1, 4px)",
        width: "100%",
        minWidth: 208,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      {header && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--spacing-1-5, 6px)",
            padding: "var(--spacing-1-5, 6px)",
            borderRadius: "var(--radius-md, 6px)",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              flex: "1 1 0",
              minWidth: 0,
              fontFamily: "var(--font-sans, 'Inter', sans-serif)",
              fontSize: 13,
              fontWeight: 450,
              lineHeight: "13px",
              letterSpacing: "-0.039px",
              color: "var(--color-text-pale, #9c9891)",
            }}
          >
            {header}
          </span>
        </div>
      )}

      {/* Items */}
      {children}
    </div>
  );
};

export default DropdownGroup;
