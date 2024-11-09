import { create } from 'zustand';

type CanvasState = {
    showCanvas: boolean;
    title?: string;
    component: React.ComponentType | null;
    openCanvas: (component: React.ComponentType | null, title: string) => void;
    closeCanvas: () => void;
};

export const useCanvasState = create<CanvasState>((set) => ({
    showCanvas: false,
    title: "",
    component: null,

    openCanvas: (component, title) => set({ showCanvas: true, component, title }),
    closeCanvas: () => set({ showCanvas: false, component: null, title: "" }),
}));



