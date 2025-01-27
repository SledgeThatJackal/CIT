import DatabaseExportButton from "@components/general/DatabaseExportButton";
import DatabaseImportButton from "@components/general/DatabaseImportButton";
import React from "react";
import { Col, Container, ListGroup, Row, Stack } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";

const Settings = () => {
  return (
    <Container fluid>
      <Stack direction="horizontal" gap={2}>
        <h2>Settings</h2>
        <div>
          <DatabaseExportButton />
        </div>
        <div>
          <DatabaseImportButton />
        </div>
      </Stack>
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
