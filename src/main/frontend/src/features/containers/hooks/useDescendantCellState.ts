import { create } from "zustand";

type DescendantCellState = {
  orphans: number[];
  setOrphans: (orphans: number[]) => void;
};

export const useDescendantCellState = create<DescendantCellState>((set) => ({
  orphans: [],
  setOrphans: (orphans) => set({ orphans }),
}));
