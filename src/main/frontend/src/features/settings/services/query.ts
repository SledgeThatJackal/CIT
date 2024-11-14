import { useQuery } from "@tanstack/react-query";
import { getItemTypes, getTypeAttriutes, getTypeAttriutesById } from "./api";

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
