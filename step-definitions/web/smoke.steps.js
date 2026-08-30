const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('que eu acesso a página inicial do automationexercise', async function () {
  await this.page.goto('/');
});

Then('eu devo ver o título da página', async function () {
  await expect(this.page).toHaveTitle(/Automation Exercise/);
});