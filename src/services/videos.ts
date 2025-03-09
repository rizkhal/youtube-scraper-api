import { Request } from "express";
import { supabase, paginate } from "../lib/supabase";

export type TVideo = {
  channel: string;
  video_id: string;
  url: string;
  created_at: string;
};

export async function getVideoWhereChannel(req: Request, channel: string) {
  const { page = 1, pageSize = 10 } = req.query;

  return await paginate("videos", page as number, pageSize as number, (query) =>
    query
      .select("*")
      .eq("channel", channel)
      .order("created_at", { ascending: false })
  );
}

export async function getVideosFromSupabase(req: Request) {
  const { page = 1, pageSize = 10 } = req.query;

  return await paginate("videos", page as number, pageSize as number, (query) =>
    query.select("*").order("created_at", { ascending: false })
  );
}

export async function saveVideosToSupabase(videos: TVideo[]) {
  const { data, error } = await supabase.from("videos").upsert(videos);

  if (error) {
    console.error("❌ Supabase insert error:", error);
  }

  return data;
}
