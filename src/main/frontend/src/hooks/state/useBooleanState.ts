import { create } from "zustand";

type BooleanState = {
  isOn: boolean;
  toggle: (isOn: boolean) => void;
};

export const useBooleanState = create<BooleanState>((set) => ({
  isOn: false,
  toggle: (isOn) => set({ isOn }),
}));
