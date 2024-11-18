import { z } from "zod";

export type Image = {
  id: number;
  fileName: string;
};

export const ImageSchema = z.object({
  id: z.number(),
  fileName: z.string(),
});
