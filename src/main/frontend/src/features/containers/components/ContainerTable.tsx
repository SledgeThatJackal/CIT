import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTableData } from "../data/useTableData";
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
import { ContainerType } from "../schemas/Container";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import PaginationControl from "@components/general/PaginationControl";
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
import GenericModal from "@components/general/GenericModal";
import { useBooleanState } from "@hooks/state/useBooleanState";
import { useDebounce } from "@hooks/useDebounce";
import ZipCreateModal from "./zip_create/ZipCreate";

const Input = ({ column }: { column: Column<any, unknown> }) => {
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
  const { isOn, toggle } = useBooleanState();

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

  const updateParentContainer = (
    rowIndex: number,
    parentContainerId: number,
  ) => {
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
      getId: (rowIndex: number) => {
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
      <Stack direction="horizontal" gap={3} className="mb-2">
        {table.getPageCount() > 0 && (
          <Stack direction="horizontal" gap={3}>
            <PaginationControl table={table} />
          </Stack>
        )}
        <Stack
          direction="horizontal"
          gap={2}
          className="bg-light text-dark p-2 rounded shadow ms-auto">
          <Button
            variant="success"
            className="shadow"
            size="sm"
            onClick={() => openCanvas(ContainerCreate, "bottom", "Create")}>
            Create
          </Button>
          <Form.Switch
            id="bulkSwitch"
            label="Bulk Create"
            onChange={() => toggle(!isOn)}
          />
        </Stack>
      </Stack>
      <div>
        <Table
          hover
          bordered
          variant="dark"
          className="m-0 shadow"
          style={{
            ...columnSize,
            borderRadius: "8px",
            overflow: "hidden",
            tableLayout: "fixed",
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
      <Canvas />
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onDelete={removeData}
        message={"Are you sure you want to delete this container?"}
      />
      <GenericModal />
      <ZipCreateModal />
    </Container>
  );
}

export default ContainerTable;
