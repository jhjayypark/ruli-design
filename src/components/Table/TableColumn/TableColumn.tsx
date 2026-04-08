import { type FC, type ReactNode } from "react";
import TableHeader from "../TableHeader/TableHeader";
import TableCell from "../TableCell/TableCell";

export interface TableColumnCell {
  /** Cell type */
  type?: "default" | "number" | "avatar";
  label?: string;
  helpText?: string;
  number?: string;
  badge?: boolean;
  badgeCount?: number;
  checkbox?: boolean;
  checkboxChecked?: boolean;
  checkboxPreview?: boolean;
  avatarType?: "green" | "amber" | "purple" | "blue" | "red" | "photo";
  avatarText?: string;
  avatarSrc?: string;
  /** Show status badge on avatar */
  avatarStatus?: boolean;
  /** Custom status icon for avatar badge */
  avatarStatusIcon?: import("react").ReactNode;
  /** Tooltip text shown on avatar hover */
  avatarTooltip?: string;
  /** Custom leading element (e.g. file type icon) */
  leadingElement?: import("react").ReactNode;
}

export interface TableColumnProps {
  /** Column state */
  state?: "default" | "hover" | "clicked" | "appliedFilter" | "appliedFilterClicked";
  /** Header label */
  label?: string;
  /** Column width in px, or "flex" for flexible (default: 224) */
  width?: number | "flex";
  /** Whether the column is filterable */
  filterable?: boolean;
  /** Applied filter button label */
  filterLabel?: string;
  /** Cell data array */
  cells?: TableColumnCell[];
  /** Dropdown content when clicked/open */
  dropdownContent?: ReactNode;
  /** Callback when filter is clicked */
  onFilterClick?: () => void;
  /** Callback when clear filter is clicked */
  onClearFilter?: () => void;
  /** Hide right border (e.g. last column) */
  hideBorderRight?: boolean;
  /** Hide bottom border on last cell (e.g. last row in table) */
  hideLastCellBorder?: boolean;
  /** Dropdown horizontal alignment */
  dropdownAlign?: "left" | "right";
  /** Show checkbox in header */
  headerCheckbox?: boolean;
  /** Header checkbox checked state */
  headerCheckboxChecked?: boolean;
  /** Header checkbox indeterminate state */
  headerCheckboxIndeterminate?: boolean;
  /** Header checkbox change callback */
  onHeaderCheckboxChange?: (checked: boolean) => void;
  /** Header checkbox hover change callback */
  onHeaderCheckboxHoverChange?: (hovered: boolean) => void;
  /** Callback when resize starts (mousedown on right-edge handle) */
  onResizeStart?: (e: React.MouseEvent) => void;
  /** Callback when column drag starts (mousedown on header) */
  onColumnDragStart?: (e: React.MouseEvent) => void;
  /** Whether this column is currently being dragged */
  isDragging?: boolean;
  /** Which side to highlight as drop target */
  dropSide?: "left" | "right" | null;
  /** Additional className */
  className?: string;
}

const TableColumn: FC<TableColumnProps> = ({
  state = "default",
  label = "Label",
  width = 224,
  filterable = true,
  filterLabel = "Button",
  cells = [],
  dropdownContent,
  onFilterClick,
  onClearFilter,
  hideBorderRight = false,
  hideLastCellBorder = false,
  dropdownAlign,
  headerCheckbox = false,
  headerCheckboxChecked = false,
  headerCheckboxIndeterminate = false,
  onHeaderCheckboxChange,
  onResizeStart,
  onColumnDragStart,
  isDragging = false,
  dropSide = null,
  onHeaderCheckboxHoverChange,
  className,
}) => {
  const isHoverOrClicked = state === "hover" || state === "clicked" || state === "appliedFilterClicked";
  const isOpen = state === "clicked" || state === "appliedFilterClicked";
  const isApplied = state === "appliedFilter" || state === "appliedFilterClicked";
  const showCellBg = isHoverOrClicked;
  const isFlex = width === "flex";
  const compactFilter = typeof width === "number" && width < 200;

  return (
    <div
      className={[
        "flex flex-col items-start isolate relative",
        isFlex ? "flex-1 min-w-0" : "shrink-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...(hideBorderRight
          ? {}
          : { borderRight: "0.5px solid var(--color-border-light)" }),
        ...(isFlex ? { minWidth: 200 } : { width }),
        ...(isOpen ? { zIndex: 10 } : {}),
        ...(isDragging
          ? {
              zIndex: 25,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.08)",
              background: "rgba(0,0,0,0.03)",
            }
          : {}),
      }}
    >
      {/* Drop side highlight */}
      {dropSide && (
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            [dropSide === "left" ? "left" : "right"]: 0,
            width: 3,
            zIndex: 30,
            background: "var(--color-border-high)",
            borderRadius: 2,
          }}
        />
      )}

      {/* Header */}
      <div
        className={["shrink-0 w-full relative", onColumnDragStart ? "cursor-grab active:cursor-grabbing" : ""].join(" ")}
        style={{ zIndex: cells.length + 1 }}
        onMouseDown={onColumnDragStart}
      >
        <TableHeader
          label={label}
          filterable={filterable}
          appliedFilter={isApplied}
          filterLabel={filterLabel}
          isOpen={isOpen || (state === "hover")}
          dropdownAlign={dropdownAlign}
          onFilterClick={onFilterClick}
          onClearFilter={onClearFilter}
          compactFilter={compactFilter}
          dragIndicator={!!onColumnDragStart}
          checkbox={headerCheckbox}
          checkboxChecked={headerCheckboxChecked}
          checkboxIndeterminate={headerCheckboxIndeterminate}
          onCheckboxChange={onHeaderCheckboxChange}
          onCheckboxHoverChange={onHeaderCheckboxHoverChange}
        >
          {isOpen ? dropdownContent : undefined}
        </TableHeader>
      </div>

      {/* Cells */}
      {cells.map((cell, i) => (
        <div
          key={i}
          className={[
            "shrink-0 w-full relative",
            showCellBg ? "bg-fill-levels-natural-sm" : "",
          ].join(" ")}
          style={{ zIndex: cells.length - i }}
        >
          <TableCell
            type={cell.type}
            label={cell.label}
            helpText={cell.helpText}
            number={cell.number}
            badge={cell.badge}
            badgeCount={cell.badgeCount}
            checkbox={cell.checkbox}
            checkboxChecked={cell.checkboxChecked}
            checkboxPreview={cell.checkboxPreview}
            avatarType={cell.avatarType}
            avatarText={cell.avatarText}
            avatarSrc={cell.avatarSrc}
            avatarStatus={cell.avatarStatus}
            avatarStatusIcon={cell.avatarStatusIcon}
            avatarTooltip={cell.avatarTooltip}
            leadingElement={cell.leadingElement}
            hideBorderBottom={hideLastCellBorder && i === cells.length - 1}
          />
        </div>
      ))}

    </div>
  );
};

export default TableColumn;
