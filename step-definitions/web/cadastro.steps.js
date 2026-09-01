const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/PaginaDeLogin');
const { SignupPage } = require('../../page-objects/PáginadeCadastro');
const { HeaderComponent } = require('../../page-objects/Cabecalho');
const { buildValidUser } = require('../../fixtures/userData');
const { completeSignup } = require('../../utils/userRegistration');

Given('que o usuário está na página de login', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('ele insere um nome e e-mail que não possuem cadastro', async function () {
  this.testUser = buildValidUser();
  await this.loginPage.fillSignupNameAndEmail(this.testUser.name, this.testUser.email);
});

When('clica em {string}', async function (buttonLabel) {
  if (buttonLabel === 'Signup') {
    await this.loginPage.submitSignup();
    this.signupPage = new SignupPage(this.page);
  }
});

When('preenche todas as informações com dados válidos', async function () {
  await completeSignup(this.signupPage, this.testUser);
});

Then('o cadastro deve ser confirmado com sucesso', async function () {
  await expect(this.signupPage.accountCreatedMessage).toBeVisible();
  await this.signupPage.continueToHome();
});

Then('o usuário deve conseguir logar no site', async function () {
  const header = new HeaderComponent(this.page);
  await expect(header.loggedInAs(this.testUser.name)).toBeVisible();
});