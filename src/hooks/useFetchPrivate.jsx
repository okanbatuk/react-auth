import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export default (url) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
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
