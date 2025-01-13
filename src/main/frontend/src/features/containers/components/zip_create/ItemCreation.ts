import { ContainerType } from "@container/schemas/Container";
import { ContainerImageType, ImageType } from "@schema/Image";

export const createImagesArray = (selectedImages: ContainerImageType[]) =>
  selectedImages.map((currentImage, index) => ({
    imageOrder: index,
    image: currentImage.image,
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
