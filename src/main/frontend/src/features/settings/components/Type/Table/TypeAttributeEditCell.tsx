import React from "react";

type TypeAttributeEditCellProps = {
  typeText: string;
};

const TypeAttributeEditCell = ({ typeText }: TypeAttributeEditCellProps) => {
  return <div>{typeText}</div>;
};

export default TypeAttributeEditCell;
