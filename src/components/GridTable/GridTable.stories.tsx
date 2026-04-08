import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GridTable, { type GridTableColumn, type GridTableRowData } from "./GridTable";
import DropdownGroup from "../DropdownGroup/DropdownGroup";
import DropdownItem from "../DropdownItem/DropdownItem";
import {
  IconPenWritingFilled,
  IconCirclePlusFilled,
  IconTrashFilled,
  IconArrowDown,
  IconArrowUp,
  IconCalendarDays,
  IconCalendar,
  IconSlider,
  IconMagnifier,
  IconDescendingSorting,
  IconAscendingSorting,
  IconCircleCheckFilled,
} from "nucleo-micro-bold";

/* ────────────────────────────────────────────
 * Shared data
 * ──────────────────────────────────────────── */

const columns: GridTableColumn[] = [
  { key: "grid", label: "Grid", width: "flex", cellType: "default", filterable: false },
  { key: "owner", label: "Owner", width: 224, cellType: "avatar" },
  { key: "template", label: "Template", width: 224, cellType: "default" },
  { key: "edited", label: "Edited", width: 144, cellType: "avatar" },
  { key: "docs", label: "Docs", width: 144, cellType: "number" },
];

const rows: GridTableRowData[] = [
  {
    grid: { label: "Project Titan - Due Diligence", checkbox: true },
    owner: { avatarType: "amber", avatarText: "A", label: "You" },
    template: { label: "M&A Due Diligence" },
    edited: { avatarType: "amber", avatarText: "A", label: "1m ago" },
    docs: { number: "1,240" },
  },
  {
    grid: { label: "Vendor Renewals Q4 2025", checkbox: true },
    owner: { avatarType: "red", avatarText: "XS", label: "Xi Sun" },
    template: { label: "Custom" },
    edited: { avatarType: "purple", avatarText: "JK", label: "15m ago" },
    docs: { number: "45" },
  },
  {
    grid: { label: "Appletree Acquisition - Phase 1", checkbox: true },
    owner: { avatarType: "purple", avatarText: "JK", label: "Jay Park" },
    template: { label: "Custom" },
    edited: { avatarType: "purple", avatarText: "JK", label: "4h ago" },
    docs: { number: "856" },
  },
  {
    grid: { label: "Q3 Employee Agreements", checkbox: true },
    owner: { avatarType: "amber", avatarText: "A", label: "You" },
    template: { label: "Custom" },
    edited: { avatarType: "amber", avatarText: "A", label: "5h ago" },
    docs: { number: "128" },
  },
  {
    grid: { label: "SaaS Licensing Audit", checkbox: true },
    owner: { avatarType: "blue", avatarText: "BL", label: "Bryan Lee" },
    template: { label: "NDA Key Terms" },
    edited: { avatarType: "blue", avatarText: "BL", label: "1d ago" },
    docs: { number: "312" },
  },
  {
    grid: { label: "Litigation Discovery", checkbox: true },
    owner: { avatarType: "green", avatarText: "SC", label: "Sarah Chen" },
    template: { label: "Custom" },
    edited: { avatarType: "green", avatarText: "SC", label: "1d ago" },
    docs: { number: "67" },
  },
  {
    grid: { label: "GDPR Data Processing Addendums", checkbox: true },
    owner: { avatarType: "amber", avatarText: "A", label: "You" },
    template: { label: "M&A Due Diligence" },
    edited: { avatarType: "amber", avatarText: "A", label: "2d ago" },
    docs: { number: "4,502" },
  },
  {
    grid: { label: "Office Lease Review (HQ)", checkbox: true },
    owner: { avatarType: "amber", avatarText: "A", label: "You" },
    template: { label: "M&A Due Diligence" },
    edited: { avatarType: "amber", avatarText: "A", label: "2d ago" },
    docs: { number: "189" },
  },
  {
    grid: { label: "M&A Due Diligence", checkbox: true },
    owner: { avatarType: "amber", avatarText: "A", label: "You" },
    template: { label: "Custom" },
    edited: { avatarType: "amber", avatarText: "A", label: "2w ago" },
    docs: { number: "12" },
  },
];

/** Rows with all checkboxes checked (for Global checkbox hover state) */
const checkedRows: GridTableRowData[] = rows.map((row) => ({
  ...row,
  grid: { ...row.grid, checkboxChecked: true },
}));

/** Filtered rows — Owner: You, Bryan Lee, Sarah Chen (indices 0,3,4,6,7,8) */
const ownerFilteredRows: GridTableRowData[] = [
  rows[0], rows[3], rows[4], rows[6], rows[7], rows[8],
];

/** Filtered rows — Edited: last 7 days (indices 0–7, excluding last) */
const editedFilteredRows: GridTableRowData[] = rows.slice(0, 8);

