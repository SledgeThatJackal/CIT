import React from "react";
import DuplicateCell from "./DuplicateCell";
import ItemCreateCell from "./ItemCreateCell";
import { DisplayCell } from "@schema/General";
import { ContainerType } from "@container/schemas/Container";
import DetailCell from "../../../../components/detail_cell_renderers/DetailCell";
import { useDeleteModalState } from "@hooks/state/useDeleteModalState";
import { Button, Container } from "react-bootstrap";

import "@container/styles/ActionsCell.css";

const ActionsCell = ({ row }: DisplayCell<ContainerType>) => {
  return (
    <Container fluid className="actions-container">
      <DetailCell row={row} />
      <DuplicateCell row={row} />
      <ItemCreateCell row={row} />
      <DeleteCell id={row.original.id} />
    </Container>
  );
};

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

export default ActionsCell;
