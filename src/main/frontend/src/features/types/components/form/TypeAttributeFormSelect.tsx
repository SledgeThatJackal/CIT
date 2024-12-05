import { AttributeForm } from "@type/schema/Type";
import React from "react";
import { Form } from "react-bootstrap";
import { Path, useFormContext } from "react-hook-form";

type TypeAttributeFormSelectProps = {
  path: Path<AttributeForm>;
};

const TypeAttributeFormSelect = ({ path }: TypeAttributeFormSelectProps) => {
  const { register } = useFormContext<AttributeForm>();

  return (
    <Form.Select {...register(path)}>
      {["STRING", "NUMBER", "BOOLEAN", "LIST"].map((dataType) => (
        <option
          value={dataType}
          disabled={
            dataType === "LIST"
          }>{`${dataType.charAt(0).toUpperCase()}${dataType.slice(1).toLowerCase()}`}</option>
      ))}
    </Form.Select>
  );
};

export default TypeAttributeFormSelect;
