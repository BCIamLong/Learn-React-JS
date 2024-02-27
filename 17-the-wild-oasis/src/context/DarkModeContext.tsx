import { ReactNode, createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "~/hooks/useLocalStorageState";

// * https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
// * this article has said about the context for theme like dark mode

interface DarkModeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContext | null>(null);

export const useDarkMode = function () {
  const context = useContext(DarkModeContext)!;

  if (context === undefined) throw new Error("The dark mode context is using outside its provider!");

  return context;
};

export default function DarkModeProvider({ children }: { children: ReactNode }) {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) return document.documentElement.classList.add("dark-mode");

      document.documentElement.classList.remove("dark-mode");
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }
  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}
