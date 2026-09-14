const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('ele seleciona a categoria {string} e a subcategoria {string}', async function (mainCategory, subCategory) {
  this.selectedCategory = subCategory;
  await this.productPage.selectCategory(mainCategory, subCategory);
});

Then('a página deve exibir produtos da categoria selecionada', async function () {
  const heading = await this.productPage.getCategoryHeadingText();
  expect(heading.toLowerCase()).toContain(this.selectedCategory.toLowerCase());
});