import api from "../libs/api";
import useAuth from "./useAuth";

export default () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const { data } = await api(`/refresh/${auth.uuid}`, {
      withCredentials: true,
    });
    const { accessToken } = data.data;
    setAuth((prev) => {
      return { ...prev, accessToken: accessToken };
    });
    return accessToken;
  };
  return refresh;
};
