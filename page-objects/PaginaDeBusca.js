class ProductPage{
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[id="search_product"]');
    this.searchButton = page.locator('button[id="submit_search"]');
    this.searchResults = page.locator('.productinfo p');
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
}

module.exports = { ProductPage };