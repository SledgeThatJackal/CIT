import { ZodItemType } from "@schema/General";
import { CellContext } from "@tanstack/react-table";
import { create } from "zustand";

type AttributeState<T, S extends ZodItemType> = {
  context?: CellContext<T, S>;
  setContext: (context: CellContext<T, S>) => void;
};

export const useAttributeState = create<AttributeState<any, any>>((set) => ({
  context: undefined,
  setContext: (context) => set({ context }),
}));
