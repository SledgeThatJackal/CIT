import { useModalState } from "@hooks/state/useModalState";
import React from "react";
import { Button } from "react-bootstrap";
import AddDescendants from "../descendants/AddDescendants";
import { DisplayCell } from "@schema/General";
import { ContainerType } from "@container/schemas/Container";
import { useDescendantCellState } from "@container/hooks/useDescendantCellState";
import { useAddDescendants } from "@container/services/mutation";

const DescendantCell = ({ row }: DisplayCell<ContainerType>) => {
  const { openElementModal } = useModalState();
  const addDescendantsMutation = useAddDescendants();

  const handleClick = () => {
    openElementModal(
      `Add Descendants to ${row.original.scannerId} (${row.original.name})`,
      "Add",
      handleSubmit,
      AddDescendants,
      { id: row.original.id, condition: row.original.isArea },
      "info",
    );
  };

  const handleSubmit = () => {
    const ids = useDescendantCellState.getState().orphans;

    const containers = {
      parentId: row.original.id,
      ids,
    };

    addDescendantsMutation.mutate(containers);
  };

  return (
    <Button onClick={handleClick} size="sm" title="Add Descendants">
      <i className="bi bi-folder-plus" />
    </Button>
  );
};

export default DescendantCell;
