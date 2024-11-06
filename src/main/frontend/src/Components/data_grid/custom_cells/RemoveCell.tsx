import React from 'react';
import { Button, CloseButton } from 'react-bootstrap';

const RemoveCell = ({ getValue, table }: any) => {
    const handleDelete = () => {
        table.options.meta?.handleRemove(getValue());
    };

    return(
        <CloseButton onClick={ handleDelete }/>
    );
};

export default RemoveCell;