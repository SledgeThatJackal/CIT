import { Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DisplayCell } from "@schema/General";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DetailCell = ({ row }: DisplayCell<any>) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const data = row.original;

    let path = "/home";

    if ("type" in data) path = `/item/${data.id}`;

    if ("scannerId" in data) path = `/container/${data.scannerId}`;

    navigate(path);
  };

  return (
    <Button onClick={handleClick} variant="success" size="sm" title="Inspect">
      <i className="bi bi-search" />
    </Button>
  );
};

export default DetailCell;
