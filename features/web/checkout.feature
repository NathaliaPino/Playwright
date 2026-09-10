Feature: Checkout end-to-end
  Como um usuário autenticado
  Eu quero realizar o fluxo completo de compra
  Para finalizar meu pedido

  @W06-checkout @regression
  Scenario: Fluxo completo de checkout
    Given que o usuário está autenticado no site
    And ele adicionou um produto ao carrinho
    When ele avança para o checkout
    And confirma o pedido
    And preenche os dados de pagamento
    Then o pedido deve ser confirmado com sucesso