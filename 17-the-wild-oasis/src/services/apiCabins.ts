import supabase from "./supabase";

interface Cabins {
  id: number;
  name: string;
  maxCapacity: string;
  regularPrice: number;
  discount: number;
  image: string;
  createdAt?: Date;
}

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) return;

  return cabins;
}

export async function getCabin(id: number) {
  const { data: cabin, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id);

  if (error) return;

  return cabin;
}

export async function postCabin(data: Cabins) {
  const { error } = await supabase.from("cabins").insert(data);

  if (error) return;
}

export async function patchCabin(id: number, data: Partial<Cabins>) {
  const { error } = await supabase.from("cabins").update(data).eq("id", id);

  if (error) return;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin delete not success!");
}
