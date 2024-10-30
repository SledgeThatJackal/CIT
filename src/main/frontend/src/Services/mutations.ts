import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, createTag, deleteItem, deleteTag, updateItem, updateTag } from "./api";
import { Item } from "../Types/Item";
import { Tag, TagSchemaType } from "../Types/Tag";


// Items
export function useCreateItem(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Item) => createItem(data),

        onSettled: async(_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["items"] });
            }
        }
    });
};

export function useUpdateItem(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Item) => updateItem(data),
        
        onSettled: async(_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["items"] });
                // await queryClient.invalidateQueries({ queryKey: ["item", { id: variables.id }]})
            }
        }
    });
};

export function useDeleteItem(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteItem(id),

        onSettled: async (_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["items"] });
            }
        }
    });
};

// Containers


// Tags
export function useCreateTag(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Tag) => createTag(data),

        onSettled: async (_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["tags"] });
            }
        }
    });
};

export function useUpdateTag(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TagSchemaType) => updateTag(data),

        onSettled: async (_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["tags"] });
            }
        }
    });
};

export function useDeleteTag(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteTag(id),

        onSettled: async (_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["tags"] })
            }
        }
    });
}

// Types
