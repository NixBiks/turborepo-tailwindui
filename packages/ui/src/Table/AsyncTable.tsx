import { TableState, useTable } from "@tanstack/react-table";
import React from "react";
import Table, { BaseGenerics, TableProps } from "./Table";
import TableView from "./TableView";

type State = Partial<
  Pick<TableState, "columnFilters" | "globalFilter" | "pagination" | "sorting">
>;

export type AsyncTableProps<
  Editable extends boolean,
  T extends BaseGenerics<Editable>
> = Omit<TableProps<Editable, T>, "data" | "loading"> & {
  fetchData: (state: State) => Promise<T["Row"][]>;
  initialData?: T["Row"][];
};

const AsyncTable = <
  Editable extends boolean,
  T extends BaseGenerics<Editable>
>({
  initialData,
  fetchData,
  getCellProps,
  getHeaderProps,
  sortableUi,
  ...rest
}: AsyncTableProps<Editable, T>) => {
  console.log("Rendering");

  const [data, setData] = React.useState<T["Row"][]>([]);
//   const [loading, setLoading] = React.useState(
//     typeof initialData === "undefined"
//   );
  const [sorting, setSorting] = React.useState<TableState["sorting"]>([]);

  //   if (rest.sortable && typeof sortableUi === "undefined") sortableUi = true;
  const instance = useTable(rest.table, {
    // ...rest,
    columns: rest.columns,
    data,
    onSortingChange: setSorting,
    state: { sorting },
  });

  React.useEffect(() => {
    setData([]);
    // setLoading(true);
    fetchData(sorting)
      .then((data) => {
        setData(data);
      })
      .catch((e) => console.error(e))
    //   .finally(() => setLoading(false));
  }, [sorting, fetchData]);
  console.log(sorting);
  

  return (
    <TableView
      instance={instance}
      getCellProps={getCellProps}
      getHeaderProps={getHeaderProps}
      sortable={sortableUi}
    //   loading={loading}
    />
  );
  //   return (
  //     <Table
  //       {...props}
  //       data={data}
  //       options={{ state, onStateChange: setState }}
  //     />
  //   );
};

export default AsyncTable;
