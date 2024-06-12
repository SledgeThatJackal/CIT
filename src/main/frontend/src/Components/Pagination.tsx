import React from 'react';
import {generate} from '@bramus/pagination-sequence';

type paginationComponentProp = {
    currentPage: number;
    totalPages: number;
    onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationComponent = ({currentPage, totalPages, onPageChange}: paginationComponentProp) => {
    const sequence = generate(currentPage, totalPages, 3, 2);

    return (
        <div>
            <ul className="pagination">
                <li className="page-item">
                    <button className={`page-link ${currentPage === 0 ? 'disabled' : ''}`} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                </li>

                {sequence.map((value, index) => (
                    <li className="page-item">
                        <button key={`page-${index}`} onClick={value === '...' ? undefined : () => onPageChange(index)} className={`page-link ${currentPage === index ? 'active' : ''}`}>{value}</button>
                    </li>
                ))}

                <li className="page-item">
                    <button className={`page-link ${currentPage === (totalPages - 1) ? 'disabled' : ''}`} onClick={() => onPageChange(currentPage + 1)}>Next</button>
                </li>
            </ul>
        </div>
    );
};

export default PaginationComponent;