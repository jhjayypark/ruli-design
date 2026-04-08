import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ActionReveal from "./ActionReveal";
import DropdownGroup from "../../DropdownGroup/DropdownGroup";
import DropdownItem from "../../DropdownItem/DropdownItem";
import {
  IconPenWritingFilled,
  IconCirclePlusFilled,
  IconTrashFilled,
} from "nucleo-micro-bold";

const DropdownContent = () => (
  <DropdownGroup>
    <DropdownItem
      label="Edit"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9b9b9b)" }}>
          <IconPenWritingFilled size="13px" />
        </span>
      }
    />
    <DropdownItem
      label="Invite"
      leftIcon={
        <span style={{ color: "var(--color-text-pale, #9b9b9b)" }}>
          <IconCirclePlusFilled size="13px" />
        </span>
      }
    />
    <DropdownItem
      label="Delete"
      leftIcon={
        <span style={{ color: "var(--color-text-danger-secondary, #dc455a)" }}>
          <IconTrashFilled size="13px" />
        </span>
      }
      danger
    />
  </DropdownGroup>
);

/** Fake row to show context behind the overlay */
const FakeRow = ({ label }: { label: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      height: 41,
      padding: "0 14px",
      fontFamily: "Inter, sans-serif",
      fontSize: 13,
      color: "#1b1b1b",
      borderBottom: "0.5px solid var(--color-border-light, #eee)",
    }}
  >
    {label}
  </div>
);

const meta: Meta<typeof ActionReveal> = {
  title: "Components/Table/ActionReveal",
  component: ActionReveal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ActionReveal>;

export const Default: Story = {
  name: "Default (Hidden)",
  decorators: [
    () => (
      <div style={{ position: "relative", width: 600, height: 41 }}>
        <FakeRow label="Row content — action reveal is hidden" />
        <ActionReveal state="default" />
      </div>
    ),
  ],
};

export const Hover: Story = {
  decorators: [
    () => (
      <div
        style={{
          position: "relative",
          width: 600,
          height: 41,
          background: "var(--color-fill-levels-natural-sm, #f9f9f9)",
        }}
      >
        <FakeRow label="Row content — hover reveals the dots button" />
        <ActionReveal state="hover" />
      </div>
    ),
  ],
};

export const Clicked: Story = {
  name: "Clicked (Open)",
  decorators: [
    () => (
      <div
        style={{
          position: "relative",
          width: 600,
          height: 41,
          marginBottom: 100,
          background: "var(--color-fill-levels-natural-sm, #f9f9f9)",
        }}
      >
        <FakeRow label="Row content — dropdown is open" />
        <ActionReveal
          state="clicked"
          dropdownContent={<DropdownContent />}
        />
      </div>
    ),
  ],
};

export const AllStates: Story = {
  name: "All States",
  decorators: [
    () => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 600,
          gap: 0,
        }}
      >
        {/* Default */}
        <div style={{ position: "relative", height: 41 }}>
          <FakeRow label="Default — hidden" />
          <ActionReveal state="default" />
        </div>

        {/* Hover */}
        <div
          style={{
            position: "relative",
            height: 41,
            background: "var(--color-fill-levels-natural-sm, #f9f9f9)",
          }}
        >
          <FakeRow label="Hover — dots button visible" />
          <ActionReveal state="hover" />
        </div>

        {/* Clicked */}
        <div
          style={{
            position: "relative",
            height: 41,
            background: "var(--color-fill-levels-natural-sm, #f9f9f9)",
            marginBottom: 120,
          }}
        >
          <FakeRow label="Clicked — dropdown open" />
          <ActionReveal
            state="clicked"
            dropdownContent={<DropdownContent />}
          />
        </div>
      </div>
    ),
  ],
};
