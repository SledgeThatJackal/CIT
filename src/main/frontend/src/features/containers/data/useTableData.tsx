import { createColumnHelper } from "@tanstack/react-table";
import { ContainerType } from "../schemas/Container";
import { useDetailedContainers } from "@services/queries";
import { useMemo } from "react";
import EditCell from "@components/custom_cell_renderers/EditCell";
import DeleteCell from "@components/custom_cell_renderers/DeleteCell";
import ParentContainerCell from "../components/custom_cells/ParentContainerCell";
import ImageCell from "@components/custom_cell_renderers/ImageCell";
import React from "react";
import DuplicateCell from "@container/components/custom_cells/DuplicateCell";

const columnHelper = createColumnHelper<ContainerType>();

export const useTableData = () => {
  const containersQuery = useDetailedContainers().data;

  const columns = useMemo(
    () => [
      columnHelper.accessor("images", {
        id: "images",
        header: () => null,
        cell: ImageCell,
        size: 75,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        size: 500,
        enableResizing: true,
        cell: EditCell,
      }),
      columnHelper.accessor("description", {
        id: "description",
        header: "Description",
        size: 500,
        enableResizing: true,
        cell: EditCell,
        sortUndefined: 1,
      }),
      columnHelper.accessor("scannerId", {
        id: "scannerId",
        header: "Barcode ID",
        enableResizing: true,
        cell: EditCell,
      }),
      columnHelper.accessor("parentContainer", {
        id: "parentContainer",
        header: "Parent Container ID",
        enableResizing: true,
        cell: ParentContainerCell,
        sortUndefined: 1,
      }),
      columnHelper.accessor("id", {
        id: "id",
        header: () => <div className="text-center">Delete</div>,
        size: 75,
        cell: DeleteCell,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.display({
        id: "duplicate",
        header: () => <div className="text-center">Duplicate</div>,
        size: 75,
        cell: DuplicateCell,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    [],
  );

  return { columns, containersQuery };
};
