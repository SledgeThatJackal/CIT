import {
  Item,
  ItemAttribute,
  ItemFormDTO,
  ItemImageRequest,
  ItemPageResponse,
  ItemSchemaType,
} from "@item/schemas/Item";
import AxiosInstance from "@services/AxiosInstance";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

// Query
export const getItem = async (id: number) => {
  return (await AxiosInstance.get<Item>(`/item/id?id=${id}`)).data;
};

export const getItems = async () => {
  return (await AxiosInstance.get<Item[]>("/item")).data;
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

  return await AxiosInstance.post<ItemPageResponse>(`/item/page`, data);
};

export const getItemAttributes = async (id: number) => {
  return (await AxiosInstance.get<ItemAttribute[]>(`/attribute/item?id=${id}`))
    .data;
};

// Mutate
export const createItem = async (data: ItemFormDTO) => {
  await AxiosInstance.post(`/item/create`, data);
};

export const createItemAttribute = async (data: ItemAttribute) => {
  await AxiosInstance.post(`/attribute/item/create`, data);
};

export const updateItemImage = async (data: ItemImageRequest[]) => {
  await AxiosInstance.post(`/item/create/image`, data);
};

export const updateItem = async (data: ItemSchemaType) => {
  await AxiosInstance.put(`/item/edit`, data);
};

export const updateItemAttribute = async (data: ItemAttribute) => {
  await AxiosInstance.put(`/attribute/item/edit`, data);
};

export const deleteItem = async (id: number) => {
  await AxiosInstance.delete(`/item/delete?id=${id}`);
};
