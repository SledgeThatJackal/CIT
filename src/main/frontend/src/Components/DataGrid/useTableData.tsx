import { useMemo } from 'react';
import { createColumnHelper, Row } from '@tanstack/react-table';

import { Item } from '../../Types/Item';
import EditCell from './CustomCells/EditCell';
import TagCell from './CustomCells/TagCell';
import { useItems } from '../../Services/queries';
import DeleteCell from './CustomCells/DeleteCell';
import { Button } from 'react-bootstrap';
import React from 'react';
import { Tag } from '../../Types/Tag';

const columnHelper = createColumnHelper<Item>();

export const useTableData = () => {
    const itemsQuery = useItems().data;
    
    const columns = useMemo(() => [
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
        }),
        columnHelper.accessor("tags", {
            id: "tags",
            header: "Tag(s)",
            size: 500,
            cell: TagCell,
            enableResizing: true,
            enableSorting: false,
            filterFn: (row: Row<Item>, columnId:string, filterValue: string) => {
                return (row.getValue(columnId) as Tag[]).some(tag => tag.tag.toLowerCase().includes(filterValue.toLowerCase()));
            }
        }),
        columnHelper.accessor("id", {
            id: "id",
            header: "Action(s)",
            size: 50,
            cell: DeleteCell,
            enableResizing: false,
            enableSorting: false,
            enableColumnFilter: false,
        }),
        columnHelper.accessor("containerItems", {
            id: "containerItems",
            header: () => null,
            size: 50,
            cell: ({ row }) => {
                return row.getCanExpand() ? (
                    <Button {...{onClick: row.getToggleExpandedHandler()}}>
                        {row.getIsExpanded() ? '▲' : '▼'}
                    </Button> 
                ) : null
            },
            enableResizing: false,
            enableSorting: false,
            enableColumnFilter: false,
        }),
    ], []);
    
    return { columns, itemsQuery };
};