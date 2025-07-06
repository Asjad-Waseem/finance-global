import axios from "axios";

import { BASE_URL } from "../../../config-global";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "production" ? "/api/proxy-request" : BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosInstance;
