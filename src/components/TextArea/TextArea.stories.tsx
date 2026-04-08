import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextArea from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
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
  },
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: "Input",
    hint: "Hint",
    helpText: "Help text goes here...",
    placeholder: "Placeholder",
    state: "default",
  },
};

export const Hover: Story = {
  args: {
    ...Default.args,
    state: "hover",
  },
};

export const Focused: Story = {
  args: {
    ...Default.args,
    state: "focused",
  },
};

export const Typing: Story = {
  args: {
    ...Default.args,
    state: "typing",
    value: "Placeholder",
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    state: "filled",
    value: "Placeholder",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: "disabled",
  },
};

export const TypingError: Story = {
  args: {
    ...Default.args,
    state: "typingError",
    value: "Placeholder",
    helpText: "Help text goes here...",
  },
};

export const FilledError: Story = {
  args: {
    ...Default.args,
    state: "filledError",
    value: "Placeholder",
    helpText: "Help text goes here...",
  },
};

export const NoLabel: Story = {
  args: {
    placeholder: "Placeholder",
    helpText: "Help text goes here...",
    state: "default",
  },
};

export const NoHelpText: Story = {
  args: {
    label: "Input",
    hint: "Hint",
    placeholder: "Placeholder",
    state: "default",
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <TextArea label="Input" hint="Hint" helpText="Help text goes here..." state="default" />
      <TextArea label="Input" hint="Hint" helpText="Help text goes here..." state="hover" />
      <TextArea label="Input" hint="Hint" helpText="Help text goes here..." state="focused" />
      <TextArea label="Input" hint="Hint" helpText="Help text goes here..." state="typing" value="Placeholder" />
      <TextArea label="Input" hint="Hint" helpText="Help text goes here..." state="filled" value="Placeholder" />
      <TextArea label="Input" hint="Hint" helpText="Help text goes here..." state="disabled" />
      <TextArea label="Input" hint="Hint" helpText="Help text goes here..." state="typingError" value="Placeholder" />
      <TextArea label="Input" hint="Hint" helpText="Help text goes here..." state="filledError" value="Placeholder" />
    </div>
  ),
};
