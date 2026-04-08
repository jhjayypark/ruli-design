import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["green", "amber", "purple", "blue", "red", "photo"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    status: { control: "boolean" },
    text: { control: "text" },
    src: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

// --- Type variants ---

export const Green: Story = {
  args: { type: "green", size: "md", text: "AA", status: true },
};

export const Amber: Story = {
  args: { type: "amber", size: "md", text: "AA", status: true },
};

export const Purple: Story = {
  args: { type: "purple", size: "md", text: "AA", status: true },
};

export const Blue: Story = {
  args: { type: "blue", size: "md", text: "AA", status: true },
};

export const Red: Story = {
  args: { type: "red", size: "md", text: "AA", status: true },
};

export const Photo: Story = {
  args: {
    type: "photo",
    size: "md",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    status: true,
  },
};

// --- Size variants ---

export const ExtraSmall: Story = {
  args: { type: "green", size: "xs", text: "AA", status: true },
};

export const Small: Story = {
  args: { type: "green", size: "sm", text: "AA", status: true },
};

export const Medium: Story = {
  args: { type: "green", size: "md", text: "AA", status: true },
};

export const Large: Story = {
  args: { type: "green", size: "lg", text: "AA", status: true },
};

// --- Status on/off ---

export const StatusOn: Story = {
  args: { type: "purple", size: "lg", text: "JD", status: true },
};

export const StatusOff: Story = {
  args: { type: "purple", size: "lg", text: "JD", status: false },
};

// --- All variants grid ---

export const AllVariants: Story = {
  args: { status: true },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{ width: 60, fontSize: 12, color: "#888" }}>{size.toUpperCase()}</span>
          {(["green", "amber", "purple", "blue", "red", "photo"] as const).map((type) => (
            <Avatar
              key={type}
              type={type}
              size={size}
              text="AA"
              status={args.status}
              src={
                type === "photo"
                  ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
                  : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  ),
};
