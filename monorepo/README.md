[![codecov](https://codecov.io/gh/nossas/bonde-clients/branch/main/graph/badge.svg?token=ERKL6UZ3V8)](https://codecov.io/gh/nossas/bonde-clients)

## Comandos para desenvolvimento (admin)

Usar versão Node 14

`nvm use 14`

Instalar pnpm

`yarn add pnpm`

Instalar bibliotecas do bonde-admin

`yarn pnpm m i --filter @bonde/admin`

Executar aplicação do bonde-admin

`yarn pnpm m run dev --filter @bonde/admin`

## Variaveis de ambiente

Você adicionar na paste `clients/admin` um arquivo `.env`:

```
VITE_ENVIRONMENT=production
VITE_DOMAIN_ADMIN=http://bonde.devel:3000
VITE_DOMAIN_ADMIN_CANARY=https://admin-canary.staging.bonde.org
VITE_DOMAIN_PUBLIC=staging.bonde.org
VITE_DOMAIN_CROSS_STORAGE=https://cross-storage.staging.bonde.org
VITE_DOMAIN_API_REST=https://api-rest.staging.bonde.org
VITE_DOMAIN_API_GRAPHQL=https://api-graphql.staging.bonde.org/v1/graphql
VITE_HASURA_API_URL=https://api-graphql.staging.bonde.org/v1/graphql
VITE_AWS_BUCKET=bonde-assets-staging
VITE_LOGIN_URL=https://accounts.staging.bonde.org/login
VITE_DOMAIN_REDES=https://redes.staging.bonde.org
VITE_UPLOADS_URL=https://api-rest.staging.bonde.org/uploads
```

## Deploy for clients

Gerar imagem Docker para implantação dos clients:

`docker build -f Dockerfile.clients -t nossas/bonde-clients`

Executar serviço a partir da image padrão:

`docker run -p 5000:5000 nossas/bonde-clients pnpm m run start --filter @bonde/canary`

