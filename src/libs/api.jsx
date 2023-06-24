import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

export default axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
