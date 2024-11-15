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
import { ItemAttribute, ItemSchemaType, TypeForm } from "../schemas/Item";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateItem } from "@services/mutations";
import TagInput from "@tag/components/TagInput";
import ContainerSection from "./ContainerSection";
import { useCanvasState } from "@hooks/state/useCanvasState";
import TypeSection from "./TypeSection";
import SelectComponent from "@components/Forms/SelectComponentF";
import { useCreateItemAttribute } from "@type/services/mutation";
import { useItemTypes } from "@type/services/query";

const CreateBox = () => {
  const createItemMutation = useCreateItem();
  const createItemAttrMutation = useCreateItemAttribute();
  const itemTypeQuery = useItemTypes().data;
  const { closeCanvas } = useCanvasState();
  const [typeId, setTypeId] = useState<number>(-1);
  const [itemId, setItemId] = useState<number>(0);
  const typeFormButtonRef = useRef<HTMLButtonElement>(null);

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

  const typeForm = useForm<TypeForm>({
    defaultValues: {
      itemAttributes: [],
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

    const idReturn = createItemMutation.mutateAsync(item);
    setItemId(await idReturn);
  };

  useEffect(() => {
    if (itemId !== 0 && typeFormButtonRef.current) {
      typeFormButtonRef.current.click();
    }
  }, [itemId]);

  const onTypeSubmit = async (itemAttrData: TypeForm) => {
    itemAttrData.itemAttributes.forEach((itemAttr) => {
      const updatedItemAttr: ItemAttribute = {
        ...itemAttr,
        item: {
          id: itemId,
          name: "",
        },
      };

      createItemAttrMutation.mutate(updatedItemAttr);
    });

    setItemId(0);
    itemForm.reset();
    typeForm.reset();
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
              <div className="vr" />
              <Button
                type="submit"
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
        </Form>
      </FormProvider>
      <Col>
        <FormProvider {...typeForm}>
          <Form onSubmit={typeForm.handleSubmit(onTypeSubmit)}>
            <TypeSection
              typeId={typeId}
              itemAttrControl={typeForm.control}
              itemAtrrReset={typeForm.reset}
              registerItemAttr={typeForm.register}
              itemAttrFormState={typeForm.formState}
            />
            <button style={{ display: "none" }} ref={typeFormButtonRef} />
          </Form>
        </FormProvider>
      </Col>
    </Container>
  );
};

export default CreateBox;
