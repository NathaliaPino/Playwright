# Desafio Técnico — Automação de Testes | automationexercise.com

## Stack

- **Playwright** para controle de browser
- **@cucumber/cucumber** para BDD (Gherkin) na camada Web
- **JavaScript**

## Estrutura de pastas

features/web/ -> cenários Gherkin (.feature) da camada Web
step-definitions/web/ -> implementação dos steps (Given/When/Then)
page-objects/ -> Page Objects (locators + ações de cada página)
support/ -> hooks do Cucumber (ciclo de vida do browser)
utils/ -> funções utilitárias reutilizáveis (ex: registro de usuário)
fixtures/ -> massa de dados de teste
tests/ -> testes de API (reservado)


## Instalação

```bash
npm install
npx playwright install
```

## Execução

```bash
# Testes Web (BDD)
npx cucumber-js

# Ou, se configurado no package.json:
npm run test:web
```

## Status

- [x] W01 — Cadastro de usuário
- [x] W02 — Login com credenciais válidas
- [x] W03 — Login com credenciais inválidas
- [x] W04 — Busca de produto
- [ ] W05 em diante...

## Observações – W04 (Busca de produto)

A busca de produtos do site (`/products?search=`) filtra por **categoria**
do produto, não pelo texto literal do nome. Isso foi confirmado
inspecionando manualmente os detalhes de produtos retornados na busca por
"dress": itens sem a palavra "dress" no nome (ex: "Sleeveless Unicorn Patch
Gown") também aparecem nos resultados, pois estão categorizados como
`Kids > Dress`.

Um dos resultados retornados ("Sleeves Top and Short - Blue & Pink") está
categorizado como `Kids > Dress`, mas não é um vestido — aparenta ser um
erro de classificação no cadastro do produto, não uma falha da busca em si.

Por esse motivo, o teste automatizado (W04) valida que a busca retorna
resultados não-vazios, em vez de validar correspondência textual exata
entre o termo buscado e o nome de cada produto — essa segunda validação
geraria falsos negativos por causa do comportamento de busca por
categoria.

### Por que a validação de categoria não está no teste Web (W04)

Uma abordagem mais rigorosa para o W04 seria abrir a página de detalhes de
cada produto retornado na busca e comparar sua categoria com o termo
buscado. Optei por não fazer isso na camada Web, por dois motivos:

1. **Custo/performance**: validar categoria exigiria uma navegação extra
   por produto retornado (abrir "View Product", ler a categoria, voltar),
   tornando o teste significativamente mais lento e com mais pontos de
   falha por instabilidade de rede — sem ganho proporcional de confiança.

2. **Camada mais adequada**: testes de UI devem ser rápidos e verificar o
   fluxo (a busca funciona, retorna resultados). Validação de dado
   estruturado (categoria de cada produto) é mais barata e confiável na
   camada de API, onde os dados vêm prontos em JSON, sem custo de
   navegação. Essa validação mais profunda é feita no teste A03
   (POST /searchProduct), na camada de API.

Essa divisão segue o princípio da pirâmide de testes: verificações
superficiais e de fluxo na UI, verificações de dado na camada mais barata
de validar (API).