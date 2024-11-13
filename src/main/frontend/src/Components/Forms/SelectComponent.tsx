import React from "react";
import { Form } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type HasId = {
  id: number;
};

type SelectCompoentProps<T extends HasId, S extends FieldValues> = {
  data?: T[];
  labelKey: keyof T;
  valueKey?: keyof T;
  register: UseFormRegister<S>;
  registerKey: Path<S>;
};

const SelectComponent = <T extends HasId, S extends FieldValues>({
  data,
  labelKey,
  valueKey,
  register,
  registerKey,
}: SelectCompoentProps<T, S>) => {
  return (
    <Form.Select {...register(registerKey)}>
      {data ? (
        data
          .sort((a, b) =>
            String(a[labelKey]).localeCompare(String(b[labelKey])),
          )
          .map((element) => (
            <option
              key={`select-${String(element[labelKey])}-${element.id}`}
              value={element.id}>
              {String(element[labelKey])}
              {valueKey ? `(${String(element[valueKey])})` : ""}
            </option>
          ))
      ) : (
        <option value={undefined}>Nothing Found</option>
      )}
    </Form.Select>
  );
};

export default SelectComponent;
