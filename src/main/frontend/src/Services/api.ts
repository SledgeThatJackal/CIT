import axios from "axios";

import { ContainerType } from "@container/schemas/Container";
import { ZodContainerType } from "@item/schemas/Item";
import { Tag, TagCreate } from "@schema/Tag";
import { ImageType } from "@schema/Image";
import omit from "lodash.omit";

// Containers

// Query
export const getContainers = async () => {
  return (await axios.get<ZodContainerType[]>(`/api/container`)).data;
};

export const getDetailedContainers = async () => {
  return (await axios.get<ContainerType[]>(`/api/container/detail`)).data;
};

// Mutate
export const createContainer = async (
  container: ContainerType,
  id?: number,
) => {
  const data = omit(container, ["id"]);

  await axios.post(`/api/container/create?id=${id}`, data);
};

export const updateContainer = async (data: ContainerType) => {
  await axios.put(`/api/container/edit`, data);
};

export const updateParentContainer = async (
  id: number,
  parentContainerId: number,
) => {
  await axios.put(
    `/api/container/edit-parent?id=${id}&parentId=${parentContainerId}`,
  );
};

export const deleteContainer = async (id: number) => {
  await axios.delete(`/api/container/delete?id=${id}`);
};

// Links

// Query

// Mutate
export const createLink = async (
  itemId: number,
  containerId: number,
  quantity: number,
) => {
  await axios.post(
    `/api/link?itemId=${itemId}&containerId=${containerId}&quantity=${quantity}`,
  );
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

export const deleteTag = async (id: number) => {
  await axios.delete(`/api/tags/delete?id=${id}`);
};

// Images

// Query
export const getImages = async () => {
  return (await axios.get<ImageType[]>(`/api/image`)).data;
};

// Muatate
export const createImage = async (data: FormData) => {
  return (
    await axios.post(`/api/image/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};
