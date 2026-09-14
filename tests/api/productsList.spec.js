const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const { productSchema } = require('./schemas/productSchema');

const ajv = new Ajv();
const validate = ajv.compile(productSchema);

test.describe('A01 - GET /productsList', () => {
  test('deve retornar status 200 e a estrutura esperada da lista de produtos', async ({ request }) => {
    const response = await request.get('/api/productsList');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    const firstProduct = body.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');
  });

  test('A10 - cada produto deve seguir o schema esperado', async ({ request }) => {
    const response = await request.get('/api/productsList');
    const body = await response.json();

    for (const product of body.products) {
      const isValid = validate(product);
      expect(isValid, JSON.stringify(validate.errors)).toBe(true);
    }
  });
});