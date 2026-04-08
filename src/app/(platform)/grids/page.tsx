"use client";

import { type ReactNode, useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  IconPlus,
  IconMagnifier,
  IconCaretDown,
  IconCaretRight,
  IconArrowLeft,
  IconArrowRight,
  IconArrowDown,
  IconArrowUp,
  IconViewMinusSign,
  IconTrash,
  IconLockFilled,
  IconCalendarDays,
  IconCalendar,
  IconSlider,
  IconCircleCheckFilled,
  IconDescendingSorting,
  IconAscendingSorting,
  IconTrashFilled,
  IconArrowTurnLeft2,
  IconPenWritingFilled,
  IconCirclePlusFilled,
} from "nucleo-micro-bold";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Toast, ToastButton } from "@/components/Toast";
import { GridTemplateCard } from "@/components/GridTemplateCard";
import type { TagItem, CardAvatarType } from "@/components/GridTemplateCard/GridTemplateCard";
import GridTable from "@/components/GridTable";
import type { GridTableColumn, GridTableRowData } from "@/components/GridTable/GridTable";
import DropdownGroup from "@/components/DropdownGroup/DropdownGroup";
import DropdownItem from "@/components/DropdownItem/DropdownItem";
import { NewGridDialog } from "@/components/NewGridDialog";

/* ─────────────────────────────────────────────
   Featured Template Card Data
───────────────────────────────────────────── */
const TEMPLATE_CARDS: {
  title: string;
  tags: TagItem[];
  visibleTagCount: number;
  avatarType: CardAvatarType;
  avatarText: string;
  showLock?: boolean;
  ownerName?: string;
}[] = [
  {
    title: "Commercial contract insights",
    tags: [
      { label: "Payment terms", format: "text" },
      { label: "Parties", format: "text" },
      { label: "Indemnity risks", format: "text" },
      { label: "Expiration", format: "date" },
      { label: "Auto-renewal", format: "yes_no" },
      { label: "Limitation of Liability", format: "text" },
      { label: "Termination Clause", format: "text" },
      { label: "Governing Law", format: "text" },
    ],
    visibleTagCount: 5,
    avatarType: "green",
    avatarText: "JP",
    showLock: true,
    ownerName: "Jay Park",
  },
  {
    title: "NDA Key Terms",
    tags: [
      { label: "Confidentiality Clause", format: "text" },
      { label: "Duration of Confidentiality", format: "text" },
      { label: "Permitted Disclosure", format: "text" },
      { label: "Governing Law", format: "text" },
      { label: "Remedies", format: "text" },
      { label: "Return of Information", format: "text" },
      { label: "Non-Solicitation", format: "text" },
    ],
    visibleTagCount: 4,
    avatarType: "green",
    avatarText: "JP",
    showLock: true,
    ownerName: "Jay Park",
  },
  {
    title: "M&A Due Diligence",
    tags: [
      { label: "Change of Control", format: "text" },
      { label: "Consent Requirements", format: "text" },
      { label: "Parties", format: "text" },
      { label: "Commencement", format: "date" },
      { label: "Income", format: "currency" },
      { label: "Representations", format: "text" },
      { label: "Warranties", format: "text" },
    ],
    visibleTagCount: 5,
    avatarType: "amber",
    avatarText: "JL",
    ownerName: "John Lee",
  },
  {
    title: "Commercial Lease Review",
    tags: [
      { label: "Payment terms", format: "text" },
      { label: "Expiration", format: "date" },
      { label: "Renewal Options", format: "text" },
      { label: "Maintenance", format: "text" },
      { label: "Security Deposit", format: "currency" },
    ],
    visibleTagCount: 5,
    avatarType: "green",
    avatarText: "JP",
    showLock: true,
    ownerName: "Jay Park",
  },
  {
    title: "Employment Agreement",
    tags: [
      { label: "Compensation", format: "currency" },
      { label: "Non-Compete", format: "text" },
      { label: "Termination", format: "text" },
      { label: "Benefits", format: "text" },
      { label: "Start Date", format: "date" },
    ],
    visibleTagCount: 5,
    avatarType: "purple",
    avatarText: "AA",
    ownerName: "Assil Achour",
  },
];

