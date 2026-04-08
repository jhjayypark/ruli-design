import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DatePicker from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Calendar UI control for selecting a single date or a date range.",
          "",
          "## Figma Spec",
          "| Property | Value |",
          "| --- | --- |",
          "| Width | 248 px |",
          "| Border-radius | `--radius-xl` (12px) |",
          "| Shadow | drop-md |",
          "| Header padding | 6 px top/right/bottom, 12 px left |",
          "| Header font | Inter 13 px, weight 450 |",
          "| Weekday text | `--text-pale` (#9c9891) |",
          "| Footer padding | 6 px, gap 6 px |",
          "| Clear btn | white bg, `--border-medium` border |",
          "| Apply btn | `--fill-bold-brand-static` (#8a5fe2) bg |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    year: { control: "number" },
    month: { control: { type: "number", min: 0, max: 11 } },
    today: { control: "number" },
    selectedDate: { control: "number" },
    rangeStart: { control: "number" },
    rangeEnd: { control: "number" },
    showFooter: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

/* --- Default (no selection, today = 3) --- */

export const Default: Story = {
  args: {
    year: 2025,
    month: 11,
    today: 3,
  },
};

/* --- Single Selection (day 12 selected) --- */

export const SingleSelection: Story = {
  name: "Single Selection",
  args: {
    year: 2025,
    month: 11,
    today: 3,
    selectedDate: 12,
    showFooter: true,
  },
};

/* --- Range Selection (12–18) --- */

export const RangeSelection: Story = {
  name: "Range Selection",
  args: {
    year: 2025,
    month: 11,
    today: 3,
    rangeStart: 12,
    rangeEnd: 18,
    showFooter: true,
  },
};

/* --- All Three Variants side by side --- */

export const AllVariants: Story = {
  name: "All Variants",
  render: () => {
    const labelStyle: React.CSSProperties = {
      fontFamily: "var(--font-sans, 'Inter', sans-serif)",
      fontSize: 11,
      fontWeight: 500,
      color: "#9c9891",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      textAlign: "center",
    };

    return (
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start", padding: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <span style={labelStyle}>Default</span>
          <DatePicker year={2025} month={11} today={3} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <span style={labelStyle}>Range Selection</span>
          <DatePicker year={2025} month={11} today={3} rangeStart={12} rangeEnd={18} showFooter />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <span style={labelStyle}>Single Selection</span>
          <DatePicker year={2025} month={11} today={3} selectedDate={12} showFooter />
        </div>
      </div>
    );
  },
};

/* --- Different Month (February 2026, with leading days) --- */

export const February2026: Story = {
  name: "February 2026",
  args: {
    year: 2026,
    month: 1,
    today: 13,
  },
};

/* --- Interactive --- */

export const Interactive: Story = {
  name: "Interactive (Single)",
  render: () => {
    const [year, setYear] = React.useState(2025);
    const [month, setMonth] = React.useState(11);
    const [selected, setSelected] = React.useState<number | undefined>(undefined);

    const handlePrev = () => {
      if (month === 0) {
        setMonth(11);
        setYear((y) => y - 1);
      } else {
        setMonth((m) => m - 1);
      }
      setSelected(undefined);
    };

    const handleNext = () => {
      if (month === 11) {
        setMonth(0);
        setYear((y) => y + 1);
      } else {
        setMonth((m) => m + 1);
      }
      setSelected(undefined);
    };

    return (
      <DatePicker
        year={year}
        month={month}
        today={month === 11 && year === 2025 ? 3 : undefined}
        selectedDate={selected}
        showFooter={selected != null}
        onDateClick={(d) => setSelected(d)}
        onPrevMonth={handlePrev}
        onNextMonth={handleNext}
        onClear={() => setSelected(undefined)}
      />
    );
  },
};

export const InteractiveRange: Story = {
  name: "Interactive (Range)",
  render: () => {
    const [year, setYear] = React.useState(2025);
    const [month, setMonth] = React.useState(11);
    const [start, setStart] = React.useState<number | undefined>(undefined);
    const [end, setEnd] = React.useState<number | undefined>(undefined);

    const handlePrev = () => {
      if (month === 0) {
        setMonth(11);
        setYear((y) => y - 1);
      } else {
        setMonth((m) => m - 1);
      }
      setStart(undefined);
      setEnd(undefined);
    };

    const handleNext = () => {
      if (month === 11) {
        setMonth(0);
        setYear((y) => y + 1);
      } else {
        setMonth((m) => m + 1);
      }
      setStart(undefined);
      setEnd(undefined);
    };

    const handleClick = (day: number) => {
      if (start == null || (start != null && end != null)) {
        // First click or reset: set start
        setStart(day);
        setEnd(undefined);
      } else {
        // Second click: set end (swap if needed)
        if (day < start) {
          setEnd(start);
          setStart(day);
        } else if (day === start) {
          // Same day — treat as single selection, clear range
          setEnd(undefined);
        } else {
          setEnd(day);
        }
      }
    };

    const handleClear = () => {
      setStart(undefined);
      setEnd(undefined);
    };

    return (
      <DatePicker
        year={year}
        month={month}
        today={month === 11 && year === 2025 ? 3 : undefined}
        rangeStart={start != null && end != null ? start : undefined}
        rangeEnd={start != null && end != null ? end : undefined}
        selectedDate={start != null && end == null ? start : undefined}
        showFooter={start != null}
        onDateClick={handleClick}
        onPrevMonth={handlePrev}
        onNextMonth={handleNext}
        onClear={handleClear}
      />
    );
  },
};

/* React import needed for Interactive story */
import React from "react";
