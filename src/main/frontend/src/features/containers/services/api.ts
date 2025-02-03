import { ContainerType, ZodContainerType } from "@container/schemas/Container";
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

export const getOrphanContainers = async () => {
  return (await AxiosInstance.get<ZodContainerType[]>(`/container/orphan`))
    .data;
};

export const deleteContainerImageLinks = async (data: { id: number }[]) => {
  await AxiosInstance.post(`/zip/delete`, data);
};
