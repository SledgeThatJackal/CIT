import { useQuery } from "@tanstack/react-query";
import { getItem, getItems, getTags } from "./api";

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
        queryFn: getItems
    });
};

// Containers


// Tags
export function useTags(){
    return useQuery({
        queryKey: ['tags'],
        queryFn: getTags
    });
};

// Types
