import supabase from "./supabase";

export const getBookings = async function ({ filter }: { filter: { field: string; value: string; method?: string } }) {
  const { field, value, method } = filter;
  let query = supabase.from("bookings").select("*, cabins(name), guests(fullName,email)");

  // if (value) query = query.eq(field, value);
  // * we can use this way to condition to call method because method is also the property of object right
  if (value) query = query[method || "eq"](field, value);

  const { data: bookings, error } = await query;

  if (error) throw new Error("Can't get the bookings data!");

  return bookings;
};
