import React from "react";
import {
  AnyGenerics,
  useTable,
  CoreOptions,
  Table,
} from "@tanstack/react-table";

type EditableTableProps<T extends AnyGenerics> = {
  table: Table<T>;
} & Pick<CoreOptions<T>, "columns" | "data">;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const IndeterminateCheckbox = ({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & React.HTMLAttributes<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useLayoutEffect(() => {
    ref.current.indeterminate = indeterminate || false;
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
      ref={ref}
      {...rest}
    />
  );
};

const EditableTable = <T extends AnyGenerics>({
  table,
  columns: defaultColumns,
  data,
}: EditableTableProps<T>) => {
  const columns = React.useMemo(
    () =>
      table.createColumns([
        table.createDisplayColumn({
          id: "select",
          // @ts-expect-error ReturnType<UseRenderer<T>> != Element
          header: ({ instance }) => (
            <IndeterminateCheckbox
              {...instance.getToggleAllRowsSelectedProps()}
            />
          ),
          // @ts-expect-error ReturnType<UseRenderer<T>> != Element
          cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleSelectedProps()} />
          ),
        }),
        ...defaultColumns,
      ]),
    [defaultColumns, table]
  );
  const instance = useTable(table, {
    columns,
    data,
  });
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table
                {...instance.getTableProps()}
                className="min-w-full table-fixed divide-y divide-gray-300"
              >
                <thead className="bg-gray-50">
                  {instance.getHeaderGroups().map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((header, index) => (
                        <th
                          scope="col"
                          {...header.getHeaderProps()}
                          className={
                            index === 0
                              ? "relative w-12 px-6 sm:w-16 sm:px-8"
                              : classNames(
                                  "py-3.5 text-left text-sm font-semibold text-gray-900",
                                  index === 1 ? "min-w-[12rem] pr-3" : "px-3"
                                )
                          }
                        >
                          {header.isPlaceholder ? null : header.renderHeader()}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...instance.getTableBodyProps()}
                  className="divide-y divide-gray-200 bg-white"
                >
                  {instance.getRowModel().rows.map((row) => (
                    <tr {...row.getRowProps()}>
                      {row.getVisibleCells().map((cell, index) => (
                        <td
                          {...cell.getCellProps()}
                          className={
                            index === 0
                              ? "relative w-12 px-6 sm:w-16 sm:px-8"
                              : classNames(
                                  "whitespace-nowrap pr-3 text-sm font-medium",
                                  index === 1
                                    ? false
                                      ? "text-indigo-600"
                                      : "text-gray-900"
                                    : "whitespace-nowrap px-3 text-sm text-gray-500"
                                )
                          }
                        >
                          {cell.renderCell()}
                        </td>
                      ))}
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {row.id}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableTable;
