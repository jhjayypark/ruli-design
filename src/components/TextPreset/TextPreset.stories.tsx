import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextPreset from "./TextPreset";

const meta: Meta<typeof TextPreset> = {
  title: "Components/TextPreset",
  component: TextPreset,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    align: { control: "select", options: ["left", "center", "right"] },
    size: { control: "select", options: ["sm", "md"] },
  },
};
export default meta;

type Story = StoryObj<typeof TextPreset>;

const defaultSupport =
  "Support text for users. Just an example we'll be using for this preset so it's easier to use this component";

/* ── Basic variants ── */

export const Default: Story = {
  args: {
    primaryText: "Primary text",
    supportText: defaultSupport,
  },
};

export const SmallLeft: Story = {
  args: {
    primaryText: "Primary text",
    supportText: defaultSupport,
    size: "sm",
    align: "left",
    primaryFirst: true,
    multiLine: false,
  },
};

export const SmallCenter: Story = {
  args: { ...SmallLeft.args, align: "center" },
};

export const SmallRight: Story = {
  args: { ...SmallLeft.args, align: "right" },
};

export const MediumLeft: Story = {
  args: { ...SmallLeft.args, size: "md" },
};

export const MediumCenter: Story = {
  args: { ...SmallLeft.args, size: "md", align: "center" },
};

export const MediumRight: Story = {
  args: { ...SmallLeft.args, size: "md", align: "right" },
};

/* ── Primary last ── */

export const SupportFirst: Story = {
  args: {
    ...SmallLeft.args,
    primaryFirst: false,
  },
};

/* ── Multi-line ── */

export const MultiLineSmall: Story = {
  args: {
    ...SmallLeft.args,
    multiLine: true,
  },
};

export const MultiLineMedium: Story = {
  args: {
    ...SmallLeft.args,
    size: "md",
    multiLine: true,
  },
};

export const MultiLineSupportFirst: Story = {
  args: {
    ...SmallLeft.args,
    multiLine: true,
    primaryFirst: false,
  },
};

/* ── No support text ── */

export const PrimaryOnly: Story = {
  args: {
    primaryText: "Primary text",
    supportText: undefined,
  },
};

/* ── Full matrix ── */

export const AllVariants: Story = {
  render: () => {
    const aligns = ["left", "center", "right"] as const;
    const sizes = ["sm", "md"] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {/* Single-line, primary first */}
        <section>
          <h3 style={{ fontSize: 11, color: "#888", marginBottom: 16, fontWeight: 400 }}>
            Single line · Primary first
          </h3>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {sizes.map((s) =>
              aligns.map((a) => (
                <TextPreset
                  key={`${s}-${a}`}
                  size={s}
                  align={a}
                  primaryFirst
                  multiLine={false}
                  primaryText="Primary text"
                  supportText={defaultSupport}
                />
              )),
            )}
          </div>
        </section>

        {/* Single-line, support first */}
        <section>
          <h3 style={{ fontSize: 11, color: "#888", marginBottom: 16, fontWeight: 400 }}>
            Single line · Support first
          </h3>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {sizes.map((s) =>
              aligns.map((a) => (
                <TextPreset
                  key={`${s}-${a}`}
                  size={s}
                  align={a}
                  primaryFirst={false}
                  multiLine={false}
                  primaryText="Primary text"
                  supportText={defaultSupport}
                />
              )),
            )}
          </div>
        </section>

        {/* Multi-line, primary first */}
        <section>
          <h3 style={{ fontSize: 11, color: "#888", marginBottom: 16, fontWeight: 400 }}>
            Multi-line · Primary first
          </h3>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {sizes.map((s) =>
              aligns.map((a) => (
                <TextPreset
                  key={`${s}-${a}`}
                  size={s}
                  align={a}
                  primaryFirst
                  multiLine
                  primaryText="Primary text"
                  supportText={defaultSupport}
                />
              )),
            )}
          </div>
        </section>

        {/* Multi-line, support first */}
        <section>
          <h3 style={{ fontSize: 11, color: "#888", marginBottom: 16, fontWeight: 400 }}>
            Multi-line · Support first
          </h3>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {sizes.map((s) =>
              aligns.map((a) => (
                <TextPreset
                  key={`${s}-${a}`}
                  size={s}
                  align={a}
                  primaryFirst={false}
                  multiLine
                  primaryText="Primary text"
                  supportText={defaultSupport}
                />
              )),
            )}
          </div>
        </section>
      </div>
    );
  },
};
