import React, { useEffect, useState } from "react";
import { CellContext } from "@tanstack/react-table";
import { Form } from "react-bootstrap";
import ReadRow from "./ReadRow";

const EditCell = <T, S extends string | number | undefined>({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<T, S>) => {
  const initialValue = getValue()?.toString() ?? "";

  const [value, setValue] = useState<string>(initialValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = async () => {
    if (!isCancelled) {
      table.options.meta?.updateData(index, id, value);
    }

    setIsEditing(false);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleEnter = (event: React.KeyboardEvent<unknown>) => {
    if (event.key === "Enter") {
      onBlur();
    }

    if (event.key === "Escape") {
      setIsCancelled(true);
      setIsEditing(false);
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setIsCancelled(false);
  };

  return (
    <React.Fragment key={`editCell-${id}-${index}`}>
      {isEditing ? (
        <Form.Control
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={handleEnter}
          autoFocus
        />
      ) : (
        <ReadRow value={value} handleDoubleClick={handleDoubleClick} />
      )}
    </React.Fragment>
  );
};

export default EditCell;
