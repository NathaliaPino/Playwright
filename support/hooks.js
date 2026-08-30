const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

setDefaultTimeout(30 * 1000); 

let browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

Before(async function () {
  this.context = await browser.newContext({ baseURL: 'https://automationexercise.com' });
  this.page = await this.context.newPage();
});

After(async function ({ result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});