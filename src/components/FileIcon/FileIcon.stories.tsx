import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FileIcon from "./FileIcon";

const meta: Meta<typeof FileIcon> = {
  title: "Components/FileIcon",
  component: FileIcon,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["PDF", "DOC", "DOCX", "XLS", "XLSX", "CSV"] },
    size: { control: "select", options: ["lg", "sm"] },
  },
};
export default meta;

type Story = StoryObj<typeof FileIcon>;

/* ── Large icons ── */
export const PdfLarge: Story = { args: { type: "PDF", size: "lg" } };
export const DocLarge: Story = { args: { type: "DOC", size: "lg" } };
export const XlsLarge: Story = { args: { type: "XLS", size: "lg" } };
export const CsvLarge: Story = { args: { type: "CSV", size: "lg" } };

/* ── Small icons ── */
export const PdfSmall: Story = { args: { type: "PDF", size: "sm" } };
export const DocSmall: Story = { args: { type: "DOC", size: "sm" } };
export const XlsSmall: Story = { args: { type: "XLS", size: "sm" } };
export const CsvSmall: Story = { args: { type: "CSV", size: "sm" } };

/* ── All types gallery ── */
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 13, color: "#888" }}>Large (30.25px)</p>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
          <FileIcon type="XLS" size="lg" />
          <FileIcon type="CSV" size="lg" />
          <FileIcon type="PDF" size="lg" />
          <FileIcon type="DOC" size="lg" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 13, color: "#888" }}>Small (26px)</p>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
          <FileIcon type="XLS" size="sm" />
          <FileIcon type="CSV" size="sm" />
          <FileIcon type="PDF" size="sm" />
          <FileIcon type="DOC" size="sm" />
        </div>
      </div>
    </div>
  ),
};
