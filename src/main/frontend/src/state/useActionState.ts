import { create } from 'zustand';
import { Item } from '../cit_types/Item';

type ActionState = {
    item?: Item;
    setItem: (item?: Item) => void; 
    callerId?: number;
    setCallerId: (callerId?: number) => void;
    isVisible: boolean;
    setVisibility: (isVisible: boolean) => void;
    updateAction: (isVisible: boolean, item?: Item, callerId?: number) => void;
};

export const useActionState = create<ActionState>((set) => ({
    item: undefined,
    setItem: (item?: Item) => set({ item }),

    callerId: undefined,
    setCallerId: (callerId?: number) => set({ callerId }),

    isVisible: false,
    setVisibility: (isVisible: boolean) => set({ isVisible }),

    updateAction: (isVisible: boolean, item?: Item, callerId?: number) => set({ isVisible, item, callerId })
}));