import { ContainerType } from './Container';
import { Item } from './Item';

export type ContainerItem = {
    id?: number;
    container?: ContainerType;
    item?: Item;
    quantity: number;
};