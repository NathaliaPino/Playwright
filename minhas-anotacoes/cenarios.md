COMANDOS BÁSICOS:

Web (Cucumber)

# Roda a suíte Web inteira
npm run test:web

# Um cenário pela tag
npx cucumber-js --tags "@W04-busca"

# Dois ou mais cenários (or)
npx cucumber-js --tags "@W05-pag-produtos or @W05-view-product"

# Grupos por tag
npx cucumber-js --tags "@regression"
npx cucumber-js --tags "@smoke"

# Por nome do cenário (aceita um trecho do nome)
npx cucumber-js --name "Busca por produto existente"

# Só verifica se todos os steps estão ligados, sem abrir navegador
npx cucumber-js --dry-run


API (Playwright Test)

# Roda todos os testes de API
npm run test:api

# Um arquivo específico
npx playwright test tests/api/productsList.spec.js

# Filtrando pelo nome do teste (ou do describe)
npx playwright test -g "A03"

# Lista os testes sem executar
npx playwright test --list

# Abre o relatório HTML da última execução
npx playwright show-report


## Como ver o print de um teste que falhou (W12 - evidência em falha)

1. Rode o teste (suíte inteira ou só uma tag)
2. Entra na pasta do projeto → reports → cucumber-report.html
3. Dá duplo clique, abre no navegador
4. Se a aba já estava aberta de uma execução anterior, aperta Cmd+R
   (o arquivo NÃO atualiza sozinho)
5. Procura o cenário que falhou (aparece marcado/vermelho) e clica pra expandir
6. O print fica logo ABAIXO do bloco de erro em vermelho — às vezes precisa
   rolar a página pra baixo pra ver a imagem inteira (ela é da tela inteira,
   não só o que cabe na janela)


# W01 - WEB - Cadastro de usuário

- Usa: LoginPage, SignupPage, HeaderComponent
# W01 - WEB - Cadastro de usuário

Objetivo: preencher o formulário com dados válidos e validar que o cadastro é confirmado.

Usa: LoginPage, SignupPage, HeaderComponent

1. Criei o BDD na pasta features, no arquivo de cadastro. Todos os cenários de cadastro ficariam aqui; no caso, só tem um.
   (Objetivo: preencher o formulário com dados válidos e validar que o cadastro é confirmado.)

2. Criei um arquivo na pasta page-objects para a página de cadastro (SignupPage).

3. Cada página tem sua própria classe. A primeira coisa a fazer é mapear os locators, ou seja, tudo o que vou precisar daquela página.

4. Criei os métodos que iria precisar.

5. Comecei os step definitions, ligando o Gherkin aos Page Objects. Para esse cenário também precisei mexer em outras telas: métodos na página de login (o cadastro começa nela) e no header (para validar no final "Logged in as", confirmando o login automático).

Massa de teste:
- Usei a massa que está na pasta fixtures (buildValidUser), com e-mail único por execução.
- No step principal ("preenche todas as informações"), chamo a função que preenche e envia o cadastro, passando o this.testUser (que já está com "tudo preenchido", criado no step "ele insere um nome e e-mail...").
- É uma função (e não um método) porque não está dentro de nenhuma classe. Ela mora em utils e é usada em vários cenários.

Nota de cronologia: no W01 original, o cadastro foi escrito direto nos steps. Só depois, no W02, o fluxo foi extraído para utils (completeSignup) e o W01 passou a usá-lo.



# W02 e W03 - WEB - Login válido e inválido

Objetivo: Fazer um login com dados válidos e o w03 - tentar logar com dados inválidos

  @W02-login @regression
  Scenario: Login com credenciais válidas
    Given que existe um usuário cadastrado no site
    And o usuário está na página de login
    When ele faz login com e-mail e senha corretos
    Then ele deve estar autenticado no site

  @W03-login-invalido @regression
  Scenario: Login com credenciais inválidas
    Given que o usuário está na página de login
    When ele faz login com uma senha incorreta
    Then uma mensagem de erro deve ser exibida


W02 (positivo)
1. BDD
2. Page objects 
3. Step definitions:
   - O Given cadastra um usuário do zero e desloga, porque o site loga sozinho depois do cadastro. Para o cadastro, uso a função registerNewUser (criada em utils, reaproveitando o fluxo do W01)
   - Loga novamente, agora pelo método login, com o e-mail e a senha do this.testUser
   - O Then valida o "Logged in as" no header, confirmando que entrou com o usuário correto

W03 (negativo)
1. BDD
2. Page object (locator da mensagem de erro)
3. Step definitions:
   - Não precisa cadastrar usuário
   - O step principal faz login com e-mail e senha incorretos, escritos direto no step
   - O Then valida que a mensagem de erro apareceu



# W04 - WEB - Busca de produto

Objetivo: buscar por um produto e validar que o resultado é condizente com a busca.

1. BDD
2. Page Objects:
   - ProductPage (tela de listagem): mapeei os locators de busca e resultados e criei os métodos (goto, searchForProduct, getSearchResultNames, clickViewProduct)
   - ProductDetailPage (tela de detalhes): criei para ler a categoria, que só aparece nessa tela
3. Step definitions:
   - Entra na tela de produtos
   - Pesquisa por um produto
   - Valida que a busca trouxe pelo menos um resultado
   - Abre o primeiro produto e valida que o nome ou a categoria correspondem ao termo pesquisado


# A10 - API - Validação de schema (bônus)

Objetivo: implementar validação programática de schema em pelo menos um endpoint.

Reaproveita o mesmo endpoint do A01 (GET /productsList), mas troca a forma de validar:
em vez de conferir campo por campo manualmente, valida contra um "molde" formal (schema),
usando a biblioteca ajv.

1. Instalação: npm install --save-dev ajv

2. Criei o schema em tests/api/schemas/productSchema.js
   - required: lista os campos obrigatórios (id, name, price, brand, category)
   - properties: define o tipo de cada campo, incluindo category (objeto aninhado,
     com category.category e category.usertype.usertype)

