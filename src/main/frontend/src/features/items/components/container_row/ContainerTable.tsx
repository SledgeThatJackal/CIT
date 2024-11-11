import React, { useEffect, useState } from "react";
import { useCITableData } from "../../data/useCITableData";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ContainerItem } from "@schema/ContainerItem";
import { Container, Table } from "react-bootstrap";
import { useDeleteLink, useUpdateQuantity } from "@services/mutations";
import AddLink from "./AddLink";

type ContainerTableProps = {
  value: ContainerItem[];
  itemId: number;
};

function ContainerTable({ value, itemId }: ContainerTableProps) {
  const { columns } = useCITableData();

  const [data, setData] = useState<ContainerItem[]>(value);

  const updateQuantityMutation = useUpdateQuantity();
  const deleteLinkMutation = useDeleteLink();

  useEffect(() => {
    setData(value);
  }, [value]);

  const updateData = (rowIndex: number, columnId: string, value: any) => {
    const id = data[rowIndex].id!;

    updateQuantityMutation.mutate({ quantity: value, id: id });
  };

  const handleRemove = (id: number) => {
    deleteLinkMutation.mutate(id);
  };

  const table = useReactTable<ContainerItem>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData,
      handleRemove,
    },
  });

  return (
    <Container fluid>
      <Table
        hover
        striped
        bordered
        variant="info"
        style={{ borderRadius: "8px", overflow: "hidden" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={`containerTableHeader=${headerGroup.id}`}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={`containerHeader-${header.id}`}
                      colSpan={header.colSpan}>
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
              <tr key={`containerRow-${row.id}`}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={`containerCell-${cell.id}`}>
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
          <AddLink itemId={itemId} />
        </tbody>
      </Table>
    </Container>
  );
}

export default ContainerTable;
