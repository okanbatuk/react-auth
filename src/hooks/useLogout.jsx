import api from "../libs/api";
import useAuth from "./useAuth";

const LOGOUT_URL = "/logout";

export default () => {
  const { setAuth } = useAuth();

  return async () => {
    try {
      await api.get(LOGOUT_URL);
      setAuth({});
    } catch (err) {
      !err?.response
        ? console.log("There is No Server Response")
        : console.log(err.response.data.message);
    }
  };
};
