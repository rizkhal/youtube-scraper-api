import * as cheerio from "cheerio";
import { createBrowserInstance } from "../lib/browser";
import { IChannel } from "../services/channels";

export default async function Channels(
  channels: string[]
): Promise<IChannel[]> {
  try {
    const browser = await createBrowserInstance();

    const allProfiles: any = [];

    for (const channel of channels) {
      const url = `https://www.youtube.com/${channel}`;
      const page = await browser.newPage();

      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      );

      await page.goto(url, { waitUntil: "networkidle2" });
      await page.waitForSelector(".page-header-renderer-wiz");

      const html = await page.content();
      const $ = cheerio.load(html);

      // Extract avatar (profile image)
      const avatar =
        $("img.yt-core-image.yt-spec-avatar-shape__image").attr("src") || "";

      // Extract channel name
      const name = $("h1.dynamic-text-view-model-wiz__h1 span")
        .first()
        .text()
        .trim();

      // Extract username
      const username = $(
        "div.yt-content-metadata-view-model-wiz__metadata-row span[dir='auto'] span"
      )
        .first()
        .text()
        .trim();

      const subscriberText = $(
        "div.yt-content-metadata-view-model-wiz__metadata-row:nth-of-type(2) span"
      )
        .first()
        .text()
        .trim();

      const subscribers = convertToNumber(
        subscriberText.replace("subscribers", "").trim()
      );

      allProfiles.push({
        name,
        username,
        avatar,
        subscribers,
      });
      await page.close();
    }

    await browser.close();

    return allProfiles;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function convertToNumber(subscriberText: any) {
  const match = subscriberText.match(/([\d.]+)([KMB]?)/);
  if (!match) return 0;

  const num = parseFloat(match[1]);
  const unit = match[2] || "";

  const multiplier: any = { K: 1_000, M: 1_000_000, B: 1_000_000_000 };
  return Math.round(num * (multiplier[unit] || 1));
}
