import { useAttributeState } from "@item/hooks/useAttributeState";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageInput from "./ImageInput";
import { ContainerImageType, ImageType, ItemImageType } from "@schema/Image";
import { useCreateImage } from "@services/mutations";
import { imageOnChange } from "./ImageOnChange";

const ImageEdit = () => {
  const { context, setData } = useAttributeState();
  const [images, setImages] = useState<ItemImageType[] | ContainerImageType[]>(
    context?.getValue() || [],
  );
  const createImageMutation = useCreateImage();

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = imageOnChange(event);
    if (data) {
      const fetchedImages: ImageType[] =
        await createImageMutation.mutateAsync(data);

      const newImages = fetchedImages.map((image) => {
        return { imageOrder: 1, image: image };
      });

      const combinedImages = [
        ...new Map(
          [...newImages, ...images].map((item) => [item.image.id, item]),
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
    setImages((prev) => [...prev, { imageOrder: 1, image: image }]);
  };

  const handleRemove = (image: ImageType) => {
    setImages((prev) =>
      prev.filter((element) => element.image.fileName !== image.fileName),
    );
  };

  useEffect(() => {
    setData(images);
  }, [images]);

  return (
    <Container>
      <ImageInput
        data={images.map((field) => {
          return field.image;
        })}
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
