import { Row } from "@tanstack/react-table";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Item } from "../../schemas/Item";
import { useActionState } from "../../hooks/useActionState";
import { useCanvasState } from "@hooks/state/useCanvasState";
import LinkBox from "../LinkBox";
import CreateBox from "../CreateBox";

import "@styles/ActionsCell.css";
import DeleteCell from "@components/write/DeleteCell";
import DetailCell from "@components/detail_cell_renderers/DetailCell";

type ActionButtonsProps = {
  table: unknown;
  row: Row<Item>;
};

const ActionButtons = ({ row }: ActionButtonsProps) => {
  const { updateItemAction } = useActionState();
  const { openCanvas } = useCanvasState();

  const handleOpen = () => {
    openCanvas(LinkBox, "bottom", `Editing: ${row.getValue("name")}`);

    updateItemAction(row.original, row.getValue("id"));
  };

  const handleDuplicate = () => {
    openCanvas(CreateBox, "bottom", `Duplicating: ${row.getValue("name")}`);

    updateItemAction(row.original);
  };

  return (
    <Container className="actions-container">
      <DetailCell row={row} />
      <Button
        size="sm"
        {...{ onClick: row.getToggleExpandedHandler() }}
        disabled={!row.getCanExpand()}
        title={row.getIsExpanded() ? "Collapse" : "Expand"}>
        {row.getIsExpanded() ? "▲" : "▼"}
      </Button>
      <Button
        onClick={handleDuplicate}
        size="sm"
        variant="secondary"
        title="Duplicate">
        <i className="bi bi-clipboard" />
      </Button>
      <Button
        variant="warning"
        size="sm"
        onClick={handleOpen}
        title="Edit Containers">
        <i className="bi bi-pencil" />
      </Button>
      <DeleteCell id={row.getValue("id")} />
    </Container>
  );
};

export default ActionButtons;