/* ─────────────────────────────────────────────
   Grid Table Data
───────────────────────────────────────────── */
const COLUMNS: GridTableColumn[] = [
  { key: "grid", label: "Grid", width: "flex", filterable: false },
  { key: "owner", label: "Owner", width: 224, cellType: "avatar" },
  { key: "template", label: "Template", width: 224 },
  { key: "edited", label: "Edited", width: 144, cellType: "avatar" },
  { key: "docs", label: "Docs", width: 144, cellType: "number" },
];

const LOCK_ICON = <span className="text-text-secondary flex items-center justify-center" style={{ width: 12, height: 12 }}><IconLockFilled size="12px" /></span>;

const ROWS: GridTableRowData[] = [
  {
    grid: { label: "Project Titan - Due Diligence", checkbox: true },
    owner: { avatarType: "green", avatarText: "JP", label: "You", avatarStatus: true, avatarStatusIcon: LOCK_ICON, avatarTooltip: "Jay Park" },
    template: { label: "M&A Due Diligence" },
    edited: { avatarType: "green", avatarText: "JP", label: "1m ago", avatarTooltip: "Jay Park" },
    docs: { number: "1,240" },
  },
  {
    grid: { label: "Vendor Renewals Q4 2025", checkbox: true },
    owner: { avatarType: "red", avatarText: "XS", label: "Xi Sun", avatarTooltip: "Xi Sun" },
    template: { label: "Custom" },
    edited: { avatarType: "amber", avatarText: "JP", label: "15m ago", avatarTooltip: "Jay Park" },
    docs: { number: "45" },
  },
  {
    grid: { label: "Appletree Acquisition - Phase 1", checkbox: true },
    owner: { avatarType: "amber", avatarText: "JL", label: "John Lee", avatarTooltip: "John Lee" },
    template: { label: "Custom" },
    edited: { avatarType: "amber", avatarText: "JL", label: "4h ago", avatarTooltip: "John Lee" },
    docs: { number: "856" },
  },
  {
    grid: { label: "Q3 Employee Agreements", checkbox: true },
    owner: { avatarType: "green", avatarText: "JP", label: "You", avatarStatus: true, avatarStatusIcon: LOCK_ICON, avatarTooltip: "Jay Park" },
    template: { label: "Custom" },
    edited: { avatarType: "green", avatarText: "JP", label: "5h ago", avatarTooltip: "Jay Park" },
    docs: { number: "128" },
  },
  {
    grid: { label: "SaaS Licensing Audit", checkbox: true },
    owner: { avatarType: "blue", avatarText: "BL", label: "Bryan Lee", avatarTooltip: "Bryan Lee" },
    template: { label: "NDA Key Terms" },
    edited: { avatarType: "blue", avatarText: "BL", label: "1d ago", avatarTooltip: "Bryan Lee" },
    docs: { number: "312" },
  },
  {
    grid: { label: "Litigation Discovery", checkbox: true },
    owner: { avatarType: "purple", avatarText: "AA", label: "Assil Achour", avatarTooltip: "Assil Achour" },
    template: { label: "Custom" },
    edited: { avatarType: "purple", avatarText: "AA", label: "1d ago", avatarTooltip: "Assil Achour" },
    docs: { number: "67" },
  },
  {
    grid: { label: "GDPR Data Processing Addendums", checkbox: true },
    owner: { avatarType: "green", avatarText: "JP", label: "You", avatarStatus: true, avatarStatusIcon: LOCK_ICON, avatarTooltip: "Jay Park" },
    template: { label: "M&A Due Diligence" },
    edited: { avatarType: "green", avatarText: "JP", label: "2d ago", avatarTooltip: "Jay Park" },
    docs: { number: "4,502" },
  },
  {
    grid: { label: "Office Lease Review (HQ)", checkbox: true },
    owner: { avatarType: "green", avatarText: "JP", label: "You", avatarStatus: true, avatarStatusIcon: LOCK_ICON, avatarTooltip: "Jay Park" },
    template: { label: "M&A Due Diligence" },
    edited: { avatarType: "green", avatarText: "JP", label: "2d ago", avatarTooltip: "Jay Park" },
    docs: { number: "189" },
  },
  {
    grid: { label: "M&A Due Diligence", checkbox: true },
    owner: { avatarType: "green", avatarText: "JP", label: "You", avatarStatus: true, avatarStatusIcon: LOCK_ICON, avatarTooltip: "Jay Park" },
    template: { label: "Custom" },
    edited: { avatarType: "green", avatarText: "JP", label: "2w ago", avatarTooltip: "Jay Park" },
    docs: { number: "12" },
  },
];

