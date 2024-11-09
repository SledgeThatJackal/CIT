import { create } from "zustand";
import { Item } from "../schemas/Item";

type ActionState = {
  item?: Item;
  callerId?: number;
  updateAction: (item?: Item, callerId?: number) => void;
  clearAction: () => void;
};

export const useActionState = create<ActionState>((set) => ({
  item: undefined,
  callerId: undefined,

  updateAction: (item?: Item, callerId?: number) => set({ item, callerId }),
  clearAction: () => set({ item: undefined, callerId: undefined }),
}));
