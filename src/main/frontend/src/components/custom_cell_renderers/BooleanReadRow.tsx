import React, { useMemo } from "react";

type ReadRowProps = {
  value: string | number;
  handleDoubleClick: () => void;
};

const BooleanReadRow = (props: ReadRowProps) => {
  const display = useMemo(() => {
    const value = String(props.value === 1);
    return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
  }, [props.value]);

  return (
    <div
      title="Double Click to Edit"
      className="align-middle"
      style={{ ...(!props.value && { height: "20px" }) }}
      onDoubleClick={props.handleDoubleClick}>
      {display}
    </div>
  );
};

export default BooleanReadRow;
