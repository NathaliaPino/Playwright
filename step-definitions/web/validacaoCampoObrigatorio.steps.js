const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('ele submete o formulário de cadastro sem preencher o primeiro nome', async function () {
  const incompleteUser = { ...this.testUser };
  delete incompleteUser.firstName;

  await this.signupPage.fillAccountInformation(incompleteUser);
  await this.signupPage.submit();
});

Then('o cadastro não deve ser confirmado', async function () {
  await expect(this.signupPage.accountCreatedMessage).not.toBeVisible();
});