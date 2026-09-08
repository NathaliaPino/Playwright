const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

setDefaultTimeout(30 * 1000);

const BASE_URL = 'https://automationexercise.com'; // <- adicione esta linha

let browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  this.context = await browser.newContext({ baseURL: BASE_URL });

  // Bloqueia domínios conhecidos de anúncios/ads de terceiros, evitando que
  // banners e modais publicitários sobreponham elementos da página durante
  // os testes (fonte real de instabilidade neste site, que exibe anúncios
  // de redes como Google Ads).
  await this.context.route('**/*', (route) => {
    const adDomains = [
      'doubleclick.net',
      'googlesyndication.com',
      'googleadservices.com',
      'google.com/pagead',
      'adservice.google.com',
    ];
    const url = route.request().url();
    if (adDomains.some((domain) => url.includes(domain))) {
      route.abort();
    } else {
      route.continue();
    }
  });

  this.page = await this.context.newPage();
  this.page.on('dialog', (dialog) => dialog.dismiss());
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