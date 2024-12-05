import React from "react";
import { Button, Container } from "react-bootstrap";
import { useDeleteModalState } from "@hooks/state/useDeleteModalState";
import { CellContext } from "@tanstack/react-table";

const DeleteCell = <T, S extends number>({ getValue }: CellContext<T, S>) => {
  const { setShowModal, setDeleteId } = useDeleteModalState();

  const handleDelete = () => {
    setShowModal(true);
    setDeleteId(getValue());
  };

  return (
    <Container fluid className="p-0 m-0 w-100 d-flex justify-content-center">
      <Button variant="danger" onClick={handleDelete} title="Delete">
        <i className="bi bi-trash"></i>
      </Button>
    </Container>
  );
};

export default DeleteCell;
