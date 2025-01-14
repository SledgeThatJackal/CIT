import { z } from "zod";
import { Tag, TagSchema } from "@schema/Tag";
import { ItemTypeSchema, ZodItemType } from "@schema/General";
import { TypeAttribute } from "@schema/Types";
import { ImageType, ItemImageSchema, ItemImageType } from "@schema/Image";

export type Item = {
  id: number;
  name: string;
  description?: string;
  containerItems?: ZodContainerItemType[];
  tags?: Tag[];
  itemType?: ZodItemType;
  images?: ItemImageType[];
  totalQuantity?: number;
  externalUrl?: string;
  itemAttributes: ItemAttributes[];
};

type ItemAttributes = {
  id: number;
  typeAttribute: TypeAttribute;
  stringValue?: string;
  numberValue?: number;
  itemid: number;
};

const ContainerSchema = z.object({
  id: z.number(),
  name: z.string(),
  scannerId: z.string(),
});

export const ContainerItemSchema = z.object({
  id: z.number().optional(),
  container: ContainerSchema.optional(),
  quantity: z.number(),
});

export const ItemSchema = z.object({
  id: z.number().optional(),
  name: z.string({ message: "The Item name is required" }),
  description: z.string().optional(),
  containerItems: z.array(ContainerItemSchema).optional(),
  tags: z.array(TagSchema).optional(),
  itemType: ItemTypeSchema.optional(),
  images: z.array(ItemImageSchema).optional(),
  externalUrl: z.string().optional(),
});

export type ItemSchemaType = z.infer<typeof ItemSchema>;

export type ZodContainerType = z.infer<typeof ContainerSchema>;

export type ZodContainerItemType = z.infer<typeof ContainerItemSchema>;

export type ItemAttribute = {
  id?: number;
  typeAttribute: TypeAttribute;
  item?: Item;
  stringValue?: string;
  numberValue?: number;
};

export type ItemAttributeData = {
  attributes: {
    typeAttribute: TypeAttribute;
    stringValue?: string;
    numberValue?: number;
    duplicate: boolean;
  }[];
};

export type ItemFormDTO = {
  item: ItemSchemaType;
  itemAttributes: ItemAttributeData["attributes"];
};

export type ItemPageResponse = {
  _embedded: {
    itemList: Item[];
  };
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
};

export type ItemImageRequest = {
  imageOrder: number;
  image: ImageType;
  item: {
    id: number;
  };
};
