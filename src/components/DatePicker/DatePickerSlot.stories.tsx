import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DatePickerSlot from "./DatePickerSlot";

const meta: Meta<typeof DatePickerSlot> = {
  title: "Components/DatePickerSlot",
  component: DatePickerSlot,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Single day cell used inside the DatePicker grid. Unpublished building-block.",
          "",
          "## Figma Spec",
          "| Property | Value |",
          "| --- | --- |",
          "| Cell size | ~35.43 × 35.43 px (flex 1, square) |",
          "| Font | Inter 13 px, weight 450, lh 13 px, tracking -0.039px |",
          "| Default text | `--text-primary` (#24231f) |",
          "| Muted text | `--text-muted` (#ccc8c3) |",
          "| Today circle | `--fill-bold-danger-static` (#dc455a) |",
          "| Selected bg | `--fill-bold-neutral-static` (#56534b), radius 6px |",
          "| In-between bg | `--fill-levels-engraved-lg` (#f0f0ef) |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "default",
        "muted",
        "today",
        "selected",
        "rangeStart",
        "rangeEnd",
        "inBetween",
      ],
    },
    day: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof DatePickerSlot>;

const slotWrapper: React.CSSProperties = {
  width: 35.43,
  display: "flex",
};

/* --- Individual variants --- */

export const Default: Story = {
  args: { day: 15, type: "default" },
  decorators: [(Story) => <div style={slotWrapper}><Story /></div>],
};

export const Muted: Story = {
  args: { day: 2, type: "muted" },
  decorators: [(Story) => <div style={slotWrapper}><Story /></div>],
};

export const Today: Story = {
  name: "Current Day",
  args: { day: 3, type: "today" },
  decorators: [(Story) => <div style={slotWrapper}><Story /></div>],
};

export const Selected: Story = {
  name: "Single Selected",
  args: { day: 12, type: "selected" },
  decorators: [(Story) => <div style={slotWrapper}><Story /></div>],
};

export const RangeStart: Story = {
  name: "Range Start",
  args: { day: 12, type: "rangeStart" },
  decorators: [(Story) => <div style={slotWrapper}><Story /></div>],
};

export const RangeEnd: Story = {
  name: "Range End",
  args: { day: 18, type: "rangeEnd" },
  decorators: [(Story) => <div style={slotWrapper}><Story /></div>],
};

export const InBetween: Story = {
  name: "In-between",
  args: { day: 14, type: "inBetween" },
  decorators: [(Story) => <div style={slotWrapper}><Story /></div>],
};

/* --- All variants side by side --- */

export const AllVariants: Story = {
  name: "All Variants",
  render: () => {
    const types = [
      "default",
      "muted",
      "today",
      "selected",
      "rangeStart",
      "inBetween",
      "rangeEnd",
    ] as const;

    const labels: Record<string, string> = {
      default: "Default",
      muted: "Muted",
      today: "Current Day",
      selected: "Selected",
      rangeStart: "Range Start",
      inBetween: "In-between",
      rangeEnd: "Range End",
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", gap: 0, width: 248 }}>
          {types.map((t) => (
            <DatePickerSlot key={t} day={1} type={t} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 0, width: 248 }}>
          {types.map((t) => (
            <div
              key={t}
              style={{
                flex: "1 0 0",
                textAlign: "center",
                fontSize: 10,
                color: "#9c9891",
                fontFamily: "var(--font-sans, 'Inter', sans-serif)",
              }}
            >
              {labels[t]}
            </div>
          ))}
        </div>
      </div>
    );
  },
};
