import {
  Column,
  ColumnFiltersState,
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

import {
  useDeleteItem,
  useUpdateItem,
  useUpdateItemAttribute,
} from "@item/services/mutation";
import Canvas from "@components/general/Canvas";
import ConfirmationModal from "@components/general/ConfirmationModal";
import PaginationControl from "@components/general/PaginationControl";
import { useCanvasState } from "@hooks/state/useCanvasState";
import { useDeleteModalState } from "@hooks/state/useDeleteModalState";
import { useDebounce } from "@hooks/useDebounce";
import { Item, ItemAttribute, ZodContainerType } from "../schemas/Item";
import "@item/styles/ItemTable.css";

import CreateBox from "./CreateBox";
import { MemoizedTableBody, TableBody } from "./TableBody";
import GenericModal from "@components/general/GenericModal";
import {
  OverlayScrollbarsComponent,
  useOverlayScrollbars,
} from "overlayscrollbars-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteItems } from "@item/services/query";

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
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteItems(columnFilters);

  const updateItemMutation = useUpdateItem();
  const deleteItemMutation = useDeleteItem();

  const updateItemAttributeMutation = useUpdateItemAttribute();

  const [data, setData] = useState<Item[]>([]);

  // Modal
  const { showModal, setShowModal, deleteId } = useDeleteModalState();

  // Create
  const { openCanvas } = useCanvasState();

  const pageResetRef = useRef<boolean>(false);

  const updateData = (rowIndex: number, columnID: string, value: any) => {
    pageResetRef.current = true; // Disable page from changing

    const updatedItem = { ...data[rowIndex], [columnID]: value };

    updateItemMutation.mutate({ ...updatedItem });
  };

  const updateItemAttribute = (itemAttr: ItemAttribute) => {
    updateItemAttributeMutation.mutate(itemAttr);
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
      minSize: 10,
      maxSize: 1500,
    },
    getRowCanExpand: (row) =>
      (row.getValue("containerItems") as ZodContainerType[]).length > 0,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualFiltering: true,
    columnResizeMode: "onChange",
    meta: {
      updateData,
      updateItemAttribute,
      getId: (rowIndex: number) => {
        return data[rowIndex].id;
      },
    },
    initialState: {
      sorting: [
        {
          id: "name",
          desc: false,
        },
      ],
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
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

  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 20,
  });

  const scrollRef = useRef(null);
  const [initialize, instance] = useOverlayScrollbars({
    defer: true,
    options: { scrollbars: { autoHide: "move" } },
  });

  useEffect(() => {
    if (scrollRef.current && parentRef.current)
      initialize({
        target: scrollRef.current,
        elements: { viewport: parentRef.current },
      });

    return () => instance()?.destroy();
  }, [initialize, instance]);

  return (
    <Container className="pt-2" fluid>
      <div ref={scrollRef} className="shadow">
        <div ref={parentRef} style={{ height: "80vh", overflow: "auto" }}>
          <Table
            hover
            bordered
            variant="dark"
            className="m-0 shadow table-responsive"
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
                                  onDoubleClick={() =>
                                    header.column.resetSize()
                                  }
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
              <MemoizedTableBody table={table} virtualizer={virtualizer} />
            ) : (
              <TableBody table={table} virtualizer={virtualizer} />
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
      </div>
      <br />
      <Stack direction="horizontal" gap={3}>
        <Button
          variant="success"
          className="shadow"
          onClick={() => openCanvas(CreateBox, "bottom", "Create")}>
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
      <GenericModal />
      <div>
        {infiniteData?.pages.map((page) =>
          page.data.content.map((infItemData) => <div>{infItemData.name}</div>),
        )}
        <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Next
        </Button>
      </div>
    </Container>
  );
}

export default ItemTable;
