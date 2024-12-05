import ReadRow from "@components/custom_cell_renderers/ReadRow";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

type EditCellWProps<T> = {
  initialElement: T;
  elementKey: keyof T;
  handleEdit: (data: T) => void;
};

const EditCellW = <T,>({
  initialElement,
  elementKey,
  handleEdit,
}: EditCellWProps<T>) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [value, setValue] = useState<string>(
    String(initialElement[elementKey]),
  );

  const handleBlur = () => {
    if (!isCancelled) {
      const updatedElement = {
        ...initialElement,
        [elementKey]: value,
      };

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

  return (
    <React.Fragment>
      {isEditing ? (
        <Form.Control
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e.key)}
          autoFocus
        />
      ) : (
        <ReadRow
          value={String(initialElement[elementKey])}
          handleDoubleClick={() => setIsEditing(true)}
        />
      )}
    </React.Fragment>
  );
};

export default EditCellW;
