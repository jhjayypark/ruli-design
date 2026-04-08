import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TableHeader from "./TableHeader";
import DropdownGroup from "../../DropdownGroup/DropdownGroup";
import DropdownItem, { PlaceholderIcon } from "../../DropdownItem/DropdownItem";

const DropdownContent = () => (
  <>
    <DropdownGroup header="Header">
      <DropdownItem label="Label" leftIcon={<PlaceholderIcon />} />
      <DropdownItem label="Label" leftIcon={<PlaceholderIcon />} />
      <DropdownItem label="Label" leftIcon={<PlaceholderIcon />} />
      <DropdownItem label="Label" leftIcon={<PlaceholderIcon />} />
    </DropdownGroup>
    <DropdownGroup header="Header">
      <DropdownItem label="Label" leftIcon={<PlaceholderIcon />} />
      <DropdownItem label="Label" leftIcon={<PlaceholderIcon />} />
      <DropdownItem label="Label" leftIcon={<PlaceholderIcon />} />
      <DropdownItem label="Label" leftIcon={<PlaceholderIcon />} />
    </DropdownGroup>
  </>
);

const meta: Meta<typeof TableHeader> = {
  title: "Components/Table/TableHeader",
  component: TableHeader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 224 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onFilterClick: { action: "filterClick" },
    onClearFilter: { action: "clearFilter" },
  },
};

export default meta;

type Story = StoryObj<typeof TableHeader>;

/* ── Filterable (no applied filter) ── */

export const Default: Story = {
  args: {
    label: "Label",
    filterable: true,
  },
};

export const FilterableOpen: Story = {
  name: "Filterable — Open",
  decorators: [
    (Story) => (
      <div style={{ width: 224, paddingBottom: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Label",
    filterable: true,
    isOpen: true,
    children: <DropdownContent />,
  },
};

/* ── Filterable (applied filter) ── */

export const AppliedFilter: Story = {
  name: "Applied Filter",
  args: {
    label: "Label",
    filterable: true,
    appliedFilter: true,
    filterLabel: "Button",
  },
};

export const AppliedFilterOpen: Story = {
  name: "Applied Filter — Open",
  decorators: [
    (Story) => (
      <div style={{ width: 224, paddingBottom: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Label",
    filterable: true,
    appliedFilter: true,
    filterLabel: "Button",
    isOpen: true,
    children: <DropdownContent />,
  },
};

/* ── Not filterable ── */

export const NotFilterable: Story = {
  name: "Not Filterable",
  args: {
    label: "Label",
    filterable: false,
  },
};

export const NotFilterableOpen: Story = {
  name: "Not Filterable — Open",
  args: {
    label: "Label",
    filterable: false,
    isOpen: true,
  },
};

/* ── Optional features ── */

export const WithCheckbox: Story = {
  name: "With Checkbox",
  args: {
    label: "Label",
    filterable: true,
    checkbox: true,
  },
};

export const WithDragAndEdit: Story = {
  name: "With Drag & Edit (Open)",
  args: {
    label: "Label",
    filterable: true,
    dragIndicator: true,
    editButton: true,
    isOpen: true,
  },
};

/* ── All states grid ── */

export const AllStates: Story = {
  name: "All States Grid",
  decorators: [
    () => {
      const sectionLabel: React.CSSProperties = {
        fontSize: 11,
        color: "#9c9891",
        marginBottom: 8,
        fontFamily: "Inter, sans-serif",
      };
      const stateLabel: React.CSSProperties = {
        fontSize: 10,
        color: "#aaa69e",
        marginBottom: 4,
        fontFamily: "Inter, sans-serif",
      };

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 224 }}>
          {/* Filterable */}
          <p style={sectionLabel}>Filterable (no applied filter)</p>
          <div>
            <p style={stateLabel}>Default</p>
            <TableHeader label="Label" filterable />
          </div>
          <div>
            <p style={stateLabel}>Hover (interact to see)</p>
            <TableHeader label="Label" filterable />
          </div>
          <div>
            <p style={stateLabel}>Open/Active</p>
            <TableHeader label="Label" filterable isOpen>
              <DropdownContent />
            </TableHeader>
          </div>

          {/* Applied filter */}
          <div style={{ marginTop: 320 }}>
            <p style={sectionLabel}>Filterable (applied filter)</p>
          </div>
          <div>
            <p style={stateLabel}>Default</p>
            <TableHeader label="Label" filterable appliedFilter filterLabel="Button" />
          </div>
          <div>
            <p style={stateLabel}>Hover (interact to see)</p>
            <TableHeader label="Label" filterable appliedFilter filterLabel="Button" />
          </div>
          <div>
            <p style={stateLabel}>Open/Active</p>
            <TableHeader label="Label" filterable appliedFilter filterLabel="Button" isOpen>
              <DropdownContent />
            </TableHeader>
          </div>

          {/* Not filterable */}
          <div style={{ marginTop: 320 }}>
            <p style={sectionLabel}>Not Filterable</p>
          </div>
          <div>
            <p style={stateLabel}>Default</p>
            <TableHeader label="Label" filterable={false} />
          </div>
          <div>
            <p style={stateLabel}>Hover (interact to see)</p>
            <TableHeader label="Label" filterable={false} />
          </div>
          <div>
            <p style={stateLabel}>Open/Active</p>
            <TableHeader label="Label" filterable={false} isOpen />
          </div>
        </div>
      );
    },
  ],
};
