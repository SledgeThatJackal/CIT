import { useSettingsData } from "@hooks/SettingsProvider";
import { useSettingsMemo } from "@settings/data/SettingsMethods";
import React from "react";
import { Container, Row } from "react-bootstrap";
import SettingsForm from "../SettingsForm";

const ContainerSettings = () => {
  const settingsData = useSettingsData();

  const delimterKey = "containerDelimiter";
  const delimiter = useSettingsMemo(settingsData, delimterKey);

  return (
    <Container fluid>
      <Row>
        <h4>General</h4>
      </Row>
      <Row>
        <hr />
      </Row>
      <Row>
        <SettingsForm
          settingKey={delimterKey}
          settingValue={delimiter}
          type="string"
          label="Default delimiter for container duplication"
        />
      </Row>
    </Container>
  );
};

export default ContainerSettings;
