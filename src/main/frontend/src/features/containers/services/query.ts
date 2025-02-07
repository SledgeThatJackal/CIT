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

type OrphanContainersType = {
  data: {
    id?: number;
    condition?: boolean;
  };
};

export function useOrphanContainers({
  data: { id, condition },
}: OrphanContainersType) {
  return useQuery({
    queryKey: ["orphanContainers", id, condition],
    queryFn: () => getOrphanContainers(id!, condition!),
    enabled: !!id,
  });
}
