import BooleanReadRow from "@components/custom_cell_renderers/BooleanReadRow";
import ReadRow from "@components/custom_cell_renderers/ReadRow";
import CheckBoxInput from "@item/components/boolean_rows/CheckBoxInput";
import { ItemAttribute } from "@item/schemas/Item";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { TypeAttribute } from "@schema/Types";

type EditCellWProps<T> = {
  initialElement: T;
  handleEdit: (data: T, value: string | number) => void;
  defaultValue?: string | number;
  typeKey?: keyof T;
};

const EditCellW = <T extends ItemAttribute | TypeAttribute>({
  initialElement,
  handleEdit,
  defaultValue = "",
  typeKey,
}: EditCellWProps<T>) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [value, setValue] = useState<string | number>(defaultValue);

  const type = useRef(
    ((typeKey ? initialElement[typeKey] : initialElement) as TypeAttribute)
      .dataType,
  );

  const handleBlur = () => {
    if (!isCancelled) {
      handleEdit(initialElement, value);
    }

    setIsCancelled(false);
    setIsEditing(false);
  };

  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      handleBlur();
    }

    if (key === "Escape") {
      setIsCancelled(true);
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setIsCancelled(false);
  };

  switch (type.current) {
    case "BOOLEAN":
      return (
        <React.Fragment>
          {isEditing ? (
            <CheckBoxInput
              value={value}
              updateValue={setValue}
              onBlur={handleBlur}
            />
          ) : (
            <BooleanReadRow
              value={value}
              handleDoubleClick={handleDoubleClick}
            />
          )}
        </React.Fragment>
      );

    default:
      return (
        <React.Fragment>
          {isEditing ? (
            <Form.Control
              type={type.current?.startsWith("S") ? "text" : "number"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => handleKeyDown(e.key)}
              autoFocus
            />
          ) : (
            <ReadRow value={value} handleDoubleClick={handleDoubleClick} />
          )}
        </React.Fragment>
      );
  }
};

export default EditCellW;
