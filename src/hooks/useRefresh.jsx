import api from "../libs/api";
import useAuth from "./useAuth";

export default () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const { data } = await api(`/refresh`, {
      withCredentials: true,
    });
    const { user, accessToken } = data.data;
    setAuth({
      user: {
        uuid: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.role,
      },
      accessToken: accessToken,
    });
    return accessToken;
  };
  return refresh;
};
