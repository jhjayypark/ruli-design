"use client";

import { type FC, type ReactNode, useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  IconXmark,
  IconArrowLeft,
  IconArrowRight,
  IconChevronLeft,
  IconPlus,
  IconTextAlignLeft,
  IconCalendar,
  IconCircleDollar,
  IconFileContent,
  IconCaretDown,
  IconTrashFilled,
  IconCircleCheckFilled,
  IconSparkle3,
  IconSparkle4,
  IconFolderFilled,
  IconUsersFilled,
  IconLockFilled,
  IconMagnifier,
} from "nucleo-micro-bold";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import TextArea from "@/components/TextArea/TextArea";
import Tooltip from "@/components/Tooltip/Tooltip";
import DropdownGroup from "@/components/DropdownGroup/DropdownGroup";
import DropdownItem from "@/components/DropdownItem/DropdownItem";

/* ─── Types ─── */

export type ColumnFormat = "text" | "date" | "currency" | "content";

export interface GridColumn {
  id: string;
  name: string;
  format: ColumnFormat;
  instructions: string;
}

type DialogStep = "prompt" | "review";

export interface NewGridDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (columns: GridColumn[]) => void;
}

/* ─── Format helpers ─── */

function getFormatIcon(format: ColumnFormat): ReactNode {
  switch (format) {
    case "text": return <IconTextAlignLeft size="13px" />;
    case "date": return <IconCalendar size="13px" />;
    case "currency": return <IconCircleDollar size="13px" />;
    case "content": return <IconFileContent size="13px" />;
  }
}

function formatLabel(format: ColumnFormat): string {
  switch (format) {
    case "text": return "Text";
    case "date": return "Date";
    case "currency": return "Currency";
    case "content": return "Content";
  }
}

/* ─── Mock column generation ─── */

const MOCK_COLUMNS: GridColumn[] = [
  {
    id: "1",
    name: "Parties Involved",
    format: "text",
    instructions:
      "Extract the full names of all parties involved in the agreement or transaction. If multiple parties are present, separate their names with commas. Ignore any aliases, nicknames in parentheses, or descriptive phrases such as 'a Delaware corporation' or 'an individual'. For example: 'Acme, LLC, BRAVO TECHNOLOGIES INC, John Smith'",
  },
  {
    id: "2",
    name: "Term duration",
    format: "text",
    instructions:
      "Extract the term or duration of the agreement, including any renewal provisions.",
  },
  {
    id: "3",
    name: "Termination conditions",
    format: "content",
    instructions:
      "Extract key termination conditions and clauses, including grounds for early termination.",
  },
  {
    id: "4",
    name: "Governing Law",
    format: "text",
    instructions:
      "Identify the governing law or jurisdiction specified in the agreement.",
  },
  {
    id: "5",
    name: "License scope",
    format: "content",
    instructions:
      "Extract the scope and limitations of any licenses granted under the agreement.",
  },
  {
    id: "6",
    name: "Effective date",
    format: "date",
    instructions:
      "Find the effective date or commencement date of the agreement.",
  },
  {
    id: "7",
    name: "Indemnification",
    format: "content",
    instructions:
      "Extract the indemnification obligations and limitations for each party.",
  },
  {
    id: "8",
    name: "Currency",
    format: "currency",
    instructions:
      "Identify the currency used for monetary values in the agreement.",
  },
];

/* ─── Component ─── */

