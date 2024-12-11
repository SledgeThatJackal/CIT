import { ZodItemType } from "@schema/General";
import { TypeAttribute } from "@schema/Types";
import AxiosInstance from "@services/AxiosInstance";
import { TypeFormDTO } from "@type/schema/Type";

// Query
export const getItemTypes = async () => {
  return (await AxiosInstance.get<ZodItemType[]>(`/types`)).data;
};

export const getTypeAttriutes = async () => {
  return (await AxiosInstance.get<TypeAttribute[]>(`/attribute/type`)).data;
};

export const getTypeAttriutesById = async (id: number) => {
  return (
    await AxiosInstance.get<TypeAttribute[]>(`/attribute/type/id?id=${id}`)
  ).data;
};

// Mutate
export const createItemType = async (data: TypeFormDTO) => {
  return await AxiosInstance.post(`/types/create`, data);
};

export const createTypeAttribute = async (data: TypeAttribute) => {
  await AxiosInstance.post(`/attribute/type/create`, data);
};

export const editTypeAttribute = async (data: TypeAttribute) => {
  await AxiosInstance.put(`/attribute/type/edit`, data);
};

export const deleteItemType = async (id: number) => {
  await AxiosInstance.delete(`/types/delete?id=${id}`);
};

export const deleteTypeAttribute = async (id: number) => {
  await AxiosInstance.delete(`/attribute/type/delete?id=${id}`);
};
