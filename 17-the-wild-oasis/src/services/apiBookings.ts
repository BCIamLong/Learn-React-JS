import supabase from "./supabase";

export const getBookings = async function () {
  const { data: bookings, error } = await supabase.from("bookings").select("*, cabins(name), guests(fullName,email)");

  if (error) throw new Error("Can't get the bookings data!");

  return bookings;
};
