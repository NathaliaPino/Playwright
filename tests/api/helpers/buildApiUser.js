function buildApiUser() {
  const unique = Date.now();
  return {
    name: 'Usuario Teste API',
    email: `usuario.api.${unique}@example.com`,
    password: 'SenhaForte123!',
    title: 'Mrs',
    birth_date: '15',
    birth_month: '5',
    birth_year: '1995',
    firstname: 'Usuario',
    lastname: 'Teste',
    company: 'QA Challenge',
    address1: 'Rua das Flores, 123',
    address2: 'Apto 45',
    country: 'India',
    zipcode: '500000',
    state: 'Karnataka',
    city: 'Bangalore',
    mobile_number: '81999999999',
  };
}

module.exports = { buildApiUser };