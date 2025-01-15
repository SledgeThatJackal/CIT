import { useDetailContext } from "@app/pages/container/DetailedContainerPage";
import { useDetailGridData } from "@hooks/data/useDetailGridData";
import { DataType } from "./DetailBody";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Container, Table } from "react-bootstrap";
import React from "react";

const DetailGrid = <T extends DataType>() => {
  const data = useDetailContext<T>().containerItems;
  const { columns } = useDetailGridData(data);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container fluid>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={`detailGrid-${headerGroup.id}`}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={`detailGridHeader-${header.id}`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={`detailRow-${row.id}`}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={`detailCell-${cell.id}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default DetailGrid;
