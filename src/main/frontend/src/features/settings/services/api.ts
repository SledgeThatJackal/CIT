import { ItemAttribute } from "@features/items/schemas/Item";
import { ZodItemType } from "@schema/General";
import { TypeAttribute } from "@schema/Types";
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
export const createItemAttribute = async (data: ItemAttribute) => {
  await axios.post(`/api/attribute/item/create`, data);
};

export const deleteItemType = async (id: number) => {
  await axios.delete(`/api/types/delete?id=${id}`);
};
