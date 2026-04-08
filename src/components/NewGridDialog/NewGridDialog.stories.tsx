import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import NewGridDialog from "./NewGridDialog";
import { Button } from "@/components/Button";
import { IconPlus } from "nucleo-micro-bold";

const meta: Meta<typeof NewGridDialog> = {
  title: "Components/NewGridDialog",
  component: NewGridDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof NewGridDialog>;

export const PromptStep: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSave: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button
          variant="outline"
          leftIcon={<IconPlus size="13px" />}
          onClick={() => setOpen(true)}
        >
          New grid
        </Button>
        <NewGridDialog
          open={open}
          onClose={() => setOpen(false)}
          onSave={(columns) => {
            console.log("Saved columns:", columns);
            setOpen(false);
          }}
        />
      </div>
    );
  },
};
