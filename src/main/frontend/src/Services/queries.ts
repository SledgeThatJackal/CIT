import { dataTagSymbol, useQueries, useQuery } from "@tanstack/react-query";
import {
  getContainers,
  getDetailedContainers,
  getItem,
  getItems,
  getItemTypes,
  getTags,
  getTypeAttriutes,
  getTypeAttriutesById,
  // getTypeAttriutesById,
} from "./api";
import { ZodItemType } from "@schema/General";

// Items
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

// Containers
export function useContainers() {
  return useQuery({
    queryKey: ["containers"],
    queryFn: getContainers,
    staleTime: 1000 * 60 * 10,
  });
}

export function useDetailedContainers() {
  return useQuery({
    queryKey: ["detailedContainers"],
    queryFn: getDetailedContainers,
    staleTime: 1000 * 60 * 10,
  });
}

// Tags
export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
    staleTime: 1000 * 60 * 10,
  });
}

// Types
export function useItemTypes() {
  return useQuery({
    queryKey: ["types"],
    queryFn: getItemTypes,
    staleTime: 1000 * 60 * 10,
  });
}

export function useTypeAttributes() {
  return useQuery({
    queryKey: ["typeattr"],
    queryFn: getTypeAttriutes,
    staleTime: 1000 * 60 * 10,
  });
}

export function useTypeAttribute(id: number) {
  return useQuery({
    queryKey: ["typeattribute", id],
    queryFn: () => getTypeAttriutesById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}
