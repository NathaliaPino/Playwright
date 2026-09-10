function buildValidUser() {
  const unique = Date.now();

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

function buildPaymentData() {
  return {
    name: 'Teste Cartão',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2030',
  };
}

module.exports = { buildValidUser, buildPaymentData };