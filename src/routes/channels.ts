import { Router } from "express";
import {
  getYoutubeChannels,
  IChannel,
  saveChannelsToSupabase,
} from "../services/channels";
import Channels from "../scripts/channels";
import { pluck } from "../utils/helper";

const router: Router = Router();

router.get("/api/channels", async (req, res) => {
  try {
    const data = await getYoutubeChannels();

    res.json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch shorts", error });
  }
});

router.get("/api/run/channels", async (req, res) => {
  try {
    const _channels = await getYoutubeChannels();
    const channels: IChannel[] = await Channels(pluck(_channels, "username"));

    await saveChannelsToSupabase(channels);

    res.json({ success: true, message: "Scraper ran successfully!", channels });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to run channels scraper" });
  }
});

export default router;
