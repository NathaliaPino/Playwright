class PaginaDoCarrinho {
  constructor(page) {
    this.page = page;
    this.firstProductRow = page.locator('#cart_info_table tbody tr').first();
  }

  async getFirstProductNameAndPrice() {
    const name = (await this.firstProductRow.locator('.cart_description a').textContent()).trim();
    const price = (await this.firstProductRow.locator('.cart_price p').textContent()).trim();
    return { name, price };
  }
}

module.exports = { PaginaDoCarrinho };