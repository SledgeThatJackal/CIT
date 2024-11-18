import React, { useRef } from "react";
import {
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Image } from "@schema/Image";
import { useCreateImage } from "@services/mutations";
import { ItemSchemaType } from "@item/schemas/Item";

const ImageInput = () => {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const { control } = useFormContext<ItemSchemaType>();
  const createImageMutation = useCreateImage();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "images",
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const data = new FormData();
      const files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        data.append("image", files[i]);
      }

      const images: Image[] = await createImageMutation.mutateAsync(data);
      append(images);
    }
  };

  const handleButtonClick = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  return (
    <Container className="rounded mb-1" style={{ background: "#d4d5d6" }}>
      <Row>
        <Col className="p-0">
          <Form.Control
            type="file"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            style={{ display: "none" }}
            ref={fileUploadRef}
          />
          <InputGroup
            title={
              fields.length < 1 ? "No file chosen" : `${fields.length} files`
            }>
            <Button
              variant="secondary"
              id="customFileInput"
              style={{ width: "10%" }}
              onClick={handleButtonClick}>
              Choose File(s)
            </Button>
            <InputGroup.Text
              as="label"
              htmlFor="customFileInput"
              style={{ cursor: "pointer", width: "90%" }}>
              {fields.length < 1 ? "No file chosen" : `${fields.length} files`}
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      {fields.map((field, index) => (
        <Row key={`image-${field.id}`} className="pb-2 pt-2">
          <Col as={Stack} direction="horizontal" gap={2}>
            <CloseButton onClick={() => remove(index)} />
            <div className="text-dark">{field.fileName}</div>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ImageInput;
