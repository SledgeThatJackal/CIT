import React, { useEffect, useRef } from "react";
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

  const typeIdRef = useRef<number>(typeId);
  const isDuplicate = useRef<boolean>(typeId !== -1);

  useEffect(() => {
    /* 
      ***The component re-renders multiple times when it loads onto the page.***

      Due to the useEffect being called multiple times, it makes it so just using 
      isDuplicate will not work. This is the case because, if it renders more than once, 
      and you set the value to false after it's initial render, it will then reset the form
      each time it reloads. 

      By using a reference to typeId, you can see if any data is present when the form loads
      i.e the typeId isn't -1 (by default, it's -1)
      With this and using a reference to a boolean, it checks if there's any data present (typeId !== -1), 
      if there is, then it enters the if block. The inner if statement looks to see, if the 
      reference to typeId is the same as typeId, if that's the case nothing happens. If you change the 
      type on the form and there was initially data present, it will go into the if block, but 
      since the typeId and the reference are no longer the same, it will not enter the second if block.
      This causes the isDuplicate reference to be set to false, after that, any time this useEffect is 
      called, it will not enter the if block.

      TL;DR: The useEffect will not fire, if you use the duplicate button and you haven't changed the
             type on the item. Otherwise, it will always fire.
    */
    if (typeIdRef.current !== -1 && isDuplicate.current) {
      if (typeIdRef.current === typeId) {
        return;
      }

      isDuplicate.current = false;
    }

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
