import { useState, useEffect } from "react";
import api from "../libs/api";

export default (url, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = false;
    token &&
      ((mounted = true),
      (async () => {
        try {
          const { data } = await api(url, {
            signal: AbortSignal.timeout(2000),
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          mounted && setData(data?.data?.users);
        } catch (err) {
          !err?.response
            ? setError("Server not found")
            : setError(err.response.data.message);
        } finally {
          mounted && setLoading(false);
        }

        return () => (mounted = false);
      })());
  }, [url]);

  return { data, loading, error };
};
