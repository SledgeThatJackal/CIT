import { create } from "zustand";

type DeleteModalState = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    deleteId?: number;
    setDeleteId: (deleteId: number) => void;
};

export const useDeleteModalState = create<DeleteModalState>((set) => ({
    showModal: false,
    setShowModal: (showModal: boolean) => set({ showModal }),

    deleteId: undefined,
    setDeleteId: (deleteId: number) => set({ deleteId }),
}));