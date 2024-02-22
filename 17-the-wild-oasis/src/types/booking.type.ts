import Cabin from "./cabin.type";
import Guest from "./guest.type";

export interface Booking {
  id: number;
  cabinId: string;
  guestId: string;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "checked-out" | "checked-in" | "unconfirmed";
  // * in some case Typescript will infer and see that this status is union type and it will force us to declare this status as the union type like this so it's good because maybe we enter another string not correct right so this is also the powerful of type casting from Typescript
  // status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observation: string;
  createdAt: Date;
  guests: Partial<Guest>;
  cabins: Partial<Cabin>;
  // guests: Partial<Guest>[];
  // cabins: Partial<Cabin>[];
}
