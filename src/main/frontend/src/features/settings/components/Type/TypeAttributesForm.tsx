import React from "react";
import { Row } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import TypeAttributeRow from "./TypeAttributeRow";
import TypeAttributeFormEdit from "./Form/TypeAttributeFormEdit";
import TypeAttributeFormDelete from "./Form/TypeAttributeFormDelete";
import { AttributeForm } from "@features/settings/schema/Type";

const TypeAttributesForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<AttributeForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "typeAttributes",
  });

  return (
    <React.Fragment>
      {fields && fields.length > 0 ? (
        fields.map((field, index) => (
          <TypeAttributeRow fType={field} key={`formEditRow-${field.id}`}>
            <TypeAttributeFormEdit
              key={`formEditFirstCell-${field.id}`}
              path={`typeAttributes.${index}.displayOrder`}
            />
            <TypeAttributeFormEdit
              key={`formEditSecondCell-${field.id}`}
              path={`typeAttributes.${index}.name`}
            />
            <TypeAttributeFormDelete key={`formEditThirdCell-${field.id}`} />
          </TypeAttributeRow>
        ))
      ) : (
        <div>No attributes found</div>
      )}
    </React.Fragment>
  );
};

export default TypeAttributesForm;
