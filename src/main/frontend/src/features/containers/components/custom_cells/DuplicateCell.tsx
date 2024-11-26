import { useCanvasState } from "@hooks/state/useCanvasState";
import { useActionState } from "@item/hooks/useActionState";
import React from "react";
import { Button, Container } from "react-bootstrap";
import ContainerCreate from "../ContainerCreate";
import { Row } from "@tanstack/react-table";
import { ContainerType } from "@container/schemas/Container";

type DeleteCellProps = {
  row: Row<ContainerType>;
};

const DuplicateCell = ({ row }: DeleteCellProps) => {
  const { updateContainerAction } = useActionState();
  const { openCanvas } = useCanvasState();

  const handleDuplicate = () => {
    openCanvas(
      ContainerCreate,
      "bottom",
      `Duplicating: ${row.getValue("name")}`,
    );

    updateContainerAction(row.original);
  };

  return (
    <Container fluid className="p-0 m-0 w-100 d-flex justify-content-center">
      <Button onClick={handleDuplicate} variant="secondary" title="Duplicate">
        <i className="bi bi-clipboard" />
      </Button>
    </Container>
  );
};

export default DuplicateCell;
