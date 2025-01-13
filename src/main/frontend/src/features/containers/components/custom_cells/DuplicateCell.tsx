import { useCanvasState } from "@hooks/state/useCanvasState";
import { useActionState } from "@item/hooks/useActionState";
import React from "react";
import ContainerCreate from "../ContainerCreate";
import { ContainerType } from "@container/schemas/Container";
import { DisplayCell } from "@schema/General";
import ButtonCell from "@components/custom_cell_renderers/ButtonCell";

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
    <ButtonCell
      title="Duplicate"
      color="secondary"
      handleClick={handleDuplicate}>
      <i className="bi bi-clipboard" />
    </ButtonCell>
  );
};

export default DuplicateCell;
