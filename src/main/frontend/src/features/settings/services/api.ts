import { SettingsType } from "@settings/schemas/Settings";
import AxiosInstance from "@services/AxiosInstance";

// Query
export const getSettings = async () => {
  return (await AxiosInstance.get<SettingsType[]>(`/settings`)).data;
};

export const getSettingById = async (id: number) => {
  return (await AxiosInstance.get<SettingsType>(`/settings/id?id=${id}`)).data;
};

export const getSettingByKey = async (key: string) => {
  return (await AxiosInstance.get<SettingsType>(`/settings/key?key=${key}`))
    .data;
};

// Mutate
export const updateSetting = async (key: string, value: string) => {
  await AxiosInstance.put(`/settings/edit?key=${key}&value=${value}`);
};
