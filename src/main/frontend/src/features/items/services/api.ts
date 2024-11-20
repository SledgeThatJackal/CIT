import {
  Item,
  ItemAttribute,
  ItemFormDTO,
  ItemPageResponse,
  ItemSchemaType,
} from "@item/schemas/Item";
import { ColumnFiltersState } from "@tanstack/react-table";
import axios from "axios";

// Query
export const getItem = async (id: number) => {
  return (await axios.get<Item>(`/api/item/id?id=${id}`)).data;
};

export const getItems = async () => {
  return (await axios.get<Item[]>("/api/item")).data;
};

export const getInfiniteItems = async (
  pageParam: number = 0,
  size: number = 10,
  filters?: ColumnFiltersState,
) => {
  const filterParams = filters?.reduce(
    (column, filter) => {
      column[filter.id] = filter.value;
      return column;
    },
    {} as Record<string, any>,
  );

  const query = new URLSearchParams({
    page: pageParam.toLocaleString(),
    size: size.toLocaleString(),
    ...filterParams,
  });

  return await axios.get<ItemPageResponse>(`/api/item/page?${query}`);
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
