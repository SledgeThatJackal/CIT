import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
import { getCoreRowModel, useReactTable, flexRender, getPaginationRowModel, PaginationState, getSortedRowModel, getFilteredRowModel, Column } from '@tanstack/react-table';

import { useTableData } from "./useTableData";

import { Item } from '../../../Types/Item';
import { useDeleteItem, useUpdateItem } from '../../../Services/mutations';
import ConfirmationModal from '../../General/ConfirmationModal';
import { ContainerItem } from '../../../Types/ContainerItem';
import PaginationControl from '../PaginationControl';
import { useDebounce } from '../../../Hooks/useDebounce';
import '../../../Styles/ItemTable.css';
import { MemoizedTableBody, TableBody } from './TableBody';

const Input = ({ column }: { column: Column<any, unknown>}) => {
    const filterValue: string = (column.getFilterValue() ?? "") as string;
    const [value, setValue] = useState<string>(filterValue);

    const request = useDebounce(() => {
        column.setFilterValue(value);
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)

        request();
    };

    return <Form.Control size="sm" type="text" onChange={ onChange } value={ value } placeholder="Search..." />
};

function ItemTable(){
    const { columns, itemsQuery } = useTableData();
    
    const updateItemMutation = useUpdateItem();
    const deleteItemMutation = useDeleteItem();
    
    const [data, setData] = useState<Item[]>([]);

    // Modal
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [deleteId, setDeleteId] = useState<number>(-1);

    // Pagination
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const pageResetRef = useRef<boolean>(false);

    const updateData = (rowIndex: number, columnID: string, value: any) => {
        pageResetRef.current = true; // Disable page from changing

        const updatedItem = {...data[rowIndex], [columnID]: value};

        updateItemMutation.mutate({...updatedItem});
    };

    const removeData = () => {
        pageResetRef.current = true; // Disable page from changing

        deleteItemMutation.mutate(deleteId);
    };

    const setupDelete = (id: number) => {
        setDeleteId(id);
        handleOpen();
    };

    const table = useReactTable<Item>({
        data,
        columns,
        defaultColumn:{
            minSize: 50,
            maxSize: 1500,
        },
        getRowCanExpand: (row) => (row.getValue("containerItems") as ContainerItem[]).length > 0,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: "onChange",
        meta: {
            updateData,
            setupDelete,
            getItemId: (index: number) => {
                return data[index].id;
            }
        },
        state: {
            pagination
        }
    });

    useEffect(() => {
        if(itemsQuery){
            setData(itemsQuery);

            pageResetRef.current = false; // Re-enable page reset
        }
    }, [itemsQuery]);

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

    return (
        <Container className="pt-2" fluid>
            <div >
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
                    {/* <tfoot>
                        {table.getFooterGroups().map(footerGroup => {
                                return <tr key={ `tableFooter-${footerGroup.id}` }>{footerGroup.headers.map(footer => {
                                    return <td key={ `footer-${footer.id}` }>{footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}</td>
                                })}</tr>
                            }
                        )}
                    </tfoot> */}
                </Table>
            </div>
            <br />
            {table.getPageCount() > 0 && (
                <PaginationControl table={ table } />
            )}
            <ConfirmationModal show={ showModal } handleClose={ handleClose } onDelete={ removeData } message={ "Are you sure you want to delete this item?" } />
        </Container>
    );
};

export default ItemTable;