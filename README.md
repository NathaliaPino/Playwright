# Desafio Técnico — Automação de Testes | automationexercise.com

Projeto de automação de testes cobrindo as camadas **Web** e **API** do site
[automationexercise.com](https://automationexercise.com), desenvolvido como
desafio técnico para a vaga de Analista de Qualidade.

## Objetivo

Validar, de forma automatizada, os principais fluxos de cadastro, login,
busca e compra do site, utilizando BDD (Gherkin) e Page Objects, conforme
especificado no desafio técnico.

## Stack

- **Playwright** — controle de navegador e automação de ações na UI
- **@cucumber/cucumber** — BDD (Gherkin) para a camada Web
- **JavaScript** (não TypeScript — ver justificativa abaixo)

### Por que Playwright + Cucumber?

O desafio permitia escolher entre Cypress e Playwright. Optei por Playwright
por já estar em processo de aprendizado da ferramenta, e por sua API nativa
de `APIRequestContext`, que permite testar a camada de API reaproveitando a
mesma stack usada na camada Web, sem depender de bibliotecas externas.

### Por que JavaScript, e não TypeScript?

O projeto foi iniciado a partir do template padrão do
`npm init playwright@latest`, em JavaScript. Como o foco deste desafio,
para mim, também é aprendizado da ferramenta, optei por manter em JavaScript
para reduzir a complexidade adicional de tipagem enquanto ainda me familiarizo
com os conceitos centrais do Playwright e do BDD.

### Sobre o idioma dos nomes de arquivo e classes

Os cenários em Gherkin (`.feature`) e os **nomes dos Page Objects** estão
em português, por escolha pessoal ligada ao processo de aprendizado — fico
mais confortável lendo o código de ponta a ponta no mesmo idioma do domínio
de negócio. Já os arquivos utilitários (`utils/`, `fixtures/`) e a
convenção geral de código seguem nomenclatura mais próxima do padrão da
indústria (inglês), refletindo uma mistura consciente, não uma
inconsistência acidental.

## Estrutura de pastas


features/web/ → cenários Gherkin (.feature) da camada Web
step-definitions/web/ → implementação dos steps (Given/When/Then)
page-objects/ → Page Objects (locators + ações de cada página)
support/ → hooks do Cucumber (ciclo de vida do browser)
utils/ → funções utilitárias reutilizáveis (ex: registro de usuário)
fixtures/ → massa de dados de teste
tests/ → testes de API (reservado — camada ainda não implementada)
playwright.config.js → configuração do Playwright Test runner (uso futuro: API)
cucumber.js → configuração do cucumber-js (camada Web)



### Arquivos principais

| Arquivo | Responsabilidade |
|---|---|
| `page-objects/PaginaDeLogin.js` | Ações da tela de login e início de cadastro |
| `page-objects/PáginadeCadastro.js` | Preenchimento do formulário completo de cadastro |
| `page-objects/Cabecalho.js` | Componente de cabeçalho (login/logout, usuário autenticado) |
| `page-objects/PaginaDeBusca.js` | Busca de produtos e leitura dos resultados |
| `utils/userRegistration.js` | Orquestra o fluxo completo de cadastro (reutilizado por W01 e W02) |
| `fixtures/userData.js` | Geração de dados de usuário de teste (e-mail único por execução) |
| `support/hooks.js` | Ciclo de vida do browser (`Before`/`After`), timeout global, captura de screenshot em falha |

## Instalação

```bash
npm install
npx playwright install
```

## Execução

```bash
# Todos os testes Web (BDD)
npx cucumber-js

# Por tag
npx cucumber-js --tags @smoke
npx cucumber-js --tags @regression

# Um arquivo de feature específico
npx cucumber-js features/web/cadastro.feature

# Um cenário específico, por linha
npx cucumber-js features/web/login.feature:7
```

Por padrão, os testes rodam em modo headless. Para acompanhar visualmente,
altere `headless: true` para `headless: false` em `support/hooks.js`.

## Arquitetura e decisões de design

### Page Object Model

Toda interação com elementos de UI está encapsulada em Page Objects — os
locators ficam centralizados no `constructor` de cada classe, nunca
espalhados nos steps. Os métodos representam ações do usuário (ex:
`login()`, `searchForProduct()`), não passos técnicos soltos.

Page Objects **não guardam estado de teste** (ex: qual foi o último termo
buscado) — essa responsabilidade fica com o step (via `this`, no World do
Cucumber). Um Page Object só sabe fazer ações na tela e devolver o que está
visível — quem decide o que fazer com essa informação é o step.

### Ciclo de vida do navegador (`support/hooks.js`)

Cada cenário roda em um `browser context` e uma `page` novos (`Before`),
garantindo isolamento total entre testes — nenhum cenário depende de estado
deixado por outro. Em caso de falha, um screenshot é automaticamente
anexado ao relatório (`After`), sem necessidade de configuração manual por
cenário.

### Reaproveitamento de fluxos (`utils/userRegistration.js`)

O fluxo de cadastro de usuário é usado tanto no teste de cadastro em si
(W01) quanto como pré-condição do teste de login (W02, que precisa de um
usuário existente). Para evitar duplicar essa lógica, ela foi extraída em
funções reutilizáveis (`startSignup`, `completeSignup`, `registerNewUser`),
usadas por ambos os cenários.

### Dados de teste únicos (`fixtures/userData.js`)

Como o site não permite resetar o estado entre execuções, o e-mail do
usuário de teste é gerado com timestamp (`Date.now()`), garantindo que cada
execução crie um usuário novo, sem colisão com execuções anteriores.

## Cobertura de testes

| ID | Cenário | Arquivo | Status |
|---|---|---|---|
| W01 | Cadastro de usuário | `features/web/cadastro.feature` | ✅ |
| W02 | Login — credenciais válidas | `features/web/login.feature` | ✅ |
| W03 | Login — credenciais inválidas | `features/web/login.feature` | ✅ |
| W04 | Busca de produto | `features/web/buscaDeProduto.feature` | ✅ |
| W05–W12 | Demais cenários Web | — | ⏳ Pendente |
| A01–A10 | Camada de API | — | ⏳ Pendente |

## Observações e decisões técnicas

### W04 — Busca de produto

A busca de produtos do site (`/products?search=`) filtra por **categoria**
do produto, não pelo texto literal do nome. Isso foi confirmado
inspecionando manualmente os detalhes de produtos retornados na busca por
"dress": itens sem a palavra "dress" no nome (ex: "Sleeveless Unicorn Patch
Gown") também aparecem nos resultados, pois estão categorizados como
`Kids > Dress`.

Um dos resultados retornados ("Sleeves Top and Short - Blue & Pink") está
categorizado como `Kids > Dress`, mas não é um vestido — aparenta ser um
erro de classificação no cadastro do produto, não uma falha da busca em
si.

Por esse motivo, uma comparação textual exata entre o termo buscado e o
nome de cada produto geraria falsos negativos.

**Sobre o custo de validar categoria:** confirmar a categoria de um produto
exige abrir sua página de detalhes — uma navegação extra por produto
verificado. Validar **todos** os resultados retornados por uma busca teria
esse custo multiplicado por N produtos, tornando o teste mais lento e mais
suscetível a falhas de instabilidade de rede. 
validar categoria em **todos** os resultados retornados teria o custo de
performance já descrito (uma navegação extra por produto). Mas validar
**apenas o primeiro produto** da lista tem um custo bem menor (1 navegação
extra, não N) e ainda funciona como um sinal rápido de que a busca está
minimamente correta. Por isso, a validação foi dividida entre as camadas Web e API:

- **Web (W04)**: valida que a busca retorna resultados não-vazios, e faz
  uma checagem leve — abre apenas o **primeiro** produto retornado e
  confirma que sua categoria contém o termo buscado, como um sinal rápido
  de que a busca está minimamente correta, mantendo o custo de navegação
  baixo (1 acesso extra, não N).
- **API (A03)**: fará a validação completa e rigorosa — todos os produtos
  retornados, comparando categoria real via dados estruturados (JSON),
  sem custo de navegação (a API devolve tudo pronto, sem precisar abrir
  página por página).

Essa divisão segue o princípio da pirâmide de testes: verificação leve de
fluxo na UI, verificação completa e barata na camada de API.


### W05 — Adicionar produto ao carrinho

Os dois cenários deste caso de teste usam o **primeiro produto da listagem**
(sem busca prévia), mesmo havendo a opção de reaproveitar os steps de busca
já implementados no W04. Essa escolha é proposital: cada cenário deve
testar uma responsabilidade isolada. O W05 testa "adicionar ao carrinho",
não "buscar produto" — se o cenário dependesse da busca funcionar
corretamente, uma falha na busca faria o W05 falhar por um motivo que não
tem relação com o que ele deveria validar (acoplamento entre testes).
Usar o primeiro produto da listagem remove essa dependência.

### W06 — Fluxo de checkout E2E

O cenário cria um novo usuário a cada execução (via cadastro), em vez de
usar uma conta fixa pré-existente para fazer login diretamente. Essa
escolha é proposital: automationexercise.com é um site público de prática,
usado por muitas pessoas simultaneamente no mundo todo para automação.
Uma conta fixa embutida no código correria risco real de ser excluída
(há inclusive um endpoint de exclusão, `DELETE /deleteAccount`, testado
no A08) ou ter a senha alterada por outro usuário/teste, quebrando o
cenário de forma imprevisível e fora do nosso controle.

Criar um usuário novo por execução (e-mail único via timestamp) elimina
essa dependência externa frágil, ao custo de um cadastro extra antes do
login propriamente dito.

## Pendências conhecidas (roadmap de revisão)

- [ ] Adicionar seção de observações no README para os demais cenários (W01–W03), não só W04
- [ ] Renomear a classe `ProductPage` (dentro de `PaginaDeBusca.js`) para manter consistência com a convenção em português adotada nos demais Page Objects
- [ ] Remover `tests/example.spec.js` (teste de exemplo padrão do Playwright, não utilizado)
- [ ] Confirmar, ao implementar A03, que a validação de categoria prometida nesta seção foi de fato implementada na API

