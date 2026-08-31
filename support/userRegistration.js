const { LoginPage } = require('../page-objects/LoginPage');
const { SignupPage } = require('../page-objects/SignupPage');
const { HeaderComponent } = require('../page-objects/HeaderComponent');

async function registerNewUser(page, user) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillSignupNameAndEmail(user.name, user.email);
  await loginPage.submitSignup();

  const signupPage = new SignupPage(page);
  await signupPage.fillAccountInformation(user);
  await signupPage.submit();
  await signupPage.continueToHome();
}

module.exports = { registerNewUser };