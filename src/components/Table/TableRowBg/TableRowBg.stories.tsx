import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TableRowBg from "./TableRowBg";

const meta: Meta<typeof TableRowBg> = {
  title: "Components/Table/TableRowBg",
  component: TableRowBg,
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

type Story = StoryObj<typeof TableRowBg>;

export const Default: Story = {
  name: "Default (Off)",
  args: {
    active: false,
  },
};

export const Active: Story = {
  name: "Active (Hover)",
  args: {
    active: true,
  },
};

export const WithContent: Story = {
  name: "With Content",
  decorators: [
    () => (
      <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
        <TableRowBg>
          <p
            style={{
              padding: "0 14px",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
              color: "#1b1b1b",
            }}
          >
            Default row (no highlight)
          </p>
        </TableRowBg>
        <TableRowBg active>
          <p
            style={{
              padding: "0 14px",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
              color: "#1b1b1b",
            }}
          >
            Active row (hover highlight)
          </p>
        </TableRowBg>
        <TableRowBg>
          <p
            style={{
              padding: "0 14px",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
              color: "#1b1b1b",
            }}
          >
            Default row (no highlight)
          </p>
        </TableRowBg>
      </div>
    ),
  ],
};
