import React from "react";
import { Button } from "react-bootstrap";
import { useDeleteModalState } from "@hooks/state/useDeleteModalState";
import { CellContext } from "@tanstack/react-table";

const DeleteCell = <T, S extends number>({ getValue }: CellContext<T, S>) => {
  const { setShowModal, setDeleteId } = useDeleteModalState();

  const handleDelete = () => {
    setShowModal(true);
    setDeleteId(getValue());
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      <i className="bi bi-trash"></i>
    </Button>
  );
};

export default DeleteCell;
