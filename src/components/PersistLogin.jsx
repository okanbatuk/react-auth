import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefresh from "../hooks/useRefresh";
import useLogout from "../hooks/useLogout";
import useLocalInput from "../hooks/useLocalInput";

export default () => {
  const { auth } = useAuth();
  const refresh = useRefresh();
  const logout = useLogout();
  const [loading, setLoading] = useState(true);
  const [persist] = useLocalInput("persist", false);

  useEffect(() => {
    let mounted = true;

    !auth?.accessToken &&
      (async () => {
        try {
          /*
           * If persist is true regenerate the token
           * Otherwise remove the refresh token in cookies and backend
           *
           * */
          persist ? await refresh() : await logout();
        } catch (err) {
          console.error(err);
        }
      })();

    mounted &&
      setTimeout(() => {
        setLoading(false);
      }, 100);

    return () => (mounted = false);
  }, []);

  return <>{!persist ? <Outlet /> : loading ? <p>Loading..</p> : <Outlet />}</>;
};
