import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { Item } from '../../Types/Item';
import EditCell from './CustomCells/EditCell';
import TagCell from './CustomCells/TagCell';
import { useItems } from '../../Services/queries';
import DeleteCell from './CustomCells/DeleteCell';
import { Button } from 'react-bootstrap';
import React from 'react';

const columnHelper = createColumnHelper<Item>();

export const useTableData = () => {
    const itemsQuery = useItems().data;
    
    const columns = useMemo(() => [
        columnHelper.accessor("name", {
            id: "name",
            header: "Name",
            cell: EditCell,
        }),
        columnHelper.accessor("description", {
            id: "description",
            header: "Description",
            cell: EditCell,
        }),
        columnHelper.accessor("tags", {
            id: "tags",
            header: "Tag(s)",
            cell: TagCell
        }),
        columnHelper.accessor("id", {
            id: "id",
            header: "Action(s)",
            cell: DeleteCell
        }),
        columnHelper.accessor("containerItems", {
            id: "containerItems",
            header: () => null,
            cell: ({ row }) => {
                return row.getCanExpand() ? (
                    <Button size="sm" {...{onClick: row.getToggleExpandedHandler()}}>
                        {row.getIsExpanded() ? '▲' : '▼'}
                    </Button> 
                ) : null
            }
        }),
    ], []);
    
    return { columns, itemsQuery };
};