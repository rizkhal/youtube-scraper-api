import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export default async function Shorts(channels: string[]) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const allShorts = [];

    for (const channel of channels) {
      const url = `https://www.youtube.com/${channel}/shorts`;
      const page = await browser.newPage();

      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      );

      await page.goto(url, { waitUntil: "networkidle2" });

      // Wait for necessary elements
      await page.waitForSelector("ytd-rich-item-renderer", { timeout: 5000 });

      const html = await page.content();
      const $ = cheerio.load(html);

      const shorts: any = [];

      $("ytd-rich-item-renderer").each((_, element) => {
        const videoPath = $(element)
          .find("a.shortsLockupViewModelHostEndpoint")
          .attr("href");
        let thumbnailUrl = $(element)
          .find("img.shortsLockupViewModelHostThumbnail")
          .attr("src");

        if (videoPath?.startsWith("/shorts/")) {
          const videoId = videoPath.replace("/shorts/", "");

          // Fix for missing thumbnails or ensure correct YouTube CDN URL
          if (!thumbnailUrl) {
            thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
          } else {
            thumbnailUrl = thumbnailUrl.replace(/&amp;/g, "&"); // Fix HTML encoding
          }

          shorts.push({
            channel,
            video_id: videoId,
            url: `https://www.youtube.com/shorts/${videoId}`,
            thumbnail: thumbnailUrl,
            created_at: new Date().toISOString(),
          });
        }
      });

      allShorts.push(...shorts);
    }

    await browser.close();
    return allShorts;
  } catch (error) {
    console.error("Error scraping shorts:", error);
    throw error;
  }
}
