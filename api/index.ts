import "dotenv/config";
import express from "express";
import Scrapper from "@/scrapper";
import {
  getVideosFromSupabase,
  getVideoWhereChannel,
  saveVideosToSupabase,
} from "@/services/videos";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Ok");
});

app.get("/api/videos", async (req, res) => {
  try {
    const videos = await getVideosFromSupabase();
    res.json({ success: true, videos });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch videos", error });
  }
});

app.get("/api/videos/:channel", async (req, res) => {
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

app.get("/api/schedule", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
