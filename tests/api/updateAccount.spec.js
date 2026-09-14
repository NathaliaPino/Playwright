const { test, expect } = require('@playwright/test');
const { buildApiUser } = require('./helpers/buildApiUser');

test.describe('A09 - PUT /updateAccount', () => {
  test('deve atualizar os dados da conta com sucesso', async ({ request }) => {
    const user = buildApiUser();
    await request.post('/api/createAccount', { form: user });

    const updatedUser = { ...user, firstname: 'NomeAtualizado' };
    const response = await request.put('/api/updateAccount', { form: updatedUser });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User updated!');
  });
});