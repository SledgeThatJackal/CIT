import { useCanvasState } from "@hooks/state/useCanvasState";
import { useActionState } from "@item/hooks/useActionState";
import React from "react";
import ContainerCreate from "../ContainerCreate";
import { ContainerType } from "@container/schemas/Container";
import { DisplayCell } from "@schema/General";
import { Button } from "react-bootstrap";

const DuplicateCell = ({ row }: DisplayCell<ContainerType>) => {
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
    <Button
      title="Duplicate"
      variant="secondary"
      size="sm"
      onClick={handleDuplicate}>
      <i className="bi bi-clipboard" />
    </Button>
  );
};

export default DuplicateCell;
