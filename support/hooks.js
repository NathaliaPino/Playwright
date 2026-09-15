const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

setDefaultTimeout(30 * 1000);

const BASE_URL = 'https://automationexercise.com'; // <- adicione esta linha

let browser;


// Abre o Chrome/Chromium normalmente, com janela visível
/*BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});*/

// Rodar o teste mais lentamente:
/*
BeforeAll(async function () {
  browser = await chromium.launch({
    headless: false,
    slowMo: 1000
  });
});*/


BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
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
    'amazon-adsystem.com',
    'adnxs.com',
    'criteo.com',
    'outbrain.com',
    'taboola.com',
    'pubmatic.com',
    'rubiconproject.com',
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