import {
  Column,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Stack,
  Table,
} from "react-bootstrap";

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
import SelectComponentW from "@components/write/SelectComponentW";
import { useItemTypes } from "@type/services/query";
import { ZodItemType } from "@schema/General";
import { useItemSettingsState } from "@item/hooks/persistent_states/useItemSettingsState";

const Input = ({ column }: { column: Column<any, unknown> }) => {
  const filterValue: string = (column.getFilterValue() ?? "") as string;
  const type = column.columnDef.meta?.type?.toUpperCase() ?? "STRING";
  const [value, setValue] = useState<string>(filterValue);
  const [filter, setFilter] = useState<string>("NE");

  const request = useDebounce(() => {
    if (value.endsWith(",") || value.endsWith("-")) return;
    if (filter === "R" && value.length > 0 && value.search(",") === -1) return;

    const filteredValue = value.length > 0 ? `${filter}_${value}` : "";
    column.setFilterValue(filteredValue);
  });

  const onChange = (event: React.ChangeEvent<any>) => {
    setValue(event.target.value);

    request();
  };

  const onNumericChange = (event: React.ChangeEvent<any>) => {
    // Remove any non-numeric characters, except for . , -
    let inputValue = event.target.value.replace(/[^0-9.\,\-]/g, "");

    if (filter === "R") {
      // Allow for only one comma | Remove any invalid syntax i.e. number.,number
      inputValue = inputValue.replace(/,{2,}/g, ",").replace(/\.,/g, ".");
    } else {
      // Remove any commas when not doing a range
      inputValue = inputValue.replace(/\,/g, "");
    }

    inputValue = inputValue
      .replace(/(\.\d*)\.{1,}/g, "$1") // Remove any periods after the first
      .replace(/(?<!^|,)-+/g, ""); // Remove any hypens after the first

    setValue(inputValue);

    request();
  };

  useEffect(() => {
    if (type === "STRING") {
      setFilter("E");
    }
  }, []);

  switch (type) {
    case "NUMBER":
      return (
        <InputGroup>
          <Form.Select
            size="sm"
            className="p-0 text-center"
            title="Change filtering type by selecting a new option"
            style={{ backgroundImage: "none" }}
            onChange={(event) => setFilter(event.target.value)}>
            <option value="NE">{`=`}</option>
            <option value="GT">{`>`}</option>
            <option value="GTE">{"≥"}</option>
            <option value="LT">{`<`}</option>
            <option value="LTE">{"≤"}</option>
            <option value="R">{`R`}</option>
          </Form.Select>
          <Form.Control
            size="sm"
            type="text"
            className="w-75"
            onChange={onNumericChange}
            value={value}
            placeholder="Search..."
          />
        </InputGroup>
      );

    case "BOOLEAN":
      return (
        <Form.Select size="sm" onChange={onChange}>
          <option value={undefined}></option>
          <option value={0}>False</option>
          <option value={1}>True</option>
        </Form.Select>
      );

    default:
      return (
        <Form.Control
          size="sm"
          type="text"
          onChange={onChange}
          value={value}
          placeholder="Search..."
        />
      );
  }
};

function ItemTable() {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const typeQuery = useItemTypes().data;

  const { sorting, setSorting, isBulkCreate, toggleBulkCreate } =
    useItemSettingsState();

  const [filter, setFilter] = useState<ZodItemType>({ id: -1, name: "" });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteItems(columnFilters, sorting, filter?.name);

  const data: Item[] = useMemo(
    () =>
      infiniteData?.pages.flatMap((page) => page.data._embedded.itemList) ?? [],
    [infiniteData],
  );

  const { columns } = useTableData(data, filter);

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
    },
    getRowCanExpand: (row) =>
      (row.getValue("containerItems") as ZodContainerType[]).length > 0,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualSorting: true,
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
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    enableMultiSort: true,
    maxMultiSortColCount: 3,
  });

  const columnSize = useMemo(() => {
    const headers = table.getFlatHeaders();
    const sizes: { [key: string]: number } = {};

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
    count: data.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 70,
    overscan: 50,
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
    options: {
      scrollbars: { theme: "os-theme-light" },
    },
  });

  useEffect(() => {
    if (scrollRef.current && parentRef.current)
      initialize({
        target: scrollRef.current,
        elements: { viewport: parentRef.current },
      });

    return () => instance()?.destroy();
  }, [initialize, instance]);

  const [tableKey, setTableKey] = useState<number>(0);

  useEffect(() => {
    setTableKey((prev) => prev + 1);
  }, [filter]);

  useEffect(() => {
    if (!isFetchingNextPage) {
      virtualizer.measure();
    }
  }, [table.getRowModel().rows, isFetchingNextPage]);

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
        <Stack
          direction="horizontal"
          gap={2}
          className="bg-light text-dark p-2 rounded shadow ms-auto">
          <Button
            variant="success"
            className="shadow ms-auto"
            size="sm"
            onClick={() => openCanvas(CreateBox, "bottom", "Create")}>
            Create
          </Button>

          <Form.Switch
            id="bulkSwitch"
            label="Bulk Create"
            style={{ textWrap: "nowrap" }}
            checked={isBulkCreate}
            onChange={toggleBulkCreate}
          />
        </Stack>
      </Stack>

      <div ref={scrollRef} className="shadow rounded">
        <div
          ref={parentRef}
          style={{
            maxHeight: "80vh",
            overflow: "auto",
            scrollSnapType: "none",
          }}
          onScroll={(e) => fetchPages(e.target as HTMLDivElement)}>
          <Table
            // key={`table-${tableKey}`}
            hover
            bordered
            variant="dark"
            className="m-0 shadow"
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
            <React.Fragment key={`rows-${tableKey}`}>
              {table.getState().columnSizingInfo.isResizingColumn ? (
                <MemoizedTableBody table={table} virtualizer={virtualizer} />
              ) : (
                <TableBody table={table} virtualizer={virtualizer} />
              )}
            </React.Fragment>
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
