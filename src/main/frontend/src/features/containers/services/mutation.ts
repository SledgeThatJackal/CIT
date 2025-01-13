import { useErrorState } from "@hooks/state/useErrorState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContainerImageLinks } from "./api";
import { ContainerImageType } from "@schema/Image";

export function useDeleteContainerImageLink() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: { id: number }[]) => deleteContainerImageLinks(data),

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
