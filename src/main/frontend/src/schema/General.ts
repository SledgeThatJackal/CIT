import { Row } from "@tanstack/react-table";
import { z } from "zod";

export type RefMethod = {
  showModal: () => void;
};

export const ItemTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type ZodItemType = z.infer<typeof ItemTypeSchema>;

export type DisplayCell<T> = {
  row: Row<T>;
};
