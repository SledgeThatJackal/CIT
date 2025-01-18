import React from "react";
import { Form } from "react-bootstrap";

type HasId = {
  id: number;
};

type SelectCompoentProps<T extends HasId> = {
  data?: T[];
  labelKey: keyof T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  onBlur?: () => void;
  isDisabled?: boolean;
  initialValue?: number;
};

const SelectComponentW = <T extends HasId>({
  data,
  labelKey,
  setValue,
  onBlur,
  isDisabled = false,
  initialValue,
}: SelectCompoentProps<T>) => {
  return (
    <Form.Select
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={onBlur}
      disabled={isDisabled}
      defaultValue={initialValue}>
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
