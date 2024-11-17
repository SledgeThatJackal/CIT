import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  ItemAttributeData,
  ItemFormDTO,
  ItemSchemaType,
} from "../schemas/Item";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateItem } from "@item/services/mutation";
import TagInput from "@tag/components/TagInput";
import ContainerSection from "./ContainerSection";
import { useCanvasState } from "@hooks/state/useCanvasState";
import TypeSection from "./type_area/TypeSection";
import SelectComponent from "@components/Forms/SelectComponentF";
import { useItemTypes } from "@type/services/query";

const CreateBox = () => {
  const createItemMutation = useCreateItem();
  const itemTypeQuery = useItemTypes().data;
  const { closeCanvas } = useCanvasState();
  const [typeId, setTypeId] = useState<number>(-1);

  const itemForm = useForm<ItemSchemaType>({
    defaultValues: {
      id: undefined,
      name: undefined,
      description: undefined,
      containerItems: [
        {
          id: undefined,
          containerId: undefined,
          item_id: undefined,
          quantity: 1,
        },
      ],
      tags: [],
      itemType: {
        id: -1,
        name: "",
      },
    },
    // resolver: zodResolver(ItemSchema),
  });

  const typeForm = useForm<ItemAttributeData>({
    defaultValues: {
      attributes: [],
    },
  });

  const watchTypeId = useWatch({
    control: itemForm.control,
    name: "itemType.id",
  });

  useEffect(() => {
    setTypeId(watchTypeId);
  }, [watchTypeId]);

  const onSubmit = async (itemData: ItemSchemaType) => {
    const item: ItemSchemaType = {
      ...itemData,
      containerItems: itemData.containerItems?.slice(0, -1),
    };

    const isTypeFormValid = await typeForm.trigger();

    if (!isTypeFormValid) {
      console.error("Item Attributes are invalid");
      return;
    }

    const itemFormDTO: ItemFormDTO = {
      item: item,
      itemAttributes: typeForm.getValues().attributes,
    };

    createItemMutation.mutate(itemFormDTO);

    typeForm.reset();
    itemForm.reset();
    closeCanvas();
  };

  return (
    <Container
      className={`text-light pt-3 pb-3 mb-3 rounded`}
      style={{ background: "#4B555F", border: "3px solid #7B8895" }}>
      <FormProvider {...itemForm}>
        <Form onSubmit={itemForm.handleSubmit(onSubmit)}>
          <Row>
            <Form.Group as={Col} controlId="itemName">
              <FloatingLabel controlId="floatingName" label="Name">
                <Form.Control
                  {...itemForm.register("name")}
                  type="text"
                  autoFocus
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {itemForm.formState.errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="itemDesc">
              <FloatingLabel controlId="floatingDesc" label="Description">
                <Form.Control
                  {...itemForm.register("description")}
                  type="text"
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {itemForm.formState.errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="type">
              <FloatingLabel controlId="floatingType" label="Type">
                <SelectComponent
                  data={itemTypeQuery}
                  labelKey="name"
                  register={itemForm.register}
                  registerKey="itemType.id"
                />
              </FloatingLabel>
            </Form.Group>
            <Col md="2" as={Stack} direction="horizontal" gap={2}>
              <Button
                type="submit"
                className="ms-auto"
                variant="success"
                disabled={itemForm.formState.isSubmitting}>
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
              <TagInput control={itemForm.control} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ContainerSection
                control={itemForm.control}
                register={itemForm.register}
                errors={itemForm.formState.errors}
                setFocus={itemForm.setFocus}
                setError={itemForm.setError}
                clearErrors={itemForm.clearErrors}
                getValues={itemForm.getValues}
              />
            </Col>
          </Row>
        </Form>
      </FormProvider>
      <Row>
        <Col>
          <FormProvider {...typeForm}>
            <Form>
              <TypeSection
                typeId={typeId}
                itemAttrControl={typeForm.control}
                itemAtrrReset={typeForm.reset}
                registerItemAttr={typeForm.register}
                itemAttrFormState={typeForm.formState}
              />
            </Form>
          </FormProvider>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBox;
