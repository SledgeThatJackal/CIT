import { ContainerType } from "@container/schemas/Container";
import AxiosInstance from "@services/AxiosInstance";

export const getContainer = async (scannerId: string) => {
  return (await AxiosInstance.get<ContainerType>(`/container/${scannerId}`))
    .data;
};

export const deleteContainerImageLinks = async (data: { id: number }[]) => {
  await AxiosInstance.post(`/zip/delete`, data);
};
