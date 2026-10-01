const { test, expect } = require('@playwright/test');
// Traz test (declara um teste) e expect (faz verificações), direto do Playwright —
// sem Cucumber, camada de API usa o Playwright Test runner puro.

test.describe('A03 - POST /searchProduct (válido)', () => {
  test('deve retornar produtos relacionados ao termo buscado (nome ou categoria)', async ({ request }) => {
    // request é entregue automaticamente pelo Playwright Test — é o APIRequestContext,
    // usado para fazer chamadas HTTP puras, sem abrir navegador.
    
    const searchTerm = 'top';
    const response = await request.post('/api/searchProduct', {
      form: { search_product: searchTerm },
    });
    //pesquisa produtos com o termo 'top' (pode ser parte do nome ou da categoria)

    expect(response.status()).toBe(200);
    // Confere o status HTTP da resposta.


    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
    // Confere se a resposta tem o formato esperado: responseCode 200, se é uma lista e se 
    // products é uma lista não vazia.

    for (const product of body.products) {
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesCategory = product.category.category.toLowerCase().includes(searchTerm);
      expect(matchesName || matchesCategory).toBe(true);

      // Confere se cada produto retornado tem o termo buscado no nome OU na categoria.
    }
  });
});

test.describe('A04 - POST /searchProduct (sem parâmetro)', () => {
  test('deve retornar erro quando o parâmetro obrigatório não é enviado', async ({ request }) => {
    const response = await request.post('/api/searchProduct', {
      form: {},
    });

    const body = await response.json();
    expect(body.responseCode).toBe(400);
  });
});