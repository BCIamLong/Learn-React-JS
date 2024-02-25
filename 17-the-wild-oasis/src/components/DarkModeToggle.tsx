import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import Button from "./Button";
import { useDarkMode } from "~/context/DarkModeContext";

export default function DarkModeButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button $variation="header" onClick={() => toggleDarkMode()}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </Button>
  );
}
