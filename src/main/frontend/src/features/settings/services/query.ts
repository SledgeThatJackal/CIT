import { useQuery } from "@tanstack/react-query";
import { getSettingById, getSettingByKey, getSettings } from "./api";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: Infinity,
  });
}

export function useSettingById(id: number) {
  return useQuery({
    queryKey: ["setting", id],
    queryFn: () => getSettingById(id),
    staleTime: Infinity,
  });
}

export function useSettingByKey(key: string) {
  return useQuery({
    queryKey: ["setting", key],
    queryFn: () => getSettingByKey(key),
    staleTime: Infinity,
  });
}
