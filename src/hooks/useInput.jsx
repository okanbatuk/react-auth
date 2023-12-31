import useLocalInput from "./useLocalInput";

export default (key, initValue, length = 24) => {
  const [value, setValue] = useLocalInput(key, initValue);

  const reset = (newValue) => setValue(newValue);

  const attributes = {
    value,
    onChange: (e) => {
      e.target.value.length < length && setValue(e.target.value);
    },
  };

  return [value, reset, attributes];
};
