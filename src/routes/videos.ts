import { Router } from "express";
import Videos from "../scripts/videos";
import { pluck } from "../utils/helper";
import { getYoutubeChannels } from "../services/channels";
import {
  type TVideo,
  getVideosFromSupabase,
  getVideoWhereChannel,
  saveVideosToSupabase,
} from "../services/videos";

const router: Router = Router();

router.get("/api/videos", async (req, res) => {
  try {
    const videos = await getVideosFromSupabase(req);
    res.json({ success: true, videos });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch videos", error });
  }
});

router.get("/api/videos/:channel", async (req, res) => {
  const { channel } = req.params;

  try {
    const videos = await getVideoWhereChannel(req, channel);
    res.json({ success: true, videos });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch video", error });
  }
});

router.get("/api/run/videos", async (req, res) => {
  try {
    const channels = await getYoutubeChannels();
    if (!channels.length) {
      return res
        .status(500)
        .json({ success: false, message: "Channel not exists" });
    }

    const videos: TVideo[] = await Videos(pluck(channels, "username"));
    await saveVideosToSupabase(videos);

    res.json({ success: true, message: "Scraper ran successfully!", videos });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to run scraper", error });
  }
});

export default router;
