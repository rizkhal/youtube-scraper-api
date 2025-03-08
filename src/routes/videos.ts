import { Router } from "express";
import Videos from "../scripts/videos";
import {
  getVideosFromSupabase,
  getVideoWhereChannel,
  saveVideosToSupabase,
} from "../services/videos";

const router: Router = Router();
const channels: string[] = JSON.parse(process.env.YOUTUBE_CHANNELS || "[]");

router.get("/", async (req, res) => {
  try {
    const videos = await getVideosFromSupabase();
    res.json({ success: true, videos });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch videos", error });
  }
});

router.get("/:channel", async (req, res) => {
  const { channel } = req.params;

  try {
    const videos = await getVideoWhereChannel(channel);
    res.json({ success: true, videos });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch video", error });
  }
});

router.get("/schedule", async (req, res) => {
  if (!channels || !channels.length) {
    return res.status(500).json({ success: false, message: "" });
  }

  try {
    const videos = await Videos(channels);
    // @ts-ignore
    await saveVideosToSupabase(videos);
    res.json({ success: true, message: "Scraper ran successfully!", videos });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to run scraper", error });
  }
});

export default router;
