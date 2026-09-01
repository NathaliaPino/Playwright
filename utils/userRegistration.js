const { LoginPage } = require('../page-objects/PaginaDeLogin');
const { SignupPage } = require('../page-objects/PáginadeCadastro');

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
}

async function registerNewUser(page, user) {
  const signupPage = await startSignup(page, user);
  await completeSignup(signupPage, user);
  return signupPage;
}

module.exports = { startSignup, completeSignup, registerNewUser };