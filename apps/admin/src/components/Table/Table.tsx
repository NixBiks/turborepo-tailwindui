import { TableGenerics, TableInstance } from "@tanstack/react-table";
import { Checkbox } from "components/Checkbox";

export type TableProps<TGenerics extends TableGenerics> = {
  instance: TableInstance<TGenerics>;
  editable?: boolean;
  selectable?: boolean;
};

export const Table = <TGenerics extends TableGenerics>({
  instance,
  editable,
  selectable,
}: TableProps<TGenerics>) => {
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
                      {headerGroup.headers.map((header, index) => {
                        return (
                          <th
                            scope="col"
                            key={header.id}
                            colSpan={header.colSpan}
                            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                          >
                            {header.isPlaceholder
                              ? null
                              : header.renderHeader()}
                          </th>
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
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
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
