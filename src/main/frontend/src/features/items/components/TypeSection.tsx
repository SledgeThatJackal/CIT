import { useTypeAttributes } from "@services/queries";
import React from "react";
import { Container } from "react-bootstrap";

const TypeSection = () => {
  const typeAttrQuery = useTypeAttributes().data;

  return (
    <Container>
      {typeAttrQuery &&
        typeAttrQuery.map((typeAttr) => (
          <div key={`type-${typeAttr.id}`}>{typeAttr.columnTitle}</div>
        ))}
    </Container>
  );
};

export default TypeSection;
