import { ZodItemType } from "@schema/General";
import React, { createContext, useContext } from "react";
import { useItemTypes } from "../services/query";

const DataContext = createContext<ZodItemType[]>([]);

export const TypeProvider = ({ children }: any) => {
  const itemTypesQuery = useItemTypes();

  if (itemTypesQuery.isPending) {
    return null;
  }

  if (itemTypesQuery.isError) {
    return null;
  }

  return (
    <DataContext.Provider
      value={
        itemTypesQuery.data.length > 1
          ? itemTypesQuery.data.slice(1)
          : itemTypesQuery.data
      }>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
