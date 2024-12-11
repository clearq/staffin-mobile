import axios from "axios";

export const Staffin_API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})
