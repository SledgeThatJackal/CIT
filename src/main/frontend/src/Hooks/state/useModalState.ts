import { create } from "zustand";

type ModalState = {
  showModal: boolean;
  title: string;
  buttonLabel: string;
  message?: string;
  onDelete?: () => void;
  openModal: (
    title: string,
    buttonLabel: string,
    onDelete: () => void,
    message: string,
  ) => void;
  closeModal: () => void;
};

export const useModalState = create<ModalState>((set) => ({
  showModal: false,
  title: "",
  buttonLabel: "",
  message: "",
  onDelete: undefined,
  openModal: (
    title: string,
    buttonLabel: string,
    onDelete: () => void,
    message: string,
  ) => set({ showModal: true, title, buttonLabel, onDelete, message }),
  closeModal: () =>
    set({
      showModal: false,
      title: "",
      buttonLabel: "",
      onDelete: undefined,
      message: "",
    }),
}));
