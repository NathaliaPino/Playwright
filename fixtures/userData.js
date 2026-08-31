function buildValidUser() {
  const unique = Date.now(); // Isso garante e-mail único a cada execução

  return {
    name: 'Teste Usuário',
    email: `usuario.teste.${unique}@example.com`,
    password: 'SenhaForte123!',
    dateOfBirth: { day: '15', month: 'May', year: '1995' },
    firstName: 'Teste',
    lastName: 'Usuário',
    company: 'QA Challenge',
    address1: 'Rua das Flores, 123',
    address2: 'Apto 45',
    country: 'India',
    state: 'state',
    city: 'city',
    zipcode: '50000-000',
    mobileNumber: '81999999999',
  };
}

module.exports = { buildValidUser };