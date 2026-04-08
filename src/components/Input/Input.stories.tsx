import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import Input, { PlaceholderIcon } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Single-line text input with label, hint, help text, and icon slots.",
          "",
          "## Figma Spec",
          "| Property | Value |",
          "| --- | --- |",
          "| Width | 320 px |",
          "| Small: padding / gap | 6 px / 8 px row-to-label |",
          "| Large: padding / gap | 8 px / 10 px row-to-label |",
          "| Small border-radius | `--radius-md` (6px) |",
          "| Large border-radius | `--radius-1.5md` (7px) |",
          "| Border | 0.5 px solid |",
          "| Font | Inter 13 px, weight 450, lh 13 px, tracking -0.039px |",
          "| Placeholder | `--text-pale` (#9c9891) |",
          "| Value | `--text-primary` (#24231f) |",
          "| Help text | `--text-pale`, error: `--text-danger-secondary` |",
          "| Caret (error) | `--border-focus-brand` (#8a5fe2) |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "lg"] },
    state: {
      control: "select",
      options: [
        "default",
        "hover",
        "focused",
        "typing",
        "filled",
        "disabled",
        "typingError",
        "filledError",
      ],
    },
    label: { control: "text" },
    hint: { control: "text" },
    helpText: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

/* ─── Basic states (Small) ─── */

export const Default: Story = {
  args: {
    label: "Input",
    helpText: "Help text goes here...",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const Hover: Story = {
  args: {
    label: "Input",
    helpText: "Help text goes here...",
    state: "hover",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const Focused: Story = {
  args: {
    label: "Input",
    helpText: "Help text goes here...",
    state: "focused",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const Typing: Story = {
  args: {
    label: "Input",
    helpText: "Help text goes here...",
    state: "typing",
    value: "Placeholder1",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const Filled: Story = {
  args: {
    label: "Input",
    helpText: "Help text goes here...",
    state: "filled",
    value: "Placeholder",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Input",
    helpText: "Help text goes here...",
    state: "disabled",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

/* ─── Error states ─── */

export const TypingError: Story = {
  name: "Typing / Error",
  args: {
    label: "Input",
    helpText: "Help text goes here...",
    state: "typingError",
    value: "Placeholder",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const FilledError: Story = {
  name: "Filled / Error",
  args: {
    label: "Input",
    helpText: "Help text goes here...",
    state: "filledError",
    value: "Placeholder",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

/* ─── Large size ─── */

export const LargeDefault: Story = {
  name: "Large / Default",
  args: {
    label: "Input",
    helpText: "Help text goes here...",
    size: "lg",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

export const LargeFocused: Story = {
  name: "Large / Focused",
  args: {
    label: "Input",
    helpText: "Help text goes here...",
    size: "lg",
    state: "focused",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

/* ─── Without icons ─── */

export const NoIcons: Story = {
  name: "No Icons",
  args: {
    label: "Input",
    helpText: "Help text goes here...",
  },
};

/* ─── With hint ─── */

export const WithHint: Story = {
  name: "With Hint",
  args: {
    label: "Input",
    hint: "Hint",
    helpText: "Help text goes here...",
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
  },
};

/* ─── No label, no help text ─── */

export const Minimal: Story = {
  name: "Minimal (box only)",
  args: {
    leftIcon: <PlaceholderIcon />,
    rightIcon: <PlaceholderIcon />,
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
    const cellStyle: React.CSSProperties = {
      padding: 8,
      verticalAlign: "top",
    };

    const states = [
      { state: "default" as const, label: "Default", value: undefined },
      { state: "hover" as const, label: "Hover", value: undefined },
      { state: "focused" as const, label: "Focused", value: undefined },
      { state: "typing" as const, label: "Typing", value: "Placeholder1" },
      { state: "filled" as const, label: "Filled", value: "Placeholder" },
      { state: "disabled" as const, label: "Disabled", value: undefined },
      { state: "typingError" as const, label: "Typing / Error", value: "Placeholder" },
      { state: "filledError" as const, label: "Filled / Error", value: "Placeholder" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Small */}
        <div style={{ padding: "16px 0 8px 0", ...headStyle }}>SMALL</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            padding: 8,
          }}
        >
          {states.map((s) => (
            <div key={`sm-${s.state}`} style={cellStyle}>
              <Input
                label="Input"
                helpText="Help text goes here..."
                state={s.state}
                value={s.value}
                leftIcon={<PlaceholderIcon />}
                rightIcon={<PlaceholderIcon />}
              />
              <div
                style={{
                  marginTop: 6,
                  fontSize: 10,
                  color: "#9c9891",
                  textAlign: "center",
                  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Large */}
        <div style={{ padding: "16px 0 8px 0", ...headStyle }}>LARGE</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            padding: 8,
          }}
        >
          {states.map((s) => (
            <div key={`lg-${s.state}`} style={cellStyle}>
              <Input
                label="Input"
                helpText="Help text goes here..."
                size="lg"
                state={s.state}
                value={s.value}
                leftIcon={<PlaceholderIcon />}
                rightIcon={<PlaceholderIcon />}
              />
              <div
                style={{
                  marginTop: 6,
                  fontSize: 10,
                  color: "#9c9891",
                  textAlign: "center",
                  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/* ─── Interactive ─── */

export const Interactive: Story = {
  name: "Interactive",
  render: () => {
    const [value, setValue] = React.useState("");

    return (
      <Input
        label="Email"
        hint="Required"
        helpText="Enter your work email address"
        placeholder="you@company.com"
        value={value}
        leftIcon={<PlaceholderIcon />}
        rightIcon={<PlaceholderIcon />}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
