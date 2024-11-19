import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  Control,
  FormState,
  useFieldArray,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { ItemAttributeData } from "@item/schemas/Item";
import FormFloatingLabel from "@components/Forms/FormFloatingLabel";
import { useTypeAttribute } from "@type/services/query";

type TypeSectionProps = {
  typeId: number;
  itemAttrControl: Control<ItemAttributeData>;
  itemAtrrReset: UseFormReset<ItemAttributeData>;
  registerItemAttr: UseFormRegister<ItemAttributeData>;
  itemAttrFormState: FormState<ItemAttributeData>;
};

const TypeSection = ({
  typeId,
  itemAttrControl,
  itemAtrrReset,
  registerItemAttr,
  itemAttrFormState,
}: TypeSectionProps) => {
  const typeAttrQuery = useTypeAttribute(typeId).data;

  const { fields, append } = useFieldArray({
    control: itemAttrControl,
    name: "attributes",
  });

  useEffect(() => {
    itemAtrrReset({
      attributes: [],
    });

    if (typeAttrQuery) {
      for (var i = 0; i < typeAttrQuery?.length; i++) {
        append({
          typeAttribute: typeAttrQuery[i],
          value: "",
        });
      }
    }
  }, [typeAttrQuery]);

  return (
    <Container
      fluid
      className="rounded bg-dark text-white overflow-auto"
      style={{ height: "20vh", border: "3px solid #7B8895" }}>
      <Row className="mt-1">
        <h4>Item Attributes</h4>
      </Row>
      <Row>
        <hr />
      </Row>
      {fields && fields.length > 0 ? (
        fields.map((field, index) => (
          <Row className="mt-2" key={`typeRow-${field.id}`}>
            <Col key={`typeCol-${field.id}`}>
              <FormFloatingLabel
                key={`typeField-${field.id}`}
                register={registerItemAttr}
                path={`attributes.${index}.value`}
                title={field.typeAttribute.columnTitle}
                errorMessage={
                  itemAttrFormState.errors.attributes?.[index]?.message
                }
              />
            </Col>
          </Row>
        ))
      ) : (
        <div>Nothing to display. Select a type to see options.</div>
      )}
    </Container>
  );
};

export default TypeSection;
