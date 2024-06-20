import { ContainerItem, ContainerItemSchema } from './ContainerItem';
import { Container } from './Container';
import { z } from 'zod';

export type Item = {
    id: number;
    name: string;
    description?: string;
    containerItems?: ContainerItem[];
};

export type ItemResponse = {
    content: ItemDTO[];
    totalPages: number;
};

export type ItemDTO = {
    item: Item;
    containers: Container[];
};

export type LinkDTO = {
    scannerId: string;
    quantity: number;
    linkId: number;
};

export type ItemCreationDTO = {
    item: Item;
    links: LinkDTO[];
};

export const ItemSchema = z.object({
    id: z.number(),
    name: z.string({message: 'The Item name is required'}),
    description: z.string().optional(),
    containerItems: z.array(ContainerItemSchema).optional(),
});