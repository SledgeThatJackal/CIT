import React from "react";
import { Button } from "react-bootstrap";

const TypeAttributeDeleteCell = () => {
  return (
    <Button variant="danger" size="sm" className="mt-1 mb-1">
      <i className="bi bi-trash"></i>
    </Button>
  );
};

export default TypeAttributeDeleteCell;
