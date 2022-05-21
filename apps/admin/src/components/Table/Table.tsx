import {
  TableGenerics,
  TableInstance,
  Header,
  Column,
  SortDirection,
  SortingState,
} from "@tanstack/react-table";
import { Checkbox } from "components/Checkbox";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export type TableProps<TGenerics extends TableGenerics> = {
  instance: TableInstance<TGenerics>;
  editable?: boolean;
  selectable?: boolean;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type SortState = ReturnType<Column<any>["getIsSorted"]>;

const SortKey: React.FC<{
  state: SortState;
  sortDescFirst: boolean;
}> = ({ state, sortDescFirst }) => {
  return (
    <span
      className={classNames(
        "ml-2 flex-none rounded",
        !state
          ? "invisible text-gray-400 group-hover:visible"
          : "bg-gray-200 text-gray-900 group-hover:bg-gray-300"
      )}
    >
      {state === "desc" || (!state && !!sortDescFirst) ? (
        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </span>
  );
};

const getSortAnchor = (header: Header<any>, sortDescFirst: boolean): string => {
  const state = header.column.getIsSorted();
  let nextState: SortDirection;
  switch (state) {
    case false:
      nextState = sortDescFirst ? "desc" : "asc";
      break;
    case "asc":
      nextState = "desc";
      break;
    case "desc":
      nextState = "asc";
  }
  return `?sort=${header.id}:${nextState}`;
};

const HeaderCell = ({
  header,
  sortDescFirst,
}: {
  header: Header<any>;
  sortDescFirst: boolean;
}) => {
  return (
    <th
      scope="col"
      colSpan={header.colSpan}
      className="not-first:px-3 py-3 first:pl-4 first:pr-3 text-left text-sm font-semibold uppercase tracking-wide text-gray-500 first:sm:pl-6"
    >
      {header.isPlaceholder ? null : header.column.getCanSort() ? (
        <Link href={getSortAnchor(header, sortDescFirst)}>
          <a
            className="group inline-flex"
            onClick={header.column.getToggleSortingHandler()}
          >
            {header.renderHeader()}
            <SortKey
              state={header.column.getIsSorted()}
              sortDescFirst={sortDescFirst}
            />
          </a>
        </Link>
      ) : (
        header.renderHeader()
      )}
    </th>
  );
};
const queryToColumnSort = (query: ParsedUrlQuery): SortingState => {
  const sort = query.sort;
  if (typeof sort === "string") {
    const [id, direction] = sort.split(":");
    return [{ id, desc: direction === "desc" }];
  }
  return [];
};

const useURLSortingState = (instance: TableInstance<any>) => {
  const { query } = useRouter();
  const sorting = queryToColumnSort(query);

  instance.setOptions((prev) => ({
    ...prev,
    state: { ...prev.state, sorting },
    manualSorting: true,
  }));
};

export const Table = <TGenerics extends TableGenerics>({
  instance,
  editable,
  selectable,
}: TableProps<TGenerics>) => {
  useURLSortingState(instance);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  {instance.getHeaderGroups().map((headerGroup, index) => (
                    <tr key={headerGroup.id}>
                      {selectable && (
                        <th
                          scope="col"
                          className="relative w-12 px-6 sm:w-16 sm:px-8"
                        >
                          {index === instance.getHeaderGroups().length - 1 && (
                            <Checkbox
                              checked={instance.getIsAllRowsSelected()}
                              onChange={instance.getToggleAllRowsSelectedHandler()}
                              indeterminate={instance.getIsSomeRowsSelected()}
                            />
                          )}
                        </th>
                      )}
                      {headerGroup.headers.map((header) => {
                        const sortDescFirst =
                          header.column.columnDef.sortDescFirst ??
                          instance.options.sortDescFirst ??
                          header.column.getAutoSortDir() === "desc";

                        return (
                          <HeaderCell
                            header={header}
                            key={header.id}
                            sortDescFirst={sortDescFirst}
                          />
                        );
                      })}
                      {instance && (
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      )}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {instance.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {selectable && (
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          <Checkbox
                            checked={row.getIsSelected()}
                            onChange={row.getToggleSelectedHandler()}
                            indeterminate={row.getIsSomeSelected()}
                          />
                        </td>
                      )}
                      {row.getVisibleCells().map((cell, index) => (
                        <td
                          key={cell.id}
                          className="whitespace-nowrap px-3 py-4 first:pl-4 first:pr-3 text-sm first:font-medium first:text-gray-900 not-first:text-gray-500 first:sm:pl-6"
                        >
                          {cell.renderCell()}
                        </td>
                      ))}
                      {editable && (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {row.id}</span>
                          </a>
                        </td>
                      )}
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
