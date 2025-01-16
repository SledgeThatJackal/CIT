/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUpdateQuantity } from "@services/mutations";
import { CellContext } from "@tanstack/react-table";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

type hasId = {
  id: number;
};

const NumberCell = <T extends hasId, S extends number>({
  getValue,
  row,
}: CellContext<T, S>) => {
  const initialValue = getValue();

  const [value, setValue] = useState<number>(initialValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const updateQuantityMutation = useUpdateQuantity();

  const handleBlur = () => {
    updateQuantityMutation.mutate({ quantity: value, id: row.original.id });
    setIsEditing(false);
  };

  return (
    <React.Fragment>
      {isEditing ? (
        <Form.Control
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onBlur={handleBlur}
          autoFocus
          type="number"
        />
      ) : (
        <div
          title="Double Click to Edit"
          className="text-center"
          style={{ height: "20px", padding: 0 }}
          onDoubleClick={() => setIsEditing(true)}>
          {value}
        </div>
      )}
    </React.Fragment>
  );
};

export default NumberCell;
