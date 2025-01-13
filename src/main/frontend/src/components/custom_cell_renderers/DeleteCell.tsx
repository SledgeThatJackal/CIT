import React from "react";
import { useDeleteModalState } from "@hooks/state/useDeleteModalState";
import { CellContext } from "@tanstack/react-table";
import ButtonCell from "./ButtonCell";

const DeleteCell = <T, S extends number>({ getValue }: CellContext<T, S>) => {
  const { setShowModal, setDeleteId } = useDeleteModalState();

  const handleDelete = () => {
    setShowModal(true);
    setDeleteId(getValue());
  };

  return (
    <ButtonCell title="Delete" color="danger" handleClick={handleDelete}>
      <i className="bi bi-trash" />
    </ButtonCell>
  );
};

export default DeleteCell;
