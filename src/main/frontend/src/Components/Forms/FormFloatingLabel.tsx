import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type FormFloatingLabel<T extends FieldValues> = {
  register: UseFormRegister<T>;
  path: Path<T>;
  title?: string;
  errorMessage?: string;
};

const FormFloatingLabel = <T extends FieldValues>({
  register,
  path,
  title,
  errorMessage,
}: FormFloatingLabel<T>) => {
  return (
    <Form.Group>
      <FloatingLabel label={title} controlId="floatingInput">
        <Form.Control {...register(path)} type="text" />
      </FloatingLabel>
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormFloatingLabel;
