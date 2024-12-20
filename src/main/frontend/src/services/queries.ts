import { useQuery } from "@tanstack/react-query";
import {
  getContainers,
  getDetailedContainers,
  getImages,
  getTags,
} from "./api";

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

// Images
export function useImages() {
  return useQuery({
    queryKey: ["images"],
    queryFn: getImages,
    staleTime: 1000 * 60 * 10,
  });
}
