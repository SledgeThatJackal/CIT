import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTableData } from './useTableData';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { ContainerType } from '../../../cit_types/Container';
import { Container, Stack, Table } from 'react-bootstrap';
import PaginationControl from '../PaginationControl';
import { Input } from '../item/ItemTable';
import { MemoizedTableBody, TableBody } from './TableBody';
import ConfirmationModal from '../../general/ConfirmationModal';
import { useDeleteModalState } from '../../../state/useDeleteModalState';
import { useUpdateContainer, useDeleteContainer } from '../../../services/mutations';

function TContainerTable(){
    const { columns, containersQuery } = useTableData();

    const updateContainerMutation = useUpdateContainer();
    const deleteContainerMutation = useDeleteContainer();

    const [data, setData] = useState<ContainerType[]>([]);

    // Modal
    const { showModal, setShowModal, deleteId } = useDeleteModalState();

    // Create
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const closeCreate = () => setShowCreate(false);

    // Pagination
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const pageResetRef = useRef<boolean>(false);

    const updateData = (rowIndex: number, columnID: string, value: any) => {
        pageResetRef.current = true; // Disable page from changing

        const updateContainer = {...data[rowIndex], [columnID]: value};

        updateContainerMutation.mutate({...updateContainer});
    };

    const removeData = () => {
        pageResetRef.current = true; // Disable page from changing

        if(deleteId){
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
        },
        state: {
            pagination
        }
    });

    useEffect(() => {
        if(containersQuery){
            setData(containersQuery);

            pageResetRef.current = false;
        }
    }, [containersQuery]);

    const columnSize = useMemo(() => {
        const headers = table.getFlatHeaders();
        const sizes: { [key: string]: number } = {};

        for(let i = 0; i < headers.length; i++){
            const header = headers[i]!;
            sizes[`--header-${header.id}-size`] = header.getSize();
            sizes[`--col-${header.column.id}-size`] = header.column.getSize();
        }

        return sizes;
    }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

    return(
        <Container className="pt-2" fluid>
            <div>
                <Table hover bordered variant="secondary" className="m-0" style={{ ...columnSize, borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                        {table.getHeaderGroups().map(headerGroup => {
                                    return <tr key={ `tableHeader-${headerGroup.id}` }>{headerGroup.headers.map(header => {
                                        return <th key={ `header-${header.id}` } colSpan={ header.colSpan } style={{ width: `calc(var(--header-${header?.id}-size) * 1px)`, position: "relative" }}>
                                                    {header.isPlaceholder ? null : (
                                                        <>
                                                            <div className={ header.column.getCanSort() ? "sortDiv" : "" } 
                                                                onClick={ header.column.getToggleSortingHandler() } 
                                                                title={ header.column.getCanSort() ? header.column.getNextSortingOrder() === "asc" ? "Ascending" : header.column.getNextSortingOrder() === "desc" ? "Descending" : "Clear" : undefined }>
                                                                    {flexRender(header.column.columnDef.header, header.getContext())} {{asc: " ▲", desc: " ▼"}[header.column.getIsSorted() as string] ?? null}
                                                                    <div onDoubleClick={ () => header.column.resetSize() } onMouseDown={ header.getResizeHandler() } onTouchStart={ header.getResizeHandler() } className={`${header.column.getCanResize() ? "resizer" : "" } ${header.column.getIsResizing() ? "isResizing" : ""}`} />
                                                            </div>
                                                            {header.column.getCanFilter() ? (
                                                                <div>
                                                                    <Input column={ header.column } />
                                                                </div>
                                                            ) : (
                                                                null
                                                            )}
                                                        </>
                                                    )}
                                                </th>
                                    })} </tr>
                                }
                            )}
                        </thead>
                        {table.getState().columnSizingInfo.isResizingColumn ? (
                            <MemoizedTableBody table={ table } />
                        ) : (
                            <TableBody table={ table } />
                        )}
                </Table>
            </div>
            <br />
            {table.getPageCount() > 0 && (
                <Stack direction="horizontal" gap={ 3 }>
                    <PaginationControl table={ table } />
                </Stack>
            )}
            <ConfirmationModal show={ showModal } handleClose={ () => setShowModal(false) } onDelete={ removeData } message={ "Are you sure you want to delete this container?" } />
        </Container>
    );
};

export default TContainerTable;