import React from "react";
import { Container } from "react-bootstrap";
import BaseReport from "./BaseReport";

import "../styles/Reports.css";
import { OptionsProvider } from "@report/data/OptionsProvider";
import { OptionsEnum } from "@report/data/OptionsEnum";

const Reports = () => {
  return (
    <Container fluid className="report-container">
      <Container fluid className="base-report-container">
        <OptionsProvider option={OptionsEnum.Container}>
          <BaseReport />
        </OptionsProvider>
      </Container>
    </Container>
  );
};

export default Reports;
