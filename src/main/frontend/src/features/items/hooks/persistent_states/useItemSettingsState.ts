import { SortingState, OnChangeFn } from "@tanstack/react-table";
import { create } from "zustand";

type TableSettingState = {
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;

  isBulkCreate: boolean;
  toggleBulkCreate: () => void;
};

export const useItemSettingsState = create<TableSettingState>((set) => ({
  sorting: JSON.parse(
    localStorage.getItem("sorting") || '[{ "id": "name", "desc": false }]',
  ),

  setSorting: (updaterOrValue) => {
    set((state) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(state.sorting)
          : updaterOrValue;

      localStorage.setItem("sorting", JSON.stringify(newSorting));

      return { sorting: newSorting };
    });
  },

  isBulkCreate: JSON.parse(localStorage.getItem("bulkCreate") || "false"),
  toggleBulkCreate: () => {
    set((state) => {
      const newBulkCreate = !state.isBulkCreate;

      localStorage.setItem("bulkCreate", JSON.stringify(newBulkCreate));

      return { isBulkCreate: newBulkCreate };
    });
  },
}));
