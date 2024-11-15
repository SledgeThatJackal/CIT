import { useErrorState } from "@hooks/state/useErrorState";
import { ZodItemType } from "@schema/General";
import { TypeAttribute } from "@schema/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createItemType,
  createTypeAttribute,
  deleteItemType,
  deleteTypeAttribute,
  editTypeAttribute,
} from "./api";

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
