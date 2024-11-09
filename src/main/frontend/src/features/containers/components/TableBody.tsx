import { flexRender, Table } from "@tanstack/react-table";
import { ContainerType } from "../schemas/Container";
import React from "react";

type TableBodyProps = {
  table: Table<ContainerType>;
};

export const TableBody = ({ table }: TableBodyProps) => {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <tr key={`row-${row.id}`}>
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={`cell-${cell.id}`}
                  className="align-middle"
                  style={{
                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                  }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export const MemoizedTableBody = React.memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof TableBody;
