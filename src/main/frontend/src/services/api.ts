import { ContainerType } from "@container/schemas/Container";
import { ZodContainerType } from "@item/schemas/Item";
import { Tag, TagCreate } from "@schema/Tag";
import { ImageType } from "@schema/Image";
import omit from "lodash.omit";
import AxiosInstance from "./AxiosInstance";

// Containers

// Query
export const getContainers = async () => {
  return (await AxiosInstance.get<ZodContainerType[]>(`/container`)).data;
};

export const getDetailedContainers = async () => {
  return (await AxiosInstance.get<ContainerType[]>(`/container/detail`)).data;
};

// Mutate
export const createContainer = async (
  container: ContainerType,
  id?: number,
) => {
  const data = omit(container, ["id"]);

  await AxiosInstance.post(`/container/create?id=${id}`, data);
};

export const updateContainer = async (data: ContainerType) => {
  await AxiosInstance.put(`/container/edit`, data);
};

export const updateParentContainer = async (
  id: number,
  parentContainerId: number,
) => {
  await AxiosInstance.put(
    `/container/edit-parent?id=${id}&parentId=${parentContainerId}`,
  );
};

export const deleteContainer = async (id: number) => {
  await AxiosInstance.delete(`/container/delete?id=${id}`);
};

export const zipContainerCreate = async (data: FormData) => {
  await AxiosInstance.post("/bulk", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Links

// Query

// Mutate
export const createLink = async (
  itemId: number,
  containerId: number,
  quantity: number,
) => {
  await AxiosInstance.post(
    `/link?itemId=${itemId}&containerId=${containerId}&quantity=${quantity}`,
  );
};

export const updateQuantity = async (quantity: number, id: number) => {
  await AxiosInstance.put(`/link?quantity=${quantity}&id=${id}`);
};

export const deleteLink = async (id: number) => {
  await AxiosInstance.delete(`/link?id=${id}`);
};

// Tags

//Query
export const getTags = async () => {
  return (await AxiosInstance.get<Tag[]>(`/tags`)).data;
};

// Mutate
export const createTag = async (data: TagCreate) => {
  return await AxiosInstance.post(`/tags/create`, data);
};

export const updateTag = async (data: Tag) => {
  await AxiosInstance.put(`/tags/edit`, data);
};

export const deleteTag = async (id: number) => {
  await AxiosInstance.delete(`/tags/delete?id=${id}`);
};

// Images

// Query
export const getImages = async () => {
  return (await AxiosInstance.get<ImageType[]>(`/image`)).data;
};

// Muatate
export const createImage = async (data: FormData) => {
  return (
    await AxiosInstance.post(`/image/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};
