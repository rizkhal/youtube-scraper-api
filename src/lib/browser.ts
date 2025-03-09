import puppeteer, { Browser } from "puppeteer";

export async function createBrowserInstance(): Promise<Browser> {
  return await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--incognito"],
  });
}
