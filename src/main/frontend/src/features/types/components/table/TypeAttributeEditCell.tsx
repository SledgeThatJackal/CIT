import { useEditTypeAttribute } from "@type/services/mutation";
import { TypeAttribute } from "@schema/Types";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

type TypeAttributeEditCellProps = {
  attributeKey: keyof TypeAttribute;
  fType: TypeAttribute;
};

const TypeAttributeEditCell = ({
  attributeKey,
  fType,
}: TypeAttributeEditCellProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(String(fType[attributeKey]));

  const updateAttributeMutation = useEditTypeAttribute();

  const handleOnBlur = () => {
    const updatedValue = {
      ...fType,
      [attributeKey]: value,
    };

    updateAttributeMutation.mutate(updatedValue);

    setIsEditing(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleOnBlur();
    } else if (event.key === "Escape") {
      setIsEditing(false);
      setValue(String(fType[attributeKey]));
    }
  };

  return (
    <React.Fragment>
      {isEditing ? (
        <Form.Control
          onBlur={handleOnBlur}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          value={value}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div
          onDoubleClick={() => setIsEditing(true)}
          style={value.localeCompare("null") === -1 ? {} : { height: "20px" }}>
          {value.localeCompare("null") === -1 ? value : ""}
        </div>
      )}
    </React.Fragment>
  );
};

export default TypeAttributeEditCell;
