import { Row } from "@tanstack/react-table";
import React from "react";
import { Button, InputGroup } from "react-bootstrap";
import { Item } from "../../schemas/Item";
import { useActionState } from "../../hooks/useActionState";
import { useCanvasState } from "@hooks/state/useCanvasState";
import LinkBox from "../LinkBox";
import CreateBox from "../CreateBox";

type ActionButtonsProps = {
  table: any;
  row: Row<Item>;
};

const ActionButtons = ({ row }: ActionButtonsProps) => {
  const { callerId, updateItemAction, clearAction } = useActionState();
  const { openCanvas, closeCanvas } = useCanvasState();

  const isActive = callerId === row.getValue("id");

  const handleOpen = () => {
    openCanvas(LinkBox, "bottom", `Editing: ${row.getValue("name")}`);

    updateItemAction(row.original, row.getValue("id"));
  };

  const handleDuplicate = () => {
    openCanvas(CreateBox, "bottom", `Duplicating: ${row.getValue("name")}`);

    updateItemAction(row.original);
  };

  const handleClose = () => {
    closeCanvas();
    clearAction();
  };

  return (
    <InputGroup className="p-0 m-0 w-100 d-flex justify-content-center">
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
      {isActive ? (
        <Button variant="info" size="sm" onClick={handleClose} title="Close">
          ●
        </Button>
      ) : (
        <Button
          variant="success"
          size="sm"
          onClick={handleOpen}
          title="Edit Containers">
          +
        </Button>
      )}
    </InputGroup>
  );
};

export default ActionButtons;
