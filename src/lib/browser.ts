import puppeteer, { Browser } from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export async function createBrowserInstance(): Promise<Browser> {
  return await puppeteer.launch({
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    args: chromium.args,
  });

  // return await puppeteer.launch({
  //   headless: true,
  //   args: ["--no-sandbox", "--disable-setuid-sandbox", "--incognito"],
  // });
}
