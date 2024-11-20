import { z } from "zod";
import { Tag, TagSchema } from "@schema/Tag";
import { ItemTypeSchema, ZodItemType } from "@schema/General";
import { TypeAttribute } from "@schema/Types";
import { ImageType, ImageSchema } from "@schema/Image";

export type Item = {
  id: number;
  name: string;
  description?: string;
  containerItems?: ZodContainerItemType[];
  tags?: Tag[];
  itemType?: ZodItemType;
  images?: ImageType[];
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
  itemType: ItemTypeSchema.optional(),
  images: z.array(ImageSchema).optional(),
});

export type ItemSchemaType = z.infer<typeof ItemSchema>;

export type ZodContainerType = z.infer<typeof ContainerSchema>;

export type ZodContainerItemType = z.infer<typeof ContainerItemSchema>;

export type ItemAttribute = {
  id?: number;
  typeAttribute: TypeAttribute;
  item?: Item;
  value: string;
};

export type ItemAttributeData = {
  attributes: {
    typeAttribute: TypeAttribute;
    value?: string;
  }[];
};

export type ItemFormDTO = {
  item: ItemSchemaType;
  itemAttributes: ItemAttributeData["attributes"];
};

export type ItemPageResponse = {
  content: ItemSchemaType[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  numberOfelements: number;
  first: boolean;
  empty: boolean;
};
