import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Row, Col, Form, Button, Stack, FloatingLabel } from "react-bootstrap";

import TagBadge from "./TagBadge";

import { Tag } from "@schema/Tag";
import { useCreateTag, useUpdateTag } from "@services/mutations";

type TagFormProps = {
  tag?: Tag;
  onEdit?: () => void;
  closeEdit?: () => void;
  onCreate?: () => void;
  closeCreate?: () => void;
};

const TagSchema = z.object({
  id: z.number().optional().nullable(),
  tag: z.string(),
  color: z.string(),
  description: z.string(),
});

type TagSchemaType = z.infer<typeof TagSchema>;

const TagForm = ({
  tag,
  onEdit,
  closeEdit,
  onCreate,
  closeCreate,
}: TagFormProps) => {
  const [exampleTag, setExampleTag] = useState<Tag>(
    tag || {
      id: -1,
      tag: "Example Name",
      color: "#00AAFF",
      description: "Example Description",
    },
  );

  const createTagMutation = useCreateTag();
  const updateTagMutation = useUpdateTag();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setFocus,
  } = useForm<TagSchemaType>({
    defaultValues: tag ? tag : { color: "#00AAFF" },
    resolver: zodResolver(TagSchema),
  });

  const watchedTag = useWatch({ control });

  useEffect(() => {
    setExampleTag(() => ({
      id: watchedTag.id ?? -1,
      tag: watchedTag.tag ?? "Example Name",
      color: watchedTag.color ?? "#00AAFF",
      description: watchedTag.description ?? "Example Description",
    }));
  }, [watchedTag]);

  const onSubmit = async (data: TagSchemaType) => {
    try {
      if (tag) {
        updateTagMutation.mutate(data as Tag);

        onEdit && onEdit();
      } else {
        createTagMutation.mutate(data as Tag);

        reset({ id: undefined, tag: "", color: "#00AAFF", description: "" });
        onCreate && onCreate();
        setFocus("tag");
      }
    } catch (error) {
      console.error(
        `An error occured when trying to ${tag ? "edit" : "create"} a tag | Message: ${error}`,
      );
    }
  };

  const handleClose = () => {
    closeCreate && closeCreate();
    closeEdit && closeEdit();
  };

  // validated
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row
        className={`text-light pt-3 pb-3 ${!tag && "rounded w-75 mx-auto"}`}
        style={{
          background: "#4B555F",
          borderTop: "3px solid #7B8895",
          borderBottom: "3px solid #7B8895",
        }}>
        <Col md="auto" as={Stack} direction="horizontal" gap={2}>
          <TagBadge {...exampleTag} />
          <div className="vr" />
        </Col>
        <Form.Group as={Col} md="3" controlId="tagName">
          <FloatingLabel
            controlId="floatingNameInput"
            label="Name"
            className="text-dark">
            <Form.Control
              {...register("tag")}
              type="text"
              placeholder="Enter name here..."
              autoFocus={true}
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            {errors.tag?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="tagDescription">
          <FloatingLabel
            controlId="floatingDescriptionInput"
            label="Description"
            className="text-dark">
            <Form.Control
              {...register("description")}
              type="text"
              placeholder="Enter description here..."
            />
          </FloatingLabel>
          <Form.Control.Feedback>
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="1" controlId="tagColor">
          <Form.Control
            {...register("color")}
            type="color"
            className="h-100 w-100"
          />
        </Form.Group>
        <Col md="2" as={Stack} direction="horizontal" gap={2}>
          <div className="vr" />
          <Button type="submit" variant="success" disabled={isSubmitting}>
            {tag ? "Edit" : "Save"}
          </Button>
          <Button type="button" variant="outline-danger" onClick={handleClose}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TagForm;
