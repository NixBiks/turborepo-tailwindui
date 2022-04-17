import React from "react";
import {
  AnyGenerics,
  Cell,
  CoreOptions,
  Header,
  Table,
  TableInstance,
  UseRenderer,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SELECT_ID = "__select";
const EDIT_ID = "__edit";

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

export const extendColumns = <Base extends AnyGenerics>({
  table,
  columns,
  addEdit,
  addSelect,
}: {
  table: Table<Base>;
  columns: CoreOptions<Base>["columns"];
  addSelect?: boolean;
  addEdit?: boolean;
}) => {
  if (addSelect)
    columns = table.createColumns([
      table.createDisplayColumn({
        id: SELECT_ID,
        header: ({ instance }) =>
          (
            <IndeterminateCheckbox
              {...instance.getToggleAllRowsSelectedProps()}
            />
          ) as ReturnType<UseRenderer<Base>>,
        cell: ({ row }) =>
          (
            <>
              {row.getIsSelected() && (
                <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
              )}
              <IndeterminateCheckbox {...row.getToggleSelectedProps()} />
            </>
          ) as ReturnType<UseRenderer<Base>>,
      }),
      ...columns,
    ]);
  if (addEdit)
    columns = table.createColumns([
      ...columns,
      table.createDisplayColumn({
        id: EDIT_ID,
        header: () => null as ReturnType<UseRenderer<Base>>,
        cell: ({ row }) =>
          (
            <a
              href={row.values.href || "#"}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Edit<span className="sr-only">, {row.id}</span>
            </a>
          ) as ReturnType<UseRenderer<Base>>,
      }),
    ]);

  return columns;
};

const defaultGetHeaderProps = <T extends AnyGenerics>(
  header: Header<T>,
  index: number
) => {
  if (header.id === SELECT_ID)
    return { className: "relative w-12 px-6 sm:w-16 sm:px-8" };
  if (header.id === EDIT_ID)
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

const defaultGetCellProps = <T extends AnyGenerics>(
  cell: Cell<T>,
  index: number
) => {
  if (cell.columnId === SELECT_ID)
    return { className: "relative w-12 px-6 sm:w-16 sm:px-8" };
  if (cell.columnId === EDIT_ID)
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

export type TableViewProps<Base extends AnyGenerics> = {
  instance: TableInstance<Base>;
  getHeaderProps?: (header: Header<Base>, index: number) => any;
  getCellProps?: (header: Cell<Base>, index: number) => any;
  sortable?: boolean;
};

const TableView = <Base extends AnyGenerics>({
  instance,
  sortable,
  ...props
}: TableViewProps<Base>) => {
  const getHeaderProps = props.getHeaderProps || defaultGetHeaderProps;
  const getCellProps = props.getCellProps || defaultGetCellProps;

  return (
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
                    {...header.getHeaderProps(getHeaderProps(header, index))}
                  >
                    {header.isPlaceholder ? null : sortable ? (
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
                          <SortKey state={header.column.getIsSorted()} />
                        ) : null}
                      </div>
                    ) : (
                      header.renderHeader()
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
  );
};

export default TableView;
