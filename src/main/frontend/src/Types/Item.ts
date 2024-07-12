import { ContainerItem, ContainerItemSchema } from './ContainerItem';
import { Container } from './Container';
import { Tag, TagSchema } from './Tag';
import { z } from 'zod';

export type Item = {
    id: number;
    name: string;
    description?: string;
    containerItems?: ContainerItem[];
    tags?: Tag[];
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
    linkId?: number;
};

export type ItemCreationDTO = {
    item: Item;
    links: LinkDTO[];
};

export const ItemSchema = z.object({
    id: z.number().optional(),
    name: z.string({message: 'The Item name is required'}),
    description: z.string().optional(),
    containerItems: z.array(ContainerItemSchema).optional(),
    tags: z.array(TagSchema).optional(),
});

export const LinkSchema = z.object({
    scannerId: z.string().optional(),
    quantity: z.number().positive({message: 'Quantity must be positive'}).optional(),
    linkId: z.number().optional().nullable(),
}).optional();

export const ItemFormSchema = z.object({
    item: ItemSchema,
    links: z.array(LinkSchema),
});

export type ItemFormSchemaType = z.infer<typeof ItemFormSchema>;