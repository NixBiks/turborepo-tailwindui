import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Table } from "ui/dist/index.js";

const config: ComponentMeta<typeof Table> = {
  title: "Example/EditableTable",
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default config;

export const Primary: ComponentStory<typeof Table> = () => <Table />;
