import FormFloatingLabel from "@components/Forms/FormFloatingLabel";
import { useEditState } from "@features/settings/hooks/state/useEditState";
import { AttributeForm } from "@features/settings/schema/Type";
import { useCanvasState } from "@hooks/state/useCanvasState";
import { ZodItemType } from "@schema/General";
import { TypeAttribute } from "@schema/Types";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import TypeAttributesForm from "./TypeAttributesForm";
import {
  useCreateItemType,
  useCreateTypeAttribute,
} from "@settings/services/mutation";

const TypeForm = () => {
  const { itemType, typeAttributes } = useEditState();
  const { closeCanvas } = useCanvasState();

  const attributeButtonRef = useRef<HTMLButtonElement>(null);
  const [typeId, setTypeId] = useState<number>(0);

  const createTypeMutation = useCreateItemType();
  const createAttributeMutation = useCreateTypeAttribute();

  const typeForm = useForm<ZodItemType>({
    defaultValues: itemType ? itemType : {},
  });

  const attributeForm = useForm<AttributeForm>({
    defaultValues: typeAttributes
      ? typeAttributes
      : {
          typeAttributes: [
            {
              id: undefined,
              itemType: undefined,
              displayOrder: undefined,
              columnTitle: undefined,
            },
          ],
        },
  });

  const onSubmit = async (typeData: ZodItemType) => {
    const idReturn = createTypeMutation.mutateAsync(typeData);
    setTypeId(await idReturn);
  };

  useEffect(() => {
    if (typeId !== 0 && attributeButtonRef.current) {
      attributeButtonRef.current.click();
    }
  }, [typeId]);

  const onAttributeSubmit = async (attributeData: AttributeForm) => {
    attributeData.typeAttributes.forEach((typeAttribute) => {
      const updatedTypeAttribute: TypeAttribute = {
        ...typeAttribute,
        itemType: {
          id: typeId,
          name: "",
        },
      };

      createAttributeMutation.mutate(updatedTypeAttribute);
      setTypeId(0);
      typeForm.reset();
      attributeForm.reset();
      closeCanvas();
    });
  };

  return (
    <Container
      className="rounded text-white mt-3 w-75 overflow-auto"
      style={{
        height: "35vh",
        background: "#3d454e",
        border: "3px solid #7B8895",
      }}>
      <FormProvider {...typeForm}>
        <Form className="mt-3" onSubmit={typeForm.handleSubmit(onSubmit)}>
          <Row>
            <Col md={9}>
              <FormFloatingLabel
                register={typeForm.register}
                path={`name`}
                title="Name"
                errorMessage={typeForm.formState.errors.name?.message}
              />
            </Col>
            <Col md="3" as={Stack} direction="horizontal" gap={2}>
              <Button
                type="submit"
                size="lg"
                variant="success"
                disabled={typeForm.formState.isSubmitting}>
                Create
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline-danger"
                onClick={closeCanvas}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </FormProvider>
      <Container
        className="rounded bg-dark text-white mt-3 overflow-auto"
        style={{ border: "3px solid #7B8895", height: "26vh" }}>
        <FormProvider {...attributeForm}>
          <Form
            className="mt-1 mb-1"
            onSubmit={attributeForm.handleSubmit(onAttributeSubmit)}>
            <Row>
              <Col md={1} className="text-center">
                Order
              </Col>
              <Col md={10}>Name</Col>
              <Col md={1} className="text-center">
                Remove
              </Col>
            </Row>
            <TypeAttributesForm />
            <button style={{ display: "none" }} ref={attributeButtonRef} />
          </Form>
        </FormProvider>
      </Container>
    </Container>
  );
};

export default TypeForm;
