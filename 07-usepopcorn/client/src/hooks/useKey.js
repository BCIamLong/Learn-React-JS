import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function globalKeyPress(e) {
      const formatKey = key[0].toUpperCase() + key.slice(1).toLowerCase();
      // console.log(formatKey);
      if (e.key === formatKey) {
        action();
      }
    }
    document.addEventListener("keydown", globalKeyPress);

    return () => document.removeEventListener("keydown", globalKeyPress);
  }, [action, key]);
}