/* ─────────────────────────────────────────────
   Template Card menu items (built per-card in component)
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   Row action dropdown content
───────────────────────────────────────────── */
function RowActionDropdown({ onClose }: { onClose: () => void }) {
  return (
    <DropdownGroup>
      <DropdownItem label="Edit" leftIcon={<IconPenWritingFilled size="13px" />} onClick={onClose} />
      <DropdownItem label="Invite" leftIcon={<IconCirclePlusFilled size="13px" />} onClick={onClose} />
      <DropdownItem label="Delete" danger leftIcon={<IconTrashFilled size="13px" />} onClick={onClose} />
    </DropdownGroup>
  );
}

/* ─────────────────────────────────────────────
   Inline search field for filter dropdowns
───────────────────────────────────────────── */
function SearchField() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        width: "100%",
        padding: "6px",
        borderRadius: "var(--radius-md, 6px)",
        boxSizing: "border-box",
        background: "var(--color-fill-levels-engraved-sm, #fcfcfb)",
        border: "0.5px solid var(--color-border-medium, #d6d4d2)",
      }}
    >
      <span style={{ flexShrink: 0, color: "var(--color-text-pale, #9c9891)" }}>
        <IconMagnifier size="13px" />
      </span>
      <span
        style={{
          fontFamily: "var(--font-sans, 'Inter', sans-serif)",
          fontSize: 13,
          fontWeight: 450,
          lineHeight: "13px",
          color: "var(--color-text-pale, #9c9891)",
        }}
      >
        Search
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Filter dropdown definitions per column
───────────────────────────────────────────── */
type FilterState = Record<string, Set<string>>;

/** Owner filter items */
const OWNER_ITEMS = [
  { label: "Private", helpText: "4", avatar: { type: "green" as const, text: "JP" } },
  { label: "You", helpText: "1", avatar: { type: "green" as const, text: "JP" } },
  { label: "Bryan Lee", helpText: "1", avatar: { type: "blue" as const, text: "BL" } },
  { label: "John Lee", helpText: "1", avatar: { type: "amber" as const, text: "JL" } },
  { label: "Xi Sun", helpText: "1", avatar: { type: "red" as const, text: "XS" } },
  { label: "Assil Achour", helpText: "1", avatar: { type: "purple" as const, text: "AA" } },
];

const TEMPLATE_ITEMS = [
  { label: "M&A Due Diligence", helpText: "3" },
  { label: "NDA Key Terms", helpText: "1" },
  { label: "Custom", helpText: "5" },
];

function OwnerFilterDropdown({ selected, onToggle }: { selected: Set<string>; onToggle: (v: string) => void }) {
  return (
    <>
      <DropdownGroup header="Sort by">
        <DropdownItem label="A-Z" leftIcon={<IconArrowDown size="13px" />} state="selected" rightIcon={<IconCircleCheckFilled size="13px" />} />
        <DropdownItem label="Z-A" leftIcon={<IconArrowUp size="13px" />} />
      </DropdownGroup>
      <DropdownGroup header="Owners">
        <SearchField />
        {OWNER_ITEMS.map((item) => (
          <DropdownItem
            key={item.label}
            label={item.label}
            helpText={item.helpText}
            checkbox
            avatar={item.avatar}
            state={selected.has(item.label) ? "selected" : "default"}
            onClick={() => onToggle(item.label)}
          />
        ))}
      </DropdownGroup>
    </>
  );
}

