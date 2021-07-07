import React, { useMemo } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  useBlockLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
  useColumnOrder
} from "react-table";
import { COLUMNS } from "./columns";
import { PageButtons } from "./PageButtons";
import "./table.css";

export const SortingTable = ({ mock_data }) => {
  const columns = useMemo(() => COLUMNS, []);
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 200,
      maxWidth: 400
    }),
    []
  );

  const tableInstance = useTable(
    {
      columns: columns,
      data: mock_data,
      defaultColumn
    },
    useSortBy,
    usePagination,
    useBlockLayout,
    useResizeColumns,
    useColumnOrder
  );

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    headerGroups,
    resetResizing,
    setColumnOrder
  } = tableInstance;

  const { pageIndex } = state;

  const changeOrder = () => {
    setColumnOrder([
      "name",
      "ticketref",
      "quantity",
      "currency",
      "traded_on",
      "settlement_amount"
    ]);
  };

  return (
    <>
      <button className="resize-btn" onClick={resetResizing}>
        Reset Resizing
      </button>
      <button className="resize-btn order" onClick={changeOrder}>
        Column Reorder
      </button>
      <div className="table-container">
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("HEADER")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaArrowDown />
                        ) : (
                          <FaArrowUp />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                    <div
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                      {...column.getResizerProps()}
                    ></div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <PageButtons
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageOptions={pageOptions}
        state={state}
        gotoPage={gotoPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
      />
    </>
  );
};
