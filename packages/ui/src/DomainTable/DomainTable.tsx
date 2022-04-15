import { createTable } from "@tanstack/react-table";
import React from "react";
import EditableTable from "../EditableTable";

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
]);

const DomainTable = () => {
  return <EditableTable table={table} columns={defaultColumns} data={people} />;
};

export default DomainTable;
