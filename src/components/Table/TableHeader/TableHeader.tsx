import { type FC, type ReactNode } from "react";
import {
  IconBarsFilter,
  IconChevronRight,
  IconChevronDown,
  IconXmark,
  IconGripDotsVertical,
  IconPen,
} from "nucleo-micro-bold";
import Checkbox from "../../Checkbox/Checkbox";

export interface TableHeaderProps {
  /** Column label text */
  label?: string;
  /** Whether the column is filterable */
  filterable?: boolean;
  /** Whether a filter is currently applied */
  appliedFilter?: boolean;
  /** Filter button label when applied */
  filterLabel?: string;
  /** Show checkbox */
  checkbox?: boolean;
  /** Checkbox checked state */
  checkboxChecked?: boolean;
  /** Checkbox indeterminate state */
  checkboxIndeterminate?: boolean;
  /** Checkbox change callback */
  onCheckboxChange?: (checked: boolean) => void;
  /** Checkbox hover change callback (for preview state on child rows) */
  onCheckboxHoverChange?: (hovered: boolean) => void;
  /** Show drag indicator on hover/active */
  dragIndicator?: boolean;
  /** Show edit button on hover/active */
  editButton?: boolean;
  /** Show icon before label */
  icon?: boolean;
  /** Custom icon element */
  iconElement?: ReactNode;
  /** Whether the header is in active/open state (e.g., dropdown open) */
  isOpen?: boolean;
  /** Callback when filter is clicked */
  onFilterClick?: () => void;
  /** Callback when clear filter is clicked */
  onClearFilter?: () => void;
  /** Dropdown content shown when isOpen (e.g. DropdownGroup children) */
  children?: ReactNode;
  /** Dropdown horizontal alignment */
  dropdownAlign?: "left" | "right";
  /** Use compact icon+x instead of text pill for applied filters (narrow columns) */
  compactFilter?: boolean;
  /** Additional className */
  className?: string;
}

