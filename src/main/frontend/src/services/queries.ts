import { useQuery } from "@tanstack/react-query";
import {
  getBasicContainers,
  getBasicItems,
  getDetailedContainers,
  getImages,
  getTags,
} from "./api";

// Item
export function useBasicItems() {
  return useQuery({
    queryKey: ["basicItems"],
    queryFn: getBasicItems,
    staleTime: 1000 * 60 * 10,
  });
}

// Containers
export function useBasicContainers() {
  return useQuery({
    queryKey: ["containers"],
    queryFn: getBasicContainers,
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