const NewGridDialog: FC<NewGridDialogProps> = ({ open, onClose, onSave }) => {
  const [step, setStep] = useState<DialogStep>("prompt");
  const [activeTab, setActiveTab] = useState<"prompt" | "manual">("prompt");
  const [promptText, setPromptText] = useState("");
  const [columns, setColumns] = useState<GridColumn[]>([]);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [formatDropdownOpen, setFormatDropdownOpen] = useState(false);

  /* Reset on open */
  useEffect(() => {
    if (open) {
      setStep("prompt");
      setActiveTab("prompt");
      setPromptText("");
      setColumns([]);
      setSelectedColumnId(null);
      setFormatDropdownOpen(false);
    }
  }, [open]);

  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  /* Close format dropdown on outside click */
  useEffect(() => {
    if (!formatDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-format-dropdown]")) {
        setFormatDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [formatDropdownOpen]);

  /* Column CRUD */
  const updateColumn = (id: string, patch: Partial<GridColumn>) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const addNewColumn = () => {
    const newCol: GridColumn = {
      id: crypto.randomUUID(),
      name: "New column",
      format: "text",
      instructions: "",
    };
    setColumns((prev) => [...prev, newCol]);
    setSelectedColumnId(newCol.id);
  };

  const deleteColumn = (id: string) => {
    setColumns((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (selectedColumnId === id) {
        setSelectedColumnId(filtered[0]?.id ?? null);
      }
      return filtered;
    });
  };

  /* Actions */
  const handleCreateDataGrid = () => {
    setColumns(MOCK_COLUMNS);
    setSelectedColumnId(MOCK_COLUMNS[0].id);
    setStep("review");
  };

  const handleSave = () => {
    onSave?.(columns);
    onClose();
  };

  if (!open) return null;

  const selectedColumn = columns.find((c) => c.id === selectedColumnId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-overlay-cover" onClick={onClose} />

      {/* Dialog */}
      <div
        className="
          relative flex flex-col bg-white rounded-2xl overflow-clip
          shadow-[0px_12px_24px_0px_rgba(36,35,31,0.05),0px_6px_12px_-6px_rgba(36,35,31,0.03),0px_0px_0px_0.5px_rgba(36,35,31,0.1)]
        "
        style={{ width: 560 }}
      >
        {step === "prompt" ? (
          <PromptStep
            activeTab={activeTab}
            onTabChange={setActiveTab}
            promptText={promptText}
            onPromptChange={setPromptText}
            onClose={onClose}
            onCreateDataGrid={handleCreateDataGrid}
            onSave={onSave}
          />
        ) : (
          <ReviewStep
            columns={columns}
            selectedColumnId={selectedColumnId}
            selectedColumn={selectedColumn}
            formatDropdownOpen={formatDropdownOpen}
            onSelectColumn={setSelectedColumnId}
            onUpdateColumn={updateColumn}
            onAddColumn={addNewColumn}
            onDeleteColumn={deleteColumn}
            onFormatDropdownToggle={() => setFormatDropdownOpen((v) => !v)}
            onFormatDropdownClose={() => setFormatDropdownOpen(false)}
            onGoBack={() => setStep("prompt")}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default NewGridDialog;

/* ─── Step 1: Prompt ─── */

function PromptStep({
  activeTab,
  onTabChange,
  promptText,
  onPromptChange,
  onClose,
  onCreateDataGrid,
  onSave,
}: {
  activeTab: "prompt" | "manual";
  onTabChange: (tab: "prompt" | "manual") => void;
  promptText: string;
  onPromptChange: (text: string) => void;
  onClose: () => void;
  onCreateDataGrid: () => void;
  onSave?: (columns: GridColumn[]) => void;
}) {
  return (
    <>
      {/* Tab bar */}
      <div
        className="relative flex items-center"
        style={{
          padding: 10,
          gap: 10,
          borderBottom: "0.5px solid var(--color-border-light, #e6e4e1)",
        }}
      >
        <button
          type="button"
          className={`
            px-1-5 py-1-5 rounded-md cursor-pointer
            font-sans text-sm font-medium leading-single-sm tracking-sm
            ${activeTab === "prompt"
              ? "bg-fill-levels-natural-lg text-text-primary"
              : "text-text-pale hover:text-text-secondary"
            }
          `}
          onClick={() => onTabChange("prompt")}
        >
          Use prompt
        </button>
        <button
          type="button"
          className={`
            px-1-5 py-1-5 rounded-md cursor-pointer
            font-sans text-sm font-medium leading-single-sm tracking-sm
            ${activeTab === "manual"
              ? "bg-fill-levels-natural-lg text-text-primary"
              : "text-text-pale hover:text-text-secondary"
            }
          `}
          onClick={() => onTabChange("manual")}
        >
          Use template
        </button>

        {/* Close button */}
        <button
          type="button"
          className="absolute flex items-center justify-center cursor-pointer rounded-md hover:bg-[rgba(36,35,31,0.06)]"
          style={{ top: 8, right: 8, width: 25, height: 25 }}
          onClick={onClose}
        >
          <span className="flex items-center justify-center text-text-secondary" style={{ width: 13, height: 13 }}>
            <IconXmark size="13px" />
          </span>
        </button>
      </div>

      {activeTab === "prompt" ? (
        <>
          {/* Content */}
          <div className="flex flex-col gap-6 p-4">
            {/* Title + subtitle */}
            <div className="flex flex-col gap-3">
              <p className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
                Provide DataGrid Instructions
              </p>
              <p className="font-sans text-sm font-normal tracking-sm text-text-secondary" style={{ lineHeight: "21.5px" }}>
                Give a high level description in the box below. Ruli will generate columns based on your instructions
              </p>
            </div>

            {/* TextArea */}
            <TextArea
              placeholder="Type here..."
              value={promptText}
              width="100%"
              height={108}
              onChange={(e) => onPromptChange(e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4" style={{ borderTop: "0.5px solid var(--color-border-light, #e6e4e1)" }}>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="bold"
              disabled={promptText.trim() === ""}
              onClick={onCreateDataGrid}
            >
              Create DataGrid
            </Button>
          </div>
        </>
      ) : (
        <TemplateTab onSave={onSave} onClose={onClose} />
      )}
    </>
  );
}

/* ─── Template items data ─── */

type TemplateIcon = "folder" | "users" | "lock" | "ruli";

type TemplateTab_ = "recent" | "private" | "team" | "ruli";

interface TemplateItem {
  name: string;
  icon: TemplateIcon;
  count?: number;
  children?: TemplateItem[];
  tab?: TemplateTab_;
}

const TEMPLATE_ITEMS: Record<TemplateTab_, TemplateItem[]> = {
  recent: [
    { name: "Commercial Contract Insights", icon: "lock" },
    { name: "NDA Key Terms", icon: "users" },
    { name: "Non-Disclosure Agreement Overview", icon: "ruli" },
    { name: "Contract Term analysis", icon: "lock" },
    { name: "Liability report", icon: "users" },
    { name: "Vendor Contracts Auto-Renewal Analysis", icon: "lock" },
    { name: "M&A Due Diligence - Change of Control (Reverse Triangular Merger)", icon: "lock" },
    { name: "NDA - Fool", icon: "lock" },
  ],
  private: [
    {
      name: "Commercial Templates", icon: "folder", count: 5, children: [
        { name: "Commercial Contract Insights", icon: "lock" },
        { name: "Vendor Contracts Auto-Renewal Analysis", icon: "lock" },
        { name: "NDA Key Terms", icon: "lock" },
      ],
    },
    {
      name: "Data Project Templates", icon: "folder", count: 8, children: [
        { name: "M&A Due Diligence - Change of Control (Reverse Triangular Merger)", icon: "lock" },
        { name: "Contract Term analysis", icon: "lock" },
      ],
    },
    {
      name: "Finance Templates", icon: "folder", count: 3, children: [
        { name: "Liability report", icon: "lock" },
        { name: "key term report", icon: "lock" },
      ],
    },
    {
      name: "Policy Templates", icon: "folder", count: 4, children: [
        { name: "NDA - Fool", icon: "lock" },
        { name: "NDA Key Terms", icon: "lock" },
      ],
    },
    { name: "Bryan's Licensing Datagrid Template", icon: "lock" },
    { name: "Contract Term analysis", icon: "lock" },
    { name: "key term report", icon: "lock" },
    { name: "Liability report", icon: "lock" },
    { name: "NDA - Fool", icon: "lock" },
    { name: "NDA Key Terms", icon: "lock" },
  ],
  team: [
    {
      name: "Commercial Templates", icon: "folder", count: 5, children: [
        { name: "Commercial Contract Insights", icon: "users" },
        { name: "Vendor Contracts Auto-Renewal Analysis", icon: "users" },
      ],
    },
    {
      name: "Data Project Templates", icon: "folder", count: 8, children: [
        { name: "Contract Term analysis", icon: "users" },
      ],
    },
    { name: "NDA Key Terms", icon: "users" },
    { name: "Liability report", icon: "users" },
  ],
  ruli: [
    { name: "Non-Disclosure Agreement Overview", icon: "ruli" },
  ],
};

function RuliLogoIcon({ size = "13px" }: { size?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10.76 11.55" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.989 0L2.435 1.458l5.736 3.27v4.574l2.588-1.319V3.292L4.989 0Z" />
      <path d="M.347 4.796l3.829 2.183v4.357l2.59-1.318V5.543L2.9 3.34.347 4.796Z" />
      <path d="M0 9.97l2.77 1.58V7.793L0 6.212V9.97Z" />
    </svg>
  );
}

const TEMPLATE_ICON_MAP: Record<TemplateIcon, React.ReactNode> = {
  folder: <IconFolderFilled size="13px" className="text-text-muted" />,
  users: <IconUsersFilled size="13px" className="text-text-blue-secondary" />,
  lock: <IconLockFilled size="13px" className="text-text-amber-secondary" />,
  ruli: <span className="text-text-brand-secondary"><RuliLogoIcon size="13px" /></span>,
};

/* ─── Step 1b: Template browser ─── */

function TemplateTab({ onSave, onClose }: { onSave?: (columns: GridColumn[]) => void; onClose: () => void }) {
  /* List state */
  const [subTab, setSubTab] = useState<"recent" | "private" | "team" | "ruli">("recent");
  const [search, setSearch] = useState("");
  const [currentFolder, setCurrentFolder] = useState<TemplateItem | null>(null);

  /* Detail state */
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [columns, setColumns] = useState<GridColumn[]>([]);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [formatDropdownOpen, setFormatDropdownOpen] = useState(false);

  const tabItems = TEMPLATE_ITEMS[subTab];
  const listItems = currentFolder?.children ?? tabItems;
  const filtered = listItems.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );
  const templateOnly = filtered.filter((t) => t.icon !== "folder");

  const handleSwitchTab = (tab: "recent" | "private" | "team" | "ruli") => {
    setSubTab(tab);
    setCurrentFolder(null);
    setSearch("");
  };

  /* Close format dropdown on outside click */
  useEffect(() => {
    if (!formatDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-tpl-format-dropdown]")) {
        setFormatDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [formatDropdownOpen]);

  const handleSelectTemplate = (item: TemplateItem) => {
    if (item.icon === "folder" && item.children) {
      setCurrentFolder(item);
      setSearch("");
      return;
    }
    const tplIdx = templateOnly.indexOf(item);
    setSelectedIdx(tplIdx);
    setColumns(MOCK_COLUMNS);
    setSelectedColumnId(MOCK_COLUMNS[0].id);
  };

  const handleBackFromFolder = () => {
    setCurrentFolder(null);
    setSearch("");
  };

  const handleBack = () => {
    setSelectedIdx(null);
    setColumns([]);
    setSelectedColumnId(null);
    setFormatDropdownOpen(false);
  };

  const navigateTemplate = (dir: -1 | 1) => {
    if (selectedIdx === null) return;
    const newIdx = selectedIdx + dir;
    if (newIdx >= 0 && newIdx < templateOnly.length) {
      setSelectedIdx(newIdx);
      setColumns(MOCK_COLUMNS);
      setSelectedColumnId(MOCK_COLUMNS[0].id);
      setFormatDropdownOpen(false);
    }
  };

  const updateColumn = (id: string, patch: Partial<GridColumn>) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };
  const addNewColumn = () => {
    const newCol: GridColumn = { id: crypto.randomUUID(), name: "New column", format: "text", instructions: "" };
    setColumns((prev) => [...prev, newCol]);
    setSelectedColumnId(newCol.id);
  };
  const deleteColumn = (id: string) => {
    setColumns((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (selectedColumnId === id) setSelectedColumnId(next[0]?.id ?? null);
      return next;
    });
  };

  const handleCreateFromTemplate = () => {
    onSave?.(columns);
    onClose();
  };

  const selectedTemplate = selectedIdx !== null ? templateOnly[selectedIdx] : null;
  const selectedColumn = columns.find((c) => c.id === selectedColumnId);

  /* ─── Detail view (template selected) ─── */
  if (selectedTemplate) {
    return (
      <>
        {/* Title + subtitle */}
        <div className="flex flex-col gap-1-75 p-4" style={{ width: 560 }}>
          <p className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
            Choose a template
          </p>
          <p className="font-sans text-sm font-normal tracking-sm text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis" style={{ lineHeight: "13px" }}>
            Create a DataGrid from a template
          </p>
        </div>

        {/* Detail panel */}
        <div
          className="flex flex-col overflow-clip w-full shrink-0 bg-white"
          style={{
            border: "0.5px solid var(--color-border-light, #e6e4e1)",
            boxShadow: "0px 16px 32px 0px var(--color-shadow-xs, rgba(36,35,31,0.05))",
          }}
        >
          {/* "< Template" header */}
          <div
            className="flex items-center px-4"
            style={{ borderBottom: "0.5px solid var(--color-border-light, #e6e4e1)", height: 45 }}
          >
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1-5 p-1-5 rounded-md cursor-pointer hover:bg-fill-light-neutral-static"
            >
              <span className="shrink-0 size-[13px] flex items-center justify-center text-text-primary">
                <IconChevronLeft size="13px" />
              </span>
              <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
                Template
              </span>
            </button>
          </div>

          {/* Selected template bar */}
          <div className="flex items-start gap-2" style={{ padding: "10px 10px 4px" }}>
            <div
              className="flex flex-1 items-start gap-1-5 p-1-5 rounded-md overflow-clip min-w-0"
              style={{
                border: "0.5px solid var(--color-border-light, #e6e4e1)",
                background: "var(--color-fill-levels-inverse-xl, white)",
              }}
            >
              <span className="shrink-0 size-[13px] overflow-clip flex items-center justify-center">
                {TEMPLATE_ICON_MAP[selectedTemplate.icon]}
              </span>
              <span className="flex-1 min-w-0 font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary whitespace-nowrap overflow-hidden text-ellipsis">
                {selectedTemplate.name}
              </span>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center">
                  <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
                    {(selectedIdx ?? 0) + 1}
                  </span>
                  <span className="size-[13px] flex items-center justify-center">
                    <svg width="5" height="13" viewBox="0 0 5 13" fill="none"><line x1="4" y1="0" x2="1" y2="13" stroke="var(--color-text-pale, #9c9891)" strokeWidth="0.8" /></svg>
                  </span>
                  <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-pale">
                    {templateOnly.length}
                  </span>
                </div>
                <div className="flex items-start gap-1-5">
                  <button
                    type="button"
                    className="size-[13px] flex items-center justify-center cursor-pointer text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-default"
                    onClick={() => navigateTemplate(-1)}
                    disabled={selectedIdx === 0}
                  >
                    <IconArrowLeft size="13px" />
                  </button>
                  <button
                    type="button"
                    className="size-[13px] flex items-center justify-center cursor-pointer text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-default"
                    onClick={() => navigateTemplate(1)}
                    disabled={selectedIdx === templateOnly.length - 1}
                  >
                    <IconArrowRight size="13px" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column review */}
          <div
            className="flex"
            style={{ borderTop: "0.5px solid var(--color-border-light, #e6e4e1)" }}
          >
            {/* Left sidebar */}
            <div className="flex flex-col shrink-0" style={{ width: 176 }}>
              <div className="flex flex-col p-2-5 flex-1 overflow-y-auto">
                <div className="px-1-5 py-1-5">
                  <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-pale">
                    Columns
                  </span>
                </div>
                <div className="flex flex-col gap-0-5 mt-1">
                  {columns.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setSelectedColumnId(col.id)}
                      className={`
                        flex items-center gap-1-5 p-1-5 rounded-md w-full cursor-pointer text-left
                        ${col.id === selectedColumnId
                          ? "bg-[rgba(36,35,31,0.08)]"
                          : "hover:bg-fill-light-neutral-static"
                        }
                      `}
                    >
                      <span className="shrink-0 size-[13px] flex items-center justify-center text-text-pale">
                        {getFormatIcon(col.format)}
                      </span>
                      <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary truncate">
                        {col.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* + New column */}
              <div className="p-2-5 shrink-0" style={{ borderTop: "0.5px solid var(--color-border-light, #e6e4e1)" }}>
                <button
                  type="button"
                  onClick={addNewColumn}
                  className="flex items-center gap-1-5 p-1-5 rounded-md cursor-pointer hover:bg-fill-light-neutral-static w-full"
                >
                  <span className="shrink-0 size-[13px] flex items-center justify-center text-text-secondary">
                    <IconPlus size="13px" />
                  </span>
                  <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-secondary">
                    New column
                  </span>
                </button>
              </div>
            </div>

            {/* Right panel */}
            <div
              className="flex-1 min-w-0 flex flex-col"
              style={{ borderLeft: "0.5px solid var(--color-border-light, #e6e4e1)", maxHeight: 400 }}
            >
              {selectedColumn ? (
                <>
                  <div className="flex flex-col gap-6 p-4 overflow-y-auto flex-1 min-h-0">
                    {/* Column name */}
                    <Input
                      label="Column name"
                      value={selectedColumn.name}
                      size="sm"
                      onChange={(e) => updateColumn(selectedColumn.id, { name: e.target.value })}
                    />

                    {/* Format dropdown */}
                    <div className="flex flex-col gap-2" data-tpl-format-dropdown>
                      <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
                        Format
                      </span>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setFormatDropdownOpen((v) => !v)}
                          className="flex items-center gap-1-5 p-1-5 rounded-md w-full cursor-pointer"
                          style={{
                            border: "0.5px solid var(--color-border-medium, #d6d4d2)",
                            background: "var(--color-fill-levels-inverse-xl, white)",
                          }}
                        >
                          <span className="shrink-0 size-[13px] flex items-center justify-center text-text-pale">
                            {getFormatIcon(selectedColumn.format)}
                          </span>
                          <span className="flex-1 text-left font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
                            {formatLabel(selectedColumn.format)}
                          </span>
                          <span className="shrink-0 size-[13px] flex items-center justify-center text-text-pale">
                            <IconCaretDown size="13px" />
                          </span>
                        </button>

                        {formatDropdownOpen && (
                          <div
                            className="absolute top-full left-0 right-0 z-10 bg-white rounded-lg overflow-clip mt-1"
                            style={{
                              boxShadow: "0px 12px 24px 0px rgba(36,35,31,0.05), 0px 6px 12px -6px rgba(36,35,31,0.03), 0px 0px 0px 0.5px rgba(36,35,31,0.1)",
                            }}
                          >
                            <DropdownGroup>
                              {(["text", "date", "currency", "content"] as ColumnFormat[]).map((fmt) => (
                                <DropdownItem
                                  key={fmt}
                                  label={formatLabel(fmt)}
                                  leftIcon={getFormatIcon(fmt)}
                                  state={selectedColumn.format === fmt ? "selected" : "default"}
                                  rightIcon={selectedColumn.format === fmt ? <IconCircleCheckFilled size="13px" /> : undefined}
                                  onClick={() => {
                                    updateColumn(selectedColumn.id, { format: fmt });
                                    setFormatDropdownOpen(false);
                                  }}
                                />
                              ))}
                            </DropdownGroup>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Extract Instructions */}
                    <div className="relative w-full">
                      <TextArea
                        label="Extract Instructions"
                        placeholder="Type here..."
                        value={selectedColumn.instructions}
                        width="100%"
                        height={166}
                        onChange={(e) => updateColumn(selectedColumn.id, { instructions: e.target.value })}
                      />
                      <MagicPromptButton />
                    </div>
                  </div>

                  {/* Delete column */}
                  <div className="flex justify-end p-2-5 shrink-0" style={{ borderTop: "0.5px solid var(--color-border-light, #e6e4e1)" }}>
                    <Button
                      variant="ghost"
                      intent="danger"
                      leftIcon={<IconTrashFilled size="13px" />}
                      onClick={() => deleteColumn(selectedColumn.id)}
                    >
                      Delete column
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center flex-1 p-4">
                  <p className="font-sans text-sm font-normal tracking-sm text-text-pale">
                    Select a column to edit
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex p-2-5 w-full bg-white"
            style={{ borderTop: "0.5px solid var(--color-border-light, #e6e4e1)" }}
          >
            <Button variant="bold" onClick={handleCreateFromTemplate} className="flex-1">
              Create DataGrid
            </Button>
          </div>
        </div>
      </>
    );
  }

  /* ─── List view (no template selected) ─── */
  return (
    <>
      {/* Title + subtitle */}
      <div className="flex flex-col gap-1-75 p-4" style={{ width: 560 }}>
        <p className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
          Choose a template
        </p>
        <p className="font-sans text-sm font-normal tracking-sm text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis" style={{ lineHeight: "13px" }}>
          Create a DataGrid from a template
        </p>
      </div>

      {/* Template browser panel */}
      <div
        className="flex flex-col overflow-clip w-full shrink-0"
        style={{
          height: 452,
          borderTop: "0.5px solid var(--color-border-light, #e6e4e1)",
          boxShadow: "0px 16px 32px 0px var(--color-shadow-xs, rgba(36,35,31,0.05))",
        }}
      >
        <div className="flex flex-col gap-2-5 items-center overflow-clip p-2-5 w-full">
          {/* Sub-tabs */}
          <div className="flex items-start gap-1 w-full">
            {(["recent", "private", "team", "ruli"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`
                  px-1-5 py-1-5 rounded-md cursor-pointer shrink-0
                  font-sans text-sm font-medium leading-single-sm tracking-sm
                  ${subTab === tab
                    ? "bg-fill-levels-natural-lg text-text-primary"
                    : "text-text-pale hover:text-text-secondary"
                  }
                `}
                onClick={() => handleSwitchTab(tab)}
              >
                {tab === "ruli" ? "Ruli" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full">
            <Input
              placeholder="Search your templates"
              value={search}
              size="sm"
              leftIcon={<IconMagnifier size="13px" />}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Folder header with back */}
          {currentFolder && (
            <div className="w-full">
              <button
                type="button"
                onClick={handleBackFromFolder}
                className="flex items-center gap-1-5 p-1-5 rounded-md cursor-pointer hover:bg-fill-light-neutral-static"
              >
                <span className="shrink-0 size-[13px] flex items-center justify-center text-text-primary">
                  <IconChevronLeft size="13px" />
                </span>
                <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
                  {currentFolder.name}
                </span>
              </button>
            </div>
          )}

          {/* Template list */}
          <div className="flex flex-col gap-1 w-full overflow-y-auto flex-1 min-h-0">
            {filtered.map((item, i) => (
              <button
                key={`${item.name}-${i}`}
                type="button"
                className="flex items-start gap-1-5 p-1-5 w-full cursor-pointer rounded-md hover:bg-fill-light-neutral-static"
                onClick={() => handleSelectTemplate(item)}
              >
                <span className="shrink-0 size-[13px] overflow-clip flex items-center justify-center">
                  {TEMPLATE_ICON_MAP[item.icon]}
                </span>
                <span className="flex-1 min-w-0 font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary text-left whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.name}
                </span>
                {item.count != null && (
                  <span className="shrink-0 font-sans text-sm font-medium leading-single-sm tracking-sm text-text-pale text-right whitespace-nowrap">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex p-2-5 w-full bg-white" style={{ borderTop: "0.5px solid var(--color-border-light, #e6e4e1)" }}>
        <Button variant="bold" disabled className="flex-1">
          Create DataGrid
        </Button>
      </div>
    </>
  );
}

/* ─── Magic Prompt Button (portal tooltip to escape overflow clip) ─── */

function MagicPromptButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (hovered && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.top - 4,
        left: rect.left + rect.width / 2,
      });
    }
  }, [hovered]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="absolute flex items-center justify-center cursor-pointer rounded-md hover:bg-fill-light-neutral-hover hover:border-fill-light-neutral-hover border-[0.5px] border-solid border-border-medium bg-fill-levels-floating-md active:scale-[0.97]"
        style={{ bottom: 8, right: 8, width: 25, height: 25 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <IconSparkle3 size="16px" className="text-text-pale" />
      </button>
      {hovered &&
        createPortal(
          <div
            className="pointer-events-none"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              transform: "translate(-50%, -100%)",
              zIndex: 9999,
            }}
          >
            <Tooltip label="Magic prompt" direction="down" />
          </div>,
          document.body,
        )}
    </>
  );
}

/* ─── Step 2: Review Columns ─── */

function ReviewStep({
  columns,
  selectedColumnId,
  selectedColumn,
  formatDropdownOpen,
  onSelectColumn,
  onUpdateColumn,
  onAddColumn,
  onDeleteColumn,
  onFormatDropdownToggle,
  onFormatDropdownClose,
  onGoBack,
  onSave,
}: {
  columns: GridColumn[];
  selectedColumnId: string | null;
  selectedColumn: GridColumn | undefined;
  formatDropdownOpen: boolean;
  onSelectColumn: (id: string) => void;
  onUpdateColumn: (id: string, patch: Partial<GridColumn>) => void;
  onAddColumn: () => void;
  onDeleteColumn: (id: string) => void;
  onFormatDropdownToggle: () => void;
  onFormatDropdownClose: () => void;
  onGoBack: () => void;
  onSave: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-6 p-4">
        {/* Title + subtitle */}
        <div className="flex flex-col gap-3">
          <p className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
            Review Columns
          </p>
          <p className="font-sans text-sm font-normal tracking-sm text-text-secondary" style={{ lineHeight: "21.5px" }}>
            Ruli has generated columns and their extract instructions based on your prompt. Edit or add columns if needed.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" leftIcon={<IconArrowLeft size="13px" />} onClick={onGoBack}>
            Go back
          </Button>
          <Button variant="bold" onClick={onSave}>
            Create datagrid
          </Button>
        </div>
      </div>

      {/* Two-panel body */}
      <div
        className="flex"
        style={{ borderTop: "0.5px solid var(--color-border-light, #e6e4e1)" }}
      >
        {/* Left sidebar */}
        <div
          className="flex flex-col shrink-0"
          style={{
            width: 176,
            borderRight: "0.5px solid var(--color-border-light, #e6e4e1)",
          }}
        >
          <div className="flex flex-col p-2-5 flex-1 overflow-y-auto">
            {/* Columns header */}
            <div className="px-1-5 py-1-5">
              <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-pale">
                Columns
              </span>
            </div>

            {/* Column list */}
            <div className="flex flex-col gap-0-5 mt-1">
              {columns.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => onSelectColumn(col.id)}
                  className={`
                    flex items-center gap-1-5 p-1-5 rounded-md w-full cursor-pointer text-left
                    ${col.id === selectedColumnId
                      ? "bg-[rgba(36,35,31,0.08)]"
                      : "hover:bg-fill-light-neutral-static"
                    }
                  `}
                >
                  <span className="shrink-0 size-[13px] flex items-center justify-center text-text-pale">
                    {getFormatIcon(col.format)}
                  </span>
                  <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary truncate">
                    {col.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* + New column */}
          <div className="p-2-5" style={{ borderTop: "0.5px solid var(--color-border-light, #e6e4e1)" }}>
            <button
              type="button"
              onClick={onAddColumn}
              className="flex items-center gap-1-5 p-1-5 rounded-md cursor-pointer hover:bg-fill-light-neutral-static w-full"
            >
              <span className="shrink-0 size-[13px] flex items-center justify-center text-text-secondary">
                <IconPlus size="13px" />
              </span>
              <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-secondary">
                New column
              </span>
            </button>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-0 flex flex-col" style={{ maxHeight: 400 }}>
          {selectedColumn ? (
            <>
              {/* Scrollable content */}
              <div className="flex flex-col gap-6 p-4 overflow-y-auto flex-1 min-h-0">
                {/* Column name */}
                <Input
                  label="Column name"
                  value={selectedColumn.name}
                  size="sm"
                  onChange={(e) => onUpdateColumn(selectedColumn.id, { name: e.target.value })}
                />

                {/* Format dropdown */}
                <div className="flex flex-col gap-2" data-format-dropdown>
                  <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
                    Format
                  </span>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={onFormatDropdownToggle}
                      className="flex items-center gap-1-5 p-1-5 rounded-md w-full cursor-pointer"
                      style={{
                        border: "0.5px solid var(--color-border-medium, #d6d4d2)",
                        background: "var(--color-fill-levels-inverse-xl, white)",
                      }}
                    >
                      <span className="shrink-0 size-[13px] flex items-center justify-center text-text-pale">
                        {getFormatIcon(selectedColumn.format)}
                      </span>
                      <span className="flex-1 text-left font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary">
                        {formatLabel(selectedColumn.format)}
                      </span>
                      <span className="shrink-0 size-[13px] flex items-center justify-center text-text-pale">
                        <IconCaretDown size="13px" />
                      </span>
                    </button>

                    {formatDropdownOpen && (
                      <div
                        className="absolute top-full left-0 right-0 z-10 bg-white rounded-lg overflow-clip mt-1"
                        style={{
                          boxShadow: "0px 12px 24px 0px rgba(36,35,31,0.05), 0px 6px 12px -6px rgba(36,35,31,0.03), 0px 0px 0px 0.5px rgba(36,35,31,0.1)",
                        }}
                      >
                        <DropdownGroup>
                          {(["text", "date", "currency", "content"] as ColumnFormat[]).map((fmt) => (
                            <DropdownItem
                              key={fmt}
                              label={formatLabel(fmt)}
                              leftIcon={getFormatIcon(fmt)}
                              state={selectedColumn.format === fmt ? "selected" : "default"}
                              rightIcon={selectedColumn.format === fmt ? <IconCircleCheckFilled size="13px" /> : undefined}
                              onClick={() => {
                                onUpdateColumn(selectedColumn.id, { format: fmt });
                                onFormatDropdownClose();
                              }}
                            />
                          ))}
                        </DropdownGroup>
                      </div>
                    )}
                  </div>
                </div>

                {/* Extract Instructions */}
                <div className="relative w-full">
                  <TextArea
                    label="Extract Instructions"
                    placeholder="Type here..."
                    value={selectedColumn.instructions}
                    width="100%"
                    height={166}
                    onChange={(e) => onUpdateColumn(selectedColumn.id, { instructions: e.target.value })}
                  />
                  <MagicPromptButton />
                </div>
              </div>

              {/* Delete column — always visible at bottom */}
              <div
                className="flex justify-end p-2-5 shrink-0"
                style={{ borderTop: "0.5px solid var(--color-border-light, #e6e4e1)" }}
              >
                <Button
                  variant="ghost"
                  intent="danger"
                  leftIcon={<IconTrashFilled size="13px" />}
                  onClick={() => onDeleteColumn(selectedColumn.id)}
                >
                  Delete column
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 p-4">
              <p className="font-sans text-sm font-normal tracking-sm text-text-pale">
                Select a column to edit
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
