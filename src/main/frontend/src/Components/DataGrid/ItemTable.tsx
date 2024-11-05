import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
import { getCoreRowModel, useReactTable, flexRender, getPaginationRowModel, PaginationState, getSortedRowModel, getFilteredRowModel, Column } from '@tanstack/react-table';

import { useTableData } from "./useTableData";

import { Item } from '../../Types/Item';
import { useDeleteItem, useUpdateItem } from '../../Services/mutations';
import ConfirmationModal from '../General/ConfirmationModal';
import ContainerTable from './ContainerRow/ContainerTable';
import { ContainerItem } from '../../Types/ContainerItem';
import PaginationControl from './PaginationControl';
import { useDebounce } from '../../Hooks/useDebounce';
import '../../Styles/Sort.css';

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

function TItemTable(){
    const { columns, itemsQuery } = useTableData();
    
    const updateItemMutation = useUpdateItem();
    const deleteItemMutation = useDeleteItem();
    
    const [data, setData] = useState<Item[]>([]);

    // Modal
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [deleteId, setDeleteId] = useState<number>(-1);

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
        getRowCanExpand: (row) => (row.getValue("containerItems") as ContainerItem[]).length > 0,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
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

    return (
        <Container fluid>
            <Table hover bordered variant="secondary" className="mx-auto" style={{ borderRadius: '8px', overflow: 'hidden', maxHeight: "65vh" }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => {
                            return <tr key={ `tableHeader-${headerGroup.id}` }>{headerGroup.headers.map(header => {
                                return <th key={ `header-${header.id}` } colSpan={ header.colSpan }>
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    <div className={ header.column.getCanSort() ? "sortDiv" : "" } 
                                                         onClick={ header.column.getToggleSortingHandler() } 
                                                         title={ header.column.getCanSort() ? header.column.getNextSortingOrder() === "asc" ? "Ascending" : header.column.getNextSortingOrder() === "desc" ? "Descending" : "Clear" : undefined }>
                                                            {flexRender(header.column.columnDef.header, header.getContext())} {{asc: " ▲", desc: " ▼"}[header.column.getIsSorted() as string] ?? null}
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
                            })}</tr>
                        }
                    )}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return(
                            <Fragment>
                                <tr key={ `row-${row.id}` }>
                                    {row.getVisibleCells().map(cell => {
                                        return <td key={ `cell-${cell.id}` }>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                    })}
                                </tr>
                                {row.getIsExpanded() && (
                                    <tr key={`subRow-${row.id}`}>
                                        <td colSpan={row.getVisibleCells().length}>
                                            <ContainerTable value={ row.getValue("containerItems") } itemId={ row.getValue("id")} />
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        )
                    })}
                    
                </tbody>
                {/* <tfoot>
                    {table.getFooterGroups().map(footerGroup => {
                            return <tr key={ `tableFooter-${footerGroup.id}` }>{footerGroup.headers.map(footer => {
                                return <td key={ `footer-${footer.id}` }>{footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}</td>
                            })}</tr>
                        }
                    )}
                </tfoot> */}
            </Table>
            {table.getPageCount() > 0 && (
                <PaginationControl table={ table } />
            )}
            <ConfirmationModal show={ showModal } handleClose={ handleClose } onDelete={ removeData } message={ "Are you sure you want to delete this item?" } />
        </Container>
    );
};

export default TItemTable;