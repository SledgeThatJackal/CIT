import AxiosInstance from "@services/AxiosInstance";
import { HomeType } from "../schemas/Home";

export const getHomeData = async () => {
  return (await AxiosInstance.get<HomeType>(`/home`)).data;
};
