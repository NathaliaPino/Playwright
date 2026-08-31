Feature: Login de usuário
  Como um usuário cadastrado no site
  Eu quero fazer login com minhas credenciais
  Para acessar minha conta

  @W02-login
  Scenario: Login com credenciais válidas
    Given que existe um usuário cadastrado no site
    And o usuário está na página de login
    When ele faz login com e-mail e senha corretos
    Then ele deve estar autenticado no site

  @W03-login
  Scenario: Login com credenciais inválidas
    Given que o usuário está na página de login
    When ele faz login com uma senha incorreta
    Then uma mensagem de erro deve ser exibida