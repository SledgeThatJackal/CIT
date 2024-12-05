import { OffcanvasPlacement } from "react-bootstrap/esm/Offcanvas";
import { create } from "zustand";

type CanvasState = {
  showCanvas: boolean;
  title?: string;
  placement: OffcanvasPlacement;
  component: React.ComponentType | null;
  openCanvas: (
    component: React.ComponentType | null,
    placement: OffcanvasPlacement,
    title: string,
  ) => void;
  closeCanvas: () => void;
};

export const useCanvasState = create<CanvasState>((set) => ({
  showCanvas: false,
  title: "",
  placement: "bottom",
  component: null,

  openCanvas: (component, placement, title) =>
    set({ showCanvas: true, component, placement, title }),
  closeCanvas: () => set({ showCanvas: false }),
}));
