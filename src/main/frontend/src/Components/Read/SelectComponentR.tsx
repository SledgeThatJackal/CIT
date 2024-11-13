import React from "react";
import { Form } from "react-bootstrap";

type HasId = {
  id: number;
};

type SelectCompoentProps<T extends HasId> = {
  data?: T[];
  labelKey: keyof T;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const SelectComponentR = <T extends HasId>({
  data,
  labelKey,
  setValue,
}: SelectCompoentProps<T>) => {
  return (
    <Form.Select onChange={(e) => setValue(Number(e.target.value))}>
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

export default SelectComponentR;
