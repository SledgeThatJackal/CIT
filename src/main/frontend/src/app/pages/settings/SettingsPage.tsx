import { useItemTypes } from "@features/settings/services/query";
import { ZodItemType } from "@schema/General";
import { Tag } from "@schema/Tag";
import { useTags } from "@services/queries";
import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { Outlet, NavLink, useOutletContext } from "react-router-dom";

type ContextType = {
  itemTypesQuery: ZodItemType[];
  tagsQuery: Tag[];
};

export default function Settings() {
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col xs={1}>
          <ListGroup>
            <ListGroup.Item as={NavLink} to="/settings/tags">
              Tags
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/settings/types">
              Types
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={11}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
