import { createColumnHelper } from "@tanstack/react-table";
import { ContainerType } from "../schemas/Container";
import { useDetailedContainers } from "@services/queries";
import { useMemo } from "react";
import EditCell from "@components/custom_cell_renderers/EditCell";
import ParentContainerCell from "../components/custom_cells/ParentContainerCell";
import ImageCell from "@components/custom_cell_renderers/ImageCell";
import React from "react";
import ActionsCell from "@container/components/custom_cells/ActionsCell";

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
      columnHelper.accessor("scannerId", {
        id: "scannerId",
        header: "Barcode ID",
        enableResizing: true,
        cell: EditCell,
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
      columnHelper.accessor("parentContainer", {
        id: "parentContainer",
        header: "Parent Container ID",
        enableResizing: true,
        cell: ParentContainerCell,
        sortUndefined: 1,
      }),
      columnHelper.display({
        id: "actions",
        header: () => <div className="text-center">Action(s)</div>,
        size: 105,
        cell: ActionsCell,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    [],
  );

  return { columns, containersQuery };
};
