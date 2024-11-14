import { create } from "zustand";

type ModalState = {
  showModal: boolean;
  message?: string;
  onDelete?: () => void;
  openModal: (onDelete: () => void, message: string) => void;
  closeModal: () => void;
};

export const useModalState = create<ModalState>((set) => ({
  showModal: false,
  message: "",
  onDelete: undefined,
  openModal: (onDelete: () => void, message: string) =>
    set({ showModal: true, onDelete: onDelete, message: message }),
  closeModal: () => set({ showModal: false, onDelete: undefined, message: "" }),
}));
