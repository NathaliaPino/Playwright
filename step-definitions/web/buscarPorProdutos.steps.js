const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../../page-objects/PaginaDeProdutos');
const { ProductDetailPage } = require('../../page-objects/PaginaDeDetalhesDoProduto');



Given('que o usuário está na página de produtos', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.goto();

  // this.productPage.goto() - localizado em page-objects/PaginaDeProdutos.js
  // É o método que abre a página de produtos (goto - vá para)
  // O "await" espera o método terminar de executar, antes de seguir para a próxima linha.
});

When('ele busca por um produto existente', async function () {
  this.searchTerm = 'Jeans';
  await this.productPage.searchForProduct(this.searchTerm);

  // this.productPage.searchForProduct() - localizado em page-objects/PaginaDeProdutos.js
  // É o método que preenche o campo de busca e clica na lupa.
  // O "await" espera o método terminar de executar, antes de seguir para a próxima linha.
});

Then('os resultados exibidos devem conter o termo buscado', async function () {
  const results = await this.productPage.getSearchResultNames();
  expect(results.length).toBeGreaterThan(0);

  const nameProduct = results[0];
  // Nome do primeiro produto da listagem, já lido acima.

  await this.productPage.clickViewProduct();

  this.productDetailPage = new ProductDetailPage(this.page);
  const category = await this.productDetailPage.getCategoryText();

  const term = this.searchTerm.toLowerCase();
  const matchesName = nameProduct.toLowerCase().includes(term);
  // matchesName guarda true ou false, dependendo se o termo aparece no nome do produto
  const matchesCategory = category.toLowerCase().includes(term);
  // matchesCategory guarda true ou false, dependendo se o termo aparece na categoria do produto
  expect(matchesName || matchesCategory).toBe(true);
  // Passa se o termo aparece no nome OU na categoria do primeiro produto.



  // this.productPage.getSearchResultNames() - localizado em page-objects/PaginaDeProdutos.js
  // É o método que lê o nome de todos os produtos da listagem e devolve numa lista.
  // O "await" espera o método terminar de executar, antes de seguir para a próxima linha.
  // expect(results.length).toBeGreaterThan(0) - verifica se a lista tem pelo menos 1 item.
  // this.productPage.clickViewProduct() - localizado em page-objects/PaginaDeProdutos.js
  // É o método que clica no primeiro "View Product" da listagem.
  // O "await" espera o método terminar de executar, antes de seguir para a próxima linha.
  // this.productDetailPage.getCategoryText() - localizado em page-objects/PaginaDeDetalhesDoProduto.js
  // É o método que lê o texto da categoria do produto.
  // O "await" espera o método terminar de executar, antes de seguir para a próxima linha.
  // o const term guarda o termo buscado em minúsculas, pra comparar com o nome e a categoria.
  // matchesName e matchesCategory guardam true ou false, dependendo se o termo aparece no nome ou na categoria.
  // expect(matchesName || matchesCategory).toBe(true) - passa se o termo buscado aparece no nome OU na categoria do primeiro produto.
  // A verificação final passa se o termo buscado aparece no nome OU na categoria do primeiro produto.
});










