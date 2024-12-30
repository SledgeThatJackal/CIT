import { z } from "zod";

export type ImageType = {
  id: number;
  fileName: string;
};

export const ImageSchema = z.object({
  id: z.number(),
  fileName: z.string(),
});

export type ItemImageType = {
  itemId?: number;
  imageOrder: number;
  image: ImageType;
};

export const ItemImageSchema = z.object({
  itemId: z.number().optional(),
  imageOrder: z.number(),
  image: ImageSchema,
});

export type ContainerImageType = {
  containerId?: number;
  imageOrder: number;
  image: ImageType;
};

export const ContainerImageSchema = z.object({
  containerId: z.number().optional(),
  imageOrder: z.number(),
  image: ImageSchema,
});
