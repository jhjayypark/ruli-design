import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconPlus, IconViewMinusSign, IconTrash } from "nucleo-micro-bold";
import GridTemplateCard from "./GridTemplateCard";
import type { TagItem } from "./GridTemplateCard";

const sampleTags: TagItem[] = [
  { label: "Payment terms", format: "text" },
  { label: "Parties", format: "text" },
  { label: "Indemnity risks", format: "verbatim" },
  { label: "Expiration", format: "date" },
  { label: "Auto-renewal", format: "yes_no" },
  { label: "Term", format: "text" },
  { label: "Assignment", format: "text" },
  { label: "Governing Law", format: "text" },
];

const sampleMenuItems = [
  { label: "Use template", icon: <IconPlus size="13px" /> },
  { label: "Hide from featured", icon: <IconViewMinusSign size="13px" /> },
  { label: "Delete template", icon: <IconTrash size="13px" />, danger: true },
];

const meta: Meta<typeof GridTemplateCard> = {
  title: "Components/GridTemplateCard",
  component: GridTemplateCard,
  tags: ["autodocs"],
  argTypes: {
    visibleTagCount: { control: { type: "number", min: 1, max: 10 } },
    avatarText: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof GridTemplateCard>;

export const Default: Story = {
  args: {
    title: "Commercial contract insights",
    tags: sampleTags,
    visibleTagCount: 5,
    avatarText: "A",
    menuItems: sampleMenuItems,
  },
};

export const FewTags: Story = {
  args: {
    title: "Simple NDA review",
    tags: [
      { label: "Parties", format: "text" },
      { label: "Effective date", format: "date" },
      { label: "Duration", format: "number" },
    ],
    visibleTagCount: 5,
    avatarText: "J",
  },
};

export const ManyHiddenTags: Story = {
  args: {
    title: "Full contract analysis",
    tags: [
      { label: "Payment terms", format: "text" },
      { label: "Parties", format: "text" },
      { label: "Indemnity risks", format: "verbatim" },
      { label: "Expiration", format: "date" },
      { label: "Auto-renewal", format: "yes_no" },
      { label: "Term", format: "text" },
      { label: "Assignment", format: "text" },
      { label: "Governing Law", format: "text" },
      { label: "Termination", format: "text" },
      { label: "Penalties", format: "currency" },
      { label: "Effective date", format: "date" },
    ],
    visibleTagCount: 4,
    avatarText: "M",
    menuItems: sampleMenuItems,
  },
};

export const MixedFormats: Story = {
  args: {
    title: "Financial report extraction",
    tags: [
      { label: "Revenue", format: "currency" },
      { label: "Fiscal year", format: "date" },
      { label: "Active", format: "yes_no" },
      { label: "Employee count", format: "number" },
      { label: "Summary", format: "verbatim" },
    ],
    visibleTagCount: 5,
    avatarText: "K",
  },
};

export const WithMenu: Story = {
  args: {
    title: "Commercial contract insights",
    tags: sampleTags,
    visibleTagCount: 5,
    avatarText: "A",
    menuItems: sampleMenuItems,
  },
};
