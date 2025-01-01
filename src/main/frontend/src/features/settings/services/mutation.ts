import { useErrorState } from "@hooks/state/useErrorState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "./api";

type SettingsProps = {
  key: string;
  value: string;
};

export function useEditSetting() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: ({ key, value }: SettingsProps) => updateSetting(key, value),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error, props) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["settings"] });
        await queryClient.invalidateQueries({
          queryKey: ["setting", props.key],
        });
      }
    },
  });
}
