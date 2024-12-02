import FormFloatingLabel from "@components/Forms/FormFloatingLabel";
import { useEditState } from "@type/hooks/state/useEditState";
import { AttributeForm, TypeFormDTO } from "@type/schema/Type";
import { useCanvasState } from "@hooks/state/useCanvasState";
import { ZodItemType } from "@schema/General";
import React from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import TypeAttributesForm from "./TypeAttributesForm";
import { useCreateItemType } from "@type/services/mutation";
import GenericModal from "@components/general/GenericModal";

const TypeForm = () => {
  const { itemType, typeAttributes } = useEditState();
  const { closeCanvas } = useCanvasState();

  const createTypeMutation = useCreateItemType();

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
    const isAttributeFormValid = await attributeForm.trigger();

    if (!isAttributeFormValid) {
      console.error("Type Attributes are invalid");
      return;
    }

    const typeFormDTO: TypeFormDTO = {
      itemType: typeData,
      typeAttributes: attributeForm.getValues().typeAttributes,
    };

    createTypeMutation.mutate(typeFormDTO);

    typeForm.reset();
    attributeForm.reset();
    closeCanvas();
  };

  return (
    <Container
      className="rounded text-white mt-3 w-75 overflow-auto"
      style={{
        height: "35vh",
        background: "#3d454e",
        border: "3px solid #7B8895",
      }}>
      <GenericModal />
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
            <Col md={3} as={Stack} direction="horizontal" gap={2}>
              <Button
                type="submit"
                size="lg"
                className="ms-auto"
                variant="success"
                disabled={typeForm.formState.isSubmitting}>
                {itemType ? "Save" : "Create"}
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
          <Form className="mt-1 mb-1">
            <Row>
              <Col md={1} className="text-center">
                Order
              </Col>
              <Col md={2}>Data Type</Col>
              <Col md={8}>Attribute Name</Col>
              <Col md={1} className="text-center">
                Remove
              </Col>
            </Row>
            <TypeAttributesForm />
          </Form>
        </FormProvider>
      </Container>
    </Container>
  );
};

export default TypeForm;
