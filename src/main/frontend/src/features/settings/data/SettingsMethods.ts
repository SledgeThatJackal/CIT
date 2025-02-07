import { SettingsFormType } from "@settings/components/SettingsForm";
import { SettingsType } from "@settings/schemas/Settings";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export const useSettingsMemo = (settings: SettingsType[], key: string) => {
  return useMemo(() => {
    return (
      settings.find(
        (setting) =>
          setting.key.toLocaleLowerCase() === key.toLocaleLowerCase(),
      )?.value || "null"
    );
  }, [key, settings]);
};

export const useSettingsForm = (key: string, value: string) => {
  return useForm<SettingsFormType>({
    defaultValues: {
      key: key,
      value: value,
    },
  });
};
