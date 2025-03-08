import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export default async function Videos(channels: string[]) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const allVideos = [];

    for (const channel of channels) {
      const url = `https://www.youtube.com/${channel}/videos`;
      const page = await browser.newPage();

      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      );

      await page.goto(url, { waitUntil: "networkidle2" });
      await page.waitForSelector("#contents");

      const html = await page.content();
      const $ = cheerio.load(html);

      const videoIds = new Set();
      $("ytd-rich-item-renderer a#thumbnail").each((_, element) => {
        const videoPath = $(element).attr("href");
        if (videoPath?.startsWith("/watch?v=")) {
          videoIds.add(videoPath.replace("/watch?v=", ""));
        }
      });

      const videos = Array.from(videoIds).map((id) => ({
        channel,
        video_id: id,
        url: `https://www.youtube.com/watch?v=${id}`,
        created_at: new Date().toISOString(),
      }));

      allVideos.push(...videos);
    }

    await browser.close();

    return allVideos;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
