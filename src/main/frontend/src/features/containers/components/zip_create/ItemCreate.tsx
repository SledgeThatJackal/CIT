import React from "react";
import { Container, Row } from "react-bootstrap";
import ImageSelect from "./ImageSelect";

const ItemCreate = () => {
  return (
    <Container>
      <Row>
        <h3 className="text-center">
          <u>Select Images</u>
        </h3>
      </Row>
      <Row>
        <ImageSelect />
      </Row>
    </Container>
  );
};

export default ItemCreate;
