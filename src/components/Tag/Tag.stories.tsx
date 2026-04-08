import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconCheck, IconCircleDashed, IconNote } from "nucleo-micro-bold";
import Tag from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

/* ================================================================
   Individual color variants
   ================================================================ */

export const Neutral: Story = {
  args: { label: "Neutral", color: "neutral" },
};

export const NeutralHighlight: Story = {
  args: { label: "Neutral", color: "neutral", highlight: true },
};

export const Blue: Story = {
  args: { label: "In Review", color: "blue" },
};

export const BlueHighlight: Story = {
  args: { label: "In Review", color: "blue", highlight: true },
};

export const Purple: Story = {
  args: { label: "Draft", color: "purple" },
};

export const PurpleHighlight: Story = {
  args: { label: "Draft", color: "purple", highlight: true },
};

export const Red: Story = {
  args: { label: "Rejected", color: "red" },
};

export const RedHighlight: Story = {
  args: { label: "Rejected", color: "red", highlight: true },
};

export const Amber: Story = {
  args: { label: "Pending", color: "amber" },
};

export const AmberHighlight: Story = {
  args: { label: "Pending", color: "amber", highlight: true },
};

export const Green: Story = {
  args: { label: "Approved", color: "green" },
};

export const GreenHighlight: Story = {
  args: { label: "Approved", color: "green", highlight: true },
};

/* ================================================================
   Variations
   ================================================================ */

/** Tag without icon */
export const WithoutIcon: Story = {
  args: { label: "No Icon", color: "blue", icon: false },
};

/** Tag with custom icon */
export const CustomIcon: Story = {
  args: {
    label: "Done",
    color: "green",
    highlight: true,
    icon: <IconCheck size="13px" />,
  },
};

/* ================================================================
   All variants side by side
   ================================================================ */

/** All colors — default (no highlight) */
export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag label="Neutral" color="neutral" />
      <Tag label="Blue" color="blue" />
      <Tag label="Purple" color="purple" />
      <Tag label="Red" color="red" />
      <Tag label="Amber" color="amber" />
      <Tag label="Green" color="green" />
    </div>
  ),
};

/** All colors — highlighted */
export const AllColorsHighlight: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag label="Neutral" color="neutral" highlight />
      <Tag label="Blue" color="blue" highlight />
      <Tag label="Purple" color="purple" highlight />
      <Tag label="Red" color="red" highlight />
      <Tag label="Amber" color="amber" highlight />
      <Tag label="Green" color="green" highlight />
    </div>
  ),
};
