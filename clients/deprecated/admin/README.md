# Admin

# Para rodar o bonde-admin corretamente, siga os passos:

- Na raiz desse projeto, crie um arquivo .env para inserir as variáveis de ambiente. Elas podem ser encontradas no arquivo .drone.yml, também na raiz.
- Certifique-se que a versão do node utilizada é a 14 com o comando

```jsx
	nvm use 14
```

- Ainda na raiz desse projeto, instale os pacotes necessários por meio do comando

```jsx
	pnpm i
```

- Agora é possível subir o package bonde-admin, ainda na mesma pasta, com o comando

```jsx
pnpm m run dev --filter bonde-admin
```

Seguindo os passos corretamente, o projeto estará rodando localmente na porta 5001

 <!-- TODO: Adicionar passo a passo para o package bonde-webpage -->
