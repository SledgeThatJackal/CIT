import React, { useEffect, useMemo, useRef, useState } from "react";
import { CellContext } from "@tanstack/react-table";
import { Form } from "react-bootstrap";
import ReadRow from "@components/custom_cell_renderers/ReadRow";
import { Item, ItemAttribute } from "@item/schemas/Item";
import { alterItemAttribute } from "../boolean_rows/AlteredItemAttribute";
import CheckBoxInput from "../boolean_rows/CheckBoxInput";
import BooleanReadRow from "@components/custom_cell_renderers/BooleanReadRow";

const TypeEditCell = ({
  getValue,
  row,
  column: { id },
  table,
}: CellContext<Item, any>) => {
  const initialValue = getValue();

  const [value, setValue] = useState<string | number>(initialValue);

  const oldItemAttribute = useMemo<ItemAttribute | undefined>(() => {
    const columnId = parseInt(id.replace(/.*?(\d+)$/, "$1"));
    return row.original.itemAttributes.find(
      (itemAttribute) => itemAttribute.typeAttribute.id === columnId,
    );
  }, [getValue()]);

  const type = useRef(oldItemAttribute?.typeAttribute.dataType);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = async () => {
    if (!isCancelled) {
      if (!oldItemAttribute) {
        return;
      }

      const itemAttr = alterItemAttribute(oldItemAttribute, value);

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
        type.current?.charAt(0) === "B" ? (
          <CheckBoxInput value={value} updateValue={setValue} onBlur={onBlur} />
        ) : (
          <Form.Control
            type={type.current?.charAt(0) === "S" ? "text" : "number"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={handleEnter}
            autoFocus
          />
        )
      ) : type.current?.charAt(0) === "B" ? (
        <BooleanReadRow value={value} handleDoubleClick={handleDoubleClick} />
      ) : (
        <ReadRow value={value} handleDoubleClick={handleDoubleClick} />
      )}
    </>
  );
};

export default TypeEditCell;
