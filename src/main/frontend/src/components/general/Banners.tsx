import React, { useEffect } from "react";
import { useErrorState } from "@hooks/state/useErrorState";
import { Col, Container, Row } from "react-bootstrap";

export const ErrorBanner = () => {
  const { errorMessage, closeError } = useErrorState();

  useEffect(() => {
    setTimeout(() => {
      closeError();
    }, 10000);
  }, [errorMessage.length > 0]);

  return (
    <Container className="bg-danger" fluid>
      <Row className="justify-content-center">
        <Col className="align-middle text-center">
          <h2>Interal Server Error Occurred: {errorMessage}</h2>
        </Col>
      </Row>
    </Container>
  );
};

type SuccessBannerProps = {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SuccessBanner = ({ setState }: SuccessBannerProps) => {
  useEffect(() => {
    setTimeout(() => {
      setState(false);
    }, 5000);
  }, []);

  return (
    <Container className="bg-success" fluid>
      <Row className="justify-content-center">
        <Col className="align-middle text-center">
          <h2>You have been successfully logged out</h2>
        </Col>
      </Row>
    </Container>
  );
};
