import { useQuery } from "@tanstack/react-query";
import { getContainer } from "./api";

export function useContainer(scannerId: string) {
  return useQuery({
    queryKey: ["container", scannerId],
    queryFn: () => getContainer(scannerId),
  });
}
