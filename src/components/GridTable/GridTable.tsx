import { type FC, type ReactNode, useState, useRef, useEffect, useCallback, useMemo } from "react";
import TableColumn, { type TableColumnCell } from "../Table/TableColumn/TableColumn";
import TableRowBg from "../Table/TableRowBg/TableRowBg";
import ActionReveal from "../Table/ActionReveal/ActionReveal";

export interface GridTableColumn {
  /** Unique key for data mapping */
  key: string;
  /** Header label */
  label: string;
  /** Column width in px, or "flex" for flexible */
  width?: number | "flex";
  /** Cell type for all cells in this column */
  cellType?: "default" | "number" | "avatar";
  /** Whether the column header is filterable */
  filterable?: boolean;
}

export interface GridTableRowData {
  /** Cell data keyed by column key */
  [columnKey: string]: TableColumnCell | undefined;
}

export interface GridTableProps {
  /** Column definitions */
  columns: GridTableColumn[];
  /** Row data — each entry is keyed by column key */
  rows: GridTableRowData[];
  /** Column filter states keyed by column key */
  columnStates?: Record<string, "default" | "hover" | "clicked" | "appliedFilter" | "appliedFilterClicked">;
  /** Applied filter label per column key */
  filterLabels?: Record<string, string>;
  /** Dropdown content per column key (shown when clicked) */
  columnDropdowns?: Record<string, ReactNode>;
  /** Index of hovered row (-1 or undefined for none) */
  hoveredRow?: number;
  /** Action reveal state per row index */
  actionStates?: Record<number, "default" | "hover" | "clicked">;
  /** Dropdown content for action reveal menus */
  actionDropdownContent?: ReactNode;
  /** Callback when a column filter is clicked */
  onFilterClick?: (columnKey: string) => void;
  /** Callback when a column filter is cleared */
  onClearFilter?: (columnKey: string) => void;
  /** Callback when a row's dots button is clicked */
  onDotsClick?: (rowIndex: number) => void;
  /** Show checkbox in the first column header */
  headerCheckbox?: boolean;
  /** Header checkbox checked state */
  headerCheckboxChecked?: boolean;
  /** Header checkbox indeterminate state */
  headerCheckboxIndeterminate?: boolean;
  /** Header checkbox change callback */
  onHeaderCheckboxChange?: (checked: boolean) => void;
  /** Header checkbox hover change callback */
  onHeaderCheckboxHoverChange?: (hovered: boolean) => void;
  /** Show preview state on all row checkboxes */
  checkboxPreviewAll?: boolean;
  /** Show empty filler column on the right to fill remaining width */
  showFillerColumn?: boolean;
  /** Additional className */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const ROW_HEIGHT = 41;

const GridTable: FC<GridTableProps> = ({
  columns,
  rows,
  columnStates = {},
  filterLabels = {},
  columnDropdowns = {},
  hoveredRow,
  actionStates = {},
  actionDropdownContent,
  onFilterClick,
  onClearFilter,
  onDotsClick,
  headerCheckbox = false,
  headerCheckboxChecked = false,
  headerCheckboxIndeterminate = false,
  onHeaderCheckboxChange,
  onHeaderCheckboxHoverChange,
  checkboxPreviewAll = false,
  showFillerColumn = false,
  className,
  style: styleProp,
}) => {
  /* ─── Column resize state ─── */
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    for (const col of columns) {
      widths[col.key] = typeof col.width === "number" ? col.width : 224;
    }
    return widths;
  });

  const resizeRef = useRef<{ key: string; startX: number; startWidth: number } | null>(null);

  const handleResizeStart = useCallback((colKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    resizeRef.current = {
      key: colKey,
      startX: e.clientX,
      startWidth: columnWidths[colKey] ?? 224,
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [columnWidths]);

  /* ─── Column order + drag reorder state ─── */
  const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((c) => c.key));
  const columnMap = useMemo(() => new Map(columns.map((c) => [c.key, c])), [columns]);
  const orderedColumns = useMemo(
    () => columnOrder.map((key) => columnMap.get(key)).filter(Boolean) as GridTableColumn[],
    [columnOrder, columnMap],
  );

  const dragRef = useRef<{ key: string; startX: number } | null>(null);
  const [draggingKey, setDraggingKey] = useState<string | null>(null);
  const [dropTargetIdx, setDropTargetIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleColumnDragStart = useCallback((colKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { key: colKey, startX: e.clientX };
    setDraggingKey(colKey);
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  }, []);

  /* ─── Document-level listeners for resize + drag ─── */
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      /* Resize */
      if (resizeRef.current) {
        const { key, startX, startWidth } = resizeRef.current;
        const delta = e.clientX - startX;
        const newWidth = Math.max(100, startWidth + delta);
        setColumnWidths((prev) => ({ ...prev, [key]: newWidth }));
        return;
      }

      /* Drag reorder */
      if (dragRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left + containerRef.current.scrollLeft;

        // Calculate column boundary midpoints
        let cumX = 0;
        let targetIdx = orderedColumns.length; // default: after last
        for (let i = 0; i < orderedColumns.length; i++) {
          const w = columnWidths[orderedColumns[i].key] ?? 224;
          const mid = cumX + w / 2;
          if (mouseX < mid) {
            targetIdx = i;
            break;
          }
          cumX += w;
        }
        setDropTargetIdx(targetIdx);
      }
    };

    const onMouseUp = () => {
      /* Resize end */
      if (resizeRef.current) {
        resizeRef.current = null;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        return;
      }

      /* Drag end */
      if (dragRef.current) {
        const draggedKey = dragRef.current.key;
        dragRef.current = null;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";

        if (dropTargetIdx != null) {
          setColumnOrder((prev) => {
            const from = prev.indexOf(draggedKey);
            if (from === -1) return prev;
            const next = prev.filter((k) => k !== draggedKey);
            const insertAt = dropTargetIdx > from ? dropTargetIdx - 1 : dropTargetIdx;
            next.splice(insertAt, 0, draggedKey);
            return next;
          });
        }

        setDraggingKey(null);
        setDropTargetIdx(null);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [orderedColumns, columnWidths, dropTargetIdx]);

  return (
    <div
      className={[
        "overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        border: "0.5px solid var(--color-border-light)",
        borderRadius: "var(--radius-1-5xl, 14px)",
        ...styleProp,
      }}
    >
      <div className="overflow-x-auto" ref={containerRef}>
        <div className="flex items-start relative w-full" style={{ minWidth: "fit-content" }}>
          {/* RowBG layers — absolute positioned behind columns */}
          {rows.map((_, rowIdx) => (
            <div
              key={`rowbg-${rowIdx}`}
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                top: (rowIdx + 1) * ROW_HEIGHT,
                height: ROW_HEIGHT,
                zIndex: 0,
              }}
            >
              <TableRowBg active={hoveredRow === rowIdx} />
            </div>
          ))}

          {/* Table columns */}
          {orderedColumns.map((col, colIdx) => {
            const state = columnStates[col.key] ?? "default";
            const isLastColumn = colIdx === orderedColumns.length - 1;
            const isFirstColumn = colIdx === 0;
            const cells: TableColumnCell[] = rows.map((row) => {
              const cell = { type: col.cellType ?? "default", ...row[col.key] } as TableColumnCell;
              if (checkboxPreviewAll && cell.checkbox) {
                cell.checkboxPreview = true;
              }
              return cell;
            });

            // Calculate drop side for this column
            let dropSide: "left" | "right" | null = null;
            if (draggingKey && draggingKey !== col.key && dropTargetIdx != null) {
              if (dropTargetIdx === colIdx) dropSide = "left";
              else if (dropTargetIdx === orderedColumns.length && colIdx === orderedColumns.length - 1) dropSide = "right";
            }

            return (
              <TableColumn
                key={col.key}
                label={col.label}
                width={showFillerColumn ? (columnWidths[col.key] ?? col.width ?? 224) : col.width ?? 224}
                state={state}
                filterable={col.filterable ?? true}
                filterLabel={filterLabels[col.key]}
                cells={cells}
                dropdownContent={columnDropdowns[col.key]}
                onFilterClick={onFilterClick ? () => onFilterClick(col.key) : undefined}
                onClearFilter={onClearFilter ? () => onClearFilter(col.key) : undefined}
                hideBorderRight={!showFillerColumn && isLastColumn}
                hideLastCellBorder={!showFillerColumn}
                dropdownAlign={isLastColumn ? "right" : "left"}
                headerCheckbox={isFirstColumn && headerCheckbox}
                headerCheckboxChecked={headerCheckboxChecked}
                headerCheckboxIndeterminate={headerCheckboxIndeterminate}
                onHeaderCheckboxChange={onHeaderCheckboxChange}
                onHeaderCheckboxHoverChange={onHeaderCheckboxHoverChange}
                onColumnDragStart={showFillerColumn ? (e) => handleColumnDragStart(col.key, e) : undefined}
                isDragging={showFillerColumn && draggingKey === col.key}
                dropSide={showFillerColumn ? dropSide : null}
              />
            );
          })}

          {/* Empty filler column to fill remaining width */}
          {showFillerColumn && <div className="flex-1 min-w-0 flex flex-col items-start">
            {/* Empty header */}
            <div
              className="shrink-0 w-full"
              style={{
                height: ROW_HEIGHT,
                boxSizing: "content-box",
                borderBottom: "0.5px solid var(--color-border-light)",
              }}
            />
            {/* Empty cells */}
            {rows.map((_, rowIdx) => (
              <div
                key={`filler-${rowIdx}`}
                className="shrink-0 w-full"
                style={{
                  height: ROW_HEIGHT,
                  borderBottom: "0.5px solid var(--color-border-light)",
                }}
              />
            ))}
          </div>}

          {/* ActionReveal layers — absolute positioned per row */}
          {rows.map((_, rowIdx) => (
            <div
              key={`action-${rowIdx}`}
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                top: (rowIdx + 1) * ROW_HEIGHT,
                height: ROW_HEIGHT,
                zIndex: 1,
              }}
            >
              <ActionReveal
                state={actionStates[rowIdx] ?? "default"}
                dropdownContent={actionDropdownContent}
                onDotsClick={onDotsClick ? () => onDotsClick(rowIdx) : undefined}
              />
            </div>
          ))}

          {/* Column resize handles — absolute overlays at each column border */}
          {showFillerColumn && orderedColumns.map((col, colIdx) => {
            let left = 0;
            for (let i = 0; i <= colIdx; i++) {
              left += columnWidths[orderedColumns[i].key] ?? 224;
            }
            return (
              <div
                key={`resize-${col.key}`}
                className="absolute top-0 bottom-0 cursor-col-resize group/resize"
                style={{ left: left - 3, width: 7, zIndex: 30 }}
                onMouseDown={(e) => handleResizeStart(col.key, e)}
              >
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] rounded-full opacity-0 group-hover/resize:opacity-100 bg-border-high transition-opacity" />
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default GridTable;
