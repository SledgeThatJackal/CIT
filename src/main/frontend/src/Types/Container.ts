import { ContainerItem } from './ContainerItem';

export type Container = {
    id: number;
    name: string;
    description: string;
    scannerId: string;
    parentContainer: number;
    containerItems: ContainerItem[];
};

export type ContainerResponse = {
    content: Container[];
    totalPages: number;
};