import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconGlobe, IconNote, IconPlus } from "nucleo-micro-bold";
import Tab from "./Tab";
import type { TabItem } from "./Tab";

const meta: Meta<typeof Tab> = {
  title: "Components/Tab",
  component: Tab,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-6 w-[500px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: "select", options: ["lg", "sm"] },
  },
};
export default meta;

type Story = StoryObj<typeof Tab>;

/* ─── Interactive wrapper for sliding indicator demo ─── */
function InteractiveTab({ items, size = "lg" }: { items: TabItem[]; size?: "lg" | "sm" }) {
  const [active, setActive] = useState(0);
  return <Tab items={items} size={size} activeIndex={active} onChange={setActive} />;
}

/** Interactive — click tabs to see the indicator slide */
export const Interactive: Story = {
  render: () => (
    <InteractiveTab
      items={[
        { label: "Overview" },
        { label: "Documents" },
        { label: "Activity" },
        { label: "Settings" },
      ]}
    />
  ),
};

/** Interactive small */
export const InteractiveSmall: Story = {
  render: () => (
    <InteractiveTab
      size="sm"
      items={[
        { label: "Overview" },
        { label: "Documents" },
        { label: "Activity" },
        { label: "Settings" },
      ]}
    />
  ),
};

/** Interactive with icons */
export const InteractiveWithIcons: Story = {
  render: () => (
    <InteractiveTab
      items={[
        { label: "General", icon: <IconGlobe size="13px" /> },
        { label: "Notes", icon: <IconNote size="13px" /> },
        { label: "Create", icon: <IconPlus size="13px" /> },
      ]}
    />
  ),
};

/** Interactive with counts */
export const InteractiveWithCounts: Story = {
  render: () => (
    <InteractiveTab
      items={[
        { label: "All", count: 128 },
        { label: "Active", count: 21 },
        { label: "Draft", count: 5 },
        { label: "Archived" },
      ]}
    />
  ),
};

/** Interactive many tabs */
export const InteractiveManyTabs: Story = {
  render: () => (
    <InteractiveTab
      size="sm"
      items={[
        { label: "All" },
        { label: "Contracts" },
        { label: "NDAs" },
        { label: "Invoices" },
        { label: "Reports" },
        { label: "Templates" },
      ]}
    />
  ),
};

/** Large tabs — static */
export const Large: Story = {
  args: {
    size: "lg",
    items: [
      { label: "Overview" },
      { label: "Documents" },
      { label: "Activity" },
      { label: "Settings" },
    ],
    activeIndex: 0,
  },
};

/** Small tabs — static */
export const Small: Story = {
  args: {
    size: "sm",
    items: [
      { label: "Overview" },
      { label: "Documents" },
      { label: "Activity" },
      { label: "Settings" },
    ],
    activeIndex: 0,
  },
};

/** Second tab active — static */
export const SecondActive: Story = {
  args: {
    size: "lg",
    items: [
      { label: "Overview" },
      { label: "Documents" },
      { label: "Activity" },
      { label: "Settings" },
    ],
    activeIndex: 1,
  },
};
