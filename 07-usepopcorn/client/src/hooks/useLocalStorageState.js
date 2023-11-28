import { useState, useEffect } from "react";

export function useLocalStorageState(initialVal, key) {
  const [value, setValue] = useState(() => {
    const watchedData = localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : initialVal;
    return watchedData;
  });

  useEffect(() => {
    // if (!watched.length) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
