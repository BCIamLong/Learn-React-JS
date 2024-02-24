import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Button from "~/components/Button";
import { useLogout } from "./useLogout";
import SpinnerMini from "~/components/SpinnerMini";

export default function Logout() {
  const { logout, isLoggingOut } = useLogout();
  return (
    <Button $variation="header" onClick={() => logout()} disabled={isLoggingOut}>
      {isLoggingOut ? (
        <SpinnerMini />
      ) : (
        <>
          <HiArrowRightOnRectangle />
        </>
      )}
    </Button>
  );
}
