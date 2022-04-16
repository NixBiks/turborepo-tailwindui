import React from "react";
import {
  AnyGenerics,
  DefaultGenerics,
  useTable,
  CoreOptions,
  RowSelectionState,
  sortRowsFn,
  Table,
  Header,
  Cell,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

type BaseGeneric = Omit<AnyGenerics, "Row"> & {Row: {href: string} & {[key: string]: any}};

type EditableTableProps<T extends BaseGeneric> = {
  table: Table<T>;
} & Pick<CoreOptions<T>, "columns" | "data">;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SortKey: React.FC<{ state: false | "asc" | "desc" }> = ({ state }) => {
  return (
    <span
      className={classNames(
        "ml-2 flex-none rounded",
        !state
          ? "invisible text-gray-400 group-hover:visible group-focus:visible"
          : "bg-gray-200 text-gray-900 group-hover:bg-gray-300"
      )}
    >
      {state === "desc" ? (
        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </span>
  );
};

const IndeterminateCheckbox = ({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & React.HTMLAttributes<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
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

const getHeaderProps = <T extends BaseGeneric>(
  header: Header<T>,
  index: number
) => {
  if (header.id === "select")
    return { className: "relative w-12 px-6 sm:w-16 sm:px-8" };
  if (header.id === "actions")
    return {
      className: "relative py-3.5 pl-3 pr-4 sm:pr-6",
    };
  return {
    className: classNames(
      "py-3.5 text-left text-sm font-semibold text-gray-900",
      index === 1 ? "min-w-[12rem] pr-3" : "px-3"
    ),
  };
};

const getCellProps = <T extends BaseGeneric>(cell: Cell<T>, index: number) => {
  if (cell.columnId === "select")
    return { className: "relative w-12 px-6 sm:w-16 sm:px-8" };
  if (cell.columnId === "actions")
    return {
      className:
        "whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6",
    };
  if (index === 1)
    return {
      className: classNames(
        "whitespace-nowrap py-4 pr-3 text-sm font-medium",
        cell.row.getIsSelected() ? "text-indigo-600" : "text-gray-900"
      ),
    };
  return {
    className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
  };
};

// whitespace-nowrap px-2 py-2 text-sm text-gray-500

const EditableTable = <T extends BaseGeneric>({
  table,
  columns: defaultColumns,
  data,
}: EditableTableProps<T>) => {
  const [selected, setSelected] = React.useState<RowSelectionState>({});

  // add checkbox column and edit column
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
            <>
              {row.getIsSelected() && (
                <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
              )}
              <IndeterminateCheckbox {...row.getToggleSelectedProps()} />
            </>
          ),
        }),
        ...defaultColumns,
        table.createDisplayColumn({
          id: "actions",

          // @ts-expect-error ReturnType<UseRenderer<T>> != Element
          header: () => null,
          // @ts-expect-error ReturnType<UseRenderer<T>> != Element
          cell: ({ row }) => (
            <a
              href={row.values.href || "#"}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Edit<span className="sr-only">, {row.id}</span>
            </a>
          ),
        }),
      ]),
    [defaultColumns, table]
  );

  const instance = useTable(table, {
    columns,
    data,
    // state: { rowSelection: selected },
    // onRowSelectionChange: setSelected,
  });

  const [state, setState] = React.useState(instance.initialState);
  instance.setOptions((prev) => ({
    ...prev,
    state,
    onStateChange: setState,
    sortRowsFn,
    // debugTable: true,
  }));

  React.useEffect(() => {
    console.log(state);
  }, [state]);

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
                      {headerGroup.headers.map((header, index) => {
                        const HeaderComponent = header.renderHeader();
                        return (
                          <th
                            scope="col"
                            {...header.getHeaderProps(
                              getHeaderProps(header, index)
                            )}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                {...(header.column.getCanSort()
                                  ? header.column.getToggleSortingProps({
                                      className:
                                        "cursor-pointer select-none group inline-flex",
                                    })
                                  : {})}
                              >
                                {header.renderHeader()}
                                {header.column.getCanSort() ? (
                                  <SortKey
                                    state={header.column.getIsSorted()}
                                  />
                                ) : null}
                              </div>
                            )}
                          </th>
                        );
                      })}
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
                        <td {...cell.getCellProps(getCellProps(cell, index))}>
                          {cell.renderCell()}
                        </td>
                      ))}
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
