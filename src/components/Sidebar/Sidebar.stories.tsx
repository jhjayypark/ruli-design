import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Sidebar from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ height: 800, display: "flex", background: "#ffffff" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Expanded: Story = {
  args: {
    collapsed: false,
    activeTab: "assistant",
    userName: "Jay",
    userInitial: "J",
    hasNotification: true,
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    activeTab: "",
    userName: "Jay",
    userInitial: "J",
    hasNotification: true,
  },
};

/** Collapsed state — hover any tab to see its tooltip */
export const CollapsedHover: Story = {
  name: "Collapsed / Hover",
  decorators: [
    (Story) => (
      <div style={{ height: 800, display: "flex", background: "#ffffff" }}>
        <style>{`
          .force-hover-monitor .sidebar-tab[data-tab="monitor"] {
            background-color: var(--color-alpha-75);
          }
          .force-hover-monitor .sidebar-tab[data-tab="monitor"] > .sidebar-tab-icon {
            color: var(--color-text-secondary);
          }
          .force-hover-monitor .sidebar-tab[data-tab="monitor"] > .sidebar-tab-tooltip {
            display: flex !important;
          }
        `}</style>
        <div className="force-hover-monitor" style={{ display: "contents" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    collapsed: true,
    activeTab: "",
    hasNotification: true,
  },
};

export const NoNotification: Story = {
  args: {
    collapsed: false,
    activeTab: "assistant",
    hasNotification: false,
  },
};

export const DifferentActiveTab: Story = {
  args: {
    collapsed: false,
    activeTab: "documents",
    hasNotification: true,
  },
};

export const SideBySide: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 40, height: 800, background: "#ffffff" }}>
      <Sidebar collapsed={false} activeTab="assistant" />
      <Sidebar collapsed={true} activeTab="assistant" />
    </div>
  ),
};
