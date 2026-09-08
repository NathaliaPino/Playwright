class ProductPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[id="search_product"]');
    this.searchButton = page.locator('button[id="submit_search"]');
    this.searchResults = page.locator('.productinfo p');
    this.viewProductLink = page.getByRole('link', { name: 'View Product' });
    this.productPrice = page.locator('.productinfo h2');
    this.AddToCartButton = page.locator('.productinfo .add-to-cart');
    this.addedToCartMessage = page.getByText('Added!');
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
  }

  async goto() {
    await this.page.goto('/products');
  }

  async searchForProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async getSearchResultNames() {
    const results = await this.searchResults.allTextContents();
    return results.map((result) => result.trim()).filter(Boolean);
  }

  async clickViewProduct() {
    await this.viewProductLink.first().click();
  }


  /* ----- */


  async getFirstProductNameAndPrice() {
    const name = (await this.searchResults.first().textContent()).trim();
    const price = (await this.productPrice.first().textContent()).trim();
    return { name, price };
  }

  async addFirstProductToCart() {
    await this.AddToCartButton.first().click();
  }

  async goToCart() {
    await this.viewCartLink.click();
  }


  


}

module.exports = { ProductPage };


