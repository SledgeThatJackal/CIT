import { create } from "zustand";

type ErrorState = {
  showError: boolean;
  errorMessage: string;
  displayError: (errorMessage: string) => void;
  closeError: () => void;
};

export const useErrorState = create<ErrorState>((set) => ({
  showError: false,
  errorMessage: "",
  displayError: (errorMessage) => set({ showError: true, errorMessage }),
  closeError: () => set({ showError: false, errorMessage: "" }),
}));
