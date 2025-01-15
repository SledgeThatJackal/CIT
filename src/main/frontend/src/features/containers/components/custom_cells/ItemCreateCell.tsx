import ButtonCell from "@components/custom_cell_renderers/ButtonCell";
import { ContainerType } from "@container/schemas/Container";
import React, { useEffect } from "react";

import "../../styles/ItemCreateModal.css";
import { useZipCreateState } from "@container/hooks/useZipCreateState";
import { DisplayCell } from "@schema/General";

const ItemCreateCell = ({ row }: DisplayCell<ContainerType>) => {
  const { showModal, openModal, setRow } = useZipCreateState();

  useEffect(() => {
    if (showModal) {
      setRow(row);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  return (
    <React.Fragment>
      <ButtonCell
        title="Item Create"
        color="info"
        handleClick={() => openModal(row)}
        key={`containerItemCreateButton-${row.original.id}`}>
        <i className="bi bi-link" />
      </ButtonCell>
    </React.Fragment>
  );
};

export default ItemCreateCell;
