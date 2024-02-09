import { SUPABASE_URL } from "~/configs/supabase";
import supabase from "./supabase";
import Cabin from "~/types/cabin.type";

interface Cabins {
  id: number;
  name: string;
  maxCapacity: string;
  regularPrice: number;
  discount: number;
  image: File;
  createdAt?: Date;
}

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) return;

  return cabins;
}

export async function getCabin(id: number) {
  const { data: cabin, error } = await supabase.from("cabins").select("*").eq("id", id);

  if (error) return;

  return cabin;
}

export async function postCabin(newCabin: Cabins) {
  const fileName = `${Math.random()}-${newCabin.image.name}`;
  // https://xyinqkbbdbmknpwnrucc.supabase.co/storage/v1/object/public/cabin-images/cabin-006.jpg
  const filePath = `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${fileName}`;

  const { data, error } = await supabase.from("cabins").insert({ ...newCabin, image: filePath });
  console.log(error);
  if (error) throw new Error("Cabin can't be created");

  const { error: storageError } = await supabase.storage.from("cabin-images").upload(fileName, newCabin.image, {
    cacheControl: "3600",
    upsert: false,
  });

  if (!storageError) return data;

  await supabase.from("cabins").delete().eq("id", data?.id);

  throw new Error("Image upload is not success and the cabin is not created");
}

export async function patchCabin(id: number, data: Partial<Cabins>) {
  const { error } = await supabase.from("cabins").update(data).eq("id", id);

  if (error) return;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin delete not success!");
}
