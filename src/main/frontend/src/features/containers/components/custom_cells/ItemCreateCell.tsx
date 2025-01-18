import { ContainerType } from "@container/schemas/Container";
import React, { useEffect } from "react";

import "../../styles/ItemCreateModal.css";
import { useZipCreateState } from "@container/hooks/useZipCreateState";
import { DisplayCell } from "@schema/General";
import { Button } from "react-bootstrap";

const ItemCreateCell = ({ row }: DisplayCell<ContainerType>) => {
  const { showModal, openModal, setRow } = useZipCreateState();

  useEffect(() => {
    if (showModal) {
      setRow(row);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  return (
    <Button
      title="Item Create"
      variant="info"
      onClick={() => openModal(row)}
      size="sm"
      key={`containerItemCreateButton-${row.original.id}`}>
      <i className="bi bi-link" />
    </Button>
  );
};

export default ItemCreateCell;
