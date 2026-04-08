import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import SegmentedControl, { type SegmentItem } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof SegmentedControl>;

/* ── Helpers ── */

const twoItems: SegmentItem[] = [
  { label: "Label", value: "1" },
  { label: "Label", value: "2" },
];

const threeItems: SegmentItem[] = [
  { label: "Label", value: "1" },
  { label: "Label", value: "2" },
  { label: "Label", value: "3" },
];

const fourItems: SegmentItem[] = [
  { label: "Label", value: "1" },
  { label: "Label", value: "2" },
  { label: "Label", value: "3" },
  { label: "Label", value: "4" },
];

const sixItems: SegmentItem[] = [
  { label: "Label", value: "1" },
  { label: "Label", value: "2" },
  { label: "Label", value: "3" },
  { label: "Label", value: "4" },
  { label: "Label", value: "5" },
  { label: "Label", value: "6" },
];

/* ── Stories ── */

export const Default: Story = {
  args: {
    items: sixItems,
    defaultValue: "1",
  },
};

export const TwoItems: Story = {
  args: {
    items: twoItems,
    defaultValue: "1",
  },
};

export const ThreeItems: Story = {
  args: {
    items: threeItems,
    defaultValue: "1",
  },
};

export const FourItems: Story = {
  args: {
    items: fourItems,
    defaultValue: "1",
  },
};

export const SixItems: Story = {
  args: {
    items: sixItems,
    defaultValue: "1",
  },
};

export const RealisticLabels: Story = {
  args: {
    items: [
      { label: "All", value: "all" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
    defaultValue: "all",
  },
};

export const Controlled: Story = {
  render: () => {
    const items: SegmentItem[] = [
      { label: "Day", value: "day" },
      { label: "Week", value: "week" },
      { label: "Month", value: "month" },
      { label: "Year", value: "year" },
    ];

    const [value, setValue] = useState("week");

    return (
      <SegmentedControl items={items} value={value} onChange={setValue} />
    );
  },
};
