import React from "react";

type ReadRowProps = {
  value: string;
  handleDoubleClick: () => void;
};

const ReadRow = (props: ReadRowProps) => {
  return (
    <div
      title="Double Click to Edit"
      style={{ ...(!props.value && { height: "20px" }) }}
      onDoubleClick={props.handleDoubleClick}>
      {props.value}
    </div>
  );
};

export default ReadRow;
