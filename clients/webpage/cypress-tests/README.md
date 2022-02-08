# Testes com Cypress

Testes com simulações de comportamento do usuário utilizando o Cypress.

Cypress: https://docs.cypress.io

### Configuração 

- Os arquivos dos testes estão em cypress-tests/cypress/integration, por isso, os comandos listados em 'Get Started' devem ser executados dentro dessa pasta
- Em cypress.json se tem a url base para rodar os testes
- Nas pastas screenshots e videos são adicionados automaticamente os registros visuais dos testes

### Get started

yarn
 
### Testes

- Para abrir a janela do Cypress com a visualização dos testes: 

yarn cypress:open 


- Para somente rodar os testes: 

yarn cypress:run


- Para abrir o teste das Widgets (staging) dentro do Dashboard do Cypress:

npx cypress run --record --key 545375c9-34b5-45fc-880a-f3b16de95579

https://dashboard.cypress.io/








