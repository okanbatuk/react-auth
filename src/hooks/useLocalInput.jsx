import { useEffect, useState } from "react";

export default (key, initValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
