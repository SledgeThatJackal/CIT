import { useAttributeState } from "@item/hooks/useAttributeState";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageInput from "./ImageInput";
import { ImageType } from "@schema/Image";
import { useCreateImage } from "@services/mutations";
import { imageOnChange } from "./ImageOnChange";

const ImageEdit = () => {
  const { context, setData } = useAttributeState();
  const [images, setImages] = useState<ImageType[]>(context?.getValue() || []);
  const createImageMutation = useCreateImage();

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = imageOnChange(event);
    if (data) {
      const newImages: ImageType[] =
        await createImageMutation.mutateAsync(data);

      const combinedImages = [
        ...new Map(
          [...newImages, ...images].map((item) => [item.id, item]),
        ).values(),
      ];

      setImages(combinedImages);
    }
  };

  const onRemove = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleAdd = (image: ImageType) => {
    setImages((prev) => [...prev, image]);
  };

  const handleRemove = (image: ImageType) => {
    setImages((prev) =>
      prev.filter((element) => element.fileName !== image.fileName),
    );
  };

  useEffect(() => {
    setData(images);
  }, [images]);

  return (
    <Container>
      <ImageInput
        data={images}
        onChange={onChange}
        onRemove={onRemove}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        buttonWidth={20}
      />
    </Container>
  );
};

export default ImageEdit;