/* ────────────────────────────────────────────
 * Reusable dropdown elements
 * ──────────────────────────────────────────── */

/** Row action dropdown — Edit, Invite, Delete */
const ActionDropdown = () => (
  <DropdownGroup>
    <DropdownItem
      label="Edit"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9b9b9b)" }}>
          <IconPenWritingFilled size="13px" />
        </span>
      }
    />
    <DropdownItem
      label="Invite"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9b9b9b)" }}>
          <IconCirclePlusFilled size="13px" />
        </span>
      }
    />
    <DropdownItem
      label="Delete"
      leftIcon={
        <span style={{ color: "var(--color-text-danger-secondary, #dc455a)" }}>
          <IconTrashFilled size="13px" />
        </span>
      }
      danger
    />
  </DropdownGroup>
);

/** Inline search field for filter dropdowns */
const SearchField = () => (
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

/** Owner filter dropdown — no selections */
const OwnerFilterDropdown = () => (
  <>
    <DropdownGroup header="Sort by">
      <DropdownItem
        label="A-Z"
        leftIcon={<IconArrowDown size="13px" />}
        state="selected"
        rightIcon={<IconCircleCheckFilled size="13px" />}
      />
      <DropdownItem
        label="Z-A"
        leftIcon={<IconArrowUp size="13px" />}
      />
    </DropdownGroup>
    <DropdownGroup header="Owners">
      <SearchField />
      <DropdownItem label="Private" helpText="4" checkbox avatar={{ type: "amber", text: "A" }} />
      <DropdownItem label="You" helpText="1" checkbox avatar={{ type: "amber", text: "A" }} />
      <DropdownItem label="Bryan Lee" helpText="1" checkbox avatar={{ type: "blue", text: "BL" }} />
      <DropdownItem label="Jay Park" helpText="1" checkbox avatar={{ type: "purple", text: "JK" }} />
      <DropdownItem label="Xi Sun" helpText="1" checkbox avatar={{ type: "red", text: "XS" }} />
      <DropdownItem label="Sarah Chen" helpText="1" checkbox avatar={{ type: "green", text: "SC" }} />
    </DropdownGroup>
  </>
);

/** Owner filter dropdown — 3 selected (Private, You, Bryan Lee) */
const OwnerFilterDropdownSelected = () => (
  <>
    <DropdownGroup header="Sort by">
      <DropdownItem
        label="A-Z"
        leftIcon={<IconArrowDown size="13px" />}
        state="selected"
        rightIcon={<IconCircleCheckFilled size="13px" />}
      />
      <DropdownItem
        label="Z-A"
        leftIcon={<IconArrowUp size="13px" />}
      />
    </DropdownGroup>
    <DropdownGroup header="Owners">
      <SearchField />
      <DropdownItem label="Private" helpText="4" checkbox state="selected" avatar={{ type: "amber", text: "A" }} />
      <DropdownItem label="You" helpText="1" checkbox state="selected" avatar={{ type: "amber", text: "A" }} />
      <DropdownItem label="Bryan Lee" helpText="1" checkbox state="selected" avatar={{ type: "blue", text: "BL" }} />
      <DropdownItem label="Jay Park" helpText="1" checkbox avatar={{ type: "purple", text: "JK" }} />
      <DropdownItem label="Xi Sun" helpText="1" checkbox avatar={{ type: "red", text: "XS" }} />
      <DropdownItem label="Sarah Chen" helpText="1" checkbox avatar={{ type: "green", text: "SC" }} />
    </DropdownGroup>
  </>
);

/** Template filter dropdown — no selections */
const TemplateFilterDropdown = () => (
  <>
    <DropdownGroup header="Sort by">
      <DropdownItem
        label="A-Z"
        leftIcon={<IconArrowDown size="13px" />}
        state="selected"
        rightIcon={<IconCircleCheckFilled size="13px" />}
      />
      <DropdownItem
        label="Z-A"
        leftIcon={<IconArrowUp size="13px" />}
      />
    </DropdownGroup>
    <DropdownGroup header="Templates">
      <DropdownItem label="M&A Due Diligence" helpText="3" checkbox />
      <DropdownItem label="NDA Key Terms" helpText="1" checkbox />
      <DropdownItem label="Custom" helpText="5" checkbox />
    </DropdownGroup>
  </>
);

/** Template filter dropdown — 2 selected (M&A Due Diligence, NDA Key Terms) */
const TemplateFilterDropdownSelected = () => (
  <>
    <DropdownGroup header="Sort by">
      <DropdownItem
        label="A-Z"
        leftIcon={<IconArrowDown size="13px" />}
        state="selected"
        rightIcon={<IconCircleCheckFilled size="13px" />}
      />
      <DropdownItem
        label="Z-A"
        leftIcon={<IconArrowUp size="13px" />}
      />
    </DropdownGroup>
    <DropdownGroup header="Templates">
      <DropdownItem label="M&A Due Diligence" helpText="3" checkbox state="selected" />
      <DropdownItem label="NDA Key Terms" helpText="1" checkbox state="selected" />
      <DropdownItem label="Custom" helpText="5" checkbox />
    </DropdownGroup>
  </>
);

/** Edited filter dropdown — no selections */
const EditedFilterDropdown = () => (
  <DropdownGroup>
    <DropdownItem
      label="Last 7 days"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9c9891)" }}>
          <IconCalendarDays size="13px" />
        </span>
      }
    />
    <DropdownItem
      label="Last 30 days"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9c9891)" }}>
          <IconCalendar size="13px" />
        </span>
      }
    />
    <DropdownItem
      label="Custom"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9c9891)" }}>
          <IconSlider size="13px" />
        </span>
      }
      subItems
    />
  </DropdownGroup>
);

