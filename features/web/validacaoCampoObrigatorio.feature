Feature: Validação de campo obrigatório
  Como um visitante do site
  Eu quero que o sistema valide campos obrigatórios
  Para evitar cadastros incompletos

  @W08-campo-obrigatorio @regression
  Scenario: Submeter formulário de cadastro sem preencher o nome
    Given que o usuário está na página de login
    And ele insere um nome e e-mail que não possuem cadastro
    And clica em "Signup"
    When ele submete o formulário de cadastro sem preencher o primeiro nome
    Then o cadastro não deve ser confirmado