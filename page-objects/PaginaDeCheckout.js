class PaginaDeCheckout {
  constructor(page) {
    this.page = page;
    this.commentTextarea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.getByText('Place Order');
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}

module.exports = { PaginaDeCheckout };