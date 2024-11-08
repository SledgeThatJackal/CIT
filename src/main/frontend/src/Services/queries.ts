import { useQuery } from "@tanstack/react-query";
import { getContainers, getDetailedContainers, getItem, getItems, getTags } from "./api";

// Items
export function useItem(id: number){
    return useQuery({
        queryKey: ['item'],
        queryFn:  () => getItem(id),
    });
};

export function useItems(){
    return useQuery({
        queryKey: ['items'],
        queryFn: getItems,
        staleTime: 1000 * 60 * 10,
    });
};

// Containers
export function useContainers(){
    return useQuery({
        queryKey: ['containers'],
        queryFn: getContainers,
        staleTime: 1000 * 60 * 10,
    });
};

export function useDetailedContainers(){
    return useQuery({
        queryKey: ['detailedContainers'],
        queryFn: getDetailedContainers,
        staleTime: 1000 * 60 * 10
    });
}

// Tags
export function useTags(){
    return useQuery({
        queryKey: ['tags'],
        queryFn: getTags,
        staleTime: 1000 * 60 * 10,
    });
};

// Types
