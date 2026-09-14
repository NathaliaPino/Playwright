const { test, expect } = require('@playwright/test');

test.describe('A03 - POST /searchProduct (válido)', () => {
  test('deve retornar produtos relacionados ao termo buscado (nome ou categoria)', async ({ request }) => {
    const searchTerm = 'top';
    const response = await request.post('/api/searchProduct', {
      form: { search_product: searchTerm },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    for (const product of body.products) {
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesCategory = product.category.category.toLowerCase().includes(searchTerm);
      expect(matchesName || matchesCategory).toBe(true);
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