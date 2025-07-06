import axios from "axios";

import { BASE_URL } from "../../../config-global";

const axiosInstance = axios.create({
  // Note: In production (Vercel), we use a different `baseURL` because Vercel requires secure HTTPS requests, while our backend only supports HTTP. For local development, we can use the backend's HTTP endpoint directly.

  baseURL:
    import.meta.env.MODE === "production" ? "/api/proxy-request" : BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosInstance;
