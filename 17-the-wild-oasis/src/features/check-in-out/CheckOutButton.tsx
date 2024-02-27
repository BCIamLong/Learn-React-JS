import Button from "~/components/Button";
import { useCheckOut } from "./useCheckOut";

export function CheckOutButton({ bookingId }: { bookingId: number }) {
  const { checkOut, isCheckingOut } = useCheckOut();
  return (
    <Button $size="mini" onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
      {isCheckingOut ? "Checking" : " Check out"}
    </Button>
  );
}
