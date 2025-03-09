import chromium from "@sparticuz/chromium";
import puppeteer, { Browser } from "puppeteer";
import puppeteerCore, { Browser as BrowserCore } from "puppeteer-core";

export async function createBrowserInstance(): Promise<BrowserCore | Browser> {
  if (process.env.LOCAL) {
    return await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--incognito"],
    });
  }

  return await puppeteerCore.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
}
