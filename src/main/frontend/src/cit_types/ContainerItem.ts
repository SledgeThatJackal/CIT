import { ContainerType } from './Container';
import { Item } from './Item';
import { z } from 'zod';

export type ContainerItem = {
    id?: number;
    container?: ContainerType;
    item?: Item;
    quantity: number;
};

const ContainerSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    scannerId: z.string(),
    parentContainer: z.string().optional()
});

export const ContainerItemSchema = z.object({
    id: z.number().optional(),
    container: ContainerSchema.optional(),
    quantity: z.number(),
});