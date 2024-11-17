import React from "react";
import { Button } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import TypeAttributeRow from "./TypeAttributeRow";
import TypeAttributeFormEdit from "./Form/TypeAttributeFormEdit";
import TypeAttributeFormDelete from "./Form/TypeAttributeFormDelete";
import { AttributeForm } from "@type/schema/Type";
import { useModalState } from "@hooks/state/useModalState";
import { useDeleteTypeAttribute } from "@type/services/mutation";

const TypeAttributesForm = () => {
  const deleteAttributeMutation = useDeleteTypeAttribute();

  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext<AttributeForm>();

  const { openModal, closeModal } = useModalState();

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
    });
  };

  const handleDelete = (id: number, index: number) => {
    deleteAttributeMutation.mutate(id);
    closeModal();
    remove(index);
  };

  const deleteRow = (index: number) => {
    const attribute = getValues(`typeAttributes.${index}.id`);

    if (attribute) {
      openModal(
        "Delete Attribute",
        "Delete",
        () => handleDelete(attribute, index),
        "Are you sure you want to delete this attribute?",
      );
    } else {
      remove(index);
    }
  };

  return (
    <React.Fragment>
      {fields && fields.length > 0 ? (
        fields.map((field, index) => (
          <TypeAttributeRow fType={field} key={`formEditRow-${field.id}`}>
            <TypeAttributeFormEdit
              key={`formEditFirstCell-${field.id}`}
              path={`typeAttributes.${index}.displayOrder`}
              error={errors.typeAttributes?.[index]?.message}
            />
            <TypeAttributeFormEdit
              key={`formEditSecondCell-${field.id}`}
              path={`typeAttributes.${index}.columnTitle`}
            />
            <TypeAttributeFormDelete
              key={`formEditThirdCell-${field.id}`}
              handleRemove={() => deleteRow(index)}
            />
          </TypeAttributeRow>
        ))
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
