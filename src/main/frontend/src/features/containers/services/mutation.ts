import { useErrorState } from "@hooks/state/useErrorState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContainerDescendants, deleteContainerImageLinks } from "./api";

export function useAddDescendants() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (containers: { parentId: number; ids: number[] }) =>
      addContainerDescendants(containers.parentId, containers.ids),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["orphanContainers"],
        });
      }
    },
  });
}

export function useDeleteContainerImageLink() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: { id: number }[]) => deleteContainerImageLinks(data),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
      }
    },
  });
}
