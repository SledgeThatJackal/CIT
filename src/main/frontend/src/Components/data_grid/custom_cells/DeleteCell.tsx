import React from 'react';
import { Button } from 'react-bootstrap';
import { useDeleteModalState } from '../../../state/useDeleteModalState';


const DeleteCell = ({ getValue }: any) => {
    const { setShowModal, setDeleteId } = useDeleteModalState();

    const handleDelete = () => {
        setShowModal(true);
        setDeleteId(getValue());
    };

    return(
        <Button variant="danger" onClick={ handleDelete }>
            <i className="bi bi-trash"></i>
        </Button>
    );
};

export default DeleteCell;