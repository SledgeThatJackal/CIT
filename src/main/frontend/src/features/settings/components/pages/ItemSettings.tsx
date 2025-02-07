import { useSettingsData } from "@hooks/SettingsProvider";
import { useSettingsMemo } from "@settings/data/SettingsMethods";
import React from "react";
import { Container, Row } from "react-bootstrap";
import SettingsForm from "../SettingsForm";

const ItemSettings = () => {
  const settingsData = useSettingsData();

  const delimterKey = "itemDelimiter";
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
          label="Default delimiter for item duplication"
        />
      </Row>
    </Container>
  );
};

export default ItemSettings;
