import React from 'react';
import { generate } from '@bramus/pagination-sequence';
import { Pagination } from 'react-bootstrap';

type paginationComponentProp = {
    currentPage: number;
    totalPages: number;
    onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationComponent = ({currentPage, totalPages, onPageChange}: paginationComponentProp) => {
    const sequence = generate(currentPage, totalPages, 3, 2);

    return (
        <Pagination className="justify-content-start">
            <Pagination.First onClick={() => onPageChange(0)} />
            <Pagination.Prev disabled={ currentPage === 0 } onClick={ () => onPageChange(currentPage - 1) } />

            {sequence.map((value, index) => (
                <React.Fragment>
                    {value === '...' ? (
                        <Pagination.Ellipsis disabled />
                    ) : (
                        <Pagination.Item key={`page-${index}`} onClick={ () => onPageChange(index) } active={ currentPage === index} >{ value }</Pagination.Item>
                    )}
                </React.Fragment>
            ))}
            
            <Pagination.Next disabled={ currentPage === (totalPages - 1) } />
            <Pagination.Last onClick={() => onPageChange(totalPages - 1)} />
        </Pagination>
    );
};

export default PaginationComponent;