/** Edited filter dropdown — "Last 7 days" selected */
const EditedFilterDropdownSelected = () => (
  <DropdownGroup>
    <DropdownItem
      label="Last 7 days"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9c9891)" }}>
          <IconCalendarDays size="13px" />
        </span>
      }
      state="selected"
      rightIcon={<IconCircleCheckFilled size="13px" />}
    />
    <DropdownItem
      label="Last 30 days"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9c9891)" }}>
          <IconCalendar size="13px" />
        </span>
      }
    />
    <DropdownItem
      label="Custom"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9c9891)" }}>
          <IconSlider size="13px" />
        </span>
      }
      subItems
    />
  </DropdownGroup>
);

/** Docs filter dropdown — "High to low" selected */
const DocsFilterDropdownSelected = () => (
  <DropdownGroup header="Sort by">
    <DropdownItem
      label="High to low"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9c9891)" }}>
          <IconDescendingSorting size="13px" />
        </span>
      }
      state="selected"
      rightIcon={<IconCircleCheckFilled size="13px" />}
    />
    <DropdownItem
      label="Low to high"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9c9891)" }}>
          <IconAscendingSorting size="13px" />
        </span>
      }
    />
  </DropdownGroup>
);

/* ────────────────────────────────────────────
 * Meta
 * ──────────────────────────────────────────── */

const meta: Meta<typeof GridTable> = {
  title: "Components/GridTable",
  component: GridTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "## GridTable",
          "",
          "A full table component composing `TableColumn`, `TableRowBg`, and `ActionReveal`.",
          "",
          "### Architecture",
          "- **columns** — Array of `GridTableColumn` defining each column (key, label, width, cellType, filterable).",
          "- **rows** — Array of `GridTableRowData`. Each row is a record keyed by column key, with values matching `TableColumnCell` props.",
          "- **columnStates** — Controls header filter state per column: `default | hover | clicked | appliedFilter | appliedFilterClicked`.",
          "- **columnDropdowns** — ReactNode content for each column's filter dropdown (shown when `clicked` or `appliedFilterClicked`).",
          "- **filterLabels** — Label text for applied filter pills (e.g. `\"3 owners\"`).",
          "- **hoveredRow** — Index of the hovered row (activates `TableRowBg` highlight).",
          "- **actionStates** — Controls `ActionReveal` per row: `default | hover | clicked`.",
          "- **actionDropdownContent** — Shared dropdown menu for row actions (Edit, Invite, Delete).",
          "",
          "### Column types",
          "| Column | `width` | `cellType` | Notes |",
          "|--------|---------|------------|-------|",
          "| Grid | `\"flex\"` | `default` | Flexible width, checkbox cells |",
          "| Owner | `224` | `avatar` | Avatar + name |",
          "| Template | `224` | `default` | Text only |",
          "| Edited | `144` | `avatar` | Avatar + time |",
          "| Docs | `144` | `number` | Right-aligned number |",
          "",
          "### States (12 total)",
          "1. **Default** — No interactions",
          "2. **Global checkbox hover** — All row checkboxes preview-checked",
          "3. **Filter / Owner** — Owner dropdown open (no selection)",
          "4. **Filter / Owner / Selected** — 3 owners checked, pill shown + dropdown open",
          "5. **Filter / Owner / Applied** — Pill shown, filtered to 6 rows",
          "6. **Filter / Template** — Template dropdown open",
          "7. **Filter / Template / Selected** — 2 templates checked, pill + dropdown",
          "8. **Filter / Template / Applied** — Pill shown, all rows",
          "9. **Filter / Edited** — Edited dropdown open (date ranges)",
          "10. **Filter / Edited / Selected** — \"7d\" selected, pill + dropdown",
          "11. **Filter / Edited / Applied** — Pill shown, 8 rows",
          "12. **Filter / Docs / Selected** — Docs dropdown with sort options",
        ].join("\n"),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof GridTable>;

