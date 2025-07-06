import axiosInstance from "@src/api/configs/axiosInstance";
import { FinancingFormValues } from "@src/types";

export const submitFinancingRequest = async (data: FinancingFormValues) => {
  return axiosInstance.post("/requests", data);
};
