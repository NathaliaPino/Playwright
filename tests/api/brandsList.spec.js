const { test, expect } = require('@playwright/test');

test.describe('A02 - GET /brandsList', () => {
  test('deve retornar status 200 e a estrutura esperada da lista de marcas', async ({ request }) => {
    const response = await request.get('/api/brandsList');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);

    const firstBrand = body.brands[0];
    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');
    expect(typeof firstBrand.id).toBe('number');
    expect(typeof firstBrand.brand).toBe('string');
  });
});