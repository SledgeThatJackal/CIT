import SelectComponentR from "@components/Read/SelectComponentR";
import { ZodItemType } from "@schema/General";
import { TypeAttribute } from "@schema/Types";
import { useItemTypes, useTypeAttributes } from "@services/queries";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Stack,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";

function TypeSettings() {
  const itemTypesQuery = useItemTypes().data;
  const typeAttributeQuery = useTypeAttributes();

  const [type, setType] = useState<number>(0);
  const [filteredTypes, setFilteredTypes] = useState<TypeAttribute[]>([]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (typeAttributeQuery.data) {
      let filtered = typeAttributeQuery.data.filter((el) =>
        el.columnTitle.toLowerCase().includes(search.toLowerCase()),
      );

      if (type > 0) {
        filtered = filtered.filter((el) => el.itemType.id === type);
      }

      setFilteredTypes(filtered);
    }
  }, [typeAttributeQuery.data, search, type]);

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <h2>Types</h2>
        </Row>
        <Row>
          <hr />
        </Row>
        <Row>
          <Container
            fluid
            className="rounded bg-dark text-white mt-3 w-75 overflow-auto"
            style={{ height: "65vh", border: "3px solid #7B8895" }}>
            <Row className="mt-3 mb-3">
              <Col as={Stack} direction="horizontal" gap={3} md={9}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <SelectComponentR
                    data={itemTypesQuery}
                    labelKey="name"
                    setValue={setType}
                  />
                </InputGroup>
                <InputGroup>
                  <Button variant="success">New</Button>
                  <Button variant="info">Edit</Button>
                  <Button variant="danger">Delete</Button>
                </InputGroup>
              </Col>
              <Col
                md={3}
                className="d-flex align-items-center justify-content-end">
                <div>
                  Displaying: {filteredTypes.length || 0} out of{" "}
                  {typeAttributeQuery.data?.length || 0}
                </div>
              </Col>
            </Row>
            <Row className="m-1">
              <Container
                style={{
                  background: "#3d454e",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "3px solid #7B8895",
                }}>
                <Row>
                  <Col md={1} className="text-center">
                    Order
                  </Col>
                  <Col md={10}>Name</Col>
                  <Col md={1} className="text-center">
                    Delete
                  </Col>
                </Row>
                {filteredTypes &&
                  filteredTypes.map((fType) => (
                    <Row
                      key={`fTypeRow-${fType.id}`}
                      className="mt-1 mb-1 d-flex align-items-center justify-content-center"
                      style={{
                        background: "#4B555F",
                        borderTop: "1px solid #7B8895",
                        borderBottom: "1px solid #7B8895",
                      }}>
                      <Col md={1} className="text-center">
                        {fType.displayOrder}
                      </Col>
                      <Col md={10}>{fType.columnTitle}</Col>
                      <Col
                        md={1}
                        className="d-flex align-items-center justify-content-center">
                        <Button
                          variant="danger"
                          size="sm"
                          className="mt-1 mb-1">
                          <i className="bi bi-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  ))}
              </Container>
            </Row>
          </Container>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default TypeSettings;
