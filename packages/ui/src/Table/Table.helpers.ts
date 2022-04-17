import {
  AnyGenerics,
  CoreOptions,
  Options,
  Table,
  Updater,
  useTable as useTableCore,
  createTable as createTableCore,
  sortRowsFn,
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
  options?: Updater<Options<T>>;
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
  const columns = React.useMemo(
    () =>
      extendColumns({
        table,
        columns: defaultColumns,
        addEdit: !!editable,
        addSelect: !!selectable,
      }),
    [defaultColumns, table, editable, selectable]
  );

  const instance = useTableCore(table, {
    columns,
    data,
  });

  instance.setOptions((prev) => ({
    ...prev,
    sortRowsFn: sortable ? sortRowsFn : undefined,
    ...options,
  }));

  return instance;
};
