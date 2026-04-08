import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FileUpload from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    uploaded: { control: "boolean" },
    multiple: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof FileUpload>;

/** Default empty dropzone */
export const Default: Story = {
  args: {
    uploaded: false,
  },
};

/** After files have been uploaded — compact variant */
export const Uploaded: Story = {
  args: {
    uploaded: true,
  },
};

/** Custom text */
export const CustomText: Story = {
  args: {
    uploaded: false,
    title: "Drop your documents here",
    subtitle: "PDF, DOC, XLS up to 10MB",
  },
};
