import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContainer, createItem, createLink, createTag, deleteContainer, deleteItem, deleteLink, deleteTag, updateContainer, updateItem, updateQuantity, updateTag } from "./api";
import { ItemSchemaType } from "../cit_types/Item";
import { TagCreate, TagSchemaType } from "../cit_types/Tag";
import { ContainerType } from "../cit_types/Container";


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
        mutationFn: (data: ItemSchemaType) => updateItem(data),
        
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
export function useCreateContainer(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ContainerType) => createContainer(data),

        onSettled: async(_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["detailedContainers"] });
            }
        }
    });
};

export function useUpdateContainer(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ContainerType) => updateContainer(data),
        
        onSettled: async(_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["detailedContainers"] });
            }
        }
    });
};

export function useDeleteContainer(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteContainer(id),

        onSettled: async (_, error) => {
            if(error){
                console.error(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["detailedContainers"] });
            }
        }
    });
};

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
                await queryClient.invalidateQueries({ queryKey: ["items"] });
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
                await queryClient.invalidateQueries({ queryKey: ["tags"] });
                await queryClient.refetchQueries({ queryKey: ["items"] });
            }
        }
    });
}

// Types
