import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Table, createTable } from "ui/dist/index.js";
import { makePersons, Person } from "../makeData";


const people = makePersons(10)
const table = createTable<{ Row: Person }>();
const defaultColumns = table.createColumns([
  table.createDataColumn("name", {
    cell: (info) => info.value,
    header: "Name",
  }),
  table.createDataColumn("title", {
    cell: (info) => info.value,
    header: "Title",
  }),
  table.createDataColumn("email", {
    cell: (info) => info.value,
    header: "Email",
  }),
  table.createDataColumn("role", {
    cell: (info) => info.value,
    header: "Role",
  }),
  table.createDataColumn("href", {
    defaultIsVisible: false,
    enableHiding: false,
  }),
]);

const config: ComponentMeta<typeof Table> = {
  title: "Example/Table",
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default config;

export const Primary: ComponentStory<typeof Table> = args => (
  <Table columns={defaultColumns} data={people} table={table} {...args} />
);

Primary.args = {
  selectable: true,
  editable: true,
  sortable: true,
  sortableUi: true,
};
