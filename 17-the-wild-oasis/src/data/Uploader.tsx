import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import supabase from "~/services/supabase";
import Button from "~/components/Button";
import { subtractDates } from "~/utils/dateUtils";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import styled from "styled-components";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase.from("guests").select("id").order("id");
  const allGuestIds = guestsIds?.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase.from("cabins").select("id").order("id");
  const allCabinIds = cabinsIds?.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const modifier = cabin?.regularPrice && cabin?.discount ? cabin?.regularPrice - cabin?.discount : 1;
    // const modifier = cabin?.regularPrice - cabin?.discount ?? 1;
    const cabinPrice = numNights * modifier;
    const extrasPrice = booking.hasBreakfast ? numNights * 15 * booking.numGuests : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate))) status = "checked-out";
    if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate))) status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds?.at(booking.guestId - 1),
      cabinId: allCabinIds?.at(booking.cabinId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

const DevNav = styled.div`
  padding: 1.2rem;
  cursor: pointer;
  background-color: var(--color-grey-0);
  border-top: 1.5px solid var(--color-grey-300);
  border-bottom: 1.5px solid var(--color-grey-300);

  &:hover {
    border-top: 1.5px solid var(--color-brand-500);
    border-bottom: 1.5px solid var(--color-brand-500);
    background-color: var(--color-grey-0);
  }
  transition: all 0.6s;
  margin-bottom: 0.3rem;
`;

export function Uploader() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        transition: "all 1s",
        backgroundColor: "var(--color-grey-0)",
      }}
    >
      <DevNav onClick={() => setIsOpen((is) => !is)}>Development Area</DevNav>
      <div
        style={{
          display: `${isOpen ? "flex" : "none"}`,
          flexDirection: "column",
          gap: "1.2rem",
          marginTop: "auto",
          backgroundColor: "var(--color-grey-0)",
          padding: "8px",
          borderRadius: "5px",
          textAlign: "center",
          fontSize: "1.2rem",
          transition: "all 1s",
        }}
      >
        <h3>DEV AREA</h3>

        <Button
          $size="small"
          onClick={uploadAll}
          // To prevent accidental clicks. Remove to run once!
          disabled={isLoading}
          // disabled={true}
        >
          Upload ALL sample data
        </Button>
        <p>Only run this only once!</p>
        <p>
          <em>(Cabin images need to be uploaded manually)</em>
        </p>
        <hr />
        <Button onClick={uploadBookings} disabled={isLoading} $size="small">
          Upload CURRENT bookings
        </Button>
        <p>You can run this every day you develop the app</p>
      </div>
    </div>
  );
}
