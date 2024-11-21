import {
  Column,
  ColumnFilter,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Container, Form, Stack, Table } from "react-bootstrap";

import { useTableData } from "../data/useTableData";

import {
  useDeleteItem,
  useUpdateItem,
  useUpdateItemAttribute,
} from "@item/services/mutation";
import Canvas from "@components/general/Canvas";
import ConfirmationModal from "@components/general/ConfirmationModal";
import { useCanvasState } from "@hooks/state/useCanvasState";
import { useDeleteModalState } from "@hooks/state/useDeleteModalState";
import { useDebounce } from "@hooks/useDebounce";
import { Item, ItemAttribute, ZodContainerType } from "../schemas/Item";
import "@item/styles/ItemTable.css";

import CreateBox from "./CreateBox";
import { MemoizedTableBody, TableBody } from "./TableBody";
import GenericModal from "@components/general/GenericModal";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteItems } from "@item/services/query";
import SelectComponentW from "@components/Write/SelectComponentW";
import { useItemTypes } from "@type/services/query";
import { ZodItemType } from "@schema/General";

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
  const [filter, setFilter] = useState<ZodItemType>({ id: -1, name: "" });
  const { columns } = useTableData(filter.id);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const typeQuery = useItemTypes().data;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteItems(columnFilters, filter?.name);

  const data: Item[] = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data.content) ?? [],
    [infiniteData],
  );

  const updateItemMutation = useUpdateItem();
  const deleteItemMutation = useDeleteItem();

  const updateItemAttributeMutation = useUpdateItemAttribute();

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
      minSize: 60,
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
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    debugCells: true,
  });

  const columnSize = useMemo(() => {
    const headers = table.getFlatHeaders();
    const sizes: { [key: string]: number } = {};
    console.log("Here");

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      sizes[`--header-${header.id}-size`] = header.getSize();
      sizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }

    return sizes;
  }, [
    table.getState().columnSizingInfo,
    table.getState().columnSizing,
    columns,
  ]);

  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 20,
  });

  useEffect(() => {
    if (data.length > 0) {
      pageResetRef.current = false; // Re-enable page reset
    }
  }, [data, columns]);

  const fetchPages = useCallback(
    (parentRef?: HTMLDivElement | null) => {
      if (parentRef) {
        const { scrollHeight, scrollTop, clientHeight } = parentRef;
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isFetchingNextPage &&
          hasNextPage
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetchingNextPage, hasNextPage],
  );

  useEffect(() => {
    fetchPages(parentRef.current);
  }, [fetchPages]);

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
      <Stack direction="horizontal" gap={3} className="mb-2">
        <SelectComponentW
          data={typeQuery}
          labelKey={"name"}
          setValue={(id: number) =>
            setFilter(
              typeQuery?.find((type) => type.id === id) || {
                id: -1,
                name: "",
              },
            )
          }
        />
        <Button
          variant="success"
          className="shadow ms-auto"
          onClick={() => openCanvas(CreateBox, "bottom", "Create")}>
          Create
        </Button>
      </Stack>

      <div ref={scrollRef} className="shadow rounded">
        <div
          ref={parentRef}
          style={{ maxHeight: "80vh", overflow: "auto" }}
          onScroll={(e) => fetchPages(e.target as HTMLDivElement)}>
          <Table
            key={`itemTable-${filter.name}`}
            hover
            bordered
            variant="dark"
            className="m-0 shadow table-responsive"
            style={{
              ...columnSize,
              borderRadius: "8px",
              tableLayout: "fixed",
              borderCollapse: "collapse",
            }}>
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

      <Canvas />
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onDelete={removeData}
        message={"Are you sure you want to delete this item?"}
      />
      <GenericModal />
    </Container>
  );
}

export default ItemTable;
