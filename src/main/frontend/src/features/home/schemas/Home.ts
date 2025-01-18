import { ZodItemType } from "@schema/General";

export type HomeType = {
  numberOfContainers: number;
  numberOfItems: number;
  itemTypes: {
    a: ZodItemType;
    b: number;
  }[];
};
