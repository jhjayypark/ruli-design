import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SubDropdownItem from "./SubDropdownItem";
import { PlaceholderIcon, PlaceholderDangerIcon } from "../DropdownItem/DropdownItem";

const meta: Meta<typeof SubDropdownItem> = {
  title: "Components/SubDropdownItem",
  component: SubDropdownItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Simplified dropdown row used inside sub-dropdown panels. Unpublished building-block.",
          "",
          "## Figma Spec",
          "| Property | Value |",
          "| --- | --- |",
          "| Width | 188 px |",
          "| Border-radius | `--radius-md` (6px) |",
          "| Padding | 6 px all |",
          "| Gap | 6 px |",
          "| Icon container | 13 × 13 px |",
          "| Font | Inter 13 px, weight 450, lh 13 px, tracking -0.039px |",
          "| Label color | `--text-primary` (#24231f) |",
          "| Danger label | `--text-danger-secondary` (#dc455a) |",
          "| Hover/Selected bg | `--fill-levels-natural-lg` (#f0f0ef) |",
          "| Danger hover/selected bg | `--fill-light-danger-static` (#ffe0e1) |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "selected"],
    },
    danger: { control: "boolean" },
    checkbox: { control: "boolean" },
    label: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof SubDropdownItem>;

/* ─── Basic ─── */

export const Default: Story = {
  args: {
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const Hover: Story = {
  args: {
    state: "hover",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const Selected: Story = {
  args: {
    state: "selected",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

/* ─── Checkbox ─── */

export const CheckboxDefault: Story = {
  name: "Checkbox / Default",
  args: {
    checkbox: true,
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const CheckboxHover: Story = {
  name: "Checkbox / Hover",
  args: {
    checkbox: true,
    state: "hover",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const CheckboxSelected: Story = {
  name: "Checkbox / Selected",
  args: {
    checkbox: true,
    state: "selected",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

/* ─── Danger ─── */

export const DangerDefault: Story = {
  name: "Danger / Default",
  args: {
    danger: true,
    leftIcon: <PlaceholderDangerIcon />,
    rightIcon: <PlaceholderDangerIcon />,
  },
};

export const DangerHover: Story = {
  name: "Danger / Hover",
  args: {
    danger: true,
    state: "hover",
    leftIcon: <PlaceholderDangerIcon />,
    rightIcon: <PlaceholderDangerIcon />,
  },
};

export const DangerSelected: Story = {
  name: "Danger / Selected",
  args: {
    danger: true,
    state: "selected",
    leftIcon: <PlaceholderDangerIcon />,
    rightIcon: <PlaceholderDangerIcon />,
  },
};

/* ─── All States ─── */

export const AllStates: Story = {
  name: "All States",
  render: () => {
    const headStyle: React.CSSProperties = {
      padding: 12,
      textAlign: "center",
      fontWeight: 500,
      fontSize: 11,
      color: "#9c9891",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    };
    const labelStyle: React.CSSProperties = {
      padding: 12,
      textAlign: "left",
      fontWeight: 500,
      fontSize: 13,
      color: "#56534b",
      verticalAlign: "top",
    };
    const cellStyle: React.CSSProperties = {
      padding: 8,
      verticalAlign: "top",
    };

    return (
      <table style={{ borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr>
            <th style={headStyle} />
            <th style={headStyle}>Default</th>
            <th style={headStyle}>Hover</th>
            <th style={headStyle}>Selected</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelStyle}>Normal</td>
            <td style={cellStyle}>
              <SubDropdownItem leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <SubDropdownItem state="hover" leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <SubDropdownItem state="selected" leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
          </tr>
          <tr>
            <td style={labelStyle}>Danger</td>
            <td style={cellStyle}>
              <SubDropdownItem danger leftIcon={<PlaceholderDangerIcon />} rightIcon={<PlaceholderDangerIcon />} />
            </td>
            <td style={cellStyle}>
              <SubDropdownItem danger state="hover" leftIcon={<PlaceholderDangerIcon />} rightIcon={<PlaceholderDangerIcon />} />
            </td>
            <td style={cellStyle}>
              <SubDropdownItem danger state="selected" leftIcon={<PlaceholderDangerIcon />} rightIcon={<PlaceholderDangerIcon />} />
            </td>
          </tr>
          <tr>
            <td style={labelStyle}>Checkbox</td>
            <td style={cellStyle}>
              <SubDropdownItem checkbox leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <SubDropdownItem checkbox state="hover" leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <SubDropdownItem checkbox state="selected" leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
};
