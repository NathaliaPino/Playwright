Feature: Adicionar produto ao carrinho
    Como um visitante do site
    Eu quero adicionar produtos ao carrinho
    Para comprar os itens desejados

    @W05-pag-produtos @regression
    Scenario: Adicionar produto ao carrinho a partir da página de produtos
        Given que o usuário está na página de produtos
        When ele clica para adicionar um produto ao carrinho
        And uma mensagem de confirmação é exibida
        Then o produto deve aparecer no carrinho

    @W05-view-product @regression
    Scenario: Adicionar produto ao carrinho após clicar em "View Product"
        Given que o usuário está na página de produtos
        When ele clica em "View Product" de um produto
        And clica para adicionar o produto ao carrinho
        And uma mensagem de confirmação é exibida
        Then o produto deve aparecer no carrinho


    @W07-remover-carrinho @regression
    Scenario: Remover produto do carrinho
        Given que o usuário está na página de produtos
        When ele clica para adicionar um produto ao carrinho
        And acessa o carrinho
        Then o carrinho deve conter 1 produto
        When remove o produto do carrinho
        Then o carrinho deve ficar vazio
