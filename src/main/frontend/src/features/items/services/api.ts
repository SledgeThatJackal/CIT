import {
  Item,
  ItemAttribute,
  ItemFormDTO,
  ItemPageResponse,
  ItemSchemaType,
} from "@item/schemas/Item";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import axios from "axios";

// Query
export const getItem = async (id: number) => {
  return (await axios.get<Item>(`/api/item/id?id=${id}`)).data;
};

export const getItems = async () => {
  return (await axios.get<Item[]>("/api/item")).data;
};

type FilterColumnType = {
  columnLabel?: string;
  comparison?: string;
  value?: string;
  id?: string;
};

type SortColumnType = {
  columnLabel?: string;
  direction?: string;
};

export const getInfiniteItems = async (
  pageParam: number = 0,
  size: number = 10,
  tableFilter: string = "",
  filters?: ColumnFiltersState,
  sort?: SortingState,
) => {
  const filterColumns = filters?.reduce<FilterColumnType[]>(
    (currentColumn, filter) => {
      const columnLabel = filter.id.includes("-")
        ? filter.id.split("-")[0]
        : filter.id;
      const id = filter.id.includes("-") ? filter.id.split("-")[1] : undefined;
      const comparison = String(filter.value).split("_")[0];
      const value = String(filter.value).split("_")[1];

      currentColumn.push({
        columnLabel: columnLabel,
        comparison: comparison,
        value: value,
        id: id,
      });

      return currentColumn;
    },
    [],
  );

  const sortColumns = sort?.reduce<SortColumnType[]>((currentColumn, sort) => {
    currentColumn.push({
      columnLabel: sort.id,
      direction: String(sort.desc),
    });

    return currentColumn;
  }, []);

  const data = {
    page: pageParam,
    size: size,
    type: tableFilter,
    filterColumns: filterColumns,
    sortColumns: sortColumns,
  };

  const fetched = await axios.post<ItemPageResponse>(`/api/item/page`, data);

  console.log(fetched);

  return fetched;
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
