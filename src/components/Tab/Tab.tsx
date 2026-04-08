"use client";

import {
  type FC,
  type ReactNode,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

export interface TabItem {
  /** Tab label */
  label: string;
  /** Optional left icon */
  icon?: ReactNode;
  /** Optional count badge (rendered as [count]) */
  count?: number;
}

export interface TabProps {
  /** Tab items */
  items: TabItem[];
  /** Currently active tab index (controlled) */
  activeIndex?: number;
  /** Tab size */
  size?: "lg" | "sm";
  /** Called when a tab is clicked */
  onChange?: (index: number) => void;
  className?: string;
}

const Tab: FC<TabProps> = ({
  items,
  activeIndex: controlledIndex,
  size = "lg",
  onChange,
  className,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex ?? internalIndex;

  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [ready, setReady] = useState(false);

  const isLarge = size === "lg";
  // Indicator inset: Large aligns with tab px-2 (8px), Small with px-2 + label px (9px)
  const inset = isLarge ? 8 : 9;

  const updateIndicator = useCallback(() => {
    const tab = tabRefs.current[activeIndex];
    const container = containerRef.current;
    if (!tab || !container) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    setIndicator({
      left: tabRect.left - containerRect.left + inset,
      width: tabRect.width - inset * 2,
    });
    setReady(true);
  }, [activeIndex, inset]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const handleClick = (index: number) => {
    if (index === activeIndex) return;
    setInternalIndex(index);
    onChange?.(index);
  };

  return (
    <div
      ref={containerRef}
      className={`
        relative flex items-center
        ${isLarge ? "px-2" : "px-px"}
        ${className ?? ""}
      `}
    >
      {/* Full-width bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-border-light" />

      {/* Tab items */}
      {items.map((item, i) => {
        const isActive = i === activeIndex;

        return (
          <button
            key={i}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            className={`
              group relative flex items-center justify-center gap-1 shrink-0
              ${isLarge ? "px-2 py-4" : "px-2 py-2-5"}
              font-sans text-sm font-medium leading-single-sm tracking-sm whitespace-nowrap
              select-none cursor-pointer
              ${isActive ? "text-text-primary" : "text-text-pale hover:text-text-secondary"}
            `}
            onClick={() => handleClick(i)}
          >
            {/* Icon */}
            {item.icon && (
              <span className="shrink-0 size-[13px] flex items-center justify-center overflow-hidden">
                {item.icon}
              </span>
            )}

            {/* Label + count */}
            <span
              className={`flex items-center justify-center gap-1-5 ${isLarge ? "" : "px-px"}`}
            >
              <span>{item.label}</span>
              {item.count != null && (
                <span className="opacity-70">[{item.count}]</span>
              )}
            </span>

            {/* Hover indicator (non-active tabs only) */}
            {!isActive && (
              <div
                className={`
                  absolute bottom-0 h-[0.5px] bg-border-high rounded-full
                  opacity-0 group-hover:opacity-100
                  ${isLarge ? "left-[8px] right-[8px]" : "left-[9px] right-[9px]"}
                `}
              />
            )}
          </button>
        );
      })}

      {/* Sliding active indicator */}
      <div
        className={`
          absolute bottom-0 h-[0.5px] bg-border-focus-neutral rounded-full
          ${ready ? "transition-all duration-200 ease-out" : ""}
        `}
        style={{
          left: indicator.left,
          width: indicator.width,
        }}
      />
    </div>
  );
};

export default Tab;