const TableHeader: FC<TableHeaderProps> = ({
  label = "Label",
  filterable = true,
  appliedFilter = false,
  filterLabel = "Button",
  checkbox = false,
  checkboxChecked = false,
  checkboxIndeterminate = false,
  onCheckboxChange,
  onCheckboxHoverChange,
  dragIndicator = false,
  editButton = false,
  icon = false,
  iconElement,
  isOpen = false,
  children,
  dropdownAlign = "left",
  onFilterClick,
  onClearFilter,
  compactFilter = false,
  className,
}) => {
  const hasAppliedFilter = appliedFilter && filterable;

  // Visibility: hidden by default, shown on group hover or when active
  const hoverVis = isOpen ? "" : "hidden group-hover:flex";

  const showDropdown = isOpen && !!children;

  return (
    <div className="relative w-full" data-filter-area>
    <div
      className={[
        "flex items-center relative group w-full",
        // Padding
        hasAppliedFilter && !compactFilter ? "pl-3-5 pr-2 py-2" : "p-3-5",
        // Gap — default 8px, expands to 14px on hover/open (fixed when checkbox present)
        checkbox ? "gap-2" : isOpen ? "gap-3-5" : "gap-2 hover:gap-3-5",
        // Background
        isOpen
          ? "bg-fill-levels-natural-sm"
          : "hover:bg-fill-levels-natural-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        borderBottom: `0.5px solid ${isOpen ? "transparent" : "var(--color-border-light)"}`,
      }}
    >
      {/* Optional leading icon */}
      {icon && (
        <div className="shrink-0 size-[13px] overflow-clip">
          {iconElement}
        </div>
      )}

      {/* Optional checkbox */}
      {checkbox && (
        <div
          className="shrink-0 flex items-center justify-center"
          style={{ margin: -6 }}
          onMouseEnter={() => onCheckboxHoverChange?.(true)}
          onMouseLeave={() => onCheckboxHoverChange?.(false)}
        >
          <Checkbox
            checked={checkboxChecked}
            indeterminate={checkboxIndeterminate}
            onChange={onCheckboxChange}
          />
        </div>
      )}

      {/* Label */}
      <p
        className={[
          "flex-1 min-w-0 font-sans text-sm font-medium leading-single-sm tracking-sm text-left",
          "overflow-hidden whitespace-nowrap text-ellipsis",
          isOpen
            ? "text-text-primary"
            : "text-text-pale group-hover:text-text-primary",
        ].join(" ")}
      >
        {label}
      </p>

      {/* Drag indicator — visible on hover/active */}
      {dragIndicator && (
        <div
          className={[
            "shrink-0 items-center justify-center size-[13px]",
            hoverVis,
          ].join(" ")}
        >
          <IconGripDotsVertical size="13px" className="text-text-pale" />
        </div>
      )}

      {/* Edit button — visible on hover/active */}
      {editButton && (
        <div
          className={[
            "shrink-0 items-center justify-center size-[13px]",
            hoverVis,
          ].join(" ")}
        >
          <IconPen size="13px" className="text-text-pale" />
        </div>
      )}

      {/* Applied filter — compact (icon + x) or full (label + chevron | clear) */}
      {hasAppliedFilter && compactFilter && (
        <div className="flex items-center shrink-0 gap-0 -my-1-5">
          <button
            type="button"
            onClick={onFilterClick}
            className={[
              "flex items-center justify-center p-1-5 shrink-0 cursor-pointer rounded-l-md",
              isOpen
                ? "bg-alpha-100 backdrop-blur-[6px]"
                : "bg-fill-primary",
            ].join(" ")}
            style={{
              boxShadow: "inset 0 0 0 0.5px var(--color-border-medium)",
            }}
          >
            <IconBarsFilter size="13px" className="text-text-secondary" />
          </button>
          <button
            type="button"
            onClick={onClearFilter}
            className={[
              "flex items-center justify-center p-1-5 shrink-0 cursor-pointer rounded-r-md",
              isOpen ? "" : "bg-fill-primary",
            ].join(" ")}
            style={{
              boxShadow:
                "inset 0 0.5px 0 0 var(--color-border-medium), inset -0.5px 0 0 0 var(--color-border-medium), inset 0 -0.5px 0 0 var(--color-border-medium)",
            }}
          >
            <IconXmark size="13px" className="text-text-danger-secondary" />
          </button>
        </div>
      )}
      {hasAppliedFilter && !compactFilter && (
        <div className="flex items-center shrink-0 gap-0">
          <button
            type="button"
            onClick={onFilterClick}
            className={[
              "flex items-center justify-center gap-1-5 p-1-5 shrink-0 cursor-pointer rounded-l-md",
              isOpen
                ? "bg-alpha-100 backdrop-blur-[6px]"
                : "bg-fill-primary",
            ].join(" ")}
            style={{
              boxShadow: "inset 0 0 0 0.5px var(--color-border-medium)",
            }}
          >
            <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-secondary whitespace-nowrap text-center">
              {filterLabel}
            </span>
            <span className="shrink-0 size-[13px] overflow-clip text-text-secondary flex items-center justify-center">
              {isOpen ? (
                <IconChevronDown size="13px" />
              ) : (
                <IconChevronRight size="13px" />
              )}
            </span>
          </button>
          <button
            type="button"
            onClick={onClearFilter}
            className={[
              "flex items-center justify-center gap-1-5 p-1-5 shrink-0 cursor-pointer rounded-r-md",
              isOpen ? "" : "bg-fill-primary",
            ].join(" ")}
            style={{
              boxShadow:
                "inset 0 0.5px 0 0 var(--color-border-medium), inset -0.5px 0 0 0 var(--color-border-medium), inset 0 -0.5px 0 0 var(--color-border-medium)",
            }}
          >
            <IconXmark size="13px" className="text-text-danger-secondary" />
          </button>
        </div>
      )}

      {/* Filter icon — visible on hover/active, filterable, no applied filter */}
      {filterable && !appliedFilter && (
        <button
          type="button"
          onClick={onFilterClick}
          className={[
            "shrink-0 flex items-center justify-center cursor-pointer",
            isOpen
              ? "box-content size-[13px] p-1-5 -m-1-5 rounded-md bg-alpha-100 backdrop-blur-[6px]"
              : "size-[13px]",
            hoverVis,
          ].join(" ")}
          style={
            isOpen
              ? { boxShadow: "inset 0 0 0 0.5px var(--color-alpha-100)" }
              : undefined
          }
        >
          <IconBarsFilter size="13px" className="text-text-secondary" />
        </button>
      )}
    </div>

      {/* Dropdown panel */}
      {showDropdown && (
        <div
          className={`absolute flex flex-col items-start ${dropdownAlign === "right" ? "right-0" : "left-0"}`}
          style={{ top: 41, zIndex: 10, minWidth: "100%" }}
        >
          {/* Surface */}
          <div
            className="absolute inset-0"
            style={{
              background: "white",
              borderRadius: "var(--radius-1-5lg, 10px)",
              boxShadow:
                "0px 12px 24px 0px var(--color-shadow-xs, rgba(36,35,31,0.05)), 0px 6px 12px -6px var(--color-shadow-xxs, rgba(36,35,31,0.03)), 0px 0px 0px 0.5px var(--color-shadow-border, rgba(36,35,31,0.1))",
            }}
          />
          {/* Content */}
          <div className="relative flex flex-col w-full">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableHeader;
