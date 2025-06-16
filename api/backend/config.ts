import { getItem } from "@/utils/asyncStorage";
import { baseURL } from "../host";
import axios from "axios";
import { AUTH_TOKEN } from "@/constants/key";

const api = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async function (config) {

    const token = await getItem(AUTH_TOKEN);
     if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);


export default api;