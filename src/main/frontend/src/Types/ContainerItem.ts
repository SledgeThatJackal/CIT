import { Container } from './Container';
import { Item } from './Item';
import { z } from 'zod';

export type ContainerItem = {
    id?: number;
    container: Container;
    item: Item;
    quantity: number;
};

export const ContainerItemSchema = z.object({
    id: z.number().optional(),
    quantity: z.number().optional(),
});