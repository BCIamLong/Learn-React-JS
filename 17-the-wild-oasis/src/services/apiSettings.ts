import supabase from "./supabase";

export async function getSettings() {
  const { data: settings, error } = await supabase.from("settings").select("*").single();

  if (error) throw new Error("Can't get the settings data");
  console.log(settings);
  if (!settings) return;

  return settings;
}
