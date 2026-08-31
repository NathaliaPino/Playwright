Feature: Cadastro de usuário
  Como um visitante do site
  Eu quero me cadastrar com dados válidos
  Para ter acesso à minha conta

  @W01-cadastro
  Scenario: Cadastro de novo usuário com dados válidos
  Given que o usuário está na página de login
  When ele insere um nome e e-mail que não possuem cadastro
  And clica em "Signup"
  And preenche todas as informações com dados válidos
  Then o cadastro deve ser confirmado com sucesso
  And o usuário deve conseguir logar no site
    