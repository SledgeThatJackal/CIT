import { z } from "zod";
import { Tag, TagSchema } from "@schema/Tag";

export type Item = {
  id: number;
  name: string;
  description?: string;
  containerItems?: ZodContainerItemSchema[];
  tags?: Tag[];
};

const ContainerSchema = z.object({
  id: z.number(),
  name: z.string(),
  scannerId: z.string(),
});

export const ContainerItemSchema = z.object({
  id: z.number().optional(),
  containerId: z.number().optional(),
  container: ContainerSchema.optional(),
  item_id: z.number().optional(),
  quantity: z.number(),
});

export const ItemSchema = z.object({
  id: z.number().optional(),
  name: z.string({ message: "The Item name is required" }),
  description: z.string().optional(),
  containerItems: z.array(ContainerItemSchema).optional(),
  tags: z.array(TagSchema).optional(),
});

export type ItemSchemaType = z.infer<typeof ItemSchema>;

export type ZodContainerSchema = z.infer<typeof ContainerSchema>;

export type ZodContainerItemSchema = z.infer<typeof ContainerItemSchema>;