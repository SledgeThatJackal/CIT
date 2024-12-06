import { ZodItemType } from "./General";

export type TypeAttribute = {
  id?: number;
  itemType?: ZodItemType;
  displayOrder?: number;
  columnTitle?: string;
  dataType?: string;
  stringDefaultValue?: string;
  numberDefaultValue?: number;
};
