import React from 'react';

const PaginationComponent = ({currentPage, onPageChange}) => {
    return (
        <div>
            <ul class="pagination">
                <li class="page-item">
                    <button class="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} data-page="prev">Previous</button>
                </li>
                <li class="page-item">
                    <button class="page-link" onClick={() => onPageChange(currentPage + 1)} data-page="next">Next</button>
                </li>
            </ul>
        </div>
    );
};

export default PaginationComponent;