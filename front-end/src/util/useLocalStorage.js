import { useEffect, useState } from "react";

function useLocalState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const localStorageKey = localStorage.getItem(key);

    return localStorageKey !== null
      ? JSON.parse(localStorageKey)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Key ${key} , Value ${value}`);
  }, [key, value]);

  return [value, setValue];
}
export { useLocalState };
