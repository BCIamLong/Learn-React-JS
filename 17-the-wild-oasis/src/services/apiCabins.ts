import { SUPABASE_URL } from "~/configs/supabase";
import supabase from "./supabase";
// import Cabin from "~/types/cabin.type";

interface Cabins {
  id?: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: FileList;
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
  // ! notice that the file name should not have this / slash because if we have that then we will create new folder in the supabase
  // * so if we have this name: 123-cabin/123.jpg => now in supabase it will create folder 123-cabin and then in here we have 123.jpg file which is not what we want right

  const fileName = `${Math.random()}-${newCabin.image[0].name}`.replace("/", ""); //* so to make sure we don't have this / we can do it like this

  // https://xyinqkbbdbmknpwnrucc.supabase.co/storage/v1/object/public/cabin-images/cabin-006.jpg
  const filePath = `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${fileName}`;
  const hasNewImage = typeof newCabin.image !== "string";
  // !hasNewImage ? data : { ...data, image: filePath }
  const { data, error } = await supabase
    .from("cabins")
    .insert(!hasNewImage ? newCabin : { ...newCabin, image: filePath })
    .select()
    .single();
  // * so this data here is not really return immediately right so it's async task deal with supabase right and to make sure it really be here we can .select().single(); to make sure this data is already have here
  // * and we should do it like this because it's not easy to catch the type Promise from supabase because it's from postgresql Promise so supabase use this postgresql DB right
  // * but this is not deal so it's how we can do TS can infer this type but it's not error in runtime just for TS infer exact the type of data

  console.log(error);
  if (error) throw new Error("Cabin can't be created");
  if (!hasNewImage) return data;

  const { error: storageError } = await supabase.storage.from("cabin-images").upload(fileName, newCabin.image[0], {
    cacheControl: "3600",
    upsert: false,
  });

  if (!storageError) return data;

  await supabase.from("cabins").delete().eq("id", data.id);

  throw new Error("Image upload is not success and the cabin is not created");
}

export async function patchCabin(id: number, data: Partial<Cabins>) {
  if (!data.image) return;
  const fileName = `${Math.random()}-${data.image?.[0].name}`.replace("/", "");
  const filePath = `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${fileName}`;
  const hasNewImage = typeof data.image !== "string";

  const { error, data: updatedCabin } = await supabase
    .from("cabins")
    .update(!hasNewImage ? data : { ...data, image: filePath })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Edit cabin is not successful");
  if (!hasNewImage) return updatedCabin;

  const { error: storageError } = await supabase.storage.from("cabin-images").upload(fileName, data.image?.[0] || "", {
    cacheControl: "3600",
    upsert: false,
  });

  if (!storageError) return updatedCabin;

  // console.log(storageError);

  await supabase.from("cabins").delete().eq("id", id);

  throw new Error("Image upload is not success and the cabin is not edited");
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin delete not success!");
}
