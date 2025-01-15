import { createUseForm } from "@settings/data/SettingsMethods";
import { useEditSetting } from "@settings/services/mutation";
import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FormProvider } from "react-hook-form";

export type SettingsFormType = {
  key: string;
  value: string;
};

type SettingsFormProps = {
  settingKey: string;
  settingValue: string;
  type: string;
  label: string;
};

const SettingsForm = ({
  settingKey,
  settingValue,
  type,
  label,
}: SettingsFormProps) => {
  const currentForm = createUseForm(settingKey, settingValue);

  const editSettingsMutation = useEditSetting();

  const onSubmit = (setting: SettingsFormType) => {
    editSettingsMutation.mutate(setting);
  };

  const Input = () => {
    switch (type.toLowerCase()) {
      case "number":
        return (
          <Form.Group key={`form-number-${settingKey}`}>
            <Form.Label>{label}</Form.Label>
            <InputGroup className="w-25">
              <Form.Control
                type="number"
                required
                {...currentForm.register("value")}
              />
              <Button type="submit" variant="success">
                ✅
              </Button>
            </InputGroup>
          </Form.Group>
        );

      case "boolean":
        return (
          <Form.Group className="w-25" key={`form-boolean-${settingKey}`}>
            <Form.Check {...currentForm.register("value")} type="checkbox" />
            <Form.Label>{label}</Form.Label>
          </Form.Group>
        );

      default:
        return (
          <Form.Group key={`form-string-${settingKey}`}>
            <Form.Label>{label}</Form.Label>
            <InputGroup className="w-25">
              <Form.Control
                type="text"
                required
                {...currentForm.register("value")}
              />
              <Button type="submit" variant="success">
                ✅
              </Button>
            </InputGroup>
          </Form.Group>
        );
    }
  };

  return (
    <FormProvider {...currentForm}>
      <Form
        onSubmit={currentForm.handleSubmit(onSubmit)}
        key={`form-${settingKey}`}>
        <Input />
      </Form>
    </FormProvider>
  );
};

export default SettingsForm;
