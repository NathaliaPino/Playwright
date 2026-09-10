class PaginaDoCarrinho {
  constructor(page) {
    this.page = page;
    this.firstProductRow = page.locator('#cart_info_table tbody tr').first();
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
  }

  async getFirstProductNameAndPrice() {
    const name = (await this.firstProductRow.locator('.cart_description a').textContent()).trim();
    const price = (await this.firstProductRow.locator('.cart_price p').textContent()).trim();
    return { name, price };
  }

   async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}

module.exports = { PaginaDoCarrinho };