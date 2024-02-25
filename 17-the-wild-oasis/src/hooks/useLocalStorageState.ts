import { useEffect, useState } from "react";

export const useLocalStorageState = function <T>(initialState: T, keyStorage: string) {
  const [state, setState] = useState(function () {
    const rawVal = localStorage.getItem(keyStorage);
    return rawVal ? JSON.parse(rawVal) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(keyStorage, JSON.stringify(state));
    },
    [state, keyStorage]
  );

  return [state, setState];
};
