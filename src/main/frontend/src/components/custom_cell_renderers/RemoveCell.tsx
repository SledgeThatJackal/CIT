import { useDeleteModalState } from "@hooks/state/useDeleteModalState";
import { useModalState } from "@hooks/state/useModalState";
import { CellContext } from "@tanstack/react-table";
import React from "react";
import { CloseButton } from "react-bootstrap";

const RemoveCell = <T, S extends number>({
  getValue,
  table,
}: CellContext<T, S>) => {
  const { openMessageModal } = useModalState();

  const handleDelete = () => {
    table.options.meta?.handleRemove?.(getValue());
  };

  const onDelete = () => {
    openMessageModal(
      `Remove Link`,
      "Remove",
      handleDelete,
      "Are you sure you want to remove this link?",
    );
  };

  return <CloseButton onClick={onDelete} />;
};

export default RemoveCell;
