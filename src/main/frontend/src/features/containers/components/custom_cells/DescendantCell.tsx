import { useModalState } from "@hooks/state/useModalState";
import React from "react";
import { Button } from "react-bootstrap";
import AddDescendants from "../descendants/AddDescendants";

const DescendantCell = ({ id }: { id: number }) => {
  const { openElementModal } = useModalState();

  const handleClick = () => {
    openElementModal("Add Descendants", "Add", () => "", AddDescendants, id);
  };

  return (
    <Button onClick={handleClick} size="sm" title="Add Descendants">
      <i className="bi bi-folder-plus" />
    </Button>
  );
};

export default DescendantCell;
