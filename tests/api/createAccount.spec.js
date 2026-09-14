const { test, expect } = require('@playwright/test');
const { buildApiUser } = require('./helpers/buildApiUser');

test.describe('A05 - POST /createAccount', () => {
  test('deve criar uma conta com sucesso', async ({ request }) => {
    const user = buildApiUser();

    const response = await request.post('/api/createAccount', { form: user });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe('User created!');
  });
});