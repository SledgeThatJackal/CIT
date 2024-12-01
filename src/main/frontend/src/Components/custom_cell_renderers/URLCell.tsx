import React, { useEffect, useState } from "react";
import { CellContext } from "@tanstack/react-table";
import { Form } from "react-bootstrap";
import ReadRow from "./ReadRow";

const URLCell = <T, S extends string | undefined>({
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

  const handleEnter = (event: React.KeyboardEvent<any>) => {
    if (event.key === "Enter") {
      onBlur();
    }

    if (event.key === "Escape") {
      setIsCancelled(true);
      setIsEditing(false);
    }
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setIsEditing(true);
    setIsCancelled(false);
  };

  return (
    <>
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
        <div
          title="Right Click to Edit"
          className="text-center"
          style={{ ...(!value && { height: "20px" }) }}
          onContextMenu={handleContextMenu}>
          {value.length > 0 && (
            <a href={value} target="_blank" rel="noopener noreferrer">
              Link
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default URLCell;
