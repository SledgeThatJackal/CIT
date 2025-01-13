import { ContainerType } from "@container/schemas/Container";
import { Row } from "@tanstack/react-table";
import { create } from "zustand";

type ZipCreateState = {
  row?: Row<ContainerType>;
  showModal: boolean;
  openModal: (row: Row<ContainerType>) => void;
  closeModal: () => void;
  setRow: (row: Row<ContainerType>) => void;
};

export const useZipCreateState = create<ZipCreateState>((set) => ({
  row: undefined,
  showModal: false,
  deleteLink: undefined,

  openModal: (row) => set({ row, showModal: true }),
  closeModal: () => set({ showModal: false }),
  setRow: (row) => set({ row }),
}));
