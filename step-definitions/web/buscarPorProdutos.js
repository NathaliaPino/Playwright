const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../../page-objects/PaginaDeProdutos');
const { ProductDetailPage } = require('../../page-objects/PaginaDeDetalhesDoProduto');

Given('que o usuário está na página de produtos', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.goto();
});

When('ele busca por um produto existente', async function () {
  this.searchTerm = 'Jeans';
  await this.productPage.searchForProduct(this.searchTerm);
});

Then('os resultados exibidos devem conter o termo buscado', async function () {
  const results = await this.productPage.getSearchResultNames();
  expect(results.length).toBeGreaterThan(0);

  await this.productPage.clickViewProduct();

  this.productDetailPage = new ProductDetailPage(this.page);
  const category = await this.productDetailPage.getCategoryText();
  expect(category).toContain(this.searchTerm);
});










