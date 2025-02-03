import React from "react";
import DuplicateCell from "./DuplicateCell";
import ItemCreateCell from "./ItemCreateCell";
import { DisplayCell } from "@schema/General";
import { ContainerType } from "@container/schemas/Container";
import DetailCell from "../../../../components/detail_cell_renderers/DetailCell";
import { Container } from "react-bootstrap";

import "@styles/ActionsCell.css";
import DeleteCell from "@components/write/DeleteCell";
import DescendantCell from "./DescendantCell";

const ActionsCell = ({ row }: DisplayCell<ContainerType>) => {
  return (
    <Container fluid className="actions-container">
      <DetailCell row={row} />
      <DuplicateCell row={row} />
      <ItemCreateCell row={row} />
      <DescendantCell id={row.original.id} />
      <DeleteCell id={row.original.id} />
    </Container>
  );
};

export default ActionsCell;
