import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconCheck, IconAlertWarning } from "nucleo-micro-bold";
import Toast from "./Toast";
import ToastButton from "./ToastButton";

/* ================================================================
   Toast
   ================================================================ */
const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-10">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Toast>;

/** Default toast with icon, support text, and two buttons */
export const Default: Story = {
  args: {
    label: "Label",
    supportText: "Support text",
    actions: (
      <>
        <ToastButton variant="light">Button</ToastButton>
        <ToastButton variant="bold">Button</ToastButton>
      </>
    ),
  },
};

/** Toast without support text */
export const WithoutSupportText: Story = {
  args: {
    label: "Document uploaded successfully",
    icon: <IconCheck size="13px" />,
    actions: (
      <>
        <ToastButton variant="light">Undo</ToastButton>
        <ToastButton variant="bold">View</ToastButton>
      </>
    ),
  },
};

/** Toast without icon */
export const WithoutIcon: Story = {
  args: {
    label: "Changes saved",
    supportText: "All changes have been saved",
    icon: false,
    actions: <ToastButton variant="bold">Dismiss</ToastButton>,
  },
};

/** Label-only toast — no icon, no buttons */
export const LabelOnly: Story = {
  args: {
    label: "Processing your request…",
    supportText: "This may take a moment",
    icon: false,
  },
};

/** Single button toast */
export const SingleButton: Story = {
  args: {
    label: "File deleted",
    icon: <IconCheck size="13px" />,
    actions: <ToastButton variant="bold">Undo</ToastButton>,
  },
};

/** Toast with danger button */
export const WithDangerButton: Story = {
  args: {
    label: "Delete this document?",
    icon: <IconAlertWarning size="13px" />,
    actions: (
      <>
        <ToastButton variant="ghost">Cancel</ToastButton>
        <ToastButton variant="light" intent="danger">
          Delete
        </ToastButton>
      </>
    ),
  },
};

/* ================================================================
   ToastButton variants (rendered on dark surface)
   ================================================================ */
const btnDecorator = (Story: React.ComponentType) => (
  <div className="inline-flex items-center gap-3 rounded-1-5lg bg-fill-bold-neutral-static-light p-4">
    <Story />
  </div>
);

/** Bold (primary) — white bg, dark text */
export const BoldButton: Story = {
  decorators: [btnDecorator],
  render: () => <ToastButton variant="bold">Button</ToastButton>,
};

/** Light (secondary) — translucent bg, white text */
export const LightButton: Story = {
  decorators: [btnDecorator],
  render: () => <ToastButton variant="light">Button</ToastButton>,
};

/** Ghost — transparent, white text */
export const GhostButton: Story = {
  decorators: [btnDecorator],
  render: () => <ToastButton variant="ghost">Button</ToastButton>,
};

/** Danger — red bg, white text */
export const DangerButton: Story = {
  decorators: [btnDecorator],
  render: () => (
    <ToastButton variant="light" intent="danger">
      Delete
    </ToastButton>
  ),
};

/** Loading state */
export const LoadingButton: Story = {
  decorators: [btnDecorator],
  render: () => (
    <ToastButton variant="bold" loading>
      Loading
    </ToastButton>
  ),
};

/** Disabled state */
export const DisabledButton: Story = {
  decorators: [btnDecorator],
  render: () => (
    <ToastButton variant="bold" disabled>
      Disabled
    </ToastButton>
  ),
};

/** All button variants side by side */
export const AllButtonVariants: Story = {
  decorators: [btnDecorator],
  render: () => (
    <div className="flex items-center gap-2">
      <ToastButton variant="bold">Bold</ToastButton>
      <ToastButton variant="light">Light</ToastButton>
      <ToastButton variant="ghost">Ghost</ToastButton>
      <ToastButton variant="light" intent="danger">
        Danger
      </ToastButton>
    </div>
  ),
};
