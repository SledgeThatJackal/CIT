import { z } from "zod";

export type ImageType = {
  id: number;
  fileName: string;
};

export const ImageSchema = z.object({
  id: z.number(),
  fileName: z.string(),
});
