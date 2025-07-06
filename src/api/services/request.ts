import axiosInstance from "@src/api/configs/axiosInstance";
import { FinancingFormValues } from "@src/types";

export const submitFinancingRequest = async (data: FinancingFormValues) => {
  // Note: The HTTPS requirement also applies here, so the endpoint changes based on whether the environment is production or development.

  const isProd = import.meta.env.MODE === "production";
  const endpoint = isProd ? "/" : "/requests";

  return axiosInstance.post(endpoint, data);
};
