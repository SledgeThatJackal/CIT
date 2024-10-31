import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';
import axios from 'axios';

import { useTableData } from "./useTableData";

import { Item } from '../../Types/Item';
import { useCreateItem, useDeleteItem, useUpdateItem } from '../../Services/mutations';
import ConfirmationModal from '../General/ConfirmationModal';

function TItemTable(){
    const { columns, itemsQuery } = useTableData();
    
    const createItemMutation = useCreateItem();
    const updateItemMutation = useUpdateItem();
    const deleteItemMutation = useDeleteItem();
    
    const [data, setData] = useState<Item[]>([]);

    // Modal
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [deleteId, setDeleteId] = useState<number>(-1);

    const updateData = (rowIndex: number, columnID: string, value: any) => {
        const updatedItem = {...data[rowIndex], [columnID]: value};

        updateItemMutation.mutate({...updatedItem});
    };

    const removeData = () => {
        deleteItemMutation.mutate(deleteId);
    };

    const setupDelete = (id: number) => {
        setDeleteId(id);
        handleOpen();
    };

    const table = useReactTable<Item>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            updateData,
            setupDelete,
            getItemId: (index: number) => {
                return data[index].id;
            }
        }
    });

    useEffect(() => {
        if(itemsQuery){
            setData(itemsQuery);
        }
    }, [itemsQuery]);

    return (
        <Container fluid>
            <Table hover bordered variant="secondary" className="mx-auto" style={{ borderRadius: '8px', overflow: 'hidden', maxHeight: "65vh" }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => {
                            return <tr key={ `tableHeader-${headerGroup.id}` }>{headerGroup.headers.map(header => {
                                return <th key={ `header-${header.id}` } colSpan={ header.colSpan }>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
                            })}</tr>
                        }
                    )}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return <tr key={ `row-${row.id}` }>{row.getVisibleCells().map(cell => {
                            return <td key={ `cell-${cell.id}` }>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        })}</tr>
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
            <ConfirmationModal show={ showModal } handleClose={ handleClose } onDelete={ removeData } message={ "Are you sure you want to delete this item?" } />
        </Container>
    );
};

export default TItemTable;