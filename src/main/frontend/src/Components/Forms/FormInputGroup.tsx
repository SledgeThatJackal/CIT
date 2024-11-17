import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type FormInputGroupProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  path: Path<T>;
  title?: string;
};

const FormInputGroup = <T extends FieldValues>({
  register,
  path,
  title,
}: FormInputGroupProps<T>) => {
  return (
    <InputGroup>
      <InputGroup.Text>{title}</InputGroup.Text>
      <Form.Control {...register(path)} type="text" />
    </InputGroup>
  );
};

export default FormInputGroup;
