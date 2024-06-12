import { ContainerItem } from './ContainerItem';
import { Container } from './Container';

export type Item = {
    id: number;
    name: string;
    description: string;
    containerItems: ContainerItem[];
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
    id: number;
};

export type ItemCreationDTO = {
    item: Item;
    links: LinkDTO[];
};