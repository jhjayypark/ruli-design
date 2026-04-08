import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TableColumn, { type TableColumnCell } from "./TableColumn";
import DropdownGroup from "../../DropdownGroup/DropdownGroup";
import DropdownItem, { PlaceholderIcon } from "../../DropdownItem/DropdownItem";

const defaultCells: TableColumnCell[] = Array.from({ length: 15 }, () => ({
  type: "default" as const,
  label: "Label",
  helpText: "Help text",
}));

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

const meta: Meta<typeof TableColumn> = {
  title: "Components/Table/TableColumn",
  component: TableColumn,
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "clicked", "appliedFilter"],
    },
    onFilterClick: { action: "filterClick" },
    onClearFilter: { action: "clearFilter" },
  },
};

export default meta;

type Story = StoryObj<typeof TableColumn>;

export const Default: Story = {
  args: {
    state: "default",
    label: "Label",
    cells: defaultCells,
  },
};

export const Hover: Story = {
  args: {
    state: "hover",
    label: "Label",
    cells: defaultCells,
  },
};

export const Clicked: Story = {
  name: "Clicked (Open)",
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    state: "clicked",
    label: "Label",
    cells: defaultCells,
    dropdownContent: <DropdownContent />,
  },
};

export const AppliedFilter: Story = {
  name: "Applied Filter",
  args: {
    state: "appliedFilter",
    label: "Label",
    filterLabel: "Button",
    cells: defaultCells,
  },
};

/* ── All States side by side ── */

export const AllStates: Story = {
  name: "All States",
  decorators: [
    () => (
      <div style={{ display: "flex", gap: 0, paddingBottom: 320 }}>
        <TableColumn state="default" label="Label" cells={defaultCells} />
        <TableColumn state="hover" label="Label" cells={defaultCells} />
        <TableColumn
          state="clicked"
          label="Label"
          cells={defaultCells}
          dropdownContent={<DropdownContent />}
        />
        <TableColumn
          state="appliedFilter"
          label="Label"
          filterLabel="Button"
          cells={defaultCells}
        />
      </div>
    ),
  ],
};
