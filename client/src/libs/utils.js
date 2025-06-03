import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const logOnDev = (message) => {
  if (import.meta.env.MODE === "development") {
    console.log(message);
  }
};

const onResponse = (response) => {
  const { method, url } = response.config;
  const { status } = response;

  logOnDev(`[${method?.toUpperCase()}] ${url} - ${status}`);

  return response;
};

const onRequest = (config) => {
  const { method, url } = config;

  logOnDev(`[${method?.toUpperCase()}] ${url}`);

  if (method === "get") {
    config.timeout = 1000 * 60 * 10;
  }

  return config;
};

const onErrorResponse = async (error) => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config;

    logOnDev(`[${method?.toUpperCase()}] ${url} - ${message}`);

    // Xử lý khi AccessToken hết hạn (401)
    // if (error.response?.status === 401) {
    //   location.href = "/login";
    //   return;
    // }

    if (error.response?.status !== 410) {
      console.log(
        `🚨 [API] | Error ${error?.response?.status} - ${
          error?.message || "Unknown error"
        }`
      );
    }
  } else {
    logOnDev(`🚨 [API] | Error ${error?.message || "Unknown error"}`);
  }

  return Promise.reject(error);
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
  timeout: 1000 * 60 * 10,
});

// Thêm Interceptors
axiosInstance.interceptors.request.use(onRequest, onErrorResponse);
axiosInstance.interceptors.response.use(onResponse, onErrorResponse);

export { axiosInstance };
