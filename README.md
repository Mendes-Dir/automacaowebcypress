# Automation Exercise - Testes E2E com Cypress

Este projeto contém testes automatizados para o site Automation Exercise (https://automationexercise.com) utilizando Cypress.

## Pré-requisitos

- Node.js (LTS)
- npm (Node Package Manager)

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## Como executar os testes

### Modo Interativo (UI)
```bash
npm run cypress:open
```
- Selecione "E2E Testing"
- Escolha um navegador
- Clique em `automation-exercise.cy.js`

### Modo Headless
```bash
npm run cypress:run
```

## Estrutura dos Testes

O arquivo `cypress/e2e/automation-exercise.cy.js` contém 3 testes principais:

1. Verificação da página inicial
2. Busca e adição de produto ao carrinho
3. Cadastro de novo usuário

## Boas Práticas Implementadas

- Uso de seletores confiáveis (data-qa, href)
- Timestamps para dados dinâmicos (emails)
- Verificações de visibilidade antes de interações
- Assertions para garantir estado correto da página