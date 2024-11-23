import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getInfiniteItems, getItem, getItemAttributes, getItems } from "./api";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useMemo } from "react";

export function useItem(id: number) {
  return useQuery({
    queryKey: ["item"],
    queryFn: () => getItem(id),
  });
}

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: getItems,
    staleTime: 1000 * 60 * 10,
  });
}

export function useInfiniteItems(
  filter: ColumnFiltersState,
  tableFilter: string,
  size: number = 10,
) {
  const memoizedFilter = useMemo(() => filter, [filter]);

  return useInfiniteQuery({
    queryKey: ["infiniteItems", tableFilter, memoizedFilter],
    queryFn: ({ pageParam = 0 }) =>
      getInfiniteItems(pageParam, size, tableFilter, memoizedFilter),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.last) {
        return undefined;
      }

      return lastPage.data.pageable.pageNumber + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.first) {
        return undefined;
      }

      return firstPage.data.pageable.pageNumber - 1;
    },
    refetchOnWindowFocus: true,
  });
}

export function useItemAttributes(id: number) {
  return useQuery({
    queryKey: ["itemattributes", id],
    queryFn: () => getItemAttributes(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}
