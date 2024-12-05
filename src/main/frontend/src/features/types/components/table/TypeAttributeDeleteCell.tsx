import React from "react";
import { Button } from "react-bootstrap";

type TypeAttributeDeleteCellProps = {
  handleDelete: () => void;
};

const TypeAttributeDeleteCell = ({
  handleDelete,
}: TypeAttributeDeleteCellProps) => {
  return (
    <Button
      variant="danger"
      size="sm"
      className="mt-1 mb-1"
      onClick={handleDelete}>
      <i className="bi bi-trash"></i>
    </Button>
  );
};

export default TypeAttributeDeleteCell;
