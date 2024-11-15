import React from "react";
import { Form } from "react-bootstrap";

type HasId = {
  id: number;
};

type SelectCompoentProps<T extends HasId> = {
  data?: T[];
  labelKey: keyof T;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  onBlur?: () => void;
};

const SelectComponentW = <T extends HasId>({
  data,
  labelKey,
  setValue,
  onBlur,
}: SelectCompoentProps<T>) => {
  return (
    <Form.Select
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={onBlur}>
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
            </option>
          ))
      ) : (
        <option value={undefined}>Nothing Found</option>
      )}
    </Form.Select>
  );
};

export default SelectComponentW;
