import { useErrorState } from "@hooks/state/useErrorState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createItem,
  createItemAttribute,
  deleteItem,
  updateItem,
  updateItemAttribute,
} from "./api";
import { ItemAttribute, ItemSchemaType } from "@item/schemas/Item";

export function useCreateItem() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: ItemSchemaType) => createItem(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

export function useCreateItemAttribute() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: ItemAttribute) => createItemAttribute(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        // set up invadliation
      }
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: ItemSchemaType) => updateItem(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
        // await queryClient.invalidateQueries({ queryKey: ["item", { id: variables.id }]})
      }
    },
  });
}

export function useUpdateItemAttribute() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: ItemAttribute) => updateItemAttribute(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error, data) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["itemattributes", data.item?.id],
        });
      }
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (id: number) => deleteItem(id),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}