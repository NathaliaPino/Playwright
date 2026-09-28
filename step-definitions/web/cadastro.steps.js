const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/PaginaDeLogin');
const { SignupPage } = require('../../page-objects/PaginadeCadastro');
const { HeaderComponent } = require('../../page-objects/Cabecalho');
const { buildValidUser } = require('../../fixtures/userData');
const { completeSignup } = require('../../utils/userRegistration');


Given('que o usuário está na página de login', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();

  // this.loginPage.goto() - localizado em page-objects/PaginaDeLogin.js
  // É o método que abre a página de login (goto - vá para)
  // O "await" espera o método terminar de executar, antes de seguir para a próxima linha.
});

When('ele insere um nome e e-mail que não possuem cadastro', async function () {
  this.testUser = buildValidUser(); 
  // buildValidUser() cria e devolve um objeto novo, com dados mockados (massa) de usuário.
  // this.testUser passa a apontar para esse objeto — guardado no World do Cucumber,
  // disponível para os próximos steps deste mesmo cenário.
  // Função localizada em fixtures/userData.js
  // Função para a contrução de usuario com dados mockados (massa)
  await this.loginPage.fillSignupNameAndEmail(this.testUser.name, this.testUser.email);
  // Chama o método fillSignupNameAndEmail (que existe dentro da classe LoginPage).
  // localizado em page-objects/PaginaDeLogin.js
  // Esse método preenche nome e email na tela, um campo de cada vez.
  // O "await" espera o método inteiro terminar de executar, antes de seguir para a próxima linha.
  // terminar de verdade, antes do step seguir pra próxima linha. 
  // OBS: Preenche os campos de nome e email (único - que ainda não existe) no formulário de cadastro 
});

When('clica em {string}', async function (buttonLabel) {
  if (buttonLabel === 'Signup') {
    await this.loginPage.submitSignup();
    this.signupPage = new SignupPage(this.page);
  }

  // Se o buttonLabel for "signup", então chama o método submitSignup 
  // localizado em page-objects/PaginaDeLogin.js (existe dentro da classe LoginPage)
  // Esse método clica no botão de cadastro.
  // O "await" espera o método inteiro terminar de executar, 
  // antes de seguir para a próxima linha.
  // Como a navegação levou pra uma TELA DIFERENTE, cria um objeto novo,
    // a partir da classe SignupPage, localizada em page-objects/PaginadeCadastro.js
    // Guarda esse objeto em this.signupPage, pra os PRÓXIMOS steps
});

When('preenche todas as informações com dados válidos', async function () {
  await completeSignup(this.signupPage, this.testUser); 

  // this.testUser - criado no step anterior, com buildValidUser()
  // Chama a função completeSignup (localizada em utils/userRegistration.js)
  // Essa função recebe o signupPage e o testUser, e por dentro dela chama,
  // em sequência: fillAccountInformation(user) — que preenche o formulário
  // completo — e depois submit() — que clica em "Create Account".
  // Os dois métodos existem dentro da classe SignupPage,
  // localizada em page-objects/PaginadeCadastro.js
  // O "await" espera a função inteira (incluindo as duas chamadas por dentro)
  // terminar de executar, antes de seguir para a próxima linha.
});

Then('o cadastro deve ser confirmado com sucesso', async function () {
  await expect(this.signupPage.accountCreatedMessage).toBeVisible();
  await this.signupPage.continueToHome();

  // this.signupPage.accountCreatedMessage - localizado em page-objects/PaginadeCadastro.js
  // É o elemento que contém a mensagem de sucesso do cadastro.
  // O "await" espera o expect terminar de executar, antes de seguir para a próxima linha.
  // this.signupPage.continueToHome() - localizado em page-objects/PaginadeCadastro.js
  // É o método que clica no botão "Continue" da tela de cadastro.
  // O "await" espera o método terminar de executar, antes de seguir para a próxima linha.
});

Then('o usuário deve conseguir logar no site', async function () {
  const header = new HeaderComponent(this.page);
  await expect(header.loggedInAs(this.testUser.name)).toBeVisible();

  // this.testUser.name - criado no step anterior, com buildValidUser()
  // o header.loggedInAs() - localizado em page-objects/Cabecalho.js
  // é o método que retorna o elemento que contém a mensagem "Logged in as <nome do usuário>"
  // O "await" espera o expect terminar de executar, antes de seguir para a próxima linha.
});