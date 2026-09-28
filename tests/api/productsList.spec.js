const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const { productSchema } = require('./schemas/productSchema');

const ajv = new Ajv();
const validate = ajv.compile(productSchema);

test.describe('A01 - GET /productsList', () => {
  test('deve retornar status 200 e a estrutura esperada da lista de produtos', async ({ request }) => {
    const response = await request.get('/api/productsList'); //Faz uma requisição GET para o endpoint /api/productsList

    expect(response.status()).toBe(200); //Confirma que o status HTTP da resposta é 200

    const body = await response.json(); //Converte o corpo da resposta em objeto JavaScript, com .json()

    expect(body.responseCode).toBe(200); //Confirma que o campo responseCode, dentro do JSON, também é 200
    expect(Array.isArray(body.products)).toBe(true); //Confirma que products é uma lista (array), não outra coisa
    expect(body.products.length).toBeGreaterThan(0); //Confirma que a lista de produtos não está vazia

    const firstProduct = body.products[0]; //Pega o primeiro produto da lista de produtos
    expect(firstProduct).toHaveProperty('id'); //Confirma que o primeiro produto tem a propriedade id
    expect(firstProduct).toHaveProperty('name'); //Confirma que o primeiro produto tem a propriedade name
    expect(firstProduct).toHaveProperty('price'); //Confirma que o primeiro produto tem a propriedade price
    expect(firstProduct).toHaveProperty('brand'); //Confirma que o primeiro produto tem a propriedade brand
    expect(firstProduct).toHaveProperty('category'); //Confirma que o primeiro produto tem a propriedade category
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