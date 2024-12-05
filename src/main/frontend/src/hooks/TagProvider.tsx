import React, { createContext, useContext } from "react";

import { Tag } from "../schema/Tag";
import { useTags } from "../services/queries";

const DataContext = createContext<Tag[]>([]);

export const TagProvider = ({ children }: any) => {
  const tagsQuery = useTags();

  if (tagsQuery.isPending) {
    return null;
  }

  if (tagsQuery.isError) {
    return null;
  }

  return (
    <DataContext.Provider value={tagsQuery.data}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
