import { createColumnHelper } from "@tanstack/react-table";
import { ContainerType } from "../../../cit_types/Container";
import { useContainers } from "../../../services/queries";
import { useMemo } from "react";
import EditCell from "../custom_cells/EditCell";
import DeleteCell from "../custom_cells/DeleteCell";

const columnHelper = createColumnHelper<ContainerType>();

export const useTableData = () => {
    const containersQuery = useContainers().data;

    const columns = useMemo(() => [
        columnHelper.accessor("name", {
            id: "name",
            header: "Name",
            enableResizing: true,
            cell: EditCell
        }),
        columnHelper.accessor("description", {
            id: "description",
            header: "Description",
            enableResizing: true,
            cell: EditCell
        }),
        columnHelper.accessor("scannerId", {
            id: "scannerId",
            header: "Container ID",
            enableResizing: true,
            cell: EditCell
        }),
        columnHelper.accessor("parentContainer", {
            id: "parentContainer",
            header: "Parent Container ID",
            enableResizing: true,
            cell: EditCell
        }),
        columnHelper.accessor("id", {
            id: "id",
            header: "Delete",
            size: 50,
            cell: DeleteCell,
            enableResizing: false,
            enableSorting: false,
            enableColumnFilter: false,
        })
    ], []);

    return { columns, containersQuery };
};