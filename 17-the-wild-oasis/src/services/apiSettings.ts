import Setting from "~/types/setting.type";
import supabase from "./supabase";

export async function getSettings() {
  const { data: settings, error } = await supabase.from("settings").select("*").single();

  if (error) throw new Error("Can't get the settings data");
  console.log(settings);
  if (!settings) return;

  return settings;
}

export async function patchSetting(newSetting: Partial<Setting>) {
  const { error, data: updatedSetting } = await supabase.from("settings").update(newSetting).eq("id", 1);

  if (error) throw new Error("Can't update setting data");

  return updatedSetting;
}
