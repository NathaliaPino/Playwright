const { test, expect } = require('@playwright/test');
const { buildApiUser } = require('./helpers/buildApiUser');

test.describe('A06 - POST /verifyLogin (válido)', () => {
  test('deve autenticar com credenciais corretas', async ({ request }) => {
    const user = buildApiUser();

    // pré-condição: cria a conta antes de tentar logar com ela
    await request.post('/api/createAccount', { form: user });

    const response = await request.post('/api/verifyLogin', {
      form: { email: user.email, password: user.password },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });
});

test.describe('A07 - POST /verifyLogin (inválido)', () => {
  test('deve retornar erro com credenciais incorretas', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
      form: { email: 'usuario.que.nao.existe@example.com', password: 'SenhaErrada123!' },
    });

    expect(response.status()).toBe(200); // API sempre responde HTTP 200, mesmo em erro
    const body = await response.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });
});