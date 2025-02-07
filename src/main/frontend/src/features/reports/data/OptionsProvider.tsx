import { OptionsEnum } from "@report/data/OptionsEnum";
import { ProviderType } from "@schema/Providers";
import React, { createContext, useContext } from "react";

const OptionsContext = createContext<unknown>(undefined);

interface OptionsProviderProps<T> extends ProviderType {
  data: T;
}

const OptionsContextProvider = <T,>({
  children,
  data,
}: OptionsProviderProps<T>) => {
  return (
    <OptionsContext.Provider value={data}>{children}</OptionsContext.Provider>
  );
};

export const useOptionsContext = () => useContext(OptionsContext);

interface OptionsType extends ProviderType {
  option: OptionsEnum;
}

export const OptionsProvider = <T,>({ children, option }: OptionsType) => {
  const fetchedData = option.fetchingFunction()();

  if (fetchedData.isFetching) return <div>Loading...</div>;

  if (fetchedData.isError) return <div>Failed to load data...</div>;

  return (
    <OptionsContextProvider<T[]> data={fetchedData.data! as T[]}>
      {children}
    </OptionsContextProvider>
  );
};
