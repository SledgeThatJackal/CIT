import React from "react";
import { CellContext } from "@tanstack/react-table";
import { ZodItemType } from "@schema/General";
import { Button } from "react-bootstrap";
import { useCanvasState } from "@hooks/state/useCanvasState";
import ItemAttributeSection from "../type_area/ItemAttributeSection";
import { useAttributeState } from "@item/hooks/useAttributeState";
import SelectCell from "@components/custom_cell_renderers/SelectCell";

const TypeCell = <T, S extends ZodItemType>(context: CellContext<T, S>) => {
  const { openCanvas } = useCanvasState();
  const { setContext } = useAttributeState();

  const handleClick = () => {
    openCanvas(ItemAttributeSection, "end", "Item Attributes");
    setContext(context);
  };

  return (
    <React.Fragment>
      {context.getValue().id !== -1 ? (
        <div className="d-flex justify-content-center">
          <Button variant="outline-light" onClick={handleClick}>
            {context.getValue().name}
          </Button>
        </div>
      ) : (
        <SelectCell {...context} />
      )}
    </React.Fragment>
  );
};

export default TypeCell;
