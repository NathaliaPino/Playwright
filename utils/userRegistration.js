const { LoginPage } = require('../page-objects/PaginaDeLogin');
const { SignupPage } = require('../page-objects/PaginadeCadastro');

async function startSignup(page, user) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillSignupNameAndEmail(user.name, user.email);
  await loginPage.submitSignup();
  return new SignupPage(page);
}

async function completeSignup(signupPage, user) {
  await signupPage.fillAccountInformation(user);
  await signupPage.submit();

  //completeSignup()
  //é usada diretamente por: W01 (cadastro.steps.js)
  //é usada indiretamente por, dentro de registerNewUser():
        // W02 (login.steps.js)
        // W06 (checkout.steps.js)
}

async function registerNewUser(page, user) {
  const signupPage = await startSignup(page, user);
  await completeSignup(signupPage, user);
  return signupPage;
}

module.exports = { startSignup, completeSignup, registerNewUser };