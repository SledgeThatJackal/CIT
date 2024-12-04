import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getInfiniteItems, getItem, getItemAttributes, getItems } from "./api";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
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
  sort: SortingState,
  tableFilter: string,
  size: number = 10,
) {
  const memoizedFilter = useMemo(() => filter, [filter]);
  const memoizedSort = useMemo(() => sort, [sort]);

  return useInfiniteQuery({
    queryKey: ["infiniteItems", tableFilter, memoizedFilter, memoizedSort],
    queryFn: ({ pageParam = 0 }) =>
      getInfiniteItems(
        pageParam,
        size,
        tableFilter,
        memoizedFilter,
        memoizedSort,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page.number === lastPage.data.page.totalPages - 1) {
        return undefined;
      }

      return lastPage.data.page.number + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.page.number === 0) {
        return undefined;
      }

      return firstPage.data.page.number - 1;
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
