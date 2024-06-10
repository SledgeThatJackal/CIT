import { ContainerItem } from './ContainerItem';

export type Item = {
    id: number;
    name: string;
    description: string;
    containerItems: ContainerItem[];
}