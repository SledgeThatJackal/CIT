import AxiosInstance from "@services/AxiosInstance";

export const deleteContainerImageLinks = async (data: { id: number }[]) => {
  await AxiosInstance.post(`/zip/delete`, data);
};
