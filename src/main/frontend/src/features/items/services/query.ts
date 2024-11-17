import { useQuery } from "@tanstack/react-query";
import { getItem, getItemAttributes, getItems } from "./api";

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

export function useItemAttributes(id: number) {
  return useQuery({
    queryKey: ["itemattributes", id],
    queryFn: () => getItemAttributes(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}
