import { useQuery } from "@tanstack/react-query";
import { getImageFinds } from "./api";

type ImageFindsProps = {
  containerName?: string;
  scannerId?: string;
  itemName?: string;
};

export function useImageFinds({
  containerName,
  scannerId,
  itemName,
}: ImageFindsProps) {
  return useQuery({
    queryKey: ["imageFinds", containerName, scannerId, itemName],
    queryFn: () => getImageFinds(containerName, scannerId, itemName),
  });
}
