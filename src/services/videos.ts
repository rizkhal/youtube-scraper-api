import { supabase } from "../lib/supabase";

export async function getVideoWhereChannel(channel: string) {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("channel", channel)
    .select("*");

  if (error) {
    console.error("❌ Supabase fetch error:", error);
    throw error;
  }

  return data;
}

export async function getVideosFromSupabase() {
  const { data, error } = await supabase.from("videos").select("*");

  if (error) {
    console.error("❌ Supabase fetch error:", error);
    throw error;
  }

  return data;
}

export type TVideo = {
  channel: string;
  video_id: string;
  url: string;
  created_at: string;
};

export async function saveVideosToSupabase(videos: TVideo[]) {
  const { data, error } = await supabase.from("videos").upsert(videos);

  if (error) {
    console.error("❌ Supabase insert error:", error);
  }

  return data;
}
