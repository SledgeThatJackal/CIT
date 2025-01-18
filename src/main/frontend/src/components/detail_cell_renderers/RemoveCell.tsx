/* eslint-disable @typescript-eslint/no-unused-vars */
import { useModalState } from "@hooks/state/useModalState";
import { useDeleteLink } from "@services/mutations";
import { CellContext } from "@tanstack/react-table";
import React from "react";
import { CloseButton } from "react-bootstrap";

const RemoveCell = <T, S extends number>({
  getValue,
  table,
}: CellContext<T, S>) => {
  const deleteLinkMutation = useDeleteLink();
  const { openMessageModal } = useModalState();

  const handleClick = () => {
    openMessageModal(
      "Delete Link",
      "Delete",
      () => deleteLinkMutation.mutate(getValue()),
      "Are you sure you want to remove this link?",
    );
  };

  return (
    <div style={{ padding: 0, display: "flex", justifyContent: "center" }}>
      <CloseButton variant="white" onClick={handleClick} />
    </div>
  );
};

export default RemoveCell;
