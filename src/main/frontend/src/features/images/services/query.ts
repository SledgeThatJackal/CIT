import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getImageFinds, getImageFindsTotal } from "./api";

type ImageFindProps = {
  filters: {
    containerName?: string;
    scannerId?: string;
    itemName?: string;
  };
  fetch: boolean;
};

export function useImageFinds({
  filters: { containerName, scannerId, itemName },
  fetch,
}: ImageFindProps) {
  return useQuery({
    queryKey: ["imageFinds", containerName, scannerId, itemName],
    queryFn: () => getImageFinds(containerName, scannerId, itemName),
    enabled: fetch,
    placeholderData: keepPreviousData,
  });
}

export function useImageFindsTotal() {
  return useQuery({
    queryKey: ["imageFindsTotal"],
    queryFn: getImageFindsTotal,
    staleTime: 1000 * 60 * 20,
  });
}
