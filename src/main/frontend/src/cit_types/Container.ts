import { ContainerItem, ContainerItemSchema } from './ContainerItem';
import { z } from 'zod';

export type ContainerType = {
    id: number;
    name: string;
    description?: string;
    scannerId: string;
    parentContainer?: string;
    containerItems?: ContainerItem[];
};

export type ContainerDTO = {
    name: string;
    scannerId: string
};

export const ContainerSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    scannerId: z.string(),
    parentContainer: z.string().optional(),
    containerItems: z.array(ContainerItemSchema).optional(),
});

export type ContainerResponse = {
    content: ContainerType[];
    totalPages: number;
};