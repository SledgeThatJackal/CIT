/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDeleteLink } from "@services/mutations";
import { CellContext } from "@tanstack/react-table";
import React from "react";
import { CloseButton } from "react-bootstrap";

const RemoveCell = <T, S extends number>({
  getValue,
  table,
}: CellContext<T, S>) => {
  const deleteLinkMutation = useDeleteLink();

  const handleClick = () => {
    deleteLinkMutation.mutate(getValue());
  };

  return (
    <div style={{ padding: 0, display: "flex", justifyContent: "center" }}>
      <CloseButton variant="white" onClick={handleClick} />
    </div>
  );
};

export default RemoveCell;
