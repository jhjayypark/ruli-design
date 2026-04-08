import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DropdownGroup from "./DropdownGroup";
import DropdownItem, { PlaceholderIcon, PlaceholderDangerIcon } from "../DropdownItem/DropdownItem";

const meta: Meta<typeof DropdownGroup> = {
  title: "Components/DropdownGroup",
  component: DropdownGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Container that groups `DropdownItem` rows with an optional header label.",
          "",
          "## Figma Spec",
          "| Property | Value |",
          "| --- | --- |",
          "| Width | 208 px |",
          "| Padding | `--spacing-1` (4px) |",
          "| Gap | `--spacing-1` (4px) |",
          "| Header padding | `--spacing-1-5` (6px) |",
          "| Header font | Inter 13 px, weight 450, lh 13 px, tracking -0.039px |",
          "| Header color | `--text-pale` (#9c9891) |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    header: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof DropdownGroup>;

/* --- With Header --- */

export const WithHeader: Story = {
  name: "With Header",
  args: {
    header: "Header",
  },
  render: (args) => (
    <DropdownGroup {...args}>
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item one" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item two" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item three" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item four" />
    </DropdownGroup>
  ),
};

/* --- Without Header --- */

export const WithoutHeader: Story = {
  name: "Without Header",
  render: () => (
    <DropdownGroup>
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item one" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item two" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item three" />
    </DropdownGroup>
  ),
};

/* --- With Hover State --- */

export const WithHoverItem: Story = {
  name: "With Hover Item",
  render: () => (
    <DropdownGroup header="Header">
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item one" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item two" state="hover" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item three" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item four" />
    </DropdownGroup>
  ),
};

/* --- With Selected Item --- */

export const WithSelectedItem: Story = {
  name: "With Selected Item",
  render: () => (
    <DropdownGroup header="Header">
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item one" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item two" state="selected" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Item three" />
    </DropdownGroup>
  ),
};

/* --- Danger Items --- */

export const DangerGroup: Story = {
  name: "Danger Group",
  render: () => (
    <DropdownGroup header="Danger zone">
      <DropdownItem danger leftIcon={<PlaceholderDangerIcon />} label="Delete" />
      <DropdownItem danger leftIcon={<PlaceholderDangerIcon />} label="Remove all" state="hover" />
    </DropdownGroup>
  ),
};

/* --- Mixed: Multiple Groups (Composed) --- */

export const MultipleGroups: Story = {
  name: "Multiple Groups (Composed)",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 4,
        width: 208,
        borderRadius: "var(--radius-1-5lg, 10px)",
        background: "#fff",
        boxShadow:
          "0px 12px 24px 0px var(--color-shadow-xs, rgba(36,35,31,0.05)), 0px 6px 12px -6px var(--color-shadow-xxs, rgba(36,35,31,0.03)), 0px 0px 0px 0.5px var(--color-shadow-border, rgba(36,35,31,0.1))",
        overflow: "hidden",
      }}
    >
      <DropdownGroup header="Group one">
        <DropdownItem leftIcon={<PlaceholderIcon />} label="Item one" />
        <DropdownItem leftIcon={<PlaceholderIcon />} label="Item two" />
      </DropdownGroup>

      {/* Divider */}
      <div
        style={{
          height: 0.5,
          background: "var(--color-border-low, #e8e7e4)",
          flexShrink: 0,
        }}
      />

      <DropdownGroup header="Group two">
        <DropdownItem leftIcon={<PlaceholderIcon />} label="Item three" />
        <DropdownItem leftIcon={<PlaceholderIcon />} label="Item four" />
      </DropdownGroup>

      {/* Divider */}
      <div
        style={{
          height: 0.5,
          background: "var(--color-border-low, #e8e7e4)",
          flexShrink: 0,
        }}
      />

      <DropdownGroup>
        <DropdownItem danger leftIcon={<PlaceholderDangerIcon />} label="Delete" />
      </DropdownGroup>
    </div>
  ),
};

/* --- With Checkbox Items --- */

export const CheckboxGroup: Story = {
  name: "Checkbox Group",
  render: () => (
    <DropdownGroup header="Options">
      <DropdownItem checkbox leftIcon={<PlaceholderIcon />} label="Option A" />
      <DropdownItem checkbox leftIcon={<PlaceholderIcon />} label="Option B" state="selected" />
      <DropdownItem checkbox leftIcon={<PlaceholderIcon />} label="Option C" />
    </DropdownGroup>
  ),
};

/* --- With Sub Items --- */

export const SubItemsGroup: Story = {
  name: "Sub Items Group",
  render: () => (
    <DropdownGroup header="Actions">
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Edit" />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Move to..." subItems />
      <DropdownItem leftIcon={<PlaceholderIcon />} label="Copy to..." subItems />
    </DropdownGroup>
  ),
};
