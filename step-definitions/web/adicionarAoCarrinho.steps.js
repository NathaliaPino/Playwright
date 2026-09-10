const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ProductPage } = require('../../page-objects/PaginaDeProdutos');
const { ProductDetailPage } = require('../../page-objects/PaginaDeDetalhesDoProduto');
const { PaginaDoCarrinho } = require('../../page-objects/PaginaDoCarrinho');



// Cenário 1: adicionar direto da listagem
When('ele clica para adicionar um produto ao carrinho', async function () {
  this.addedProduct = await this.productPage.getFirstProductNameAndPrice();
  await this.productPage.addFirstProductToCart();
});

// Cenário 2: adicionar via "View Product"
When('ele clica em {string} de um produto', async function (linkLabel) {
    if (linkLabel === 'View Product') {
        await this.productPage.clickViewProduct();
        await this.page.waitForLoadState('networkidle'); // espera a página "assentar" de vez
        this.productDetailPage = new ProductDetailPage(this.page);
    }
});

When('clica para adicionar o produto ao carrinho', async function () {
  this.addedProduct = await this.productDetailPage.getNameAndPrice();
  console.log('Produto antes de adicionar (via View Product):', this.addedProduct);
  await this.productDetailPage.addToCart();
});

// Compartilhado pelos dois cenários
Then('uma mensagem de confirmação é exibida', async function () {
  await expect(this.productPage.addedToCartMessage).toBeVisible();
});

Then('o produto deve aparecer no carrinho', async function () {
  await this.productPage.goToCart();

  const cartPage = new PaginaDoCarrinho(this.page);
  const cartItem = await cartPage.getFirstProductNameAndPrice();

  console.log('Comparando produtos:', {
    adicionado: this.addedProduct,
    noCarrinho: cartItem,
  });

  expect(cartItem.name).toBe(this.addedProduct.name);
  expect(cartItem.price).toBe(this.addedProduct.price);
});



/* W07 */

When('acessa o carrinho', async function () {
  await this.productPage.goToCart();
  this.cartPage = new PaginaDoCarrinho(this.page);
});

When('remove o produto do carrinho', async function () {
  await this.cartPage.removeFirstProduct();
});

Then('o carrinho deve ficar vazio', async function () {
  await expect(this.cartPage.emptyCartMessage).toBeVisible({ timeout: 10000 });
});

Then('o carrinho deve conter {int} produto', async function (expectedCount) {
  const count = await this.cartPage.getProductCount();
  expect(count).toBe(expectedCount);
});