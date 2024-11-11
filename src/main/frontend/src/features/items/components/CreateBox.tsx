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
import { useForm } from "react-hook-form";
import { ItemSchema, ItemSchemaType } from "../schemas/Item";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateItem } from "@services/mutations";
import TagInput from "@components/tag/TagInput";
import ContainerSection from "./ContainerSection";
import { useCanvasState } from "@hooks/state/useCanvasState";

const CreateBox = () => {
  const createItemMutation = useCreateItem();
  const { closeCanvas } = useCanvasState();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setFocus,
    setError,
    clearErrors,
    getValues,
  } = useForm<ItemSchemaType>({
    defaultValues: {
      id: undefined,
      containerItems: [
        {
          id: undefined,
          containerId: undefined,
          item_id: undefined,
          quantity: 1,
        },
      ],
      tags: [],
    },
    resolver: zodResolver(ItemSchema),
  });

  const onSubmit = async (data: ItemSchemaType) => {
    const item: ItemSchemaType = {
      ...data,
      containerItems: data.containerItems?.slice(0, -1),
    };

    console.log(item);
    createItemMutation.mutate(item);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container
        className={`text-light pt-3 pb-3 mb-3 rounded`}
        style={{ background: "#4B555F", border: "3px solid #7B8895" }}>
        <Row>
          <Form.Group as={Col} controlId="itemName">
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
          <Form.Group as={Col} controlId="itemDesc">
            <FloatingLabel controlId="floatingDesc" label="Description">
              <Form.Control {...register("description")} type="text" />
            </FloatingLabel>
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
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
        <Row className="pt-3">
          <Col>
            <TagInput control={control} />
          </Col>
        </Row>
        <Row className="pt-3">
          <Col>
            <ContainerSection
              control={control}
              register={register}
              errors={errors}
              setFocus={setFocus}
              setError={setError}
              clearErrors={clearErrors}
              getValues={getValues}
            />
          </Col>
          <Col>Type will go here</Col>
        </Row>
      </Container>
    </Form>
  );
};

export default CreateBox;
