import { AttributeForm } from "@type/schema/Type";
import React from "react";
import { Form } from "react-bootstrap";
import { Path, useFormContext } from "react-hook-form";

type TypeAttributeFormSelectProps = {
  path: Path<AttributeForm>;
  error?: string;
};

const TypeAttributeFormSelect = ({
  path,
  error,
}: TypeAttributeFormSelectProps) => {
  const { register } = useFormContext<AttributeForm>();

  return (
    <Form.Group>
      <Form.Select>
        {["STRING", "NUMBER", "BOOLEAN", "LIST"].map((dataType) => (
          <option
            value={
              dataType
            }>{`${dataType.charAt(0).toUpperCase()}${dataType.slice(1).toLowerCase()}`}</option>
        ))}
      </Form.Select>

      <Form.Control {...register(path)} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default TypeAttributeFormSelect;
