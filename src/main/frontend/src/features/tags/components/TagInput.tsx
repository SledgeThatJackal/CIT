import React, { useState, useEffect, useRef } from "react";
import { useFieldArray, Control } from "react-hook-form";

import TagBlock from "./TagBlock";
import TagBadge from "./TagBadge";

import { Tag } from "@schema/Tag";
import { ItemSchemaType } from "@item/schemas/Item";
import {
  Button,
  Dropdown,
  FloatingLabel,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useCreateTag } from "@services/mutations";
import { useTags } from "@services/queries";

type TagInputProps = {
  control: Control<ItemSchemaType>;
};

const TagInput = ({ control }: TagInputProps) => {
  const [color, setColor] = useState<string>("#FF0000");
  const [newTagName, setNewTagName] = useState<string>("");
  const [newTagDescription, setNewTagDescription] = useState<string>("");
  const [tagError, setTagError] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const tagRef = useRef<HTMLInputElement>(null);
  const [tagInputHeight, setTagInputHeight] = useState<number>(0);

  const tagQuery = useTags().data;
  const createTagMutation = useCreateTag();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  useEffect(() => {
    if (tagRef.current) {
      const { height } = tagRef.current.getBoundingClientRect();
      setTagInputHeight(height);
    }
  }, []);

  const addTag = async (tag?: Tag) => {
    var newTag: Tag;

    if (tag) {
      newTag = tag;
    } else {
      try {
        if (newTagName.length === 0) {
          setTagError("The tag must have a value");
          return;
        }

        newTag = (
          await createTagMutation.mutateAsync({
            id: undefined,
            tag: newTagName,
            color: color,
            description: newTagDescription,
          })
        ).data;
      } catch (error) {
        console.error(error);
        return;
      }
    }

    append(newTag);
    setNewTagName("");
    setNewTagDescription("");
    setTagError("");
  };

  const removeTag = async (index: number) => {
    try {
      remove(index);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-1">
      <div className="mb-1">
        <InputGroup>
          <Dropdown
            show={showDropdown}
            onToggle={() => setShowDropdown(!showDropdown)}>
            <FloatingLabel controlId="floatingNameInput" label="Tag Name">
              <Form.Control
                type="text"
                onChange={(event) => setNewTagName(event.target.value)}
                value={newTagName}
                onClick={() => setShowDropdown(!showDropdown)}
                ref={tagRef}
              />
            </FloatingLabel>

            <Dropdown.Menu
              className="w-100"
              style={{ marginTop: `${tagInputHeight}px` }}>
              {tagQuery && tagQuery.length > 0 ? (
                tagQuery
                  .filter((tag) => {
                    const term = newTagName.toLowerCase();
                    const tagName = tag.tag.toLowerCase();

                    if (term.length > 0 && !tagName.startsWith(term)) {
                      // Remove any tags that don't match the search term, if there is a term
                      return false;
                    }

                    return !fields.some(
                      (fieldsTag) => fieldsTag.tag.toLowerCase() === tagName,
                    ); // Remove any existing tags from the search
                  })
                  .map((tag, index) => (
                    <Dropdown.Item
                      key={`db-tags-${index}`}
                      onClick={() => addTag(tag)}>
                      <TagBadge {...tag} />
                    </Dropdown.Item>
                  ))
              ) : (
                <Dropdown.Item disabled>No tags were found</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <FloatingLabel
            controlId="floatingDescriptionInput"
            label="Tag Description">
            <Form.Control
              type="text"
              onChange={(event) => setNewTagDescription(event.target.value)}
              value={newTagDescription}
            />
          </FloatingLabel>
          <Form.Control
            type="color"
            className="form-control"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            style={{ height: `${tagInputHeight}px` }}
          />
          <Button variant="warning" onClick={() => addTag()}>
            Add
          </Button>
        </InputGroup>
        <div className="form-text text-danger">{tagError}</div>
      </div>

      {fields.map((field, index) => (
        <TagBlock
          key={`tag-${field.id}`}
          control={control}
          name={`tags.${index}`}
          onDelete={() => removeTag(index)}
        />
      ))}
    </div>
  );
};

export default TagInput;
