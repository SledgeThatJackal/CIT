import { create } from "zustand";
import { Item } from "../schemas/Item";
import { ContainerType } from "@container/schemas/Container";

type ActionState = {
  item?: Item;
  container?: ContainerType;
  callerId?: number;
  updateItemAction: (item?: Item, callerId?: number) => void;
  updateContainerAction: (container?: ContainerType) => void;
  clearAction: () => void;
};

export const useActionState = create<ActionState>((set) => ({
  item: undefined,
  container: undefined,
  callerId: undefined,

  updateItemAction: (item?: Item, callerId?: number) => set({ item, callerId }),
  updateContainerAction: (container) => set({ container }),
  clearAction: () => set({ item: undefined, callerId: undefined }),
}));
