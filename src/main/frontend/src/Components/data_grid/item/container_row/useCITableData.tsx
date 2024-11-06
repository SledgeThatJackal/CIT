import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { ContainerItem } from '../../../../cit_types/ContainerItem';
import EditCell from '../../custom_cells/EditCell';
import RemoveCell from '../../custom_cells/RemoveCell';

const columnHelper = createColumnHelper<ContainerItem>();

export const useCITableData = () => {
    const columns = useMemo(() => [
        columnHelper.accessor("container.name", {
            id: "name",
            header: "Name",
            cell: ({ getValue }) => (
                <div>
                    {getValue<string>()}
                </div>
            )
        }),
        columnHelper.accessor("container.scannerId", {
            id: "containerId",
            header: "Container ID",
            cell: ({ getValue }) => (
                <div>
                    { getValue<string>() }
                </div>
            )
        }),
        columnHelper.accessor("quantity", {
            id: "quantity",
            header: "Quantity",
            cell: EditCell
        }),
        columnHelper.accessor("id", {
            id: "id",
            header: "Remove",
            cell: RemoveCell
        })
    ], []);

    return { columns };
};