import { Variant } from "react-bootstrap/esm/types";
import { create } from "zustand";

type ModalState = {
  showModal: boolean;
  title: string;
  buttonLabel: string;
  message?: string;
  component: React.ComponentType | null;
  caller?: { id: number; condition: boolean };
  variant?: Variant;
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
    caller?: { id: number; condition: boolean },
    variant?: Variant,
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
    caller?: { id: number; condition: boolean },
    variant?: Variant,
  ) =>
    set({
      showModal: true,
      title,
      buttonLabel,
      onDelete,
      component,
      variant,
      caller,
    }),
  closeModal: () =>
    set({
      showModal: false,
      title: "",
      buttonLabel: "",
      onDelete: undefined,
      message: "",
      caller: undefined,
      variant: undefined,
    }),
}));
