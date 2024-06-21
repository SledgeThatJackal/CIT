import { Item, ItemSchema } from './Item';

import { z } from 'zod';

export type Tag = {
    id: number;
    name: string;
    color: string;
    items?: Item[];
};

export const TagSchema = z.object({
    id: z.number(),
    name: z.string({message: 'A tag is required'}),
    color: z.string(),
});