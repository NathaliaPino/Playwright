Feature: Smoke test da automação

  @smoke
  Scenario: Acessar a home do site
    Given que eu acesso a página inicial do automationexercise
    Then eu devo ver o título da página