import React from "react";
import { Form } from "react-bootstrap";
import { Path, useFormContext } from "react-hook-form";

type TypeAttributeFormEditProps = {
  path: Path<any>;
};

const TypeAttributeFormEdit = ({ path }: TypeAttributeFormEditProps) => {
  const { register } = useFormContext();

  return <Form.Control {...register(path)} />;
};

export default TypeAttributeFormEdit;
