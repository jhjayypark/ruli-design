import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FileCard from "./FileCard";

const noop = () => {};

const meta: Meta<typeof FileCard> = {
  title: "Components/FileCard",
  component: FileCard,
  tags: ["autodocs"],
  args: {
    onRemove: noop,
    onRetry: noop,
  },
  argTypes: {
    fileType: { control: "select", options: ["PDF", "DOC", "XLS", "CSV"] },
    size: { control: "select", options: ["lg", "sm", "micro"] },
    state: { control: "select", options: ["uploaded", "uploading", "error"] },
    progress: { control: { type: "range", min: 0, max: 100 } },
  },
};
export default meta;

type Story = StoryObj<typeof FileCard>;

/* ── Large (default) ── */
export const LargeUploaded: Story = {
  args: {
    label: "Contract_Final_v2.pdf",
    fileType: "PDF",
    size: "lg",
    state: "uploaded",
    fileSize: "2.4MB",
  },
};

export const LargeUploading: Story = {
  args: {
    label: "Report_Q4_2024.pdf",
    fileType: "PDF",
    size: "lg",
    state: "uploading",
    progress: 64,
  },
};

export const LargeError: Story = {
  args: {
    label: "NDA_Draft.doc",
    fileType: "DOC",
    size: "lg",
    state: "error",
  },
};

/* ── Small ── */
export const SmallUploaded: Story = {
  args: {
    label: "Invoice_March.pdf",
    fileType: "PDF",
    size: "sm",
    state: "uploaded",
  },
};

export const SmallUploading: Story = {
  args: {
    label: "Compliance_Report.pdf",
    fileType: "PDF",
    size: "sm",
    state: "uploading",
    progress: 32,
  },
};

export const SmallError: Story = {
  args: {
    label: "Agreement_v3.pdf",
    fileType: "PDF",
    size: "sm",
    state: "error",
  },
};

/* ── Micro ── */
export const Micro: Story = {
  args: {
    label: "File.pdf",
    fileType: "PDF",
    size: "micro",
  },
};

/* ── Different file types ── */
export const CsvFile: Story = {
  args: {
    label: "Customer_Data_Export.csv",
    fileType: "CSV",
    size: "lg",
    state: "uploaded",
    fileSize: "856KB",
  },
};

export const DocFile: Story = {
  args: {
    label: "Legal_Brief_v4.doc",
    fileType: "DOC",
    size: "lg",
    state: "uploaded",
    fileSize: "2.1MB",
  },
};

export const XlsFile: Story = {
  args: {
    label: "Budget_2025.xls",
    fileType: "XLS",
    size: "lg",
    state: "uploaded",
    fileSize: "4.2MB",
  },
};
