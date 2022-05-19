import type { NextPage } from "next";
import Head from "next/head";
import { Table } from "components/Table";
import { Person, makePerson } from "faker";
import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from "@tanstack/react-table";
import React from "react";

const table = createTable().setRowType<Person>();

const defaultColumns = [
  table.createGroup({
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      table.createDataColumn("firstName", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      }),
      table.createDataColumn((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  table.createGroup({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      table.createDataColumn("age", {
        header: () => "Age",
        footer: (props) => props.column.id,
      }),
      table.createGroup({
        header: "More Info",
        columns: [
          table.createDataColumn("visits", {
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          }),
          table.createDataColumn("status", {
            header: "Status",
            footer: (props) => props.column.id,
          }),
          table.createDataColumn("progress", {
            header: "Profile Progress",
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

const Home: NextPage = () => {
  const [data, setData] = React.useState<Person[]>([]);
  const [columns] = React.useState<typeof defaultColumns>(defaultColumns);
  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    setData(makePerson(50));
  }, []);

  return (
    <div>
      <Head>
        <title>Tailwind UI</title>
        <meta name="description" content="Tailwind shared UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table instance={instance} editable />
    </div>
  );
};

export default Home;
