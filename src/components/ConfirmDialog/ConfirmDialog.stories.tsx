import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconTrashFilled } from "nucleo-micro-bold";
import ConfirmDialog from "./ConfirmDialog";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    open: true,
    onCancel: () => {},
    onConfirm: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

export const DeleteTemplate: Story = {
  args: {
    icon: <IconTrashFilled size="13px" />,
    iconBg: "bg-fill-light-danger-static",
    title: "Delete \"Commercial contract insights\"",
    description:
      "Are you sure you want to delete this template? This action cannot be undone. Existing grids created with this template will not be affected.",
    cancelLabel: "Cancel",
    confirmLabel: "Yes, delete",
    danger: true,
  },
};
