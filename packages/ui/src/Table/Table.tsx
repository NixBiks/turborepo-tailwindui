import React from "react";
import TableView, { TableViewProps } from "./TableView";
import { useTable, BaseGenerics, UseTableProps } from "./Table.helpers";

export type { BaseGenerics };

export type TableProps<
  Editable extends boolean,
  T extends BaseGenerics<Editable>
> = UseTableProps<Editable, T> &
  Omit<TableViewProps<T>, "instance"> & { sortableUi?: boolean };

const Table = <Editable extends boolean, T extends BaseGenerics<Editable>>({
  getCellProps,
  getHeaderProps,
  sortableUi,
  loading,
  ...rest
}: TableProps<Editable, T>) => {
  // set sortable ui to true if not set while sortable is set
  if (rest.sortable && typeof sortableUi === "undefined") sortableUi = true;
  const instance = useTable(rest);

  return (
    <TableView
      instance={instance}
      getCellProps={getCellProps}
      getHeaderProps={getHeaderProps}
      sortable={sortableUi}
      loading={loading}
    />
  );
};

export default Table;
