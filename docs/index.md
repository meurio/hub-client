# Bem vindo ao BONDE

Esta documentação é destinada a pessoas desenvolvedoras que queiram contribuir com a plataforma. O código-fonte utilizado está presente nesse repositório ou carregado a partir do mesmo. Está dividido nos seguintes serviços: apis, clients, clients/libs, manual, infra, workers, listeners, cronjobs e webhooks.

## Requerimentos

A linguagem de programação utilizada é o Javascript e você precisará instalar [o NodeJS](clients/README.md) e para configuração da infraestrutura [o Docker](infra/README.md) .

Afim de facilitar o entendimento a respeito do código-fonte necessário para o funcionamento do BONDE, unificamos todos os repositórios utilizados em apenas um através do `git submodule`.

Devido a criação de diferentes aplicações web e a necessidade de compartilhar informações sobre a sessão de um usuário, adotamoss uma estratégia através do `localstorage` do navegador.

## Antes de começar

Tenha certeza que ao fazer o clone do repositório, inclui ```--recursive``` para que os submodules também sejam baixados, como em:

``` bash
git clone --recursive git@github.com:nossas/bonde.git
```

Se já fez o clone e quer ter certeza que todos os submodules estão atualizados, execute dentro do diretório do repositório clonado:

```bash
git submodule init
git submodule update
```

* [Ajuda Oficial do Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)


Para utilizar as configurações padrões de compartilhamento de sessão, são necessários alguns mapeamentos de urls.

No ambiente de desenvolvimento, vamos adotar o endereço de url ```bonde.devel```

Recomendamos adicionar os seguintes alias de url e ip no seu ```/etc/hosts```:

```bash
127.0.0.1 bonde.devel

127.0.0.1 traefik.bonde.devel s3.bonde.devel smtp.bonde.devel pgadmin.bonde.devel kibana.bonde.devel

127.0.0.1 api-rest.bonde.devel api-graphql-deprecated.bonde.devel api-graphql.bonde.devel api-payments.bonde.devel api-domains.bonde.devel api-activists.bonde.devel api-redes.bonde.devel api-accounts.bonde.devel api-notifications.bonde.devel

127.0.0.1 3-vamos-limpar-o-tiete.bonde.devel 2-save-the-whales.bonde.devel 1-vamos-limpar-o-tiete.bonde.devel
```

## Começando

São duas as frentes de configuração: Infraestrutura e Clients.

A infraestrutura é configurada ao rodar os comandos a seguir.

``` bash
cd infra
make begin
```

Muitos gigabytes serão baixados, e alguns exijirão um elevado consumo de processador.

Após a execução do comando com sucesso, chegou a vez dos clients. Será necessário instalar as dependências dos clients antes de iniciar:

 ```bash
cd ../clients
pnpm i
pnpm m run dev
 ```

A continução com o passo-a-passo para criação do primeiro usuário, [encontra-se nesse link](infra/README.md). E outros detalhes sobre todos os clients já desenvolvidos, [encontra-se nesse link](clients/README.md).

## Arquitetura

Em modo de desenvolvimento, as aplicações são acessadas em 3 camadas de rede. O nível mais alto é através das requisições http que trafegam pelo traefik utilizando imagens pré-fabricadas. O segundo nível, é através das portas locais de desenvolvimento, alterações são refletidas em tempo de execução. E no terceiro nível, através das bibliotecas, reconstruídas em tempo de execução.

Abaixo uma descrição de cada repositório relacionado no ```git submodule```:

**O apis/api-graphql,** é responsável pelas customizações da api graphql, a lógica está agrupada por domínio. Em geral é servidores web expressjs, criados a partir de um boilerplate mínimo, com algumas funcionalidades pré-configuradas como log, monitor e gerenciamento de processos. Utilizamos o Hasura para prover a api graphql padrão.

**O apis/api-graphql-deprecated,** primeira versão da api de acesso usando o padrão Graphql utilizando postgraphile.

**O apis/api-rest,** primeira versão da api de acesso aos dados, ainda utilizando o padrão REST, escrita em Ruby on Rails.

**O clients/packages,** é responsável pelas páginas web do tipo "Single Page Application", criadas a partir do create-react-app.

