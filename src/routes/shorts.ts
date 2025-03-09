import { Router } from "express";
import Shorts from "../scripts/shorts";
import { saveShortsToSupabase } from "../services/shorts";

const router: Router = Router();

router.get("/", async (req, res) => {
  try {
    const channels: string[] = JSON.parse(process.env.YOUTUBE_CHANNELS || "[]");

    const data = await Shorts([channels[0]]);

    res.json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch shorts", error });
  }
});

// router.get("/schedule", async (req, res) => {
//   try {
//     const channels: string[] = JSON.parse(process.env.YOUTUBE_CHANNELS || "[]");
//     const { channel } = req.query;

//     const selectedChannels = channel ? [channel as string] : channels;

//     if (!selectedChannels || !selectedChannels.length) {
//       return res
//         .status(500)
//         .json({ success: false, message: "No channels provided." });
//     }

//     const shorts = await Shorts(selectedChannels);

//     // @ts-ignore
//     await saveShortsToSupabase(shorts);

//     res.json({ success: true, message: "Scraper ran successfully!", shorts });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to run scraper", error });
//   }
// });

export default router;
