import React, { useEffect } from "react";
import { CloseButton, Form, Table } from "react-bootstrap";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
  useWatch,
} from "react-hook-form";
import { ItemSchemaType, ZodContainerItemType } from "../schemas/Item";
import ComboBox from "@components/general/ComboBox";

type ContainerSectionProps = {
  control: Control<ItemSchemaType>;
  register: UseFormRegister<ItemSchemaType>;
  errors: FieldErrors<ItemSchemaType>;
  setFocus: UseFormSetFocus<ItemSchemaType>;
  setError: UseFormSetError<ItemSchemaType>;
  clearErrors: UseFormClearErrors<ItemSchemaType>;
  getValues: UseFormGetValues<ItemSchemaType>;
};

const ContainerSection = ({
  control,
  register,
  errors,
  setFocus,
  setError,
  clearErrors,
  getValues,
}: ContainerSectionProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "containerItems",
  });

  const watchContainerItems = useWatch({
    control,
    name: "containerItems",
  }) as ZodContainerItemType[];

  useEffect(() => {
    const lastRow =
      watchContainerItems?.[watchContainerItems.length - 1]?.container
        ?.scannerId;

    if (watchContainerItems?.length === 0 || (lastRow && lastRow.length > 0)) {
      append({
        id: undefined,
        container: {
          id: -1,
          name: "",
          scannerId: "",
        },
        quantity: Number(1),
      });

      setTimeout(() => {
        setFocus(
          `containerItems.${watchContainerItems.length - 1}.container.scannerId`,
        );
      }, 0);
    }

    if (
      watchContainerItems?.length > 1 &&
      !watchContainerItems?.[watchContainerItems.length - 2]?.container
        ?.scannerId &&
      !lastRow
    ) {
      remove(watchContainerItems.length - 1);
    }
  }, [watchContainerItems, remove]);

  return (
    <Table variant="info">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Container Id</th>
          <th scope="col">Quantity</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        {fields &&
          fields.map((field, index) => (
            <tr key={`CIFields-${field.id}`}>
              <th>{field.container?.name}</th>
              <td>
                <ComboBox
                  index={index}
                  field={field}
                  control={control}
                  errors={errors}
                  update={update}
                  setFocus={setFocus}
                  setError={setError}
                  clearErrors={clearErrors}
                  getValues={getValues}
                />
              </td>
              <td>
                <Form.Control
                  {...register(`containerItems.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                  type="number"
                />
              </td>
              <td>
                <CloseButton
                  onClick={() => remove(index)}
                  disabled={fields.length === index}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ContainerSection;
