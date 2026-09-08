class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.categoryText = page.locator('.product-information p', { hasText: 'Category' });
    this.productName = page.locator('.product-information h2');
    this.productPrice = page.locator('.product-information span span');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  async getCategoryText() {
    return await this.categoryText.textContent();
  }

  async getNameAndPrice() {
    const name = (await this.productName.textContent()).trim();
    const price = (await this.productPrice.textContent()).trim();
    return { name, price };
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}

module.exports = { ProductDetailPage };

