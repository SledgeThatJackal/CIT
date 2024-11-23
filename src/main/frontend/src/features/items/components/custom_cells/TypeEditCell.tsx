import React, { useEffect, useState } from "react";
import { CellContext } from "@tanstack/react-table";
import { Form } from "react-bootstrap";
import ReadRow from "@components/custom_cell_renderers/ReadRow";
import { Item } from "@item/schemas/Item";

const TypeEditCell = ({
  getValue,
  row,
  column: { id },
  table,
}: CellContext<Item, string>) => {
  const initialValue = getValue()?.toString() ?? "";

  const [value, setValue] = useState<string>(initialValue);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = async () => {
    if (!isCancelled) {
      const itemAttr = {
        ...row.original.itemAttributes[Number(id.charAt(id.length - 1))],
        value: value,
      };

      table.options.meta?.updateItemAttribute?.(itemAttr);
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

  const handleDoubleClick = () => {
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
        <ReadRow value={value} handleDoubleClick={handleDoubleClick} />
      )}
    </>
  );
};

export default TypeEditCell;
