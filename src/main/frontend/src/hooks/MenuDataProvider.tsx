import React, { createContext, useContext } from "react";

import { useContainers, useImages, useTags } from "../services/queries";
import { useItemTypes } from "@type/services/query";
import { useItems } from "@item/services/query";

const DataContext = createContext<any[]>([]);

type MenuDataProviderProps = {
  children: any;
  type: string;
};

export const MenuDataProvider = ({ children, type }: MenuDataProviderProps) => {
  const query = getQuery(type);

  if (!query) {
    return <div>That type does not exist</div>;
  }

  if (query.isPending) {
    return <div>Data is still pending</div>;
  }

  if (query.isError) {
    return <div>An error has occured: {query.error.message}</div>;
  }

  return (
    <DataContext.Provider value={query.data}>{children}</DataContext.Provider>
  );
};

const getQuery = (type: string) => {
  switch (type) {
    case "Tag": {
      return useTags();
    }
    case "Type": {
      return useItemTypes();
    }
    case "Item": {
      return useItems();
    }
    case "Container": {
      return useContainers();
    }
    case "Image": {
      return useImages();
    }
  }
};

export const useData = () => useContext(DataContext);
