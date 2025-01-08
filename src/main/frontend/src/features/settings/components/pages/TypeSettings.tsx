import { useSettingsData } from "@hooks/SettingsProvider";
import React from "react";
import { Container, Row } from "react-bootstrap";

const TypeSettings = () => {
  const settingsData = useSettingsData();

  return (
    <Container fluid>
      <Row>
        <h3>Type</h3>
      </Row>
      <Row>
        <hr />
      </Row>
    </Container>
  );
};

export default TypeSettings;
