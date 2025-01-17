import React from "react";
import { Button } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import TypeAttributeRow from "./TypeAttributeRow";
import TypeAttributeFormEdit from "@type/components/form/TypeAttributeFormEdit";
import TypeAttributeFormDelete from "./form/TypeAttributeFormDelete";
import { AttributeForm } from "@type/schema/Type";
import { useModalState } from "@hooks/state/useModalState";
import { useDeleteTypeAttribute } from "@type/services/mutation";
import TypeAttributeFormSelect from "@type/components/form/TypeAttributeFormSelect";

const TypeAttributesForm = () => {
  const deleteAttributeMutation = useDeleteTypeAttribute();

  const {
    control,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext<AttributeForm>();

  const { openMessageModal, closeModal } = useModalState();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "typeAttributes",
  });

  const addRow = () => {
    append({
      id: undefined,
      itemType: undefined,
      displayOrder: undefined,
      columnTitle: undefined,
      dataType: "STRING",
    });
  };

  const handleDelete = (id: number, index: number) => {
    deleteAttributeMutation.mutate(id);
    closeModal();
    remove(index);
  };

  const deleteRow = (index: number) => {
    const attribute = getValues(`typeAttributes.${index}.id`);

    const editFunction = () => handleDelete(attribute || 0, index);
    const createFunction = () => remove(index);

    openMessageModal(
      "Delete Attribute",
      "Delete",
      attribute ? editFunction : createFunction,
      "Are you sure you want to delete this attribute?",
    );
  };

  return (
    <React.Fragment>
      {fields && fields.length > 0 ? (
        fields.map((field, index) => {
          const dataType = watch(`typeAttributes.${index}.dataType`);
          const type = dataType?.startsWith("B")
            ? "checkbox"
            : dataType?.startsWith("N")
              ? "number"
              : "text";
          return (
            <TypeAttributeRow fType={field} key={`formEditRow-${field.id}`}>
              <TypeAttributeFormEdit
                key={`formEditFirstCell-${field.id}`}
                path={`typeAttributes.${index}.displayOrder`}
                error={errors.typeAttributes?.[index]?.message}
              />
              <TypeAttributeFormSelect
                key={`formEditSecondCell-${field.id}`}
                path={`typeAttributes.${index}.dataType`}
              />
              <TypeAttributeFormEdit
                key={`formEditThirdCell-${field.id}`}
                path={`typeAttributes.${index}.columnTitle`}
              />
              {dataType?.startsWith("S") ? (
                <TypeAttributeFormEdit
                  key={`formEditThirdCell-${type}-${field.id}`}
                  path={`typeAttributes.${index}.stringDefaultValue`}
                  type={type}
                />
              ) : (
                <TypeAttributeFormEdit
                  key={`formEditThirdCell-${type}-${field.id}`}
                  path={`typeAttributes.${index}.numberDefaultValue`}
                  type={type}
                />
              )}

              <TypeAttributeFormDelete
                key={`formEditFourthCell-${field.id}`}
                handleRemove={() => deleteRow(index)}
              />
            </TypeAttributeRow>
          );
        })
      ) : (
        <div>No attributes found</div>
      )}
      <Button onClick={addRow} variant="link">
        New Row
      </Button>
    </React.Fragment>
  );
};

export default TypeAttributesForm;
