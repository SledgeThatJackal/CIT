import {
  Item,
  ItemAttribute,
  ItemFormDTO,
  ItemSchemaType,
} from "@item/schemas/Item";
import axios from "axios";

// Query
export const getItem = async (id: number) => {
  return (await axios.get<Item>(`/api/item/id?id=${id}`)).data;
};

export const getItems = async () => {
  return (await axios.get<Item[]>("/api/item")).data;
};

export const getItemAttributes = async (id: number) => {
  return (await axios.get<ItemAttribute[]>(`/api/attribute/item?id=${id}`))
    .data;
};

// Mutate
export const createItem = async (data: ItemFormDTO) => {
  await axios.post(`/api/item/create`, data);
};

export const createItemAttribute = async (data: ItemAttribute) => {
  await axios.post(`/api/attribute/item/create`, data);
};

export const updateItem = async (data: ItemSchemaType) => {
  await axios.put(`/api/item/edit`, data);
};

export const updateItemAttribute = async (data: ItemAttribute) => {
  await axios.put(`/api/attribute/item/edit`, data);
};

export const deleteItem = async (id: number) => {
  await axios.delete(`/api/item/delete?id=${id}`);
};
