const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/PaginaDeLogin');
const { ProductPage } = require('../../page-objects/PaginaDeProdutos');
const { PaginaDoCarrinho } = require('../../page-objects/PaginaDoCarrinho');
const { PaginaDeCheckout } = require('../../page-objects/PaginaDeCheckout');
const { PaginaDePagamento } = require('../../page-objects/PaginaDePagamento');
const { buildValidUser, buildPaymentData } = require('../../fixtures/userData');
const { registerNewUser } = require('../../utils/userRegistration');
const { HeaderComponent } = require('../../page-objects/Cabecalho');

Given('que o usuário está autenticado no site', async function () {
  this.testUser = buildValidUser();
  const signupPage = await registerNewUser(this.page, this.testUser);
  await signupPage.continueToHome();

  const header = new HeaderComponent(this.page);
  await header.logout();

  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
  await this.loginPage.login(this.testUser.email, this.testUser.password);
});

Given('ele adicionou um produto ao carrinho', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.goto();
  this.addedProduct = await this.productPage.getFirstProductNameAndPrice();
  await this.productPage.addFirstProductToCart();
});

When('ele avança para o checkout', async function () {
  await this.productPage.goToCart();
  const cartPage = new PaginaDoCarrinho(this.page);
  await cartPage.proceedToCheckout();
});

When('confirma o pedido', async function () {
  this.checkoutPage = new PaginaDeCheckout(this.page);
  await this.checkoutPage.placeOrder();
});

When('preenche os dados de pagamento', async function () {
  const paymentPage = new PaginaDePagamento(this.page);
  const payment = buildPaymentData();
  await paymentPage.fillPaymentDetails(payment);
  this.paymentPage = paymentPage;
});

Then('o pedido deve ser confirmado com sucesso', async function () {
  await expect(this.paymentPage.confirmationMessage).toBeVisible();
});