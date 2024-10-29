import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { createColumnHelper } from '@tanstack/react-table';

import { Item } from '../../Types/Item';
import EditCell from './CustomCells/EditCell';
import TagCell from './CustomCells/TagCell';

const columnHelper = createColumnHelper<Item>();

export const useTableData = () => {
    const [initialData, setInitialData] = useState<Item[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = (await axios.get<Item[]>("/api/item")).data;

                setInitialData(response);
            } catch (error) {
                console.error("Request Failed: ", error);
            }
        }

        fetchData();
    }, [])
    
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
    ], []);
    
    return { columns, initialData };
};