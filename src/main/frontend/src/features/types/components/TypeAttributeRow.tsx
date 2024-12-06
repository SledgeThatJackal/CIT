import { TypeAttribute } from "@schema/Types";
import React from "react";
import { Col, Row } from "react-bootstrap";

type TypeAttributeRowProps<T extends TypeAttribute> = {
  fType: T;
  children: React.ReactNode[];
};

const TypeAttributeRow = <T extends TypeAttribute>({
  fType,
  children,
}: TypeAttributeRowProps<T>) => {
  return (
    <Row
      key={`fTypeRow-${fType.id}`}
      className="mt-1 mb-1 d-flex align-items-center justify-content-center"
      style={{
        background: "#4B555F",
        borderTop: "1px solid #7B8895",
        borderBottom: "1px solid #7B8895",
      }}>
      <Col md={1} className="text-center mt-2 mb-2">
        {children[0]}
      </Col>
      <Col md={2}>{children[1]}</Col>
      <Col md={6}>{children[2]}</Col>
      <Col md={2}>{children[3]}</Col>
      <Col md={1} className="d-flex align-items-center justify-content-center">
        {children[4]}
      </Col>
    </Row>
  );
};

export default TypeAttributeRow;
