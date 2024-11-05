import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, createLink, createTag, deleteItem, deleteLink, deleteTag, updateItem, updateQuantity, updateTag } from "./api";
import { Item, ItemSchemaType } from "../Types/Item";
import { Tag, TagCreate, TagSchemaType } from "../Types/Tag";


// Items
export function useCreateItem(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ItemSchemaType) => createItem(data),

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


// Links
type createLinkParams = {
    itemId: number;
    containerId: number;
    quantity: number
};

export function useCreateLink(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({itemId, containerId, quantity}: createLinkParams) => createLink(itemId, containerId, quantity),
        
        onSettled: async (_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["items"] });
            }
        }
    });
}

type quantityParams = {
    quantity: number;
    id: number;
};

export function useUpdateQuantity(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({quantity, id}: quantityParams) => updateQuantity(quantity, id),
        
        onSettled: async (_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["items"] });
            }
        }
    });
};

export function useDeleteLink(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteLink(id),

        onSettled: async (_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["items"] });
            }
        }
    });
};

// Tags
export function useCreateTag(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TagCreate) => {return createTag(data)},

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
