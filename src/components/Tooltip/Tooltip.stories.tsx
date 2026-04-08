import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Tooltip from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "select", options: ["left", "right", "up", "down"] },
    multiLine: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

/* ── Single-line (default) ── */
export const Default: Story = {
  args: { label: "Label", direction: "down" },
};

export const Left: Story = {
  args: { label: "Label", direction: "left" },
};

export const Right: Story = {
  args: { label: "Label", direction: "right" },
};

export const Down: Story = {
  args: { label: "Label", direction: "down" },
};

export const Up: Story = {
  args: { label: "Label", direction: "up" },
};

/* ── Multi-line ── */
export const MultiLineDown: Story = {
  args: {
    label: "multi-line help text here \u2013 use for cases that could benefit from longer descriptions",
    direction: "down",
    multiLine: true,
  },
};

export const MultiLineUp: Story = {
  args: {
    label: "multi-line help text here \u2013 use for cases that could benefit from longer descriptions",
    direction: "up",
    multiLine: true,
  },
};

export const MultiLineLeft: Story = {
  args: {
    label: "multi-line help text here \u2013 use for cases that could benefit from longer descriptions",
    direction: "left",
    multiLine: true,
  },
};

export const MultiLineRight: Story = {
  args: {
    label: "multi-line help text here \u2013 use for cases that could benefit from longer descriptions",
    direction: "right",
    multiLine: true,
  },
};

/* ── All directions gallery ── */
export const AllDirections: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 40 }}>
      <div>
        <p style={{ marginBottom: 12, fontSize: 13, color: "#888" }}>Single-line</p>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <Tooltip label="Left" direction="left" />
          <Tooltip label="Right" direction="right" />
          <Tooltip label="Down" direction="down" />
          <Tooltip label="Up" direction="up" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 12, fontSize: 13, color: "#888" }}>Multi-line</p>
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          <Tooltip label="multi-line help text here – use for cases that could benefit from longer descriptions" direction="down" multiLine />
          <Tooltip label="multi-line help text here – use for cases that could benefit from longer descriptions" direction="up" multiLine />
        </div>
      </div>
    </div>
  ),
};
