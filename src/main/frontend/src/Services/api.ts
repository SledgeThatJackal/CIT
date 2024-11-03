import axios from 'axios';

import { Item, ItemSchemaType } from '../Types/Item';
import { Tag, TagCreate } from '../Types/Tag';
import { Container } from '../Types/Container';

// Items

    // Query
export const getItem = async (id: number) => {
    return (await axios.get<Item>(`/api/item/id?id=${id}`)).data;
};

export const getItems = async () => {
    return (await axios.get<Item[]>("/api/item")).data;
};

    // Mutate
export const createItem = async (data: ItemSchemaType) => {
    await axios.post(`/api/item/create`, data);
};

export const updateItem = async (data: Item) => {
    await axios.put(`/api/item/edit`, data);
};

export const deleteItem = async (id: number) => {
    await axios.delete(`/api/item/delete?id=${id}`);
};

// Containers
export const getContainers = async () => {
    return (await axios.get<Container[]>(`/api/container`)).data;
};

// Links
    // Query

    // Mutate
export const createLink = async (itemId: number, containerId: number, quantity: number) => {
    await axios.post(`/api/link?itemId=${itemId}&containerId=${containerId}&quantity=${quantity}`);
};

export const updateQuantity = async (quantity: number, id: number) => {
    await axios.put(`/api/link?quantity=${quantity}&id=${id}`);
};

export const deleteLink = async (id: number) => {
    await axios.delete(`/api/link?id=${id}`);
};

// Tags

    //Query
export const getTags = async () => {
    return (await axios.get<Tag[]>(`/api/tags`)).data;
};

    // Mutate
export const createTag = async (data: TagCreate) => {
    return await axios.post(`/api/tags/create`, data);
};

export const updateTag = async (data: Tag) => {
    await axios.put(`/api/tags/edit`, data);
};

export const deleteTag = async(id: number) => {
    await axios.delete(`/api/tags/delete?id=${id}`);
};

// Types
