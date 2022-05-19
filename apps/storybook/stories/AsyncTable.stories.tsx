import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AsyncTable, createTable } from "ui/dist/index.js";
import { makePersons, Person } from "../makeData";

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

const fetchData = async (args: any) => {
  const people = makePersons(10);
  return await new Promise<Person[]>((resolve) =>
    setTimeout(() => resolve(people), 1000)
  );
};

const config: ComponentMeta<typeof AsyncTable> = {
  title: "Example/AsyncTable",
  component: AsyncTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default config;

export const Primary: ComponentStory<typeof AsyncTable> = (args) => (
  <AsyncTable
    columns={defaultColumns}
    table={table}
    fetchData={fetchData}
    {...args}
  />
);

Primary.args = {
  selectable: true,
  editable: true,
  sortable: true,
  sortableUi: true,
};
