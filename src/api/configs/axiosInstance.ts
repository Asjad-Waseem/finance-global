import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://test-noema-api.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosInstance;
