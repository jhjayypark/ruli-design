import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import ChatInput from "./ChatInput";
import type { FileType } from "../FileIcon";

const meta: Meta<typeof ChatInput> = {
  title: "Components/ChatInput",
  component: ChatInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Chat input for the Word extension. Includes suggestion chips, file attachment slots, textarea, and action buttons.",
          "",
          "## Figma Spec",
          "| Property | Value |",
          "| --- | --- |",
          "| Width | 350 px |",
          "| Border-radius | `--radius-2xl` (16px) |",
          "| BG | white, `--border-light` 0.5px |",
          "| Shadow (active) | 0 16px 32px rgba(36,35,31,0.08) |",
          "| Textarea font | Inter 13 px, weight 450 |",
          "| Placeholder (default) | `--text-pale` (#9c9891) |",
          "| Placeholder (hover) | `--text-secondary` (#56534b) |",
          "| Caret | `--border-focus-brand` (#8a5fe2) |",
          "| Send (active) | `--fill-bold-brand-static` (#8a5fe2) |",
          "| Tags hidden when typing |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "focused", "typing"],
    },
    attached: { control: "boolean" },
    value: { control: "text" },
    placeholder: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof ChatInput>;

/* ─── Basic States ─── */

export const Default: Story = {
  args: {},
};

export const Hover: Story = {
  args: {
    state: "hover",
  },
};

export const Focused: Story = {
  args: {
    state: "focused",
  },
};

export const Typing: Story = {
  args: {
    state: "typing",
    value: "Can you summarize the key points of this document and highlight any potential legal risks?",
  },
};

/* ─── Attached States ─── */

export const AttachedDefault: Story = {
  name: "Attached / Default",
  args: {
    attached: true,
    attachments: [
      { label: "contract.pdf", fileType: "PDF" },
      { label: "terms.docx", fileType: "DOC" },
    ],
  },
};

export const AttachedHover: Story = {
  name: "Attached / Hover",
  args: {
    state: "hover",
    attached: true,
    attachments: [
      { label: "contract.pdf", fileType: "PDF" },
      { label: "terms.docx", fileType: "DOC" },
      { label: "notes.xlsx", fileType: "XLS" },
    ],
  },
};

export const AttachedTyping: Story = {
  name: "Attached / Typing",
  args: {
    state: "typing",
    attached: true,
    value: "Analyze the attached documents for compliance issues",
    attachments: [
      { label: "contract.pdf", fileType: "PDF" },
    ],
  },
};

/* ─── Custom Suggestions ─── */

export const CustomSuggestions: Story = {
  name: "Custom Suggestions",
  args: {
    suggestions: ["Draft reply", "Key dates", "Action items"],
  },
};

/* ─── All States ─── */

export const AllStates: Story = {
  name: "All States",
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          padding: 20,
        }}
      >
        {/* Without attachments */}
        <div>
          <div style={{ ...labelStyle, marginBottom: 16 }}>
            WITHOUT ATTACHMENTS
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "flex-start",
            }}
          >
            {(
              [
                { state: "default" as const, label: "Default", value: undefined },
                { state: "hover" as const, label: "Hover", value: undefined },
                { state: "focused" as const, label: "Focused", value: undefined },
                {
                  state: "typing" as const,
                  label: "Typing",
                  value: "Summarize the key risks in this contract",
                },
              ]
            ).map((s) => (
              <div
                key={s.state}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <ChatInput state={s.state} value={s.value} />
                <span style={labelStyle}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* With attachments */}
        <div>
          <div style={{ ...labelStyle, marginBottom: 16 }}>
            WITH ATTACHMENTS
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "flex-start",
            }}
          >
            {(
              [
                { state: "default" as const, label: "Default", value: undefined },
                { state: "hover" as const, label: "Hover", value: undefined },
                { state: "focused" as const, label: "Focused", value: undefined },
                {
                  state: "typing" as const,
                  label: "Typing",
                  value: "Analyze the contract for compliance",
                },
              ]
            ).map((s) => (
              <div
                key={`att-${s.state}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <ChatInput
                  state={s.state}
                  value={s.value}
                  attached
                  attachments={[
                    { label: "contract.pdf", fileType: "PDF" },
                    { label: "terms.docx", fileType: "DOC" },
                  ]}
                />
                <span style={labelStyle}>{s.label}</span>
              </div>
            ))}
          </div>
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
    const [attachments, setAttachments] = React.useState<
      { label: string; fileType: FileType }[]
    >([]);

    const state = value.length > 0 ? "typing" : "default";
    const attached = attachments.length > 0;

    const handleAttach = () => {
      const files = ["contract.pdf", "terms.docx", "memo.xlsx", "brief.pdf"];
      const types: FileType[] = ["PDF", "DOC", "XLS", "PDF"];
      const idx = attachments.length % files.length;
      setAttachments((prev) => [
        ...prev,
        { label: files[idx], fileType: types[idx] },
      ]);
    };

    const handleRemove = (index: number) => {
      setAttachments((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSend = () => {
      setValue("");
      setAttachments([]);
    };

    return (
      <ChatInput
        state={state}
        attached={attached}
        value={value}
        attachments={attachments}
        onChange={(e) => setValue(e.target.value)}
        onSend={handleSend}
        onAttach={handleAttach}
        onRemoveAttachment={handleRemove}
      />
    );
  },
};
