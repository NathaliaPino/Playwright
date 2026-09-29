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
    this.categoryHeading = page.locator('.title.text-center');
  }


  // Abre a página de listagem (/products).
  // Usado em W04, W05, W06, W07 e W09 (o baseURL completa o endereço).
  async goto() {
    await this.page.goto('/products');
  }


  // Digita o termo no campo e clica na lupa. Usado no W04.
  async searchForProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }


  // allTextContents() pega o texto de TODOS os produtos de uma vez (devolve uma lista).
  // trim() tira espaços sobrando, filter(Boolean) descarta textos vazios.
  // Usado no W04, para conferir que a busca trouxe resultados.
  async getSearchResultNames() {
    const results = await this.searchResults.allTextContents();
    //Pegue o texto de todos os resultados e guarde esses textos na variável results.
    return results.map((result) => result.trim()).filter(Boolean);
    //Pegue a lista de resultados, percorra cada item, 
    // remova os espaços desnecessários, remova os resultados vazios e retorne a lista limpa.
  }
  
  
  // .first() pega só o primeiro "View Product" da tela e clica nele.
  // Usado no W04 (para abrir o produto e ver a categoria) e no segundo cenário do W05.
  async clickViewProduct() {
    await this.viewProductLink.first().click();
  }


  /* ----- */

  // Lê nome e preço do PRIMEIRO produto da listagem e devolve os dois num objeto.
  // O step guarda isso em this.addedProduct para comparar depois com o que aparece no carrinho.
  // Usado no W05 (primeiro cenário), W06 e W07.
  async getFirstProductNameAndPrice() {
    const name = (await this.searchResults.first().textContent()).trim();
    const price = (await this.productPrice.first().textContent()).trim();
    return { name, price };
  }


  // Clica em "Add to cart" do primeiro produto. Usado no W05 (primeiro cenário), W06 e W07.
  async addFirstProductToCart() {
    await this.AddToCartButton.first().click();
  }

  // Clica em "View Cart" no modal e leva para o carrinho.
  // Usado no W05 (no Then), W06 (ao avançar para o checkout) e W07 (step "acessa o carrinho").
  async goToCart() {
    await this.viewCartLink.click();
  }



  /* W09 */

  async selectCategory(mainCategory, subCategory) {
  await this.page.getByRole('link', { name: ` ${mainCategory}` }).click();
  await this.page.getByRole('link', { name: subCategory }).click();
}

  async getCategoryHeadingText() {
    return (await this.categoryHeading.textContent()).trim();
  }
  


}

module.exports = { ProductPage };


