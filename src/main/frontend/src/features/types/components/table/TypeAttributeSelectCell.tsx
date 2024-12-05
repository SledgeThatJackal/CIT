import { useEditTypeAttribute } from "@type/services/mutation";
import { TypeAttribute } from "@schema/Types";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

type TypeAttributeSelectCellProps = {
  attributeKey: keyof TypeAttribute;
  fType: TypeAttribute;
};

const TypeAttributeSelectCell = ({
  attributeKey,
  fType,
}: TypeAttributeSelectCellProps) => {
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

  return (
    <React.Fragment>
      {isEditing ? (
        <Form.Select
          value={value}
          onBlur={handleOnBlur}
          onChange={(e) => setValue(e.target.value)}>
          {["STRING", "NUMBER", "BOOLEAN", "LIST"].map((dataType) => (
            <option
              value={dataType}
              disabled={
                dataType === "LIST"
              }>{`${dataType.charAt(0).toUpperCase()}${dataType.slice(1).toLowerCase()}`}</option>
          ))}
        </Form.Select>
      ) : (
        <div
          onDoubleClick={() =>
            setIsEditing(true)
          }>{`${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`}</div>
      )}
    </React.Fragment>
  );
};

export default TypeAttributeSelectCell;
