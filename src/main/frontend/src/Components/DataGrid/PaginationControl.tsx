import { Table } from "@tanstack/react-table";
import React from "react";
import { Pagination } from 'react-bootstrap';
import { Item } from "../../Types/Item";
import { generate } from "@bramus/pagination-sequence";

type PaginationControlProps = {
    table: Table<Item>;
};

const PaginationControl = ({ table }: PaginationControlProps) => {
    const currentPage = table.getState().pagination.pageIndex;
    const sequence = generate(currentPage, table.getPageCount(), 3, 2);
    

    return (
        <Pagination>
            <Pagination.First onClick={ () => table.firstPage() } disabled={ !table.getCanPreviousPage() } />
            <Pagination.Prev onClick={ () => table.previousPage() } disabled={ !table.getCanPreviousPage() } />

            {sequence.map((value, index) => (
                <>
                    {value === '...' ? (
                        <Pagination.Ellipsis disabled />
                    ) : (
                        <Pagination.Item key={`page-${index}`} onClick={ () => table.setPageIndex(index) } active={ currentPage === index} >{value}</Pagination.Item>
                    )}
                </>
            ))}

            <Pagination.Next onClick={ () => table.nextPage() } disabled={ !table.getCanNextPage() } />
            <Pagination.Last onClick={ () => table.lastPage() } disabled={ !table.getCanNextPage() } />
        </Pagination>
    );
};

export default PaginationControl;