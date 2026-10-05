class CartPage {
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
    // pega o nome do produto na primeira linha da tabela do carrinho, remove espaços desnecessários e guarda na variável name.
    const price = (await firstRow.locator('.cart_price p').textContent()).trim();
    // pega o preço do produto na primeira linha da tabela do carrinho, remove espaços desnecessários e guarda na variável price.
    return { name, price };

    // devolve um objeto com o nome e preço do produto
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
    // clica no botão "Proceed To Checkout" e leva para a página de checkout
  }

  async removeFirstProduct() {
    await this.deleteButton.first().click();
    await this.page.waitForLoadState('networkidle');
    // Método do próprio Playwright (da page). Pausa o teste até a rede ficar ociosa,
    // ou seja, sem requisições pendentes por cerca de meio segundo.
    // Aqui serve para esperar a chamada de remoção ao servidor terminar,
    // antes do teste seguir para a verificação.
    // O valor 'networkidle' é fixo: o método só aceita 'load', 'domcontentloaded' ou 'networkidle'


    
    // clica no primeiro botão "X" do carrinho (o da primeira linha, já que cada linha tem um)
    // e espera a rede ficar ociosa, ou seja, a chamada de remoção terminar
  }



  async getProductCount() {
    return await this.productRows.count();
    // conta quantas linhas de produtos existem na tabela do carrinho
  }
}

module.exports = { CartPage };