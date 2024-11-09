import { createColumnHelper } from "@tanstack/react-table";
import { ContainerType } from "../schemas/Container";
import { useDetailedContainers } from "@services/queries";
import { useMemo } from "react";
import EditCell from "@components/custom_cell_renderers/EditCell";
import DeleteCell from "@components/custom_cell_renderers/DeleteCell";
import ParentContainerCell from "../components/custom_cells/ParentContainerCell";

const columnHelper = createColumnHelper<ContainerType>();

export const useTableData = () => {
  const containersQuery = useDetailedContainers().data;

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        enableResizing: true,
        cell: EditCell,
      }),
      columnHelper.accessor("description", {
        id: "description",
        header: "Description",
        enableResizing: true,
        cell: EditCell,
        sortUndefined: 1,
      }),
      columnHelper.accessor("scannerId", {
        id: "scannerId",
        header: "Container ID",
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
        header: "Delete",
        size: 50,
        cell: DeleteCell,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    [],
  );

  return { columns, containersQuery };
};
