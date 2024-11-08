import { useMemo } from 'react';
import { createColumnHelper, Row } from '@tanstack/react-table';

import { Item } from '../../../cit_types/Item';
import EditCell from '../custom_cells/EditCell';
import TagCell from '../custom_cells/TagCell';
import { useItems } from '../../../services/queries';
import DeleteCell from '../custom_cells/DeleteCell';
import { Tag } from '../../../cit_types/Tag';
import ActionButtons from '../custom_cells/ActionButtons';

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
            sortUndefined: 1
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
            header: "Delete",
            size: 50,
            cell: DeleteCell,
            enableResizing: false,
            enableSorting: false,
            enableColumnFilter: false,
        }),
        columnHelper.accessor("containerItems", {
            id: "containerItems",
            header: () => null,
            size: 100,
            cell: ActionButtons,
            enableResizing: false,
            enableSorting: false,
            enableColumnFilter: false,
        }),
    ], []);
    
    return { columns, itemsQuery };
};