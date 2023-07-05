import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

export default (url) => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await axiosPrivate(url, {
          signal: AbortSignal.timeout(2000),
        });
        mounted && setData(data);
      } catch (err) {
        !err?.response
          ? setError("Server not found")
          : setError(err.response.data.message);
      } finally {
        mounted && setLoading(false);
      }

      return () => (mounted = false);
    })();
  }, [url]);

  return { data, loading, error };
};
