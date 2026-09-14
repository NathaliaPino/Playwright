const { test, expect } = require('@playwright/test');
const { buildApiUser } = require('./helpers/buildApiUser');

test.describe('A08 - DELETE /deleteAccount', () => {
  test('deve remover a conta e confirmar que ela não existe mais', async ({ request }) => {
    const user = buildApiUser();
    await request.post('/api/createAccount', { form: user });

    const deleteResponse = await request.delete('/api/deleteAccount', {
      form: { email: user.email, password: user.password },
    });

    expect(deleteResponse.status()).toBe(200);
    const deleteBody = await deleteResponse.json();
    expect(deleteBody.responseCode).toBe(200);
    expect(deleteBody.message).toBe('Account deleted!');

    // confirma o efeito real da exclusão, não só a mensagem de sucesso
    const loginResponse = await request.post('/api/verifyLogin', {
      form: { email: user.email, password: user.password },
    });
    const loginBody = await loginResponse.json();
    expect(loginBody.responseCode).toBe(404);
  });
});