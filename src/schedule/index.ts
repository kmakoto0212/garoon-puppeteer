import { createBrowser } from "../lib/browser";
import { login } from "..";
import { Auth } from "../types/auth";
import { URL } from "url";
import { Browser } from "puppeteer";

export const getUsersUrl = async (option: {
  url: string;
  auth: Auth;
  offset?: number;
  browser?: Browser;
}): Promise<string[]> => {
  option.offset ??= 0;
  const browser = option.browser || (await createBrowser());
  const [page] = await browser.pages();
  const _url = new URL(option.url);
  _url.searchParams.append("sp", option.offset.toString());

  await page.goto(_url.href, {
    waitUntil: "domcontentloaded",
  });
  page.waitForTimeout(1000);
  if (!option.browser) await login(page, option.auth);
  let hrefs = await page.$$eval("dd > a", (elems) =>
    elems.map((elem) => elem.getAttribute("href"))
  );
  if (hrefs.length >= 29) {
    option.browser ??= browser;
    option.offset = option.offset + 30;
    hrefs = hrefs.concat(await getUsersUrl(option));
  }
  browser.close();

  return hrefs;
};
