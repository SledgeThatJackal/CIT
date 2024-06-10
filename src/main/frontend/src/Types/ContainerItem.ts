import { Container } from './Container';
import { Item } from './Item';

export type ContainerItem = {
    id: number;
    container: Container;
    item: Item;
    quantity: number;
}