import { ContainerItem, ContainerItemSchema } from './ContainerItem';
import { z } from 'zod';

export type Container = {
    id: number;
    name: string;
    description?: string;
    scannerId: string;
    parentContainer?: number;
    containerItems?: ContainerItem[];
};

export const ContainerSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    scannerId: z.string(),
    parentContainer: z.number().optional(),
    containerItems: z.array(ContainerItemSchema).optional(),
});

export type ContainerResponse = {
    content: Container[];
    totalPages: number;
};