function TemplateFilterDropdown({ selected, onToggle }: { selected: Set<string>; onToggle: (v: string) => void }) {
  return (
    <>
      <DropdownGroup header="Sort by">
        <DropdownItem label="A-Z" leftIcon={<IconArrowDown size="13px" />} state="selected" rightIcon={<IconCircleCheckFilled size="13px" />} />
        <DropdownItem label="Z-A" leftIcon={<IconArrowUp size="13px" />} />
      </DropdownGroup>
      <DropdownGroup header="Templates">
        {TEMPLATE_ITEMS.map((item) => (
          <DropdownItem
            key={item.label}
            label={item.label}
            helpText={item.helpText}
            checkbox
            state={selected.has(item.label) ? "selected" : "default"}
            onClick={() => onToggle(item.label)}
          />
        ))}
      </DropdownGroup>
    </>
  );
}

function EditedFilterDropdown({ selected, onSelect }: { selected: Set<string>; onSelect: (v: string) => void }) {
  return (
    <DropdownGroup>
      <DropdownItem
        label="Last 7 days"
        leftIcon={<span style={{ color: "var(--color-text-pale, #9c9891)" }}><IconCalendarDays size="13px" /></span>}
        state={selected.has("7d") ? "selected" : "default"}
        rightIcon={selected.has("7d") ? <IconCircleCheckFilled size="13px" /> : undefined}
        onClick={() => onSelect("7d")}
      />
      <DropdownItem
        label="Last 30 days"
        leftIcon={<span style={{ color: "var(--color-text-pale, #9c9891)" }}><IconCalendar size="13px" /></span>}
        state={selected.has("30d") ? "selected" : "default"}
        rightIcon={selected.has("30d") ? <IconCircleCheckFilled size="13px" /> : undefined}
        onClick={() => onSelect("30d")}
      />
      <DropdownItem
        label="Custom"
        leftIcon={<span style={{ color: "var(--color-text-pale, #9c9891)" }}><IconSlider size="13px" /></span>}
        subItems
      />
    </DropdownGroup>
  );
}

function DocsFilterDropdown({ selected, onSelect }: { selected: Set<string>; onSelect: (v: string) => void }) {
  return (
    <DropdownGroup header="Sort by">
      <DropdownItem
        label="High to low"
        leftIcon={<span style={{ color: "var(--color-text-pale, #9c9891)" }}><IconDescendingSorting size="13px" /></span>}
        state={selected.has("desc") ? "selected" : "default"}
        rightIcon={selected.has("desc") ? <IconCircleCheckFilled size="13px" /> : undefined}
        onClick={() => onSelect("desc")}
      />
      <DropdownItem
        label="Low to high"
        leftIcon={<span style={{ color: "var(--color-text-pale, #9c9891)" }}><IconAscendingSorting size="13px" /></span>}
        state={selected.has("asc") ? "selected" : "default"}
        rightIcon={selected.has("asc") ? <IconCircleCheckFilled size="13px" /> : undefined}
        onClick={() => onSelect("asc")}
      />
    </DropdownGroup>
  );
}

/* Filter label helpers */
function getFilterLabel(columnKey: string, selected: Set<string>): string {
  const count = selected.size;
  switch (columnKey) {
    case "owner": return `${count} owner${count > 1 ? "s" : ""}`;
    case "template": return `${count} template${count > 1 ? "s" : ""}`;
    case "edited": return selected.has("7d") ? "7d" : selected.has("30d") ? "30d" : "Custom";
    case "docs": return selected.has("desc") ? "High→Low" : "Low→High";
    default: return `${count}`;
  }
}

