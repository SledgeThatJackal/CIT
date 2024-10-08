import React, { useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';

import { useTableData } from "./useTableData";

import { Item } from '../../Types/Item';


function TItemTable(){
    const { columns, data } = useTableData();
    
    // const [data, setData] = useState<Item[]>(tableData);

    const table = useReactTable<Item>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            // updateData: (rowIndex: number, columnId: string, value: string) => 
            //     setData(prev => prev.map((row, index) => 
            //         index === rowIndex ? {...prev[rowIndex], [columnId]: value} : row
            //     )),
            // getItemId: (rowIndex: number) => {return data.at(rowIndex)?.id}
        }
    });

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