/* ────────────────────────────────────────────
 * Stories — 12 states matching Figma
 * ──────────────────────────────────────────── */

/** 1. Default state — no interactions */
export const Default: Story = {
  args: {
    columns,
    rows,
  },
};

/** 2. Global checkbox hover — all row checkboxes checked */
export const GlobalCheckboxHover: Story = {
  name: "Global checkbox hover",
  args: {
    columns,
    rows: checkedRows,
  },
};

/** 3. Filter / Owner — dropdown open, no selection */
export const FilterOwner: Story = {
  name: "Filter / Owner",
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns,
    rows,
    columnStates: { owner: "clicked" },
    columnDropdowns: { owner: <OwnerFilterDropdown /> },
  },
};

/** 4. Filter / Owner / Selected — 3 owners checked, pill + dropdown open */
export const FilterOwnerSelected: Story = {
  name: "Filter / Owner / Selected",
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns,
    rows,
    columnStates: { owner: "appliedFilterClicked" },
    filterLabels: { owner: "3 owners" },
    columnDropdowns: { owner: <OwnerFilterDropdownSelected /> },
  },
};

/** 5. Filter / Owner / Applied — pill shown, 6 filtered rows */
export const FilterOwnerApplied: Story = {
  name: "Filter / Owner / Applied",
  args: {
    columns,
    rows: ownerFilteredRows,
    columnStates: { owner: "appliedFilter" },
    filterLabels: { owner: "3 owners" },
  },
};

/** 6. Filter / Template — dropdown open, no selection */
export const FilterTemplate: Story = {
  name: "Filter / Template",
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 200 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns,
    rows,
    columnStates: { template: "clicked" },
    columnDropdowns: { template: <TemplateFilterDropdown /> },
  },
};

/** 7. Filter / Template / Selected — 2 templates checked, pill + dropdown open */
export const FilterTemplateSelected: Story = {
  name: "Filter / Template / Selected",
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 200 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns,
    rows,
    columnStates: { template: "appliedFilterClicked" },
    filterLabels: { template: "2 templates" },
    columnDropdowns: { template: <TemplateFilterDropdownSelected /> },
  },
};

/** 8. Filter / Template / Applied — pill shown, all rows */
export const FilterTemplateApplied: Story = {
  name: "Filter / Template / Applied",
  args: {
    columns,
    rows,
    columnStates: { template: "appliedFilter" },
    filterLabels: { template: "2 templates" },
  },
};

/** 9. Filter / Edited — dropdown open, date range options */
export const FilterEdited: Story = {
  name: "Filter / Edited",
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 120 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns,
    rows,
    columnStates: { edited: "clicked" },
    columnDropdowns: { edited: <EditedFilterDropdown /> },
  },
};

/** 10. Filter / Edited / Selected — "Last 7 days" selected, pill + dropdown */
export const FilterEditedSelected: Story = {
  name: "Filter / Edited / Selected",
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 120 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns,
    rows,
    columnStates: { edited: "appliedFilterClicked" },
    filterLabels: { edited: "7d" },
    columnDropdowns: { edited: <EditedFilterDropdownSelected /> },
  },
};

/** 11. Filter / Edited / Applied — pill shown, 8 rows */
export const FilterEditedApplied: Story = {
  name: "Filter / Edited / Applied",
  args: {
    columns,
    rows: editedFilteredRows,
    columnStates: { edited: "appliedFilter" },
    filterLabels: { edited: "7d" },
  },
};

/** 12. Filter / Docs / Selected — sort dropdown with "High to low" selected */
export const FilterDocsSelected: Story = {
  name: "Filter / Docs / Selected",
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 100 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns,
    rows,
    columnStates: { docs: "clicked" },
    columnDropdowns: { docs: <DocsFilterDropdownSelected /> },
  },
};

/* ────────────────────────────────────────────
 * Bonus interaction stories
 * ──────────────────────────────────────────── */

/** Row 2 hovered — shows RowBg highlight + ActionReveal dots button */
export const RowHover: Story = {
  name: "Row Hover",
  args: {
    columns,
    rows,
    hoveredRow: 2,
    actionStates: { 2: "hover" },
  },
};

/** Row action dropdown open */
export const RowActionOpen: Story = {
  name: "Row Action Open",
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 100 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns,
    rows,
    hoveredRow: 2,
    actionStates: { 2: "clicked" },
    actionDropdownContent: <ActionDropdown />,
  },
};
