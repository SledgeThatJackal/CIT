import { ContainerType } from "@container/schemas/Container";
import { ZodContainerType } from "@item/schemas/Item";
import AxiosInstance from "@services/AxiosInstance";

export const getContainer = async (scannerId: string) => {
  return (await AxiosInstance.get<ContainerType>(`/container/${scannerId}`))
    .data;
};

export const getContainersByArea = async (
  isArea: boolean,
  containerId: number,
) => {
  return (
    await AxiosInstance.get<ContainerType[]>(
      `/container/area?isArea=${isArea}&containerId=${containerId}`,
    )
  ).data;
};

export const getOrphanContainers = async (id: number, condition: boolean) => {
  return (
    await AxiosInstance.get<ZodContainerType[]>(
      `/container/orphan?id=${id}&isArea=${condition}`,
    )
  ).data;
};

export const addContainerDescendants = async (
  parentId: number,
  data: number[],
) => {
  await AxiosInstance.put(`/container/parent/${parentId}`, data);
};

export const deleteContainerImageLinks = async (data: { id: number }[]) => {
  await AxiosInstance.post(`/zip/delete`, data);
};
