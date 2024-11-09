import {
  Column,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Container, Form, Stack, Table } from "react-bootstrap";

import { useTableData } from "../data/useTableData";

import { useDeleteItem, useUpdateItem } from "@services/mutations";
import Canvas from "@components/general/Canvas";
import ConfirmationModal from "@components/general/ConfirmationModal";
import PaginationControl from "@components/general/PaginationControl";
import { useCanvasState } from "@hooks/state/useCanvasState";
import { useDeleteModalState } from "@hooks/state/useDeleteModalState";
import { useDebounce } from "@hooks/useDebounce";
import { Item, ZodContainerSchema } from "../schemas/Item";
import "@item/styles/ItemTable.css";

import CreateBox from "./CreateBox";
import { MemoizedTableBody, TableBody } from "./TableBody";

export const Input = ({ column }: { column: Column<any, unknown> }) => {
  const filterValue: string = (column.getFilterValue() ?? "") as string;
  const [value, setValue] = useState<string>(filterValue);

  const request = useDebounce(() => {
    column.setFilterValue(value);
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    request();
  };

  return (
    <Form.Control
      size="sm"
      type="text"
      onChange={onChange}
      value={value}
      placeholder="Search..."
    />
  );
};

function ItemTable() {
  const { columns, itemsQuery } = useTableData();

  const updateItemMutation = useUpdateItem();
  const deleteItemMutation = useDeleteItem();

  const [data, setData] = useState<Item[]>([]);

  // Modal
  const { showModal, setShowModal, deleteId } = useDeleteModalState();

  // Create
  const { openCanvas } = useCanvasState();

  // Pagination
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const pageResetRef = useRef<boolean>(false);

  const updateData = (rowIndex: number, columnID: string, value: any) => {
    pageResetRef.current = true; // Disable page from changing

    const updatedItem = { ...data[rowIndex], [columnID]: value };

    updateItemMutation.mutate({ ...updatedItem });
  };

  const removeData = () => {
    pageResetRef.current = true; // Disable page from changing

    if (deleteId) {
      deleteItemMutation.mutate(deleteId);
    }
  };

  const table = useReactTable<Item>({
    data,
    columns,
    defaultColumn: {
      minSize: 50,
      maxSize: 1500,
    },
    getRowCanExpand: (row) =>
      (row.getValue("containerItems") as ZodContainerSchema[]).length > 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData,
      getItemId: (index: number) => {
        return data[index].id;
      },
    },
    state: {
      pagination,
    },
    initialState: {
      sorting: [
        {
          id: "name",
          desc: false,
        },
      ],
    },
  });

  useEffect(() => {
    if (itemsQuery) {
      setData(itemsQuery);

      pageResetRef.current = false; // Re-enable page reset
    }
  }, [itemsQuery]);

  const columnSize = useMemo(() => {
    const headers = table.getFlatHeaders();
    const sizes: { [key: string]: number } = {};

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      sizes[`--header-${header.id}-size`] = header.getSize();
      sizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }

    return sizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  return (
    <Container className="pt-2" fluid>
      <div>
        <Table
          hover
          bordered
          variant="secondary"
          className="m-0"
          style={{ ...columnSize, borderRadius: "8px", overflow: "hidden" }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={`tableHeader-${headerGroup.id}`}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={`header-${header.id}`}
                        colSpan={header.colSpan}
                        style={{
                          width: `calc(var(--header-${header?.id}-size) * 1px)`,
                          position: "relative",
                        }}>
                        {header.isPlaceholder ? null : (
                          <React.Fragment key={`headerActions-${header.id}`}>
                            <div
                              className={
                                header.column.getCanSort() ? "sortDiv" : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                              title={
                                header.column.getCanSort()
                                  ? header.column.getNextSortingOrder() ===
                                    "asc"
                                    ? "Ascending"
                                    : header.column.getNextSortingOrder() ===
                                        "desc"
                                      ? "Descending"
                                      : "Clear"
                                  : undefined
                              }>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}{" "}
                              {{ asc: " ▲", desc: " ▼" }[
                                header.column.getIsSorted() as string
                              ] ?? null}
                              <div
                                onDoubleClick={() => header.column.resetSize()}
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                                className={`${header.column.getCanResize() ? "resizer" : ""} ${header.column.getIsResizing() ? "isResizing" : ""}`}
                              />
                            </div>
                            {header.column.getCanFilter() ? (
                              <div>
                                <Input column={header.column} />
                              </div>
                            ) : null}
                          </React.Fragment>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          {table.getState().columnSizingInfo.isResizingColumn ? (
            <MemoizedTableBody table={table} />
          ) : (
            <TableBody table={table} />
          )}
          {/* <tfoot>
                        {table.getFooterGroups().map(footerGroup => {
                                return <tr key={ `tableFooter-${footerGroup.id}` }>{footerGroup.headers.map(footer => {
                                    return <td key={ `footer-${footer.id}` }>{footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}</td>
                                })}</tr>
                            }
                        )}
                    </tfoot> */}
        </Table>
      </div>
      <br />
      <Stack direction="horizontal" gap={3}>
        {table.getPageCount() > 0 && <PaginationControl table={table} />}
        <Button
          variant="success"
          onClick={() => openCanvas(CreateBox, "Create")}>
          Create
        </Button>
      </Stack>

      <Canvas />
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onDelete={removeData}
        message={"Are you sure you want to delete this item?"}
      />
    </Container>
  );
}

export default ItemTable;
