import { AttributeForm } from "@features/settings/schema/Type";
import { ZodItemType } from "@schema/General";
import { create } from "zustand";

type EditState = {
  itemType?: ZodItemType;
  typeAttributes?: AttributeForm;
  setProps: (itemType: ZodItemType, typeAttributes?: AttributeForm) => void;
  clearProps: () => void;
};

export const useEditState = create<EditState>((set) => ({
  itemType: undefined,
  typeAttributes: undefined,
  setProps: (itemType: ZodItemType, typeAttributes?: AttributeForm) =>
    set({ itemType, typeAttributes }),
  clearProps: () => set({ itemType: undefined, typeAttributes: undefined }),
}));
