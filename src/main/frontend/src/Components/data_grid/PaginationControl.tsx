import { Table } from "@tanstack/react-table";
import React from "react";
import { Form, InputGroup, Pagination, Stack } from 'react-bootstrap';
import { generate } from "@bramus/pagination-sequence";

type PaginationControlProps = {
    table: Table<any>;
};

const PaginationControl = ({ table }: PaginationControlProps) => {
    const currentPage = table.getState().pagination.pageIndex;
    const sequence = generate(currentPage, table.getPageCount(), 3, 2);
    
    return (
        <Stack direction="horizontal" gap={ 3 }>
            <Pagination className="my-0">
                <Pagination.First key={ `page-first` } onClick={ () => table.firstPage() } disabled={ !table.getCanPreviousPage() } />
                <Pagination.Prev key={ `page-prev` } onClick={ () => table.previousPage() } disabled={ !table.getCanPreviousPage() } />

                {sequence.map((value, index) => (
                    <>
                        {value === '...' ? (
                            <Pagination.Ellipsis disabled />
                        ) : (
                            <Pagination.Item key={`page-${index}`} onClick={ () => table.setPageIndex(index) } active={ currentPage === index} >{value}</Pagination.Item>
                        )}
                    </>
                ))}

                <Pagination.Next key={ `page-next` } onClick={ () => table.nextPage() } disabled={ !table.getCanNextPage() } />
                <Pagination.Last key={ `page-Last` } onClick={ () => table.lastPage() } disabled={ !table.getCanNextPage() } />
            </Pagination>
            <InputGroup className="w-auto">
                <InputGroup.Text><strong>Navigate To Page:</strong></InputGroup.Text>
                <Form.Control type="number" min="1" max={ table.getPageCount() } defaultValue={ table.getState().pagination.pageIndex + 1 } onChange={ (event) => table.setPageIndex(event.target.value ? (Number(event.target.value) - 1) : 0) } />
            </InputGroup>
            <InputGroup className="w-auto">
                <InputGroup.Text><strong>Show:</strong></InputGroup.Text>
                <Form.Select aria-label="Page Size">
                    {[10, 20, 30, 40, 50].map(size => (
                        <option key={ `size-${size}` } value={ size }>
                            {size}
                        </option>
                    ))}
                </Form.Select>
            </InputGroup>
        </Stack>
    );
};

export default PaginationControl;