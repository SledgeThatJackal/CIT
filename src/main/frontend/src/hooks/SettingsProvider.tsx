import { SettingsType } from "@settings/schemas/Settings";
import { useSettings } from "@settings/services/query";
import React, { createContext, useContext } from "react";

const SettingsContext = createContext<SettingsType[]>([]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SettingsProvider = ({ children }: any) => {
  const settingsQuery = useSettings();

  if (settingsQuery.isPending) {
    return null;
  }

  if (settingsQuery.isError) {
    return null;
  }

  return (
    <SettingsContext.Provider value={settingsQuery.data}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsData = () => useContext(SettingsContext);
