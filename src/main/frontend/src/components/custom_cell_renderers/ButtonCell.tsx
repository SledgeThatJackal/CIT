import React from "react";
import { Button, Container } from "react-bootstrap";

type ButtonCellProps = {
  title: string;
  color: string;
  handleClick: () => void;
  children: any;
};

const ButtonCell = ({
  title,
  color,
  handleClick,
  children,
}: ButtonCellProps) => {
  return (
    <Container fluid className="p-0 m-0 w-100 d-flex justify-content-center">
      <Button onClick={handleClick} variant={color} title={title}>
        {children}
      </Button>
    </Container>
  );
};

export default ButtonCell;
