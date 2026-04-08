import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TableCell from "./TableCell";

const meta: Meta<typeof TableCell> = {
  title: "Components/Table/TableCell",
  component: TableCell,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 224 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: "select",
      options: ["default", "number", "avatar"],
    },
    avatarType: {
      control: "select",
      options: ["green", "amber", "purple", "blue", "red", "photo"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableCell>;

/* ── Default type ── */

export const Default: Story = {
  args: {
    type: "default",
    label: "Label",
    helpText: "Help text",
  },
};

export const DefaultNoHelpText: Story = {
  name: "Default — No Help Text",
  args: {
    type: "default",
    label: "Label",
  },
};

export const DefaultWithBadge: Story = {
  name: "Default — With Badge",
  args: {
    type: "default",
    label: "Label",
    helpText: "Help text",
    badge: true,
    badgeCount: 5,
  },
};

export const DefaultWithCheckbox: Story = {
  name: "Default — With Checkbox",
  args: {
    type: "default",
    label: "Label",
    helpText: "Help text",
    checkbox: true,
  },
};

/* ── Number type ── */

export const Number: Story = {
  name: "Number",
  args: {
    type: "number",
    helpText: "Help text",
    number: "1,000",
  },
};

export const NumberNoHelpText: Story = {
  name: "Number — No Help Text",
  args: {
    type: "number",
    number: "1,000",
  },
};

export const NumberWithBadge: Story = {
  name: "Number — With Badge",
  args: {
    type: "number",
    helpText: "Help text",
    number: "1,000",
    badge: true,
    badgeCount: 5,
  },
};

/* ── Avatar type ── */

export const Avatar: Story = {
  name: "Avatar",
  args: {
    type: "avatar",
    label: "Label",
    helpText: "Help text",
    avatarType: "amber",
    avatarText: "A",
  },
};

export const AvatarNoHelpText: Story = {
  name: "Avatar — No Help Text",
  args: {
    type: "avatar",
    label: "Label",
    avatarType: "amber",
    avatarText: "A",
  },
};

export const AvatarWithBadge: Story = {
  name: "Avatar — With Badge",
  args: {
    type: "avatar",
    label: "Label",
    helpText: "Help text",
    badge: true,
    badgeCount: 5,
    avatarType: "amber",
    avatarText: "A",
  },
};

/* ── All Types ── */

export const AllTypes: Story = {
  name: "All Types",
  decorators: [
    () => {
      const sectionLabel: React.CSSProperties = {
        fontSize: 10,
        color: "#aaa69e",
        marginBottom: 4,
        fontFamily: "Inter, sans-serif",
      };

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: 224,
          }}
        >
          <div>
            <p style={sectionLabel}>Default</p>
            <TableCell type="default" label="Label" helpText="Help text" />
          </div>
          <div>
            <p style={sectionLabel}>Number</p>
            <TableCell type="number" helpText="Help text" number="1,000" />
          </div>
          <div>
            <p style={sectionLabel}>Avatar</p>
            <TableCell
              type="avatar"
              label="Label"
              helpText="Help text"
              avatarType="amber"
              avatarText="A"
            />
          </div>
        </div>
      );
    },
  ],
};
