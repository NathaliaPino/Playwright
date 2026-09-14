Feature: Navegação por categoria
  Como um visitante do site
  Eu quero navegar pelas categorias de produtos
  Para encontrar itens de um tipo específico

  @W09-categoria @regression
  Scenario: Selecionar categoria e validar produtos listados
    Given que o usuário está na página de produtos
    When ele seleciona a categoria "Women" e a subcategoria "Dress"
    Then a página deve exibir produtos da categoria selecionada