import {
  AnyGenerics,
  CoreOptions,
  Options,
  Table,
  useTable as useTableCore,
  createTable as createTableCore,
  sortRowsFn as sortRowsFnCore,
} from "@tanstack/react-table";
import React from "react";
import { extendColumns } from "./TableView";

export type BaseGenerics<Editable extends boolean | undefined> =
  Editable extends true
    ? Omit<AnyGenerics, "Row"> & { Row: { href: string } }
    : AnyGenerics;

export const createTable = createTableCore;

export type UseTableProps<
  Editable extends boolean,
  T extends BaseGenerics<Editable>
> = {
  table: Table<T>;
  selectable?: boolean;
  editable?: Editable;
  sortable?: boolean;
  options?: Partial<Omit<Options<T>, "data" | "columns">>;
} & Pick<CoreOptions<T>, "columns" | "data">;

export const useTable = <
  Editable extends boolean,
  T extends BaseGenerics<Editable>
>({
  table,
  columns: defaultColumns,
  data,
  editable,
  selectable,
  sortable,
  options,
}: UseTableProps<Editable, T>) => {
  // add checkbox column and edit column
  // const columns = React.useMemo(() => {
  //   console.log("Creating columns");

  //   return extendColumns({
  //     table,
  //     columns: defaultColumns,
  //     addEdit: !!editable,
  //     addSelect: !!selectable,
  //   });
  // }, [defaultColumns, table, editable, selectable]);

  const sortRowsFn = React.useMemo(
    () => (sortable ? sortRowsFnCore : undefined),
    [sortable]
  );

  const instance = useTableCore(table, {
    columns: defaultColumns,
    data,
    // sortRowsFn,
    ...options,
  });

  return instance;
};
