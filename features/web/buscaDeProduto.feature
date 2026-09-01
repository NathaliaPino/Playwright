Feature: Busca de produto
  Como um visitante do site
  Eu quero buscar produtos
  Para encontrar os itens que desejo

  @W04-busca @regression
  Scenario: Busca por produto existente
  Given que o usuário está na página de produtos
  When ele busca por um produto existente
  Then os resultados exibidos devem conter o termo buscado