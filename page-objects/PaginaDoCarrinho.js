class PaginaDoCarrinho {
  constructor(page) {
    this.page = page;
    this.productRows = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
    this.deleteButton = page.locator('.cart_quantity_delete');
    this.emptyCartMessage = page.getByText('Cart is empty!');
  }

  async getFirstProductNameAndPrice() {
    const firstRow = this.productRows.first();
    const name = (await firstRow.locator('.cart_description a').textContent()).trim();
    const price = (await firstRow.locator('.cart_price p').textContent()).trim();
    return { name, price };
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async removeFirstProduct() {
    await this.deleteButton.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isCartEmpty() {
    return await this.emptyCartMessage.isVisible();
  }

  async getProductCount() {
    return await this.productRows.count();
  }
}

module.exports = { PaginaDoCarrinho };