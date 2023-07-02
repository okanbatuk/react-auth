import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
});
export const axiosPrivate = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
