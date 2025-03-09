import { supabase } from "../lib/supabase";

export interface IChannel {
  id: string;
  username: string;
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
