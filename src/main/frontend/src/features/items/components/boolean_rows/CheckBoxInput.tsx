import React, { useState } from "react";

type CheckBoxInputProps = {
  value: any;
  updateValue: React.Dispatch<React.SetStateAction<any>>;
  onBlur: () => any;
};

const CheckBoxInput = ({ value, updateValue, onBlur }: CheckBoxInputProps) => {
  const [checked, setChecked] = useState<boolean>(value === 1);

  const onChange = () => {
    setChecked(!checked);
    updateValue((prev: number) => (prev === 1 ? 0 : 1));
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default CheckBoxInput;
