import { useSettingsData } from "@hooks/SettingsProvider";
import React from "react";
import { Container, Row } from "react-bootstrap";

const TagSettings = () => {
  const settingsData = useSettingsData();

  return (
    <Container fluid>
      <Row>
        <h3>Tag</h3>
      </Row>
      <Row>
        <hr />
      </Row>
    </Container>
  );
};

export default TagSettings;