**O clients/packages/storage,** é responsável por gerenciar as permissões de compartilhamento de sessão entre os clientes, é um servidor web com html estático, utilizamos o [cross storage](https://github.com/zendesk/cross-storage).

**O clients/libs,** é destinado as bibliotecas mantidas e publicadas no npmjs.com.

**O clients/deprecated/admin,** é destinado ao admin antigo ainda utilizado para edição de mobilizações.

**O clients/webpage,** é destinado a versão pública das páginas renderizadas com SSR, utilizamos o Next.JS.

**O cronjobs/payments,** é responsável por sincronizar as informações da integração de pagamento com o pagarme.

**O infra,** é destinado as configurações dos serviços utilizados como dependência dos serviços construídos, como load balance, banco de dados, etc.

**O listeners/experiments,** é responsável por armazenar código utilizados em experimentos.

**O manual,** é destinado ao blog de atualizações e documentação pública das tecnologias desenvolvidas.

**O webhooks/accounts** é responsável pelo gerenciamento da sessão, login e convite de usuários.

**O webhooks/chatbot** é responsável pela experiência em chatbot chamada BETA e pelo módulo de chatbot.

**O webhooks/mapa-do-acolhimento** é destinado a todo processo executado no servidor referente ao projeto, com sincronização de informações das integrações do projeto com o zendesk e o mautic, além do match e do georeferenciamento.

**O webhooks/phone** é destinado a integração entre a widget de pressão por telefone e o twillio quem faz de fato a ligação entre as partes envolvidas.

**O webhooks/redes** é destinado a sincronização dos dados da widget de formulário para o módulo de redes e o geo referenciamento.

**O webhooks/redirect** é destinado ao redirecionamento de algumas páginas de acordo com um arquivo csv presente no repositório.

**O workers/documents,** é destinado a sincronização dos dados do banco de dados relacional(postgres) para o de eventos(elasticsearch).

**O workers/migrations,** é destinado ao

**O dados,** é destinado a scripts em python criados para análises específicas e profundas.

Ao todo são mais de 20 pacotes de código-fonte com propósitos diferentes. Abaixo um quadro para exemplificar o conteúdo dos repositórios:

```bash
    3299 text files.
    2961 unique files.
     540 files ignored.

--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
YAML                             68            502            923          88869
TypeScript                     1127           6232           2691          56047
JSON                            136             24              0          47700
Go                              141           6868           6872          37481
Ruby                            607           3460            544          26099
JavaScript                      243           2027           3675          11059
SQL                             181           3463           2771           8089
HTML                             18           2907            300           7118
Markdown                        129           2751              0           6380
SVG                              10             15              2           2850
CSS                              33            154            113           1574
Sass                             20            172              4           1150
JSX                              23            103             43           1148
Protocol Buffers                  3             83             94            457
Pug                               5             30              0            416
GraphQL                           8             56              0            301
ERB                              10              8              6            214
Dockerfile                       22            104             27            163
Bourne Shell                      5             39             36            121
make                              3             29             62            115
HCL                               2              9              0             52
TOML                              4              8             19             29
Bourne Again Shell                2              6              2             15
--------------------------------------------------------------------------------
SUM:                           2800          29050          18184         297447
--------------------------------------------------------------------------------
```

## Branches

Por utilizarmos os `submodules` do `git`, recomendamos começar as modificações criando um branch `feature/` ou `hotfix/` no repositório mãe(nossas/bonde).

Ao fazer a edição de algum arquivo em algum repositório registrado no submodule do git, vai ficar aparente como mostrado abaixo, ao verificar o status do repositório:

```
	modified:   apis/api-graphql (new commits, modified content)
	modified:   apis/api-graphql-deprecated (new commits)
	modified:   infra (modified content)
	modified:   manual (modified content, untracked content)
	modified:   workers/documents/src/certs.ts
```

É será necesário fazer o commit no repositório mãe da referência que deve ser usada como mais atual do repositório filho, já com as alterações.

É recomendado seguir o mesmo nome de branch em todos os repositórios que precisarem de alterações.

Por último, abra um `Pull Request` em todo repositório alterado e na descrição do PR no repositório mãe, adicione os links para aprovação de todas as modificações.

## Build, Deploy e Release

Todos os repositórios possuem uma configuração(skaffold.yaml) na raiz, responsável por fazer o build, deploy e release no kubernetes. A configuração deve estar no diretório correto(k8s/).

Além disso, existe uma configuração(.drone.yml) para automatizar a execução de testes(ci) e de deploy(cd) descritos na configuração do skaffold, também dividido por repositório.


## Clientes

Você irá encontrar o accounts, admin, admin-canary, redes e cross-storage.

[Veja mais clicando aqui.](clients/README.md)

## Infra-estrutura

Todas as configurações necessárias para carregar no cluster kubernetes o Load Balance, o Banco de dados e o armazenamento de arquivos, etc É utilizado o Helm, gerenciador de pacotes de configuração kubernetes para alguns serviços comuns.

[Veja mais clicando aqui.](infra/README.md)

## Bibliotecas

O design system(components) utilizado pelos clientes; funções compartilhadas(core-tools) pelos clientes e servidores; interface para desenhar diagramas customizáveis(diagram); e o editor de texto rico destinado a potencializar a edição de páginas(editor).

[Veja mais clicando aqui.](clients/libs/README.md)

## Documentação

Utilizamos o Gastby para publicar um blog estático e algumas páginas de documentação para o usuários finais: o mobilizador e o ativista.

[Veja mais clicando aqui.](manual/README.md)

## Servidores

A APIs: REST, Graphql e Graphql Deprecated;

Os monorepos: chatbot, experiments, mapa do acolhimento, redes, webhooks;

E ainda: migrations, payments, phone, redirect, webpage.

[Veja mais clicando aqui.](apis/README.md)

## Dados

Serviços com algoritmos de análise constante e customizadas.

[Veja mais clicando aqui.](dados/README.md)

