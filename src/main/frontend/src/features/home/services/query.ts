import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "./api";

export function useHome() {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHomeData,
  });
}
