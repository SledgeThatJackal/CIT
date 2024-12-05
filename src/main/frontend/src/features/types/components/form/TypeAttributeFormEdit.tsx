import { AttributeForm } from "@type/schema/Type";
import React from "react";
import { Form } from "react-bootstrap";
import { Path, useFormContext } from "react-hook-form";

type TypeAttributeFormEditProps = {
  path: Path<AttributeForm>;
  error?: string;
};

const TypeAttributeFormEdit = ({ path, error }: TypeAttributeFormEditProps) => {
  const { register } = useFormContext<AttributeForm>();

  return (
    <Form.Group>
      <Form.Control {...register(path)} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default TypeAttributeFormEdit;
