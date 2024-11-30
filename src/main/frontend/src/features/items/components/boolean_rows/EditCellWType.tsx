import BooleanReadRow from "@components/custom_cell_renderers/BooleanReadRow";
import ReadRow from "@components/custom_cell_renderers/ReadRow";
import CheckBoxInput from "@item/components/boolean_rows/CheckBoxInput";
import { ItemAttribute } from "@item/schemas/Item";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { alterItemAttribute } from "./AlteredItemAttribute";

type EditCellWProps = {
  initialElement: ItemAttribute;
  handleEdit: (data: ItemAttribute) => void;
};

const EditCellW = ({ initialElement, handleEdit }: EditCellWProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [value, setValue] = useState<string | number>(
    initialElement.stringValue || initialElement.numberValue || "",
  );

  const type = useRef(initialElement?.typeAttribute.dataType);

  const handleBlur = () => {
    if (!isCancelled) {
      const updatedElement = alterItemAttribute(initialElement, value);

      handleEdit(updatedElement);
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

  return (
    <React.Fragment>
      {isEditing ? (
        type.current?.startsWith("B") ? (
          <CheckBoxInput
            value={value}
            updateValue={setValue}
            onBlur={handleBlur}
          />
        ) : (
          <Form.Control
            type={type.current?.startsWith("S") ? "text" : "number"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e.key)}
            autoFocus
          />
        )
      ) : type.current?.startsWith("B") ? (
        <BooleanReadRow value={value} handleDoubleClick={handleDoubleClick} />
      ) : (
        <ReadRow value={value} handleDoubleClick={handleDoubleClick} />
      )}
    </React.Fragment>
  );
};

export default EditCellW;
