import puppeteer, { Browser } from "puppeteer-core";
// @ts-ignore
import * as chromium from "chromium";

export async function createBrowserInstance(): Promise<Browser> {
  return await puppeteer.launch({
    executablePath: chromium.path,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--incognito"],
  });

  // return await puppeteer.launch({
  //   headless: true,
  //   args: ["--no-sandbox", "--disable-setuid-sandbox", "--incognito"],
  // });
}
