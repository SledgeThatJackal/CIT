import { ZodItemType } from "@schema/General";
import { CellContext } from "@tanstack/react-table";
import { create } from "zustand";

type AttributeState<T, S extends ZodItemType> = {
  context?: CellContext<T, S>;
  data?: any[];
  setContext: (context: CellContext<T, S>) => void;
  setData: (data: any[]) => void;
};

export const useAttributeState = create<AttributeState<any, any>>((set) => ({
  context: undefined,
  data: undefined,
  setContext: (context) => set({ context }),
  setData: (data) => set({ data }),
}));
