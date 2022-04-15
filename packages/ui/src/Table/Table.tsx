import React from "react";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ColumnMeta = {
  label: string;
  align?: "left" | "right";
};

const TableHead: React.FC<{
  checkboxRef?: React.Ref<HTMLInputElement>;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns: ColumnMeta[];
}> = ({ checkboxRef, checked, onChange, columns }) => (
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
          ref={checkboxRef}
          checked={checked}
          onChange={onChange}
        />
      </th>
      {columns.map(({ label, align = "left" }, index) => (
        <th
          key={index}
          className={classNames(
            index === 0
              ? "min-w-[12rem] py-3.5 pr-3 text-sm font-semibold text-gray-900"
              : "px-3 py-3.5 text-sm font-semibold text-gray-900",
            align === "left" ? "text-left" : "text-right"
          )}
          scope="col"
        >
          {label}
        </th>
      ))}
      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
        <span className="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
);

type Includable<T> = {
  includes: (data: T) => boolean;
};

type DataRow = {
  cells: React.ReactNode[];
  href: string;
  key: string;
};

const TablePageHeader: React.FC<{
  onAdd?: () => void;
  title: string;
  body: string;
  buttonLabel: string;
}> = ({ onAdd, title, body, buttonLabel }) => {
  return (
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
          onClick={onAdd}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

const TableRow: React.FC<{
  row: DataRow;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  href: string;
}> = ({ row, isSelected, onSelect, href }) => {
  return (
    <tr className={isSelected ? "bg-gray-50" : undefined}>
      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
        {isSelected && (
          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
        )}
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
          value={row.key}
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
        />
      </td>
      {row.cells.map((cell, index) => (
        <td
          key={index}
          className={classNames(
            "whitespace-nowrap text-sm",
            index === 0 ? "font-medium py-4 pr-3" : "text-gray-500 px-3 py-4",
            index === 0 && isSelected ? "text-indigo-600" : "text-gray-900"
          )}
        >
          {cell}
        </td>
      ))}
      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link href={href}>
          <a className="text-indigo-600 hover:text-indigo-900">
            Edit<span className="sr-only">, {row.key}</span>
          </a>
        </Link>
      </td>
    </tr>
  );
};

const EditControls: React.FC<{
  onDelete?: () => void;
  onEdit?: () => void;
}> = ({ onDelete, onEdit }) => {
  return (
    <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Bulk edit
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Delete all
      </button>
    </div>
  );
};

type TableProps = {
  pageTitle: string;
  pageDescription: string;
  buttonLabel: string;
  columns: { label: string; align?: "left" | "right" }[];
  data: DataRow[];
};

export default function Table({
  pageTitle,
  pageDescription,
  buttonLabel,
  columns,
  data,
}: TableProps) {
  const checkbox = React.useRef<HTMLInputElement>(null);
  const [{ checked, selectedRows }, dispatch] = React.useReducer(
    (
      state: {
        selectedRows: DataRow[];
        checked: "all" | "none" | "indeterminate";
      },
      action: { type: "toggleAll" } | { type: "toggleRow"; row: DataRow }
    ) => {
      switch (action.type) {
        case "toggleAll":
          return {
            selectedRows: state.checked === "all" ? [] : data,
            checked:
              state.checked === "all" ? ("none" as const) : ("all" as const),
          };
        case "toggleRow":
          const selected = state.selectedRows.includes(action.row)
            ? state.selectedRows.filter((p) => p !== action.row)
            : [...state.selectedRows, action.row];
          const checked =
            selected.length === data.length
              ? ("all" as const)
              : selected.length > 0
              ? ("indeterminate" as const)
              : ("none" as const);
          return {
            selectedRows: selected,
            checked,
          };

        default:
          break;
      }
      return state;
    },
    { selectedRows: [], checked: "none" }
  );

  React.useEffect(() => {
    checkbox.current!.indeterminate = checked === "indeterminate";
  }, [checked]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <TablePageHeader
        buttonLabel={buttonLabel}
        title={pageTitle}
        body={pageDescription}
      />
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {selectedRows.length > 0 && <EditControls />}
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <TableHead
                  checkboxRef={checkbox}
                  checked={checked === "all"}
                  onChange={() => dispatch({ type: "toggleAll" })}
                  columns={columns}
                />
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((row) => (
                    <TableRow
                      key={row.key}
                      row={row}
                      isSelected={selectedRows.includes(row)}
                      onSelect={() => dispatch({ type: "toggleRow", row })}
                      href={row.href}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
