import { ZodItemType } from "@schema/General";
import { TypeAttribute } from "@schema/Types";

export type AttributeForm = {
  typeAttributes: TypeAttribute[];
};

export type TypeFormDTO = {
  itemType: ZodItemType;
  typeAttributes?: AttributeForm["typeAttributes"];
};
