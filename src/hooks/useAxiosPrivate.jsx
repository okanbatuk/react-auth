import { useEffect } from "react";
import { axiosPrivate } from "../libs/api";
import useAuth from "./useAuth";
import useRefresh from "./useRefresh";

export default () => {
  const { auth } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resIntercept = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prev = err?.config;
        if (err?.response?.status === 403 && !prev?.sent) {
          prev.sent = true;
          const newAccessToken = await refresh();
          prev.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prev);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};
