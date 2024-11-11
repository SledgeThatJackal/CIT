import { CellContext } from "@tanstack/react-table";
import React from "react";
import { CloseButton } from "react-bootstrap";

const RemoveCell = <T, S extends number>({
  getValue,
  table,
}: CellContext<T, S>) => {
  const handleDelete = () => {
    table.options.meta?.handleRemove?.(getValue());
  };

  return <CloseButton onClick={handleDelete} />;
};

export default RemoveCell;
