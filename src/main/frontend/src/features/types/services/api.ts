import { ZodItemType } from "@schema/General";
import { TypeAttribute } from "@schema/Types";
import { TypeFormDTO } from "@type/schema/Type";
import axios from "axios";

// Query
export const getItemTypes = async () => {
  return (await axios.get<ZodItemType[]>(`/api/types`)).data;
};

export const getTypeAttriutes = async () => {
  return (await axios.get<TypeAttribute[]>(`/api/attribute/type`)).data;
};

export const getTypeAttriutesById = async (id: number) => {
  return (await axios.get<TypeAttribute[]>(`/api/attribute/type/id?id=${id}`))
    .data;
};

// Mutate
export const createItemType = async (data: TypeFormDTO) => {
  return await axios.post(`/api/types/create`, data);
};

export const createTypeAttribute = async (data: TypeAttribute) => {
  await axios.post(`/api/attribute/type/create`, data);
};

export const editTypeAttribute = async (data: TypeAttribute) => {
  await axios.put(`/api/attribute/type/edit`, data);
};

export const deleteItemType = async (id: number) => {
  await axios.delete(`/api/types/delete?id=${id}`);
};

export const deleteTypeAttribute = async (id: number) => {
  await axios.delete(`/api/attribute/type/delete?id=${id}`);
};
