import { useDeleteModalState } from "@hooks/state/useDeleteModalState";
import { Button } from "react-bootstrap";
import React from "react";

type DeleteCellProps = {
  id: number;
};

const DeleteCell = ({ id }: DeleteCellProps) => {
  const { setShowModal, setDeleteId } = useDeleteModalState();

  const handleDelete = () => {
    setShowModal(true);
    setDeleteId(id);
  };

  return (
    <Button title="Delete" variant="danger" size="sm" onClick={handleDelete}>
      <i className="bi bi-trash" />
    </Button>
  );
};

export default DeleteCell;
