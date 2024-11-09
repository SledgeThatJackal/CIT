import { z } from "zod";

export type Tag = {
  id: number;
  tag: string;
  color: string;
  description: string;
};

export type TagCreate = {
  id?: number;
  tag: string;
  color: string;
  description: string;
};

export const TagSchema = z.object({
  id: z.number(),
  tag: z.string({ message: "A tag is required" }),
  color: z.string(),
  description: z.string(),
});

export type TagSchemaType = z.infer<typeof TagSchema>;
