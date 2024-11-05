import React, { Fragment } from "react";
import { Item } from "../../Types/Item";
import { flexRender, Table } from "@tanstack/react-table";
import ContainerTable from "./ContainerRow/ContainerTable";

type TableBodyProps = {
    table: Table<Item>
};

export const TableBody = ({ table }: TableBodyProps) => {
    return(
        <tbody>
            {table.getRowModel().rows.map(row => {
                return(
                    <Fragment>
                        <tr key={ `row-${row.id}` }>
                            {row.getVisibleCells().map(cell => {
                                return <td key={ `cell-${cell.id}` } style={{ width: `calc(var(--col-${cell.column.id}-size) * 1px)` }}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
    );
};

export const MemoizedTableBody = React.memo(TableBody, (prev, next) => prev.table.options.data === next.table.options.data) as typeof TableBody;