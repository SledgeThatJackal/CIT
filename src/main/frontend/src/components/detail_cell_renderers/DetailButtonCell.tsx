import React from "react";
import { CellContext } from "@tanstack/react-table";

import { NavLink } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DetailButtonCell = ({ row }: CellContext<any, any>) => {
  const handleClick = () => {
    const data = row.original;

    if ("item" in data) return `/item/${data.item.id}`;

    if ("container" in data) return `/container/${data.container.scannerId}`;

    return "/home";
  };

  return (
    <div className="text-center">
      <NavLink to={handleClick()}>View</NavLink>
    </div>
  );
};

export default DetailButtonCell;
