import React, { useState } from "react";
import ReadRow from "./ReadRow";
import { CellContext } from "@tanstack/react-table";

const BooleanCell = <T, S extends boolean>({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<T, S>) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
    table.options.meta?.updateData(index, id, e.target.checked);

    setIsEditing(false);
  };

  return (
    <React.Fragment>
      {isEditing ? (
        <input
          type="checkbox"
          autoFocus
          onBlur={handleBlur}
          defaultChecked={getValue()}
        />
      ) : (
        <ReadRow
          handleDoubleClick={() => setIsEditing(true)}
          value={getValue() ? "True" : "False"}
        />
      )}
    </React.Fragment>
  );
};

export default BooleanCell;
