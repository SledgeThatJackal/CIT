import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type FormFloatingLabel<T extends FieldValues> = {
  register: UseFormRegister<T>;
  path: Path<T>;
  title?: string;
  errorMessage?: string;
  type?: string;
  required?: boolean;
};

const FormFloatingLabel = <T extends FieldValues>({
  register,
  path,
  title,
  errorMessage,
  type = "text",
  required = false,
}: FormFloatingLabel<T>) => {
  return (
    <Form.Group>
      <FloatingLabel label={title} controlId={`floatingInput-${path}`}>
        <Form.Control
          {...register(path)}
          type={type}
          required={required}
          isInvalid={!!errorMessage}
        />
        <Form.Control.Feedback
          type="invalid"
          className="rounded ps-1"
          style={{ background: "white" }}>
          {errorMessage}
        </Form.Control.Feedback>
      </FloatingLabel>
    </Form.Group>
  );
};

export default FormFloatingLabel;
