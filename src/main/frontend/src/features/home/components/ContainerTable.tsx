import { HomeContext } from "@app/pages/home/HomePage";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";

const ContainerTable = () => {
  const data = useContext(HomeContext);
  return (
    <Container fluid className="container-container">
      <h2>Container</h2>
      <Container>
        <strong>{data?.numberOfContainers} Containers</strong>
      </Container>
    </Container>
  );
};

export default ContainerTable;
