import { z } from "zod";
import { TagSchema } from "../../../schema/Tag";
import { ItemTypeSchema } from "@schema/General";
import { ContainerImageSchema, ContainerImageType } from "@schema/Image";

export type ContainerType = {
  id: number;
  name: string;
  description?: string;
  scannerId: string;
  parentContainer?: ContainerType;
  containerItems?: ZodContainerItemSchema[];
  images?: ContainerImageType[];
};

const ItemSchema = z.object({
  id: z.number().optional(),
  name: z.string({ message: "The Item name is required" }),
  description: z.string().optional(),
  tags: z.array(TagSchema).optional(),
  itemType: ItemTypeSchema.optional(),
});

export const ContainerItemSchema = z.object({
  id: z.number().optional(),
  item: ItemSchema.optional(),
  itemId: z.number().optional(),
  containerId: z.number().optional(),
  quantity: z.number(),
});

const BaseContainerSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  scannerId: z.string(),
  containerItems: z.array(ContainerItemSchema).optional(),
  images: z.array(ContainerImageSchema).optional(),
});

const ParentContainerSchema = z.object({
  parentContainer: BaseContainerSchema,
});

export const ContainerSchema = BaseContainerSchema.merge(ParentContainerSchema);

export type ZodContainerType = z.infer<typeof ContainerSchema>;

export type ZodItemSchema = z.infer<typeof ItemSchema>;

export type ZodContainerItemSchema = z.infer<typeof ContainerItemSchema>;
