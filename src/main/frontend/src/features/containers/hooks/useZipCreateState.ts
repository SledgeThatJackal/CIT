import { ContainerType } from "@container/schemas/Container";
import { Row } from "@tanstack/react-table";
import { create } from "zustand";

type ZipCreateState = {
  row?: Row<ContainerType>;
  showModal: boolean;
  openModal: (
    row: Row<ContainerType>,
    deleteLink?: (value: any) => void,
  ) => void;
  closeModal: () => void;
  deleteLink?: (value: any) => void;
};

export const useZipCreateState = create<ZipCreateState>((set) => ({
  row: undefined,
  showModal: false,
  deleteLink: undefined,

  openModal: (row, deleteLink) => set({ row, deleteLink, showModal: true }),
  closeModal: () => set({ showModal: false }),
}));
