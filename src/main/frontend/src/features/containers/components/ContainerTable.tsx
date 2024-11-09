import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTableData } from "../data/useTableData";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { ContainerType } from "../schemas/Container";
import { Button, Container, Stack, Table } from "react-bootstrap";
import PaginationControl from "@components/general/PaginationControl";
import { Input } from "@item/components/ItemTable";
import { MemoizedTableBody, TableBody } from "./TableBody";
import ConfirmationModal from "@components/general/ConfirmationModal";
import { useDeleteModalState } from "@hooks/state/useDeleteModalState";
import {
  useUpdateContainer,
  useDeleteContainer,
  useUpdateParentContainer,
} from "@services/mutations";
import { useCanvasState } from "@hooks/state/useCanvasState";
import ContainerCreate from "./ContainerCreate";
import Canvas from "@components/general/Canvas";

function ContainerTable() {
  const { columns, containersQuery } = useTableData();

  const updateContainerMutation = useUpdateContainer();
  const updateParentContainerMutation = useUpdateParentContainer();
  const deleteContainerMutation = useDeleteContainer();

  const [data, setData] = useState<ContainerType[]>([]);

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

    const updatedContainer = { ...data[rowIndex], [columnID]: value };

    updateContainerMutation.mutate({ ...updatedContainer });
  };

  const updateParentContainer = (rowIndex: number, parentContainerId: any) => {
    pageResetRef.current = true;

    const id = data[rowIndex].id;

    updateParentContainerMutation.mutate({ id, parentContainerId });
  };

  const removeData = () => {
    pageResetRef.current = true; // Disable page from changing

    if (deleteId) {
      deleteContainerMutation.mutate(deleteId);
    }
  };

  const table = useReactTable<ContainerType>({
    data,
    columns,
    defaultColumn: {
      minSize: 50,
      maxSize: 1500,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData,
      updateParentContainer,
      getContainerId: (rowIndex: number) => {
        return data[rowIndex].id;
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
    if (containersQuery) {
      setData(containersQuery);

      pageResetRef.current = false;
    }
  }, [containersQuery]);

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
        </Table>
      </div>
      <br />
      <Stack direction="horizontal" gap={3}>
        {table.getPageCount() > 0 && (
          <Stack direction="horizontal" gap={3}>
            <PaginationControl table={table} />
          </Stack>
        )}
        <Button
          variant="success"
          onClick={() => openCanvas(ContainerCreate, "Create")}>
          Create
        </Button>
      </Stack>
      <Canvas />
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onDelete={removeData}
        message={"Are you sure you want to delete this container?"}
      />
    </Container>
  );
}

export default ContainerTable;
