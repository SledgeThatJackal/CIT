import { ItemSchemaType } from "@item/schemas/Item";
import { ImageType } from "@schema/Image";
import { useCreateImage } from "@services/mutations";
import React from "react";
import { Container } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import ImageInput from "./ImageInput";
import { imageOnChange } from "./ImageOnChange";
import { ContainerType } from "@container/schemas/Container";

const ImageForm = () => {
  const { control } = useFormContext<ItemSchemaType | ContainerType>();
  const createImageMutation = useCreateImage();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "images",
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const data = imageOnChange(event);

    if (data) {
      const images: ImageType[] = await createImageMutation.mutateAsync(data);
      const imageEntities = images.map((image) => {
        return { imageOrder: 1, image: image };
      });

      append(imageEntities);
    }
  };

  const handleAdd = (image: ImageType) => {
    append({ imageOrder: 1, image: image });
  };

  const handleRemove = (image: ImageType) => {
    const index = fields.findIndex(
      (field) => field.image.fileName === image.fileName,
    );

    if (index !== -1) remove(index);
  };

  return (
    <Container className="rounded mb-1" style={{ background: "#d4d5d6" }} fluid>
      <ImageInput
        data={fields.map((field) => {
          return field.image;
        })}
        onChange={handleFileChange}
        onRemove={(index: number) => remove(index)}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        buttonWidth={10}
      />
    </Container>
  );
};

export default ImageForm;
