import FormFloatingLabel from "@components/Forms/FormFloatingLabel";
import { useEditState } from "@features/settings/hooks/state/useEditState";
import { AttributeForm } from "@features/settings/schema/Type";
import { useCanvasState } from "@hooks/state/useCanvasState";
import { ZodItemType } from "@schema/General";
import { TypeAttribute } from "@schema/Types";
import React from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import TypeAttributesForm from "./TypeAttributesForm";

const TypeForm = () => {
  const { itemType, typeAttributes } = useEditState();
  const { closeCanvas } = useCanvasState();

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

  return (
    <Container>
      <FormProvider {...typeForm}>
        <Form>
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
      <FormProvider {...attributeForm}>
        <TypeAttributesForm />
      </FormProvider>
    </Container>
  );
};

export default TypeForm;
