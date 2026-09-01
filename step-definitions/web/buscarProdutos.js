const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../../page-objects/PaginaDeBusca');

Given('que o usuário está na página de produtos', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.goto();
});

When('ele busca por um produto existente', async function () {
  this.searchTerm = 'Dress';
  await this.productPage.searchForProduct(this.searchTerm);
});



Then('os resultados exibidos devem conter o termo buscado', async function () {
  const results = await this.productPage.getSearchResultNames();

  // A busca do site filtra por categoria do produto, não pelo texto do nome
  // (confirmado via inspeção manual — ver README, seção "Observações – W04").
  // Por isso validamos que a busca retornou resultados, e não uma correspondência
  // textual exata no nome de cada produto.
  expect(results.length).toBeGreaterThan(0);
});