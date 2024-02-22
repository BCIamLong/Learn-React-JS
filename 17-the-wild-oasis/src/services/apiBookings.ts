// import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { PAGE_LIMIT } from "~/configs/constant";
import supabase from "./supabase";
import { Booking } from "~/types/booking.type";

export const getBookings = async function ({
  filter,
  sort,
  page,
}: {
  filter: {
    field: string;
    value: string;
    method?: string;
    //  keyof PostgrestFilterBuilder<{} extends GenericSchema, unknown, unknown[], "bookings", unknown>;
  };
  sort: { field: string; direction: string };
  page: number;
}) {
  const { field: filterField, value: filterVal, method } = filter;
  const { field: sortField, direction } = sort;
  let query = supabase.from("bookings").select("*, cabins(name), guests(fullName,email)", {
    count: "exact",
  });

  // if (value) query = query.eq(field, value);
  // * we can use this way to condition to call method because method is also the property of object right
  // * FILTER
  if (filterVal) query = query[method || "eq"](filterField, filterVal);

  // * SORT
  if (sortField) query = query.order(sortField, { ascending: direction === "asc" });

  // * PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_LIMIT;
    const to = page * PAGE_LIMIT - 1;
    query = query.range(from, to);
  }

  const { data: bookings, error, count } = await query;

  if (error) throw new Error("Can't get the bookings data!");

  return { bookings, count };
};

export const getBooking = async function (id: number) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName,email)")
    .eq("id", id)
    .single();
  if (error) throw new Error("Can't get the booking data!");

  return booking;
};

export const updateBooking = async function (id: number, bookingData: Partial<Booking>) {
  const { data: newBooking, error } = await supabase
    .from("bookings")
    .update(bookingData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Can't update the booking data!");

  return newBooking;
};

export const deleteBooking = async function (id: number) {
  const { error } = await supabase.from("bookings").delete().eq("id", id).single();
  if (error) throw new Error("Can't delete the booking data!");
};
