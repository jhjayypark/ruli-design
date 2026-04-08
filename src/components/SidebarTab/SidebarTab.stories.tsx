import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  IconCardSparkle,
  IconRefreshClockwise,
} from "nucleo-micro-bold";
import SidebarTab from "./SidebarTab";

const meta: Meta<typeof SidebarTab> = {
  title: "Components/SidebarTab",
  component: SidebarTab,
  tags: ["autodocs"],
  args: {
    icon: <IconCardSparkle size="13px" />,
    label: "Assistant",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 188 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SidebarTab>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

/** Hover state — bg changes to alpha-75 */
export const Hover: Story = {
  args: { label: "Monitor", icon: <IconRefreshClockwise size="13px" /> },
  decorators: [
    (Story) => (
      <div style={{ width: 188 }}>
        <style>{`.force-hover .sidebar-tab { background-color: var(--color-alpha-75); }`}</style>
        <div className="force-hover">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const Collapsed: Story = {
  args: { collapsed: true },
  decorators: [
    (Story) => (
      <div style={{ width: 25 }}>
        <Story />
      </div>
    ),
  ],
};

export const CollapsedActive: Story = {
  args: { collapsed: true, active: true },
  decorators: [
    (Story) => (
      <div style={{ width: 25 }}>
        <Story />
      </div>
    ),
  ],
};

/** Collapsed hover — tooltip visible */
export const CollapsedHover: Story = {
  args: {
    collapsed: true,
    icon: <IconRefreshClockwise size="13px" />,
    label: "Monitor",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 25, overflow: "visible" }}>
        <style>{`
          .force-collapsed-hover .sidebar-tab { background-color: var(--color-alpha-75) !important; }
          .force-collapsed-hover .sidebar-tab > .sidebar-tab-icon { color: var(--color-text-secondary) !important; }
          .force-collapsed-hover .sidebar-tab > .sidebar-tab-tooltip { display: flex !important; }
        `}</style>
        <div className="force-collapsed-hover" style={{ overflow: "visible" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
