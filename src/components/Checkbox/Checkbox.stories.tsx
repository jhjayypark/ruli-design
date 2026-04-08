import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Binary toggle for confirming or enabling discrete options.",
          "",
          "## Figma Spec",
          "| Property | Value |",
          "| --- | --- |",
          "| Box | 13 × 13 px, `display: flex`, center/center |",
          "| Hit area | 25 × 25 px (centred on box) |",
          "| Border-radius | `var(--radius-rounded, 4px)` |",
          "| Unchecked border | 2 px inside solid `--border-high` (#ccc8c3) |",
          "| Unchecked bg | `--fill-levels-floating-sm` (white) |",
          "| Checked bg | `--fill-bold-neutral-static` (#56534b) |",
          "| Checked hover bg | `--fill-bold-neutral-hover` (#3b3934) |",
          "| Disabled bg | `--fill-levels-natural-lg` (#f0f0ef) |",
          "| Disabled border | 0.5 px inside solid `--border-medium` (#d6d4d2) |",
          "| Preview bg | `--alpha-100` rgba(36,35,31,0.1) |",
          "| Unchecked hover border | 2 px inside solid `--border-highlight` (#9c9891) |",
          "| Checked hover bg | `--fill-bold-neutral-hover` (#3b3934) |",
          "| Icon (normal) | white |",
          "| Icon (disabled/preview) | #9C9891 |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    preview: { control: "boolean" },
    _hovered: { control: "boolean", name: "Hovered (visual)" },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const UncheckedDisabled: Story = {
  name: "Unchecked / Disabled",
  args: { disabled: true },
};

export const CheckedDisabled: Story = {
  name: "Checked / Disabled",
  args: { checked: true, disabled: true },
};

export const IndeterminateDisabled: Story = {
  name: "Indeterminate / Disabled",
  args: { indeterminate: true, disabled: true },
};

export const UncheckedHover: Story = {
  name: "Unchecked / Hover",
  args: { _hovered: true },
};

export const CheckedHover: Story = {
  name: "Checked / Hover",
  args: { checked: true, _hovered: true },
};

export const IndeterminateHover: Story = {
  name: "Indeterminate / Hover",
  args: { indeterminate: true, _hovered: true },
};

export const CheckedPreview: Story = {
  name: "Checked / Preview",
  args: { checked: true, preview: true },
};

export const Interactive: Story = {
  render: function InteractiveCheckbox() {
    const [on, setOn] = useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Checkbox checked={on} onChange={setOn} />
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13 }}>
          {on ? "Checked" : "Unchecked"}
        </span>
      </div>
    );
  },
};

export const AllStates: Story = {
  name: "All States",
  render: () => {
    const cellStyle: React.CSSProperties = {
      padding: 12,
      textAlign: "center",
      verticalAlign: "middle",
    };
    const headStyle: React.CSSProperties = {
      ...cellStyle,
      fontWeight: 500,
      fontSize: 11,
      color: "#9c9891",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    };
    const labelStyle: React.CSSProperties = {
      ...cellStyle,
      textAlign: "left",
      fontWeight: 500,
      fontSize: 13,
      color: "#56534b",
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
            <th style={headStyle}>Disabled</th>
            <th style={headStyle}>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelStyle}>False</td>
            <td style={cellStyle}><Checkbox /></td>
            <td style={cellStyle}><Checkbox _hovered /></td>
            <td style={cellStyle}><Checkbox disabled /></td>
            <td style={{ ...cellStyle, color: "#ccc8c3" }}>—</td>
          </tr>
          <tr>
            <td style={labelStyle}>True</td>
            <td style={cellStyle}><Checkbox checked /></td>
            <td style={cellStyle}><Checkbox checked _hovered /></td>
            <td style={cellStyle}><Checkbox checked disabled /></td>
            <td style={cellStyle}><Checkbox checked preview /></td>
          </tr>
          <tr>
            <td style={labelStyle}>Indetermined</td>
            <td style={cellStyle}><Checkbox indeterminate /></td>
            <td style={cellStyle}><Checkbox indeterminate _hovered /></td>
            <td style={cellStyle}><Checkbox indeterminate disabled /></td>
            <td style={{ ...cellStyle, color: "#ccc8c3" }}>—</td>
          </tr>
        </tbody>
      </table>
    );
  },
};
