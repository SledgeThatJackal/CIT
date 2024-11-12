import React from "react";
import { CellContext } from "@tanstack/react-table";
import { ZodItemType } from "@schema/General";

const TypeCell = <T, S extends ZodItemType>({
  getValue,
}: CellContext<T, S>) => {
  return <div className="text-center">{getValue().name}</div>;
};

export default TypeCell;
