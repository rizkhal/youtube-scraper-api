import { Router } from "express";
import Scrapper from "../scripts/scraper";
import {
  getVideosFromSupabase,
  getVideoWhereChannel,
  saveVideosToSupabase,
} from "../services/videos";

const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Ok");
});

router.get("/api/videos", async (req, res) => {
  try {
    const videos = await getVideosFromSupabase();
    res.json({ success: true, videos });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch videos", error });
  }
});

router.get("/api/videos/:channel", async (req, res) => {
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

router.get("/api/schedule", async (req, res) => {
  const channels: string[] = JSON.parse(process.env.YOUTUBE_CHANNELS || "[]");

  if (!channels || !channels.length) {
    return res.status(500).json({ success: false, message: "" });
  }

  try {
    const videos = await Scrapper(channels);
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
