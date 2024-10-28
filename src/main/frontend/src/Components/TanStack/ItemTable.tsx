import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';
import axios from 'axios';

import { useTableData } from "./useTableData";

import { Item } from '../../Types/Item';


function TItemTable(){
    const { columns, initialData } = useTableData();
    
    const [data, setData] = useState<Item[]>(initialData);

    const updateData = (rowIndex: number, columnID: string, value: any) => {
        setData(old => {
            const updatedTable = [...old];
            updatedTable[rowIndex] = {
                ...updatedTable[rowIndex],
                [columnID]: value
            };

            updateDatabase(updatedTable[rowIndex]);
            
            return updatedTable;
        });
    };

    const updateDatabase = async (updatedItem: Item) => {
        try{
            await axios.patch(`/api/item/edit/test`, updatedItem);
        } catch (error) {
            console.error("Failed Request: ", error);
        }
    };

    const table = useReactTable<Item>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            updateData,
            getItemId: (index: number) => {
                return data[index].id;
            }
        }
    });

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    return (
        <Table hover bordered variant="secondary" className="mx-auto" style={{borderRadius: '8px', overflow: 'hidden'}}>
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
    );
};

export default TItemTable;