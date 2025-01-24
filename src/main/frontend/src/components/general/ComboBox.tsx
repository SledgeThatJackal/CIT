import React, { useRef, useState } from "react";
import { Dropdown, Overlay, Tooltip } from "react-bootstrap";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  useController,
  UseFieldArrayUpdate,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetFocus,
} from "react-hook-form";

import { ItemSchemaType, ZodContainerType } from "@item/schemas/Item";
import { useBasicContainers } from "@services/queries";

type InputControllerProps = {
  fieldName: string;
  control: Control<FieldValues, ItemSchemaType>;
  initialValue?: string;
  checkIfContainerExists: (scannerId: string) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError: UseFormSetError<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clearErrors: UseFormClearErrors<any>;
  showError: () => void;
};

const Input = ({
  fieldName,
  control,
  initialValue,
  checkIfContainerExists,
  setError,
  clearErrors,
  showError,
}: InputControllerProps) => {
  const { field } = useController({
    name: fieldName,
    control,
    defaultValue: initialValue || "",
  });

  return (
    <>
      <input
        {...field}
        className="form-control"
        onChange={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          field.onChange && field.onChange(e);
        }}
        onBlur={() => {
          field.onBlur();
          if (checkIfContainerExists(field.value)) {
            clearErrors(field.name);
          } else {
            setError(field.name, { message: "Container ID does not exist" });
            showError();
          }
        }}
        value={field.value}
        id={fieldName}
      />
    </>
  );
};

type ComboBoxProps = {
  index: number;
  field: FieldArrayWithId<ItemSchemaType, "containerItems", "id">;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors: FieldErrors<ItemSchemaType>;
  update: UseFieldArrayUpdate<ItemSchemaType>;
  setFocus: UseFormSetFocus<ItemSchemaType>;
  setError: UseFormSetError<ItemSchemaType>;
  clearErrors: UseFormClearErrors<ItemSchemaType>;
  getValues: UseFormGetValues<ItemSchemaType>;
};

const ComboBox = ({
  index,
  field,
  control,
  errors,
  update,
  setError,
  clearErrors,
  getValues,
}: ComboBoxProps) => {
  const containerQuery = useBasicContainers().data;

  const [showDropdown, setShowDropdown] = useState(false);
  const handleToggle = (isShown: boolean) => setShowDropdown(isShown);

  const [showError, setShowError] = useState(false);
  const target = useRef(null);

  const fieldId = getValues(`containerItems.${index}.id`);

  const handleDropdownClick = (value: ZodContainerType) => {
    const updatedItem = {
      ...field,
      id: undefined,
      container: value,
    };
    update(index, updatedItem);
  };

  const checkIfContainerExists = (scannerId: string): boolean => {
    if (
      scannerId.length >= 0 &&
      containerQuery?.some((container) => container.scannerId === scannerId)
    ) {
      const container: ZodContainerType = containerQuery.find(
        (container) => container.scannerId === scannerId,
      )!;
      handleDropdownClick(container);

      return true;
    }

    return false;
  };

  return (
    <div key={`Combobox-${index}`} className="input-group" ref={target}>
      {fieldId ? (
        <span>{field.container?.scannerId}</span>
      ) : (
        <>
          <Input
            key={`InputObject-${index}`}
            fieldName={`containerItems.${index}.container.scannerId`}
            control={control}
            checkIfContainerExists={checkIfContainerExists}
            setError={setError}
            clearErrors={clearErrors}
            showError={() => setShowError(!showError)}
          />
          <Dropdown show={showDropdown} onToggle={handleToggle}>
            <Dropdown.Toggle></Dropdown.Toggle>
            <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
              {containerQuery &&
                containerQuery.map((container, index) => (
                  <Dropdown.Item
                    key={`DropDownMenu-${index}`}
                    onClick={() => handleDropdownClick(container)}>
                    {" "}
                    {container.scannerId + ` (` + container.name + `)`}{" "}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}

      {errors.containerItems?.[index]?.container?.scannerId && (
        <Overlay target={target.current} show={showError} placement="right">
          {(props) => (
            <Tooltip id="overlay-error" {...props}>
              {`${errors?.containerItems?.[index]?.container?.scannerId?.message}`}
            </Tooltip>
          )}
        </Overlay>
      )}
    </div>
  );
};

export default ComboBox;
