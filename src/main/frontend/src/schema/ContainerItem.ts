import { ContainerType } from "@container/schemas/Container";
import { Item } from "@item/schemas/Item";

export type ContainerItem = {
  id?: number;
  container?: ContainerType;
  item?: Item;
  quantity: number;
};
