import React, { useEffect, useRef } from "react";
import { Item } from "../schemas/Item";
import { flexRender, Table } from "@tanstack/react-table";
import ContainerTable from "./container_row/ContainerTable";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";

type TableBodyProps = {
  table: Table<Item>;
  virtualizer: Virtualizer<any, Element>;
};

export const TableBody = ({ table, virtualizer }: TableBodyProps) => {
  const { rows } = table.getRowModel();

  return (
    <tbody>
      {virtualizer.getVirtualItems().map((virtualRow, index) => {
        const row = rows[virtualRow.index];
        return (
          <React.Fragment key={`rowFragment-${row.id}`}>
            <tr
              key={`row-${row.id}`}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
              }}>
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
            {row.getIsExpanded() && (
              <tr key={`subRow-${row.id}`}>
                <td colSpan={row.getVisibleCells().length}>
                  <ContainerTable
                    value={row.getValue("containerItems")}
                    itemId={row.getValue("id")}
                  />
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

export const MemoizedTableBody = React.memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof TableBody;
