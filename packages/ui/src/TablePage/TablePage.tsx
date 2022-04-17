import React from "react";
import Table, { TableProps, BaseGenerics } from "../Table";

export type TablePageProps<
  Editable extends boolean,
  T extends BaseGenerics<Editable>
> = TableProps<Editable, T> & {
  title: string;
  description: string;
  buttonLabel: string;
};

const TablePage = <Editable extends boolean, T extends BaseGenerics<Editable>>({
  title,
  description,
  buttonLabel,
  ...rest
}: TablePageProps<Editable, T>) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <Table {...rest} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePage;
