import { useAttributeState } from "@item/hooks/useAttributeState";
import React, { useEffect, useMemo, useState } from "react";
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

      const newImages = fetchedImages.map((image, index) => {
        return { imageOrder: images.length + index, image: image };
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

      newImages.forEach(
        (image, currentIndex) => (image.imageOrder = currentIndex),
      );

      return newImages;
    });
  };

  const handleAdd = (image: ImageType, order: number) => {
    setImages((prev) => [...prev, { imageOrder: order, image: image }]);
  };

  const handleRemove = (image: ImageType) => {
    setImages((prev) =>
      prev.filter((element) => element.image.fileName !== image.fileName),
    );
  };

  const handleDragEnd = (images: ImageType[]) => {
    setImages((prev) => {
      return prev.map((image) => {
        const newIndex = images.findIndex((img) => img.id === image.image.id);

        return { ...image, imageOrder: newIndex };
      });
    });
  };

  useEffect(() => {
    setData(images);
  }, [images, setData]);

  const imageData = useMemo(
    () =>
      images
        .sort((a, b) => a.imageOrder - b.imageOrder)
        .map((field) => field.image),
    [images],
  );

  return (
    <Container>
      <ImageInput
        data={imageData}
        onChange={onChange}
        onRemove={onRemove}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        onDragEnd={handleDragEnd}
        buttonWidth={20}
      />
    </Container>
  );
};

export default ImageEdit;
