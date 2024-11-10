import "@tanstack/react-table"; //or vue, svelte, solid, qwik, etc.
import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateParentContainer?: (
      rowIndex: number,
      parentContainerId: number,
    ) => void;
  }
}
