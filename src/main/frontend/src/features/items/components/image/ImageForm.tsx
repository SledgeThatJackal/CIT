import { ItemSchemaType } from "@item/schemas/Item";
import { ImageType } from "@schema/Image";
import { useCreateImage } from "@services/mutations";
import React from "react";
import { Container } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import ImageInput from "./ImageInput";
import { imageOnChange } from "./ImageOnChange";

const ImageForm = () => {
  const { control } = useFormContext<ItemSchemaType>();
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
      append(images);
    }
  };

  return (
    <Container className="rounded mb-1" style={{ background: "#d4d5d6" }}>
      <ImageInput
        data={fields}
        onChange={handleFileChange}
        onRemove={(index: number) => remove(index)}
        buttonWidth={10}
      />
    </Container>
  );
};

export default ImageForm;
