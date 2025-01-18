import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  ItemAttributeData,
  ItemFormDTO,
  ItemSchemaType,
} from "../schemas/Item";
import { useCreateItem } from "@item/services/mutation";
import TagInput from "@tag/components/TagInput";
import ContainerSection from "./ContainerSection";
import { useCanvasState } from "@hooks/state/useCanvasState";
import TypeSection from "./type_area/TypeSection";
import SelectComponent from "@components/forms/SelectComponentF";
import { useItemTypes } from "@type/services/query";
import ImageForm from "./image/ImageForm";
import { useActionState } from "@item/hooks/useActionState";
import omit from "lodash.omit";
import { useItemSettingsState } from "@item/hooks/persistent_states/useItemSettingsState";

const defaultItem = {
  id: undefined,
  name: undefined,
  description: undefined,
  containerItems: [
    {
      id: undefined,
      quantity: 1,
    },
  ],
  tags: [],
  itemType: {
    id: -1,
    name: "",
  },
  images: [],
};

type CreateBoxProps = {
  afterSubmit?: () => void;
};

const CreateBox = ({ afterSubmit }: CreateBoxProps) => {
  const createItemMutation = useCreateItem();
  const itemTypeQuery = useItemTypes().data;
  const { closeCanvas } = useCanvasState();
  const { item } = useActionState();
  const [typeId, setTypeId] = useState<number>(item?.itemType?.id || -1);
  const { isBulkCreate } = useItemSettingsState();

  const itemForm = useForm<ItemSchemaType>({
    defaultValues: defaultItem,
    // resolver: zodResolver(ItemSchema),
  });

  const { reset: itemFormReset } = itemForm;

  const typeForm = useForm<ItemAttributeData>({
    defaultValues: {
      attributes: [],
    },
  });

  const { reset: typeFormReset } = typeForm;

  useEffect(() => {
    if (item) {
      itemFormReset(omit(item, ["id", "itemAttributes"]));
      typeFormReset({
        attributes: {
          ...item.itemAttributes.map((itemAttr) => ({
            typeAttribute: itemAttr.typeAttribute,
            stringValue: itemAttr.stringValue,
            numberValue: itemAttr.numberValue,
          })),
        },
      });
    } else {
      itemFormReset(defaultItem);
      typeFormReset({ attributes: [] });
    }
  }, [item, itemFormReset, typeFormReset]);

  const watchTypeId = useWatch({
    control: itemForm.control,
    name: "itemType.id",
  });

  useEffect(() => {
    setTypeId(watchTypeId);
  }, [watchTypeId]);

  useEffect(() => {
    itemForm.setFocus("name");
  }, [itemForm]);

  const handleItemSubmit = () => {
    typeForm.reset();
    itemForm.reset();

    if (!isBulkCreate) {
      closeCanvas();
    }

    itemForm.setFocus("name");
  };

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

    await createItemMutation.mutateAsync(itemFormDTO);

    if (afterSubmit) {
      afterSubmit();
    } else {
      handleItemSubmit();
    }
  };

  return (
    <Container
      fluid
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
            <Form.Group as={Col} controlId="url">
              <FloatingLabel controlId="url" label="URL">
                <Form.Control
                  {...itemForm.register("externalUrl")}
                  type="url"
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                {itemForm.formState.errors.externalUrl?.message}
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
              <OverlayTrigger
                overlay={
                  <Tooltip style={{ whiteSpace: "pre-wrap" }}>
                    To create an item, all you need it to fill in the name and
                    hit create. &#10;&#10;For adding a tag, you can either
                    create a new one and hit add, or you can use the &quot;Tag
                    Name&quot; input and either use it as a search and/or click
                    on the tag you want to add. &#10;&#10;To add an image,
                    either click &quot;Choose File(s)&quot; or click on the
                    &quot;Existing&quot; button on the right side. To add that
                    item to a container, select a container from the drop down
                    menu and then change the quantity, if you want. When you add
                    container, a new row should appear. &#10;&#10;To add Item
                    Attributes, you must first select a type, this will then add
                    all of that types attributes to the bottom area, if you
                    leave the inputs blank, it will use the default values.
                  </Tooltip>
                }>
                <i className="bi bi-question-circle text-warning" />
              </OverlayTrigger>
            </Col>
          </Row>
          <Row className="pt-1">
            <Col>
              <TagInput control={itemForm.control} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ImageForm />
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
