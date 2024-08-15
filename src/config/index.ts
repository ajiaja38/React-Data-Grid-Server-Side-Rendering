import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.APP_API_URL,
});
