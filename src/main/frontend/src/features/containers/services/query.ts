import { useQuery } from "@tanstack/react-query";
import { getContainer, getContainersByArea, getOrphanContainers } from "./api";

export function useContainer(scannerId: string) {
  return useQuery({
    queryKey: ["container", scannerId],
    queryFn: () => getContainer(scannerId),
  });
}

export function useContainersByArea(
  isArea: boolean,
  containerId: number,
  isEnabled: boolean,
) {
  return useQuery({
    queryKey: ["containers", isArea, containerId],
    queryFn: () => getContainersByArea(isArea, containerId),
    enabled: isEnabled,
    staleTime: 1000 * 60 * 10,
  });
}

export function useOrphanContainers() {
  return useQuery({
    queryKey: ["orphanContainers"],
    queryFn: getOrphanContainers,
    staleTime: 1000 * 60 * 10,
  });
}
