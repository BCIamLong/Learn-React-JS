import supabase from "./supabase";

export const getBookings = async function ({
  filter,
  sort,
}: {
  filter: { field: string; value: string; method?: string };
  sort: { field: string; direction: string };
}) {
  const { field: filterField, value: filterVal, method } = filter;
  const { field: sortField, direction } = sort;
  let query = supabase.from("bookings").select("*, cabins(name), guests(fullName,email)");

  // if (value) query = query.eq(field, value);
  // * we can use this way to condition to call method because method is also the property of object right
  if (filterVal) query = query[method || "eq"](filterField, filterVal);
  if (sortField) query = query.order(sortField, { ascending: direction === "asc" });

  const { data: bookings, error } = await query;

  if (error) throw new Error("Can't get the bookings data!");

  return bookings;
};
