import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Table } from "ui/dist/index.js";

type People = {
  name: string;
  title: string;
  email: string;
  role: string;
};

const people: People[] = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

const config: ComponentMeta<typeof Table> = {
  title: "Example/EditableTable",
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export default config;

export const Primary: ComponentStory<typeof Table> = () => (
  <Table
    pageTitle="Users"
    buttonLabel="Add user"
    pageDescription="A list of all the users in your account including their name, title, email and role."
    data={people.map((p) => ({
      cells: [p.name, p.title, p.email, p.role],
      key: p.email,
      href: "#",
    }))}
    columns={[
      { label: "Name", align: "left" },
      { label: "Title", align: "left" },
      { label: "Email", align: "left" },
      { label: "Role", align: "left" },
    ]}
  />
);
