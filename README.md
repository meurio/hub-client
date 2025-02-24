# BONDE - Ambiente de Desenvolvimento

Este repositório contém as configurações para executar um ambiente de desenvolvimento da plataforma BONDE, utilizando **Docker Compose** e **Git Submodules**.

A plataforma utiliza compartilhamento de sessão por Cookie e isso requer uma estrutura funcional no mesmo domínio e protocolo, por isso nossos serviços serão executados como `.bonde.devel` e protocolo `https`.

## Estrutura do Projeto

```plaintext
├── apis/ (submódulo)
├── clients/ (submódulo)
├── data/ (volume não versionado)
├── public/ (submódulo)
├── router/ (submódulo)
├── .env.example (exemplo de configuração do Docker Compose)
├── caddy.json (exemplo de configuração do Caddy)
└── docker-compose.yml
```

## Configuração do Ambiente

### 1. Clonar o repositório e baixar os submódulos

```sh
git clone --recurse-submodules git@github.com:nossas/bonde.git
cd bonde
```

Se já clonou o repositório sem os submódulos, execute:

```sh
git submodule update --init --recursive
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as configurações necessárias para os serviços. Utilize o `.env.example` como base.

### 3. Configurar o `/etc/hosts`

Adicione as seguintes entradas ao seu `/etc/hosts` para permitir o roteamento local:

```plaintext
127.0.0.1   api-rest.bonde.devel
127.0.0.1   api-graphql.bonde.devel
127.0.0.1   n8n.bonde.devel
127.0.0.1   accounts.bonde.devel
127.0.0.1   app.bonde.devel
127.0.0.1   admin-canary.bonde.devel
```

### 4. Criar estrutura de volume para configuração do Caddy

```sh
mkdir -p ./data/caddy_etc
cp caddy.json ./data/caddy_etc/caddy.json
```

### 5. Configurar acesso a imagem Docker privada

Se necessário, autentique-se no GitHub Container Registry para baixar a imagem privada `ghcr.io/nossas/bonde-server`:

```sh
echo "<SEU_GITHUB_TOKEN>" | docker login ghcr.io -u <SEU_USUARIO> --password-stdin
```

Para gerar seu `<SEU_GITHUB_TOKEN>` leia essa [documentação](https://docs.github.com/pt/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

### 6. Subir os serviços

```sh
docker compose up -d
```

Isso iniciará os seguintes serviços:

- **Caddy** para gerenciar o proxy reverso e HTTPS local.
- **Redis** para cache e filas.
- **APIs** REST e GraphQL da plataforma BONDE.
- **Módulos de autenticação, ativismo, domínios, pagamentos, etc.**  
- **N8N** para automação de fluxos.
- **Public** versão de renderização das campanhas do BONDE.

### 7. Configurar HTTPS local

A estrutura usa o **Caddy** como proxy reverso, que gerencia automaticamente os certificados HTTPS para os domínios locais. Para executar os certificados locais rode o comando abaixo (para Mac):

```sh
docker compose cp \
    caddy:/data/caddy/pki/authorities/local/root.crt \
    /tmp/root.crt \
  && sudo security add-trusted-cert -d -r trustRoot \
    -k /Library/Keychains/System.keychain /tmp/root.crt
```

Caso utilize outro sistema operacional, você pode ler mais sobre na [documentação do Caddy](https://caddyserver.com/docs/running#local-https-with-docker).

### 8. Configurar variáveis de ambiente para submódulos

Alguns submódulos (`clients/`) rodam diretamente no host e utilizam o `host.docker.internal` para comunicação com os serviços em Docker. Configure-o seguindo a [documentação do repositório](https://github.com/nossas/bonde-clients?tab=readme-ov-file#bonde-clients).

## Logs e Debug

Para visualizar logs dos serviços:

```sh
docker compose logs -f --tail=50
```

Para acessar um serviço específico (exemplo: `api-rest`):

```sh
docker exec -it bonde_api-rest sh
```

---


# TODO

- Atualizar README do clients
- Adicionar variavel de ambiente para configurar Token Router API no Hasura