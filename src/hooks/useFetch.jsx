import { useState, useEffect } from "react";
import api from "../libs/api";

export default (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await api(url, {
          signal: AbortSignal.timeout(2000),
        });
        mounted && setData(data?.data?.users);
      } catch (err) {
        !err?.response
          ? setError("Server not found")
          : setError(err.response.data.message);

        navigate("/login", {
          state: {
            from: location,
            message: "Something Went Wrong. Please login again..",
          },
          replace: true,
        });
      } finally {
        mounted && setLoading(false);
      }

      return () => (mounted = false);
    })();
  }, [url]);

  return { data, loading, error };
};
