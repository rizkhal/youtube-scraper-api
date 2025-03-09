import { supabase } from "../lib/supabase";

export interface IChannel {
  id: string;
  username: string;
  avatar?: string;
  subscribers: number;
  created_at: string;
}

export async function getYoutubeChannels(): Promise<IChannel[]> {
  const { data, error } = await supabase.from("channels").select("*");

  if (error) {
    console.error("❌ Supabase fetch error:", error);
    throw error;
  }

  return data;
}

export async function saveChannelsToSupabase(channels: IChannel[]) {
  const { data, error } = await supabase
    .from("channels")
    .upsert(channels, { onConflict: "username" });

  if (error) {
    console.error("❌ Supabase insert error:", error);
  }

  return data;
}
