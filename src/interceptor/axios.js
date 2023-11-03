import axios from "axios";

const token = localStorage.getItem("token");
export const axiosInstance = axios.create({
  baseURL: "https://skyreal-blog-app.cyclic.app/",
});
export const authReq = axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
