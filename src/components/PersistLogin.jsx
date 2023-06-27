import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefresh from "../hooks/useRefresh";

export default () => {
  const { auth, persist } = useAuth();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const verifyToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };
    !auth?.accessToken && persist && verifyToken();

    mounted &&
      setTimeout(() => {
        setLoading(false);
      }, 100);

    return () => (mounted = false);
  }, []);

  return <>{!persist ? <Outlet /> : loading ? <p>Loading..</p> : <Outlet />}</>;
};
