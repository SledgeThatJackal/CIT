import React from "react";
import { Button, Container } from "react-bootstrap";

type ButtonCellProps = {
  title: string;
  color: string;
  isDisabled?: boolean;
  handleClick: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

const ButtonCell = ({
  title,
  color,
  isDisabled,
  handleClick,
  children,
}: ButtonCellProps) => {
  return (
    <Container fluid className="p-0 m-0 w-100 d-flex justify-content-center">
      <Button
        onClick={handleClick}
        variant={color}
        title={title}
        disabled={isDisabled}>
        {children}
      </Button>
    </Container>
  );
};

export default ButtonCell;
