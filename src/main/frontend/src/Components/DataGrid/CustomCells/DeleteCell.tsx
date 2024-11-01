import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteCell = ({ getValue, table }: any) => {
    const handleDelete = () => {
        table.options.meta?.setupDelete(getValue());
    };

    return(
        <Button variant="danger" size="sm" onClick={ handleDelete }>
            <i className="bi bi-trash"></i>
        </Button>
    );
};

export default DeleteCell;