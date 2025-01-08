import { SettingsFormType } from "@settings/components/SettingsForm";
import { SettingsType } from "@settings/schemas/Settings";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export const createSettingsMemo = (settings: SettingsType[], key: string) => {
  return useMemo(() => {
    return (
      settings.find(
        (setting) =>
          setting.key.toLocaleLowerCase() === key.toLocaleLowerCase(),
      )?.value || "null"
    );
  }, [settings]);
};

export const createUseForm = (key: string, value: string) => {
  return useForm<SettingsFormType>({
    defaultValues: {
      key: key,
      value: value,
    },
  });
};
