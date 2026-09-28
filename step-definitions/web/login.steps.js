const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/PaginaDeLogin');
const { HeaderComponent } = require('../../page-objects/Cabecalho');
const { buildValidUser } = require('../../fixtures/userData');
const { registerNewUser } = require('../../utils/userRegistration');

Given('que existe um usuário cadastrado no site', async function () {
  this.testUser = buildValidUser();
  // buildValidUser() cria e devolve um objeto novo com os dados do usuário (massa).
  // this.testUser passa a apontar para esse objeto.
  // Função localizada em fixtures/userData.js

  const signupPage = await registerNewUser(this.page, this.testUser);
  // registerNewUser faz o cadastro completo
  // Devolve o signupPage (o Page Object da tela de cadastro), guardado numa variável comum
  // porque só é usado neste step.
  // Função localizada em utils/userRegistration.js
  // O "await" espera o cadastro inteiro terminar antes de seguir para a próxima linha.


  await signupPage.continueToHome();
  // Chama o método continueToHome (dentro da classe SignupPage), que clica em "Continue"
  // na tela "ACCOUNT CREATED!". O site loga o usuário automaticamente depois disso.
  // Localizado em page-objects/PaginadeCadastro.js


  const header = new HeaderComponent(this.page);
  // Cria um objeto da classe HeaderComponent (o cabeçalho do site).
  // Variável comum (const), porque nenhum step seguinte reaproveita este objeto.
  // Classe localizada em page-objects/Cabecalho.js

  await header.logout();
  // Chama o método logout (dentro da classe HeaderComponent), que clica em "Logout".
  // Objetivo: deixar o usuário existente, mas deslogado, para o cenário testar o login de verdade.
  // Localizado em page-objects/Cabecalho.js

  //Resumo: step cria um usuário novo, loga ele, e depois desloga.
});

When('o usuário está na página de login', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();

  // this.loginPage.goto() - localizado em page-objects/PaginaDeLogin.js
  // É o método que abre a página de login (goto - vá para)
  // O "await" espera o método terminar de executar, antes de seguir para a próxima linha.
});

When('ele faz login com e-mail e senha corretos', async function () {
  await this.loginPage.login(this.testUser.email, this.testUser.password);

  // this.loginPage - criado no When "o usuário está na página de login"
  // this.testUser - criado no Given "que existe um usuário cadastrado no site" (aqui só é lido)
  // Chama o método login (dentro da classe LoginPage), localizado em page-objects/PaginaDeLogin.js
  // Esse método preenche e-mail e senha, um campo de cada vez, e clica em "Login".
  // O "await" espera o método inteiro terminar de executar, antes de seguir para a próxima linha.
});

Then('ele deve estar autenticado no site', async function () {
  const header = new HeaderComponent(this.page);
  await expect(header.loggedInAs(this.testUser.name)).toBeVisible();

  // Cria um objeto da classe HeaderComponent (o cabeçalho do site).
  // Variável comum (const), porque nenhum step seguinte reaproveita este objeto.
  // Classe localizada em page-objects/Cabecalho.js

  // this.testUser.name - vem do objeto criado no Given "que existe um usuário cadastrado no site"
  // loggedInAs(nome) devolve um locator (o "endereço" do texto "Logged in as <nome>").
  // Localizado em page-objects/Cabecalho.js
  // O expect(...).toBeVisible() é quem procura esse texto na tela e verifica se aparece,
  // confirmando que o login deu certo.

});

When('ele faz login com uma senha incorreta', async function () {
  await this.loginPage.login('usuario.que.nao.existe@example.com', 'SenhaErrada123!');

  // this.loginPage - criado no When "o usuário está na página de login"
  // Chama o método login (dentro da classe LoginPage), localizado em page-objects/PaginaDeLogin.js
  // Esse método preenche e-mail e senha, um campo de cada vez, e clica em "Login".
  // O "await" espera o método inteiro terminar de executar, antes de seguir para a próxima linha.
});

Then('uma mensagem de erro deve ser exibida', async function () {
  await expect(this.loginPage.loginErrorMessage).toBeVisible();

  // this.loginPage - criado no When "o usuário está na página de login"
  // loginErrorMessage devolve um locator (o "endereço" do texto de erro).
  // Localizado em page-objects/PaginaDeLogin.js
  // O expect(...).toBeVisible() é quem procura esse texto na tela e verifica se aparece,
  // confirmando que o login falhou.
});


/* W10 */

When('ele faz login com email {string} e senha {string}', async function (email, password) {
  await this.loginPage.login(email, password);
});