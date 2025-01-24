import AxiosInstance from "@services/AxiosInstance";
import { ImageFind } from "../schemas/Image";

export const getImageFinds = async (
  containerName?: string,
  scannerId?: string,
  itemName?: string,
) => {
  let requestParams = "";

  if (containerName) {
    requestParams += `?containerName=${containerName}`;
  }

  if (scannerId) {
    if (containerName) {
      requestParams += "&";
    }

    requestParams += `?scannerId=${scannerId}`;
  }

  if (itemName) {
    if (scannerId || containerName) {
      requestParams += "&";
    }

    requestParams += `?itemName=${itemName}`;
  }

  return (await AxiosInstance.get<ImageFind[]>(`/image/find${requestParams}`))
    .data;
};

export const getImageFindsTotal = async () => {
  return (await AxiosInstance.get<number>(`/image/find/total`)).data;
};
