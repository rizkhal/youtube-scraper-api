import { Router } from "express";
import { getYoutubeChannels } from "../services/channels";

const router: Router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await getYoutubeChannels();

    res.json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch shorts", error });
  }
});

export default router;
