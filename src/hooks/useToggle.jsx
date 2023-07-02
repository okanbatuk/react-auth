import useLocalInput from "./useLocalInput";

export default (key, initValue = false) => {
  const [value, setValue] = useLocalInput(key, initValue);

  const toggle = () => setValue((prev) => !prev);

  const attributes = {
    checked: value,
    onChange: toggle,
  };

  return [attributes];
};
