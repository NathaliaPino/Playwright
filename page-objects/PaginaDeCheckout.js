class PaginaDeCheckout {
  constructor(page) {
    this.page = page;
    this.commentTextarea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.getByText('Place Order');
  }

    async placeOrder() {
        await this.placeOrderButton.click({ timeout: 10000 });
    }
}

module.exports = { PaginaDeCheckout };