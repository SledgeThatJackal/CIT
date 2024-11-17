import React from "react";
import { CloseButton } from "react-bootstrap";

type TypeAttributeFormDeleteProps = {
  handleRemove: () => void;
};

const TypeAttributeFormDelete = ({
  handleRemove,
}: TypeAttributeFormDeleteProps) => {
  return <CloseButton onClick={handleRemove} />;
};

export default TypeAttributeFormDelete;
