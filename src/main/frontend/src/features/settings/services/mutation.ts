import { useErrorState } from "@hooks/state/useErrorState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createItemAttribute,
  createItemType,
  createTypeAttribute,
  deleteItemType,
  deleteTypeAttribute,
  editTypeAttribute,
} from "./api";
import { ItemAttribute } from "@features/items/schemas/Item";
import { TypeAttribute } from "@schema/Types";
import { ZodItemType } from "@schema/General";

export function useCreateItemType() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: ZodItemType) => createItemType(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error, data) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["types"] });
      }
    },
  });
}

export function useCreateTypeAttribute() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: TypeAttribute) => createTypeAttribute(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error, data) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["typeattribute", data.itemType?.id],
        });
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

export function useEditTypeAttribute() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: TypeAttribute) => editTypeAttribute(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["typeattribute"] });
      }
    },
  });
}

export function useDeleteItemType() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (id: number) => deleteItemType(id),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error, id) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["types"] });
      }
    },
  });
}

export function useDeleteTypeAttribute() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (id: number) => deleteTypeAttribute(id),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["typeattribute"],
        });
      }
    },
  });
}
