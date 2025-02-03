import { create } from "zustand";

type ModalState = {
  showModal: boolean;
  title: string;
  buttonLabel: string;
  message?: string;
  callerId?: number;
  component: React.ComponentType | null;
  onDelete?: () => void;
  openMessageModal: (
    title: string,
    buttonLabel: string,
    onDelete: () => void,
    message: string,
  ) => void;
  openElementModal: (
    title: string,
    buttonLabel: string,
    onDelete: () => void,
    component: React.ComponentType,
    callerId?: number,
  ) => void;
  closeModal: () => void;
};

export const useModalState = create<ModalState>((set) => ({
  showModal: false,
  title: "",
  buttonLabel: "",
  message: "",
  component: null,
  onDelete: undefined,
  openMessageModal: (
    title: string,
    buttonLabel: string,
    onDelete: () => void,
    message: string,
  ) => set({ showModal: true, title, buttonLabel, onDelete, message }),
  openElementModal: (
    title: string,
    buttonLabel: string,
    onDelete: () => void,
    component: React.ComponentType,
    callerId?: number,
  ) =>
    set({ showModal: true, title, buttonLabel, onDelete, component, callerId }),
  closeModal: () =>
    set({
      showModal: false,
      title: "",
      buttonLabel: "",
      onDelete: undefined,
      message: "",
    }),
}));
