import { createContext, useContext } from "react";

export const DetailContext = createContext<unknown>(undefined);

export function useDetailContext<T>() {
  const context = useContext(DetailContext);

  if (context === undefined)
    throw new Error("useDetailContext must be used within a Provider");

  return context as T;
}
