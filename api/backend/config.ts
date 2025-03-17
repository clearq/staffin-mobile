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

    if (config.url === "/Auth/login") {
      return config;
    }

    const token = await getItem(AUTH_TOKEN);
    // console.log('token:',token);
    

    if (!token) {
      // Handle redirection to the login page using your navigation library
      console.error("No token found, redirecting to login.");
      return Promise.reject("No token found, redirecting to login.");
    }

    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  function (error) {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);


export default api;