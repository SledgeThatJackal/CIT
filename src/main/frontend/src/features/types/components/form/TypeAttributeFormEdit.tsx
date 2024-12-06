import { AttributeForm } from "@type/schema/Type";
import React from "react";
import { Form } from "react-bootstrap";
import { Controller, Path, useFormContext } from "react-hook-form";

type TypeAttributeFormEditProps = {
  path: Path<AttributeForm>;
  error?: string;
  type?: string;
};

const TypeAttributeFormEdit = ({
  path,
  error,
  type = "text",
}: TypeAttributeFormEditProps) => {
  const { register, control } = useFormContext<AttributeForm>();

  switch (type) {
    case "checkbox":
      return (
        <Controller
          name={path}
          control={control}
          render={({ field }) => (
            <Form.Check
              type="checkbox"
              checked={field.value === 1}
              onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
            />
          )}
        />
      );

    default:
      return (
        <Form.Group>
          <Form.Control {...register(path)} type={type} />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
      );
  }
};

export default TypeAttributeFormEdit;
