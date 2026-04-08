import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import RadioButton from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Components/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Selects exactly one option from a mutually exclusive set.",
          "",
          "## Figma Spec",
          "| Property | Value |",
          "| --- | --- |",
          "| Circle | 13 × 13 px, `border-radius: 100px` (full) |",
          "| Hit area | 25 × 25 px (centred on circle) |",
          "| Unchecked border | 2 px inside solid `--border-high` (#ccc8c3) |",
          "| Unchecked hover border | 2 px inside solid `--border-highlight` (#9c9891) |",
          "| Unchecked bg | `--fill-levels-floating-sm` (white) |",
          "| Checked bg | `--fill-bold-neutral-static` (#56534b) |",
          "| Checked hover bg | `--fill-bold-neutral-hover` (#3b3934) |",
          "| Disabled bg | `--fill-levels-natural-lg` (#f0f0ef) |",
          "| Disabled border | 0.5 px inside solid `--border-medium` (#d6d4d2) |",
          "| Inner dot | 5 × 5 px, `border-radius: 100px` |",
          "| Dot (normal) | white (`--fill-levels-floating-lg`) |",
          "| Dot (disabled) | `--text-muted` (#ccc8c3) |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    _hovered: { control: "boolean", name: "Hovered (visual)" },
  },
};
export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Unchecked: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const UncheckedHover: Story = {
  name: "Unchecked / Hover",
  args: { _hovered: true },
};

export const CheckedHover: Story = {
  name: "Checked / Hover",
  args: { checked: true, _hovered: true },
};

export const UncheckedDisabled: Story = {
  name: "Unchecked / Disabled",
  args: { disabled: true },
};

export const CheckedDisabled: Story = {
  name: "Checked / Disabled",
  args: { checked: true, disabled: true },
};

export const Interactive: Story = {
  render: function InteractiveRadio() {
    const [selected, setSelected] = useState<string>("a");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {["a", "b", "c"].map((val) => (
          <div key={val} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <RadioButton
              checked={selected === val}
              name="demo"
              value={val}
              onChange={() => setSelected(val)}
            />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13 }}>
              Option {val.toUpperCase()}
            </span>
          </div>
        ))}
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelStyle}>False</td>
            <td style={cellStyle}><RadioButton /></td>
            <td style={cellStyle}><RadioButton _hovered /></td>
            <td style={cellStyle}><RadioButton disabled /></td>
          </tr>
          <tr>
            <td style={labelStyle}>True</td>
            <td style={cellStyle}><RadioButton checked /></td>
            <td style={cellStyle}><RadioButton checked _hovered /></td>
            <td style={cellStyle}><RadioButton checked disabled /></td>
          </tr>
        </tbody>
      </table>
    );
  },
};
