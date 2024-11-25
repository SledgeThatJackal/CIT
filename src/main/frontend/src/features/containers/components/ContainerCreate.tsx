import React from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { useCreateContainer } from "@services/mutations";
import { useCanvasState } from "@hooks/state/useCanvasState";
import { FormProvider, useForm } from "react-hook-form";
import { ContainerType } from "../schemas/Container";
import { useDetailedContainers } from "@services/queries";
import ImageForm from "@item/components/image/ImageForm";
import { useBooleanState } from "@hooks/state/useBooleanState";

const ContainerCreate = () => {
  const containerQuery = useDetailedContainers().data;
  const createContainerMutation = useCreateContainer();
  const { closeCanvas } = useCanvasState();
  const { isOn } = useBooleanState();

  const containerForm = useForm<ContainerType>({
    defaultValues: {
      id: undefined,
      name: undefined,
      description: undefined,
      scannerId: undefined,
      parentContainer: undefined,
      containerItems: [],
    },
  });

  const onSubmit = async (container: ContainerType) => {
    const parentContainerId = Number(container.parentContainer);
    container.parentContainer = undefined;

    createContainerMutation.mutate({ container, parentContainerId });
    containerForm.reset();

    if (!isOn) {
      closeCanvas();
    }
  };

  return (
    <FormProvider {...containerForm}>
      <Form onSubmit={containerForm.handleSubmit(onSubmit)}>
        <Container
          className={`text-light pt-3 pb-3 mb-3 rounded shadow`}
          style={{ background: "#4B555F", border: "3px solid #7B8895" }}>
          <Row>
            <Form.Group as={Col} controlId="containerName">
              <FloatingLabel controlId="floatingName" label="Name">
                <Form.Control
                  {...containerForm.register("name")}
                  type="text"
                  autoFocus
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {containerForm.formState.errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="floatingDesc">
              <FloatingLabel controlId="floatingDesc" label="Description">
                <Form.Control
                  {...containerForm.register("description")}
                  type="text"
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {containerForm.formState.errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="floatingScannerId">
              <FloatingLabel controlId="floatingScannerId" label="Barcode ID">
                <Form.Control
                  {...containerForm.register("scannerId")}
                  type="text"
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {containerForm.formState.errors.scannerId?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="floatingParent">
              <FloatingLabel
                controlId="floatingParent"
                label="Parent Container">
                <Form.Select {...containerForm.register("parentContainer")}>
                  <option key="parentCreate-none" value={undefined}></option>
                  {containerQuery ? (
                    containerQuery
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((container) => (
                        <option
                          key={`parentCreate-${container.id}`}
                          value={container.id}>
                          {container.name} ({container.scannerId})
                        </option>
                      ))
                  ) : (
                    <option key="parentCreate-empty" value={undefined}>
                      No Containers Found
                    </option>
                  )}
                </Form.Select>
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {containerForm.formState.errors.parentContainer?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Col md="2" as={Stack} direction="horizontal" gap={2}>
              <div className="vr" />
              <Button
                type="submit"
                variant="success"
                disabled={containerForm.formState.isSubmitting}>
                Create
              </Button>
              <Button
                type="button"
                variant="outline-danger"
                onClick={closeCanvas}>
                Cancel
              </Button>
            </Col>
          </Row>
          <Row className="pt-1">
            <Col>
              <ImageForm />
            </Col>
          </Row>
        </Container>
      </Form>
    </FormProvider>
  );
};

export default ContainerCreate;
