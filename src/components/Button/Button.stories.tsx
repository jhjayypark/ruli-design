import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["bold", "outline", "light", "ghost"],
    },
    intent: {
      control: "select",
      options: ["neutral", "danger", "brand"],
    },
    size: {
      control: "select",
      options: ["sm", "lg"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    shortcut: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// --- Variant × Intent ---

export const NeutralBold: Story = {
  args: { intent: "neutral", variant: "bold", children: "Button" },
};

export const NeutralOutline: Story = {
  args: { intent: "neutral", variant: "outline", children: "Button" },
};

export const NeutralLight: Story = {
  args: { intent: "neutral", variant: "light", children: "Button" },
};

export const NeutralGhost: Story = {
  args: { intent: "neutral", variant: "ghost", children: "Button" },
};

export const DangerBold: Story = {
  args: { intent: "danger", variant: "bold", children: "Button" },
};

export const DangerOutline: Story = {
  args: { intent: "danger", variant: "outline", children: "Button" },
};

export const DangerGhost: Story = {
  args: { intent: "danger", variant: "ghost", children: "Button" },
};

export const BrandBold: Story = {
  args: { intent: "brand", variant: "bold", children: "Button" },
};

// --- Sizes ---

export const SmallSize: Story = {
  args: { size: "sm", children: "Button" },
};

export const LargeSize: Story = {
  args: { size: "lg", children: "Button" },
};

// --- States ---

export const Loading: Story = {
  args: { loading: true, children: "Button" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Button" },
};

export const WithShortcut: Story = {
  args: { children: "Button", shortcut: "⌘⏎" },
};

// --- All Variants Grid ---

export const AllVariants: Story = {
  args: { size: "sm" },
  render: (args) => {
    const intents = ["neutral", "danger", "brand"] as const;
    const variants = ["bold", "outline", "light", "ghost"] as const;
    const validCombos: Record<string, readonly string[]> = {
      neutral: ["bold", "outline", "light", "ghost"],
      danger: ["bold", "outline", "ghost"],
      brand: ["bold"],
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {intents.map((intent) => (
          <div key={intent}>
            <p style={{ fontSize: 11, color: "#9c9891", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
              {intent}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Static */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ width: 60, fontSize: 11, color: "#aaa" }}>Static</span>
                {validCombos[intent]!.map((v) => (
                  <Button key={v} intent={intent} variant={v as any} size={args.size}>
                    Button
                  </Button>
                ))}
              </div>
              {/* Hover */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ width: 60, fontSize: 11, color: "#aaa" }}>Hover</span>
                {validCombos[intent]!.map((v) => (
                  <Button key={v} intent={intent} variant={v as any} size={args.size} forceHover>
                    Button
                  </Button>
                ))}
              </div>
              {/* Loading */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ width: 60, fontSize: 11, color: "#aaa" }}>Loading</span>
                {validCombos[intent]!.map((v) => (
                  <Button key={v} intent={intent} variant={v as any} size={args.size} loading>
                    Button
                  </Button>
                ))}
              </div>
              {/* Disabled */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ width: 60, fontSize: 11, color: "#aaa" }}>Disabled</span>
                {validCombos[intent]!.map((v) => (
                  <Button key={v} intent={intent} variant={v as any} size={args.size} disabled>
                    Button
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
