import axios from 'axios';

import { Item } from '../Types/Item';
import { Tag, TagSchemaType } from '../Types/Tag';

// Items

    // Query
export const getItem = async (id: number) => {
    return (await axios.get<Item>(`/api/item/id?id=${id}`)).data;
};

export const getItems = async () => {
    return (await axios.get<Item[]>("/api/item")).data;
};

    // Mutate
export const createItem = async (data: Item) => {
    await axios.post(`/api/item/create`, data);
};

export const updateItem = async (data: Item) => {
    await axios.put(`/api/item/edit`, data);
};

export const deleteItem = async (id: number) => {
    await axios.delete(`/api/item/delete?id=${id}`);
};

// Containers


// Tags

    //Query
export const getTags = async () => {
    return (await axios.get<Tag[]>(`/api/tags`)).data;
};

    // Mutate
export const createTag = async (data: Tag) => {
    return axios.post(`/api/tags/create`, data);
};

export const updateTag = async (data: Tag) => {
    return axios.put(`/api/tags/edit`, data);
};

export const deleteTag = async(id: number) => {
    await axios.delete(`/api/tags/delete?id=${id}`);
};

// Types
