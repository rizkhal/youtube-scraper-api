import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function createBrowserInstance(): Promise<Browser> {
  return await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  // return await puppeteer.launch({
  //   headless: true,
  //   args: ["--no-sandbox", "--disable-setuid-sandbox", "--incognito"],
  // });
}
