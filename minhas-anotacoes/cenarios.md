# W01 - WEB - Cadastro de usuário

- Usa: LoginPage, SignupPage, HeaderComponent

-> Criação do BDD (objetivo: preencher o formulário com dados válidos e validar que o cadastro é confirmado)
-> Criação do Page Object da tela de cadastro (SignupPage)
-> Também é necessário usar o Page Object da tela de login, pois o cadastro começa nela
-> Criação dos dados mockados na pasta fixtures (buildValidUser, com e-mail único por execução)
-> Criação dos step definitions, ligando o Gherkin aos Page Objects
-> Validação no header no final ("Logged in as"), confirmando o login automático

-> (o cadastro em si foi escrito direto nos steps; só depois foi extraído para utils)


# W02 e W03 - Login válido e inválido

W02 (login válido):
-> Criar o BDD
-> Adicionar o método login no Page Object da tela de login
-> Adicionar o método logout no header
-> Criar a função registerNewUser em utils, que faz o cadastro completo (reaproveitando o fluxo do W01)
-> No step, criar um usuário do zero com essa função e deslogar (o site loga sozinho após o cadastro)
-> Fazer o login pelo método login e validar o "Logged in as" no header

W03 (login inválido):
-> Criar o BDD
-> Adicionar o locator da mensagem de erro no Page Object da tela de login
-> No step, fazer login com credenciais que não existem e validar que a mensagem aparece
-> Não precisa criar usuário