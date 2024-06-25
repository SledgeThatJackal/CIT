import { z } from 'zod';

export type Tag = {
    id: number;
    tag: string;
    color: string;
};

export const TagSchema = z.object({
    id: z.number(),
    tag: z.string({message: 'A tag is required'}),
    color: z.string(),
});

export type TagSchemaType = z.infer<typeof TagSchema>;