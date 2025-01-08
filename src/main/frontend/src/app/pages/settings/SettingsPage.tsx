import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";

const Settings = () => {
  return (
    <Container fluid>
      <Row>
        <h2>Settings</h2>
      </Row>
      <Row>
        <hr />
      </Row>
      <Row>
        <Col xs={2}>
          <ListGroup>
            <ListGroup.Item as={NavLink} to="/settings/container">
              Container
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/settings/item">
              Item
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/settings/tag">
              Tag
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/settings/type">
              Type
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={10}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
