import { supabase } from "../lib/supabase";

export async function getShortsWhereChannel(channel: string) {
  const { data, error } = await supabase
    .from("shorts")
    .select("*")
    .eq("channel", channel)
    .select("*");

  if (error) {
    console.error("❌ Supabase fetch error:", error);
    throw error;
  }

  return data;
}

export async function getShortsFromSupabase() {
  const { data, error } = await supabase.from("shorts").select("*");

  if (error) {
    console.error("❌ Supabase fetch error:", error);
    throw error;
  }

  return data;
}

export type TShorts = {
  channel: string;
  video_id: string;
  url: string;
  created_at: string;
};

export async function saveShortsToSupabase(shorts: TShorts[]) {
  const { data, error } = await supabase.from("shorts").upsert(shorts);

  if (error) {
    console.error("❌ Supabase insert error:", error);
  }

  return data;
}
