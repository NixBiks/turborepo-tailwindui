import React from "react";
import { createTable } from "@tanstack/react-table";
import TablePage from "../TablePage";

type People = {
  name: string;
  title: string;
  email: string;
  role: string;
  href: string;
};

const people: People[] = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    href: "#",
  },
  {
    name: "Lindsay Walton",
    title: "ABC-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    href: "#",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    href: "#",
  },
  {
    name: "Lindsay Walton",
    title: "OP-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    href: "#",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    href: "#",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    href: "#",
  },
  // More people...
];
const table = createTable<{ Row: People }>();
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

const DomainTable = () => {
  return (
    <TablePage
      table={table}
      columns={defaultColumns}
      data={people}
      buttonLabel={"Add user"}
      description="A list of all the users in your account including their name, title,
  email and role."
      title="Users"
      editable
      selectable
    />
  );
};

export default DomainTable;
