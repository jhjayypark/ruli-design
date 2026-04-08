import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DropdownItem, { PlaceholderIcon, PlaceholderDangerIcon } from "./DropdownItem";
import SubDropdownItem from "../SubDropdownItem/SubDropdownItem";

const meta: Meta<typeof DropdownItem> = {
  title: "Components/DropdownItem",
  component: DropdownItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Single row item inside a Dropdown menu. Unpublished building-block component.",
          "",
          "## Figma Spec",
          "| Property | Value |",
          "| --- | --- |",
          "| Width | 188 px (fixed) |",
          "| Border-radius | `--radius-md` (6px) |",
          "| Padding (normal) | 6 px all |",
          "| Padding (avatar) | 4 px top/bottom/left, 6 px right |",
          "| Gap | `--spacing-1-5` (6px) |",
          "| Icon container | 13 × 13 px |",
          "| Avatar | 17 × 17 px (xs) |",
          "| Font | Inter 13 px, weight 450, lh 13 px, tracking -0.039px |",
          "| Label color | `--text-primary` (#24231f) |",
          "| Danger label | `--text-danger-secondary` (#dc455a) |",
          "| Support text | `--text-secondary` (#56534b) |",
          "| Help text | `--text-pale` (#9c9891) |",
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
    subItems: { control: "boolean" },
    label: { control: "text" },
    supportText: { control: "text" },
    helpText: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof DropdownItem>;

/* ─── Basic variants ─── */

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

/* ─── With Checkbox ─── */

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

/* ─── Avatar ─── */

export const AvatarDefault: Story = {
  name: "Avatar / Default",
  args: {
    avatar: { type: "amber", text: "A" },
    rightIcon: <PlaceholderIcon />,
  },
};

export const AvatarHover: Story = {
  name: "Avatar / Hover",
  args: {
    avatar: { type: "amber", text: "A" },
    state: "hover",
    rightIcon: <PlaceholderIcon />,
  },
};

export const AvatarSelected: Story = {
  name: "Avatar / Selected",
  args: {
    avatar: { type: "amber", text: "A" },
    state: "selected",
    rightIcon: <PlaceholderIcon />,
  },
};

/* ─── Avatar + Checkbox ─── */

export const AvatarCheckboxDefault: Story = {
  name: "Avatar + Checkbox / Default",
  args: {
    avatar: { type: "amber", text: "A" },
    checkbox: true,
    rightIcon: <PlaceholderIcon />,
  },
};

export const AvatarCheckboxSelected: Story = {
  name: "Avatar + Checkbox / Selected",
  args: {
    avatar: { type: "amber", text: "A" },
    checkbox: true,
    state: "selected",
    rightIcon: <PlaceholderIcon />,
  },
};

/* ─── Sub Items ─── */

export const SubItemsDefault: Story = {
  name: "Sub Items / Default",
  args: {
    leftIcon: <PlaceholderIcon />,
    subItems: true,
  },
};

export const SubItemsHover: Story = {
  name: "Sub Items / Hover",
  args: {
    leftIcon: <PlaceholderIcon />,
    subItems: true,
    state: "hover",
  },
};

export const SubItemsWithPanel: Story = {
  name: "Sub Items / With Panel",
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 4, padding: 20 }}>
      {/* Parent item in hover state */}
      <DropdownItem
        state="hover"
        leftIcon={<PlaceholderIcon />}
        subItems
      />
      {/* Sub-dropdown panel */}
      <div
        style={{
          width: 188,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          borderRadius: "var(--radius-1-5lg, 10px)",
          background: "#fff",
          boxShadow:
            "0px 12px 24px 0px var(--color-shadow-xs, rgba(36,35,31,0.05)), 0px 6px 12px -6px var(--color-shadow-xxs, rgba(36,35,31,0.03)), 0px 0px 0px 0.5px var(--color-shadow-border, rgba(36,35,31,0.1))",
          overflow: "hidden",
        }}
      >
        <SubDropdownItem
          state="hover"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
        />
        <SubDropdownItem
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
        />
        <SubDropdownItem
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
        />
        <SubDropdownItem
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
        />
      </div>
    </div>
  ),
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

/* ─── With Support Text ─── */

export const WithSupportText: Story = {
  name: "With Support Text",
  args: {
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
    supportText: "Support text",
  },
};

/* ─── With Help Text ─── */

export const WithHelpText: Story = {
  name: "With Help Text",
  args: {
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
    helpText: "Help text",
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
      <table
        style={{
          borderCollapse: "collapse",
          fontFamily: "var(--font-sans)",
        }}
      >
        <thead>
          <tr>
            <th style={headStyle} />
            <th style={headStyle}>Default</th>
            <th style={headStyle}>Hover</th>
            <th style={headStyle}>Selected</th>
          </tr>
        </thead>
        <tbody>
          {/* Normal */}
          <tr>
            <td style={labelStyle}>Normal</td>
            <td style={cellStyle}>
              <DropdownItem leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <DropdownItem state="hover" leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <DropdownItem state="selected" leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
          </tr>

          {/* Avatar */}
          <tr>
            <td style={labelStyle}>Avatar</td>
            <td style={cellStyle}>
              <DropdownItem avatar={{ type: "amber", text: "A" }} rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <DropdownItem state="hover" avatar={{ type: "amber", text: "A" }} rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <DropdownItem state="selected" avatar={{ type: "amber", text: "A" }} rightIcon={<PlaceholderIcon />} />
            </td>
          </tr>

          {/* Sub Items */}
          <tr>
            <td style={labelStyle}>Sub Items</td>
            <td style={cellStyle}>
              <DropdownItem leftIcon={<PlaceholderIcon />} subItems />
            </td>
            <td style={cellStyle}>
              <DropdownItem state="hover" leftIcon={<PlaceholderIcon />} subItems />
            </td>
            <td style={cellStyle}>
              <DropdownItem state="selected" leftIcon={<PlaceholderIcon />} subItems />
            </td>
          </tr>

          {/* Danger */}
          <tr>
            <td style={labelStyle}>Danger</td>
            <td style={cellStyle}>
              <DropdownItem danger leftIcon={<PlaceholderDangerIcon />} rightIcon={<PlaceholderDangerIcon />} />
            </td>
            <td style={cellStyle}>
              <DropdownItem danger state="hover" leftIcon={<PlaceholderDangerIcon />} rightIcon={<PlaceholderDangerIcon />} />
            </td>
            <td style={cellStyle}>
              <DropdownItem danger state="selected" leftIcon={<PlaceholderDangerIcon />} rightIcon={<PlaceholderDangerIcon />} />
            </td>
          </tr>

          {/* Checkbox */}
          <tr>
            <td style={labelStyle}>Checkbox</td>
            <td style={cellStyle}>
              <DropdownItem checkbox leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <DropdownItem checkbox state="hover" leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <DropdownItem checkbox state="selected" leftIcon={<PlaceholderIcon />} rightIcon={<PlaceholderIcon />} />
            </td>
          </tr>

          {/* Avatar + Checkbox */}
          <tr>
            <td style={labelStyle}>Avatar +<br />Checkbox</td>
            <td style={cellStyle}>
              <DropdownItem avatar={{ type: "amber", text: "A" }} checkbox rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <DropdownItem avatar={{ type: "amber", text: "A" }} checkbox state="hover" rightIcon={<PlaceholderIcon />} />
            </td>
            <td style={cellStyle}>
              <DropdownItem avatar={{ type: "amber", text: "A" }} checkbox state="selected" rightIcon={<PlaceholderIcon />} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
};