/* ─────────────────────────────────────────────
   Page Component
───────────────────────────────────────────── */
export default function GridsPage() {
  const router = useRouter();
  const [templatesExpanded, setTemplatesExpanded] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<number>(-1);
  const [searchValue, setSearchValue] = useState("");
  const [checkedRows, setCheckedRows] = useState<Set<number>>(new Set());
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({});
  const [clickedActionRow, setClickedActionRow] = useState<number>(-1);
  const [deleteTemplateTitle, setDeleteTemplateTitle] = useState<string | null>(null);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [headerCheckboxHovered, setHeaderCheckboxHovered] = useState(false);
  const [newGridOpen, setNewGridOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  /* Close filter / action dropdown on outside click */
  useEffect(() => {
    if (openFilter === null && clickedActionRow === -1) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      // Don't close if clicking inside a filter header/dropdown area
      if (openFilter !== null && target.closest("[data-filter-area]")) return;
      setOpenFilter(null);
      setClickedActionRow(-1);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openFilter, clickedActionRow]);

  /* Auto-dismiss delete toast */
  useEffect(() => {
    if (!showDeleteToast) return;
    const timer = setTimeout(() => setShowDeleteToast(false), 4000);
    return () => clearTimeout(timer);
  }, [showDeleteToast]);

  /* Carousel scroll */
  const scrollCards = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 374;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  /* Toggle checkbox for a row */
  const toggleRowCheck = useCallback((rowIdx: number) => {
    setCheckedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowIdx)) next.delete(rowIdx);
      else next.add(rowIdx);
      return next;
    });
  }, []);

  /* Select/deselect all rows */
  const toggleAllRows = useCallback((checked: boolean) => {
    if (checked) {
      setCheckedRows(new Set(ROWS.map((_, i) => i)));
    } else {
      setCheckedRows(new Set());
    }
  }, []);

  /* Toggle a filter selection (multi-select) */
  const toggleFilter = useCallback((columnKey: string, value: string) => {
    setAppliedFilters((prev) => {
      const current = new Set(prev[columnKey] ?? []);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [columnKey]: current };
    });
  }, []);

  /* Exclusive select (single-select — deselect if already selected, otherwise replace) */
  const selectExclusive = useCallback((columnKey: string, value: string) => {
    setAppliedFilters((prev) => {
      const current = prev[columnKey];
      if (current?.has(value)) {
        const next = { ...prev };
        delete next[columnKey];
        return next;
      }
      return { ...prev, [columnKey]: new Set([value]) };
    });
  }, []);

  /* Clear a column's filter */
  const clearFilter = useCallback((columnKey: string) => {
    setAppliedFilters((prev) => {
      const next = { ...prev };
      delete next[columnKey];
      return next;
    });
    setOpenFilter(null);
  }, []);

  /* Compute dynamic rows with checkbox state */
  const dynamicRows: GridTableRowData[] = ROWS.map((row, i) => ({
    ...row,
    grid: { ...row.grid, checkboxChecked: checkedRows.has(i) },
  }));

  /* Header checkbox state */
  const allChecked = checkedRows.size === ROWS.length;
  const someChecked = checkedRows.size > 0 && !allChecked;

  /* Column states: applied filter + open dropdown states */
  const columnStates: Record<string, "default" | "hover" | "clicked" | "appliedFilter" | "appliedFilterClicked"> = {};
  for (const [key, selected] of Object.entries(appliedFilters)) {
    if (selected.size > 0) {
      columnStates[key] = openFilter === key ? "appliedFilterClicked" : "appliedFilter";
    }
  }
  if (openFilter && !columnStates[openFilter]) {
    columnStates[openFilter] = "clicked";
  }

  /* Filter labels for applied filters */
  const filterLabels: Record<string, string> = {};
  for (const [key, selected] of Object.entries(appliedFilters)) {
    if (selected.size > 0) {
      filterLabels[key] = getFilterLabel(key, selected);
    }
  }

  /* Action states for row hover / clicked */
  const actionStates: Record<number, "default" | "hover" | "clicked"> = {};
  if (clickedActionRow >= 0) {
    actionStates[clickedActionRow] = "clicked";
  } else if (hoveredRow >= 0) {
    actionStates[hoveredRow] = "hover";
  }

  /* Column filter dropdowns */
  const columnDropdowns: Record<string, ReactNode> = {};
  if (openFilter) {
    const selected = appliedFilters[openFilter] ?? new Set<string>();
    const onToggle = (v: string) => toggleFilter(openFilter!, v);
    const onSelect = (v: string) => selectExclusive(openFilter!, v);
    switch (openFilter) {
      case "owner":
        columnDropdowns[openFilter] = <OwnerFilterDropdown selected={selected} onToggle={onToggle} />;
        break;
      case "template":
        columnDropdowns[openFilter] = <TemplateFilterDropdown selected={selected} onToggle={onToggle} />;
        break;
      case "edited":
        columnDropdowns[openFilter] = <EditedFilterDropdown selected={selected} onSelect={onSelect} />;
        break;
      case "docs":
        columnDropdowns[openFilter] = <DocsFilterDropdown selected={selected} onSelect={onSelect} />;
        break;
    }
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ padding: 24 }}
    >
      {/* ── Page Title ── */}
      <h1 className="font-sans text-md font-medium leading-single-md tracking-md text-text-primary shrink-0">
        Grids
      </h1>

      {/* ── Featured Templates Section ── */}
      <div className="shrink-0" style={{ marginTop: 32 }}>
        {/* Header row */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-[6px] cursor-pointer select-none group"
            onClick={() => setTemplatesExpanded(!templatesExpanded)}
            style={{ margin: -6, padding: 6 }}
          >
            <span className="shrink-0 size-[13px] flex items-center justify-center text-text-secondary">
              {templatesExpanded ? (
                <IconCaretDown size="13px" />
              ) : (
                <IconCaretRight size="13px" />
              )}
            </span>
            <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-secondary">
              Featured templates
            </span>
          </button>

          <div className={`flex items-center ${templatesExpanded ? "" : "invisible"}`}>
              <Button
                variant="ghost"
                leftIcon={<IconArrowLeft size="13px" />}
                onClick={() => scrollCards("left")}
              />
              <Button
                variant="ghost"
                leftIcon={<IconArrowRight size="13px" />}
                onClick={() => scrollCards("right")}
              />
            </div>
        </div>

        {/* Template cards carousel */}
        {templatesExpanded && (
          <div className="relative" style={{ marginTop: 14 }}>
            <div
              ref={scrollRef}
              className="flex gap-3-5 overflow-x-auto scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                padding: "20px 20px 120px 20px",
                margin: "-20px -20px -120px -20px",
              }}
            >
              {TEMPLATE_CARDS.map((card, i) => (
                <GridTemplateCard
                  key={i}
                  title={card.title}
                  tags={card.tags}
                  visibleTagCount={card.visibleTagCount}
                  avatarType={card.avatarType}
                  avatarText={card.avatarText}
                  showLock={card.showLock}
                  ownerName={card.ownerName}
                  menuItems={[
                    { label: "Use template", icon: <IconPlus size="13px" /> },
                    { label: "Hide from featured", icon: <IconViewMinusSign size="13px" /> },
                    {
                      label: "Delete template",
                      icon: <IconTrash size="13px" />,
                      danger: true,
                      onClick: () => setDeleteTemplateTitle(card.title),
                    },
                  ]}
                />
              ))}
            </div>
            {/* Right fade gradient — right offset to match scroll container's -20px margin overflow */}
            <div
              className="absolute top-0 bottom-0 pointer-events-none z-[1]"
              style={{
                width: 120,
                right: -20,
                background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
              }}
            />
          </div>
        )}
      </div>

      {/* ── Grid Table Section ── */}
      <div className="flex flex-col relative z-[2]" style={{ marginTop: 64 }}>
        {/* Header: New grid button + Search */}
        <div className="flex items-center justify-between shrink-0">
          <Button
            variant="bold"
            leftIcon={<IconPlus size="13px" />}
            onClick={() => setNewGridOpen(true)}
          >
            New grid
          </Button>
          <div style={{ width: 176 }}>
            <Input
              placeholder="Search"
              leftIcon={<IconMagnifier size="13px" />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        {/* Grid Table */}
        <div
          ref={tableContainerRef}
          style={{ marginTop: 14, cursor: hoveredRow >= 0 ? "pointer" : undefined }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const rowIndex = Math.floor(y / 41) - 1;
            setHoveredRow(rowIndex >= 0 && rowIndex < ROWS.length ? rowIndex : -1);
          }}
          onMouseLeave={() => {
            setHoveredRow(-1);
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const x = e.clientX - rect.left;
            const rowIndex = Math.floor(y / 41) - 1;
            if (rowIndex >= 0 && rowIndex < ROWS.length && x < 50) {
              toggleRowCheck(rowIndex);
            }
          }}
        >
          <GridTable
            columns={COLUMNS}
            rows={dynamicRows}
            hoveredRow={hoveredRow}
            columnStates={columnStates}
            filterLabels={filterLabels}
            columnDropdowns={columnDropdowns}
            actionStates={actionStates}
            actionDropdownContent={
              clickedActionRow >= 0 ? (
                <RowActionDropdown onClose={() => setClickedActionRow(-1)} />
              ) : undefined
            }
            onFilterClick={(columnKey) => {
              setOpenFilter((prev) => (prev === columnKey ? null : columnKey));
              setClickedActionRow(-1);
            }}
            onClearFilter={(columnKey) => {
              clearFilter(columnKey);
            }}
            onDotsClick={(rowIdx) => {
              setClickedActionRow((prev) => (prev === rowIdx ? -1 : rowIdx));
              setOpenFilter(null);
            }}
            headerCheckbox
            headerCheckboxChecked={allChecked}
            headerCheckboxIndeterminate={someChecked}
            onHeaderCheckboxChange={toggleAllRows}
            onHeaderCheckboxHoverChange={setHeaderCheckboxHovered}
            checkboxPreviewAll={headerCheckboxHovered && !allChecked}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between shrink-0" style={{ marginTop: 14 }}>
          <span className="font-sans text-sm font-normal leading-single-sm tracking-sm text-text-secondary">
            Page 1 of 1
          </span>
          <div className="flex items-center">
            <Button
              variant="ghost"
              leftIcon={<IconArrowLeft size="13px" />}
            />
            <Button
              variant="ghost"
              leftIcon={<IconArrowRight size="13px" />}
            />
          </div>
        </div>
      </div>

      {/* ── Delete Template Confirmation Dialog ── */}
      <ConfirmDialog
        open={deleteTemplateTitle !== null}
        icon={<IconTrashFilled size="13px" />}
        iconBg="bg-fill-light-danger-static"
        title={`Delete "${deleteTemplateTitle ?? ""}"`}
        description="Are you sure you want to delete this template? This action cannot be undone. Existing grids created with this template will not be affected."
        cancelLabel="Cancel"
        confirmLabel="Yes, delete"
        danger
        onCancel={() => setDeleteTemplateTitle(null)}
        onConfirm={() => {
          setDeleteTemplateTitle(null);
          setShowDeleteToast(true);
        }}
      />

      {/* ── Delete Toast ── */}
      {showDeleteToast && (
        <div className="fixed bottom-[24px] left-1/2 -translate-x-1/2 z-50">
          <Toast
            label="Template deleted forever"
            icon={<IconTrashFilled size="13px" />}
            actions={
              <ToastButton
                variant="light"
                leftIcon={<IconArrowTurnLeft2 size="13px" />}
                onClick={() => setShowDeleteToast(false)}
              >
                Undo
              </ToastButton>
            }
          />
        </div>
      )}

      {/* ── New Grid Dialog ── */}
      <NewGridDialog
        open={newGridOpen}
        onClose={() => setNewGridOpen(false)}
        onSave={(columns) => {
          setNewGridOpen(false);
          router.push("/grids/new");
        }}
      />

      {/* ── Selection Toast ── */}
      {checkedRows.size > 0 && !showDeleteToast && (
        <div className="fixed bottom-[24px] left-1/2 -translate-x-1/2 z-50">
          <Toast
            label={`${checkedRows.size} selected`}
            icon={false}
            actions={
              <>
                <ToastButton
                  variant="light"
                  onClick={() => setCheckedRows(new Set())}
                >
                  Cancel
                </ToastButton>
                <ToastButton
                  variant="light"
                  intent="danger"
                  leftIcon={<IconTrashFilled size="13px" />}
                >
                  Delete
                </ToastButton>
              </>
            }
          />
        </div>
      )}
    </div>
  );
}
