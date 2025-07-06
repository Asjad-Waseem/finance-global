import axiosInstance from "@src/api/configs/axiosInstance";
import { FinancingFormValues } from "@src/types";

export const submitFinancingRequest = async (data: FinancingFormValues) => {
  const isProd = import.meta.env.MODE === "production";
  const endpoint = isProd ? "/" : "/requests";

  return axiosInstance.post(endpoint, data);
};
