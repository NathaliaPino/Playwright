const { test, expect } = require('@playwright/test');
// Traz test (declara um teste) e expect (faz verificações), direto do Playwright —
// sem Cucumber, camada de API usa o Playwright Test runner puro.

test.describe('A02 - GET /brandsList', () => {
  test('deve retornar status 200 e a estrutura esperada da lista de marcas', async ({ request }) => {
    const response = await request.get('/api/brandsList'); //Faz uma requisição GET para o endpoint /api/brandsList

    expect(response.status()).toBe(200); //Confirma que o status HTTP da resposta é 200

    const body = await response.json(); //Converte o corpo da resposta em objeto JavaScript, com .json()
    expect(body.responseCode).toBe(200); //Confirma que o campo responseCode, dentro do JSON, também é 200
    expect(Array.isArray(body.brands)).toBe(true); //Confirma que brands é uma lista (array), não outra coisa
    expect(body.brands.length).toBeGreaterThan(0); //Confirma que a lista de marcas não está vazia

    const firstBrand = body.brands[0]; //Pega a primeira marca da lista de marcas
    expect(firstBrand).toHaveProperty('id'); //Confirma que o primeiro produto tem a propriedade id
    expect(firstBrand).toHaveProperty('brand'); //Confirma que o primeiro produto tem a propriedade brand
    expect(typeof firstBrand.id).toBe('number'); //Confirma que o tipo da propriedade id é number
    expect(typeof firstBrand.brand).toBe('string'); //Confirma que o tipo da propriedade brand é string
  });
});