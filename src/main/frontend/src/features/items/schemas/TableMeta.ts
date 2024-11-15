import "@tanstack/react-table"; //or vue, svelte, solid, qwik, etc.
import { RowData } from "@tanstack/react-table";
import { ItemAttribute } from "./Item";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    handleRemove?: (id: number) => void;
    updateItemAttribute?: (ItemAttribute: ItemAttribute) => void;
  }
}
