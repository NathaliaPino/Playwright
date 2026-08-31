const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage');
const { HeaderComponent } = require('../../page-objects/HeaderComponent');
const { buildValidUser } = require('../../fixtures/userData');
const { registerNewUser } = require('../../support/userRegistration');

Given('que existe um usuário cadastrado no site', async function () {
  this.testUser = buildValidUser();
  await registerNewUser(this.page, this.testUser);

  const header = new HeaderComponent(this.page);
  await header.logout();
});

When('o usuário está na página de login', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('ele faz login com e-mail e senha corretos', async function () {
  await this.loginPage.login(this.testUser.email, this.testUser.password);
});

Then('ele deve estar autenticado no site', async function () {
  const header = new HeaderComponent(this.page);
  await expect(header.loggedInAs(this.testUser.name)).toBeVisible();
});

When('ele faz login com uma senha incorreta', function () {
  return 'pending';
});

Then('uma mensagem de erro deve ser exibida', function () {
  return 'pending';
});