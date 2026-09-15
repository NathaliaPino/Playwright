# Desafio Técnico — Automação de Testes | automationexercise.com

Projeto de automação de testes cobrindo as camadas **Web** e **API** do site
[automationexercise.com](https://automationexercise.com).

## Objetivo

Validar, de forma automatizada, os principais fluxos de cadastro, login,
busca, carrinho e checkout do site, utilizando BDD (Gherkin) e Page Objects
na camada Web, e validação de contrato/dados na camada de API.

## Stack

- **Playwright** — controle de navegador (Web) e requisições HTTP (API)
- **@cucumber/cucumber** — BDD (Gherkin) para a camada Web
- **Playwright Test runner** — execução dos testes de API (sem BDD, conforme
  permitido pelo enunciado do desafio)
- **Ajv** — validação de JSON Schema (item bônus A10)
- **JavaScript** (não TypeScript — ver justificativa abaixo)

### Por que Playwright + Cucumber?

O desafio permitia escolher entre Cypress e Playwright. Optei por Playwright
por já estar em processo de aprendizado da ferramenta, e por sua API nativa
(`APIRequestContext`, via `request` no Playwright Test), que permite testar
a camada de API reaproveitando a mesma stack usada na camada Web, sem
depender de bibliotecas externas de request HTTP.

### Por que JavaScript, e não TypeScript?

O projeto foi iniciado a partir do template padrão do
`npm init playwright@latest`, em JavaScript. Como parte do foco deste
desafio, para mim, também é aprendizado da ferramenta, optei por manter em
JavaScript puro, para reduzir complexidade adicional de tipagem enquanto
me familiarizava com os conceitos centrais do Playwright e do BDD.

### Por que a camada de API não usa Gherkin/BDD

O próprio enunciado do desafio permite explicitamente que os testes de API
sejam escritos diretamente em JS/TS, sem `.feature`. Optei por isso: a
camada de API já é bem servida pela sintaxe nativa do Playwright Test
(`test`, `expect`, `request`).

## Estrutura de pastas

features/web/ → cenários Gherkin (.feature) da camada Web
step-definitions/web/ → implementação dos steps (Given/When/Then)
page-objects/ → Page Objects (locators + ações de cada página)
support/ → hooks do Cucumber (ciclo de vida do browser)
utils/ → funções utilitárias reutilizáveis (registro de usuário)
fixtures/ → massa de dados de teste (camada Web)
tests/api/ → testes de API (Playwright Test runner)
tests/api/helpers/ → geração de dados de usuário para a API
tests/api/schemas/ → schemas JSON usados na validação de contrato (A10)
playwright.config.js → configuração do Playwright Test runner (API)
cucumber.js → configuração do cucumber-js (camada Web)


### Page Objects

| Arquivo | Responsabilidade |
|---|---|
| `PaginaDeLogin.js` | Login e início do fluxo de cadastro |
| `PaginadeCadastro.js` | Preenchimento do formulário completo de cadastro |
| `Cabecalho.js` | Cabeçalho (login/logout, usuário autenticado) |
| `PaginaDeProdutos.js` | Listagem, busca, adicionar ao carrinho, navegação por categoria |
| `PaginaDeDetalhesDoProduto.js` | Detalhes do produto (categoria, nome, preço, adicionar ao carrinho) |
| `PaginaDoCarrinho.js` | Conteúdo do carrinho, remover produto, avançar para checkout |
| `PaginaDeCheckout.js` | Confirmação do pedido |
| `PaginaDePagamento.js` | Preenchimento de dados de pagamento e confirmação |

### Outros arquivos-chave

| Arquivo | Responsabilidade |
|---|---|
| `utils/userRegistration.js` | Orquestra o fluxo de cadastro (reaproveitado por W01, W02 e W06) |
| `fixtures/userData.js` | Geração de dados de usuário/pagamento de teste (e-mail único por execução) |
| `support/hooks.js` | Ciclo de vida do browser, bloqueio de domínios de anúncio, screenshot em falha |

## Instalação

```bash
npm install
npx playwright install
```

## Execução

```bash
# Testes Web (BDD)
npm run test:web
npx cucumber-js --tags @smoke
npx cucumber-js --tags @regression
npx cucumber-js --tags @W06-checkout
npx cucumber-js --tags "@W05-pag-produtos or @W05-view-product"
npx cucumber-js features/web/cadastro.feature

# Testes de API
npm run test:api
```

### Modo de execução do navegador (Web)

Por padrão, os testes Web rodam em modo **headless** (sem interface
gráfica), configurado em `support/hooks.js`:

```js
BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});
```

Esse é o modo recomendado para rodar a suíte completa (mais rápido, e
compatível com ambientes sem interface gráfica, como CI). Para quem quiser
**ver o navegador abrindo** durante a execução — útil para acompanhar ou
depurar um cenário específico — o arquivo já traz, comentadas,
duas outras opções prontas para usar:

```js
// Abre o navegador com janela visível, na velocidade normal
/*
BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});
*/

// Abre o navegador com janela visível, e mais devagar (1s entre cada ação) —
// útil para acompanhar o passo a passo com calma
/*
BeforeAll(async function () {
  browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });
});
*/
```

Para usar uma delas, comente o bloco `headless: true` ativo e descomente a
opção desejada. **Importante:** deixe apenas **um** desses três blocos
`BeforeAll` ativo por vez — ter mais de um simultaneamente causa erro, já
que o Cucumber não permite dois hooks `BeforeAll` inicializando a mesma
variável `browser` em duplicidade.

## Arquitetura e decisões de design

### Page Object Model

Toda interação com elementos de UI está encapsulada em Page Objects — os
locators ficam centralizados no `constructor` de cada classe, nunca
espalhados nos steps. Os métodos representam ações do usuário, não passos
técnicos soltos. Page Objects não guardam estado de teste (ex: qual foi o
último termo buscado) — isso fica a cargo do step, via `this` (World do
Cucumber). Um Page Object só executa ações e devolve dados; quem julga
resultado (via `expect`) é sempre o step.

### Ciclo de vida do navegador e resiliência (`support/hooks.js`)

- Cada cenário roda em `browser context` e `page` novos, garantindo
  isolamento total entre testes.
- Domínios conhecidos de anúncios de terceiros são bloqueados via
  interceptação de rede, evitando que banners/modais publicitários
  sobreponham elementos e causem falsos negativos por timeout — instabilidade
  real observada neste site durante o desenvolvimento.
- Diálogos nativos do navegador são dispensados automaticamente.
- Em caso de falha, um screenshot de página inteira é automaticamente
  anexado ao relatório (`After`), cobrindo o item bônus W12.

### Reaproveitamento de fluxos (`utils/userRegistration.js`)

O cadastro de usuário é usado no teste de cadastro em si (W01) e como
pré-condição de login (W02) e checkout (W06). Para evitar duplicar essa
lógica, ela foi extraída em funções reutilizáveis (`startSignup`,
`completeSignup`, `registerNewUser`).

### Dados de teste únicos

O site não permite resetar estado entre execuções, então o e-mail de cada
usuário de teste é gerado com timestamp (`Date.now()`), garantindo que
cada execução crie um usuário novo, sem colisão com execuções anteriores
— tanto na camada Web (`fixtures/userData.js`) quanto na API
(`tests/api/helpers/buildApiUser.js`).

## Cobertura de testes

### Camada Web

| ID | Cenário | Nível | Status |
|---|---|---|---|
| W01 | Cadastro de usuário | MUST | ✅ |
| W02 | Login — credenciais válidas | MUST | ✅ |
| W03 | Login — credenciais inválidas | MUST | ✅ |
| W04 | Busca de produto | MUST | ✅ |
| W05 | Adicionar produto ao carrinho | MUST | ✅ |
| W06 | Fluxo de checkout E2E | MUST | ✅ |
| W07 | Remover produto do carrinho | SHOULD | ✅ |
| W08 | Validação de campo obrigatório | SHOULD | ✅ |
| W09 | Navegação por categoria | SHOULD | ✅ |
| W10 | Scenario Outline / Examples | SHOULD | ✅ |
| W11 | Tags nos cenários | BONUS | ✅ |
| W12 | Evidência em falha | BONUS | ✅ |

### Camada API

| ID | Endpoint | Nível | Status |
|---|---|---|---|
| A01 | GET /productsList | MUST | ✅ |
| A02 | GET /brandsList | MUST | ✅ |
| A03 | POST /searchProduct — válido | MUST | ✅ |
| A04 | POST /searchProduct — sem parâmetro | MUST | ✅ |
| A05 | POST /createAccount | MUST | ✅ |
| A06 | POST /verifyLogin — válido | MUST | ✅ |
| A07 | POST /verifyLogin — inválido | MUST | ✅ |
| A08 | DELETE /deleteAccount | SHOULD | ✅ |
| A09 | PUT /updateAccount | SHOULD | ✅ |
| A10 | Validação de schema | BONUS | ✅ |

## Observações e decisões técnicas


### W04 — Busca de produto

A busca (`/products?search=`) filtra por **categoria** do produto, não
apenas pelo texto do nome — confirmado inspecionando manualmente produtos
retornados na busca por "dress" sem essa palavra no nome, mas categorizados
como `Kids > Dress`. Um dos resultados (uma blusa+short) está categorizado
como `Dress` sem ser um vestido — aparenta ser erro de cadastro do produto
no catálogo do site, não falha da busca.

Por isso, a validação foi dividida entre camadas:
- **Web (W04)**: valida que a busca retorna resultados não-vazios, e faz
  uma checagem leve — abre o primeiro produto retornado e confirma que
  sua categoria contém o termo buscado (custo de navegação controlado: 1
  acesso extra, não N).
- **API (A03)**: validação completa e rigorosa — todos os produtos
  retornados, comparando nome OU categoria via JSON estruturado, sem
  custo de navegação.

Essa divisão segue o princípio da pirâmide de testes: verificação leve de
fluxo na UI, verificação completa e barata na API.

### W05 — Adicionar produto ao carrinho

Os dois cenários usam o primeiro produto da listagem, sem busca prévia,
mesmo sendo possível reaproveitar os steps do W04. Escolha proposital:
cada cenário deve testar uma responsabilidade isolada — acoplar W05 à
busca faria uma falha na busca derrubar o W05 por um motivo alheio ao que
ele deveria validar.

### W06 — Fluxo de checkout E2E

O cenário cadastra um novo usuário a cada execução (cadastro → logout →
login), em vez de usar uma conta fixa. automationexercise.com é um site
público usado por muitas pessoas para prática de automação — uma conta
fixa correria risco real de ser excluída (existe até um endpoint dedicado,
testado no A08) ou ter senha alterada por outro teste concorrente. Login é
feito explicitamente (não só via login automático pós-cadastro), pois o
critério de aceite menciona "login" como etapa explícita do fluxo.

### W07 — Remover produto do carrinho

Durante o desenvolvimento, este cenário apresentou falhas intermitentes:
a mensagem "Cart is empty!" às vezes demorava a aparecer ou nunca chegava
a aparecer, mesmo após a remoção do produto. Investigando via screenshot
de falha, identificamos a causa real: banners/overlays publicitários
cobrindo o botão de remover, impedindo o clique de surtir efeito —
mesmo com o bloqueio de domínios de anúncio já ativo no `hooks.js`,
provavelmente por anúncios servidos de redes não cobertas pela lista
original.

Duas medidas foram tomadas: a lista de domínios bloqueados foi expandida
para incluir outras redes de anúncio comuns além do Google, e o timeout
dessa asserção específica foi ampliado para 10s (em vez do padrão global),
como margem extra de segurança. Após esses ajustes, a suíte completa
passou de forma consistente em execuções subsequentes. Como o site é
público e os anúncios servidos variam a cada carregamento, uma
reincidência pontual não pode ser totalmente descartada — mas o
comportamento observado até aqui indica que essas medidas mitigaram bem
o problema.

### W08 — Validação de campo obrigatório

O campo testado possui atributo HTML `required`, então o próprio navegador
bloqueia o envio via validação nativa, antes da requisição chegar ao
servidor. Como esse balão de validação não é parte do DOM (não pode ser
verificado via locator), o teste valida a consequência esperada — a conta
não é criada — que é o comportamento relevante para o critério de aceite.

### A03 — Confirmação da hipótese do W04

O produto "Little Girls Mr. Panda Shirt" retorna na busca por "top" porque
sua categoria é "Tops & Shirts" (contém "top"), mesmo sem a palavra no
nome — confirmando via dado estruturado a mesma hipótese investigada
manualmente no W04.

### Observação geral sobre a API do site

As APIs respondem consistentemente com **status HTTP 200**, independente
do resultado da operação — o resultado semântico real fica no campo
`responseCode` do corpo da resposta (ex.: `404` para usuário não
encontrado, `400` para parâmetro ausente, `201` para criação bem-sucedida).
Confirmado via testes manuais no Postman antes da automação. Por isso, os
testes de API validam `response.status()` e `body.responseCode`
separadamente.

Além disso, os parâmetros dos endpoints POST/PUT/DELETE são enviados como
`x-www-form-urlencoded` (`form: {...}` no Playwright), não como JSON —
comportamento também confirmado manualmente antes de escrever os testes.

### A10 — Validação de schema

O schema usado (`tests/api/schemas/productSchema.js`) foi inferido a
partir de amostras reais da resposta de `/api/productsList`, já que a API
não possui documentação formal de schema (OpenAPI/Swagger). Reflete o
formato observado, não uma garantia contratual da API.

