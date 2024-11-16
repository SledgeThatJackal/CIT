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
import { useForm } from "react-hook-form";
import { ContainerType } from "../schemas/Container";
import { useDetailedContainers } from "@services/queries";

const ContainerCreate = () => {
  const containerQuery = useDetailedContainers().data;
  const createContainerMutation = useCreateContainer();
  const { closeCanvas } = useCanvasState();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContainerType>({
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
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container
        className={`text-light pt-3 pb-3 mb-3 rounded shadow`}
        style={{ background: "#4B555F", border: "3px solid #7B8895" }}>
        <Row>
          <Form.Group as={Col} controlId="containerName">
            <FloatingLabel controlId="floatingName" label="Name">
              <Form.Control
                {...register("name")}
                type="text"
                autoFocus
                required
              />
            </FloatingLabel>
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="floatingDesc">
            <FloatingLabel controlId="floatingDesc" label="Description">
              <Form.Control {...register("description")} type="text" />
            </FloatingLabel>
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="floatingScannerId">
            <FloatingLabel controlId="floatingScannerId" label="Barcode ID">
              <Form.Control {...register("scannerId")} type="text" />
            </FloatingLabel>
            <Form.Control.Feedback type="invalid">
              {errors.scannerId?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="floatingParent">
            <FloatingLabel controlId="floatingParent" label="Parent Container">
              <Form.Select {...register("parentContainer")}>
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
              {errors.parentContainer?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Col md="2" as={Stack} direction="horizontal" gap={2}>
            <div className="vr" />
            <Button type="submit" variant="success" disabled={isSubmitting}>
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
      </Container>
    </Form>
  );
};

export default ContainerCreate;
