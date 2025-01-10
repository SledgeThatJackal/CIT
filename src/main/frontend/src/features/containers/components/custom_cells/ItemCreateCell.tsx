import ButtonCell from "@components/custom_cell_renderers/ButtonCell";
import { ContainerType } from "@container/schemas/Container";
import React from "react";

import "../../styles/ItemCreateModal.css";
import { useZipCreateState } from "@container/hooks/useZipCreateState";
import { Row, Table } from "@tanstack/react-table";

type ItemCreateCellProps = {
  row: Row<ContainerType>;
  table: Table<ContainerType>;
};

const ItemCreateCell = ({ row, table }: ItemCreateCellProps) => {
  const { openModal } = useZipCreateState();

  const removeContainers = (value: any) => {
    table.options.meta?.updateData(row.index, "images", value);
  };

  return (
    <React.Fragment>
      <ButtonCell
        title="Item Create"
        color="info"
        handleClick={() => openModal(row, removeContainers)}
        key={`containerItemCreateButton-${row.original.id}`}>
        <i className="bi bi-link" />
      </ButtonCell>
    </React.Fragment>
  );
};

export default ItemCreateCell;
