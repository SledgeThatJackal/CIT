import { useErrorState } from "@hooks/state/useErrorState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItemAttribute, deleteItemType } from "./api";
import { ItemAttribute } from "@features/items/schemas/Item";

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
        console.log(id);
        await queryClient.invalidateQueries({ queryKey: ["types"] });
      }
    },
  });
}
