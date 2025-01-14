import { ContainerType } from "@container/schemas/Container";
import { ItemImageRequest } from "@item/schemas/Item";
import { ContainerImageType, ImageType } from "@schema/Image";

export const createImagesArray = (selectedImages: ContainerImageType[]) =>
  selectedImages.map((currentImage, index) => ({
    imageOrder: index,
    image: currentImage.image,
  }));

export const createItemImagesArray = (
  id: number,
  selectedImages: ContainerImageType[],
): ItemImageRequest[] =>
  selectedImages.map((currentImage, index) => ({
    imageOrder: index,
    image: currentImage.image,
    item: {
      id: id,
    },
  }));

export const createItem = (
  container: ContainerType,
  images: {
    imageOrder: number;
    image: ImageType;
  }[],
) => ({
  id: -1,
  name: `${container.name}-Item${(container.containerItems?.length || 0) + 1}`,
  description: undefined,
  containerItems: [
    {
      id: undefined,
      quantity: 1,
      container: {
        id: container.id,
        name: container.name,
        scannerId: container.scannerId,
      },
    },
  ],
  tags: [],
  itemType: {
    id: -1,
    name: "",
  },
  images: images,
  itemAttributes: [],
});
