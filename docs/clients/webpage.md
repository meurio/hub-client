# Sistema de páginas

Funcionalidade da plaforma BONDE relacionada diretamente com a capacidade de usuários mobilizarem pessoas atráves de Campanhas. Campanhas podem agregar diversas táticas de mobilização.

## Visão pública

Responsável pela renderização de uma página de Campanha, a visão pública utiliza a tecnologia do [NextJS](https://nextjs.org/docs/getting-started) para montagem de páginas [server-side](https://nextjs.org/docs/basic-features/pages#server-side-rendering). Mobilização, Blocos e Widgets são carregados a partir de uma requisição a 3 queries da API GraphQL. Filtradas por `slug` ou `custom_domain` essas queries são capazes de baixar dados para montagem e configuração de uma página, abaixo os conceitos que iremos utilizar dentro dessa aplicação.

### Mobilização

Primeiro nível da estrutura de renderização, possui atributos relacionado a página e sua Comunidade, como informações de compartilhamento e estilos básicos de customização, abaixo o modelo de dados utilizado dentro do codebase.

```typescript
interface CommunitySignature {
  /* Link para página principal da Comunidade assinante das Campanhas */
  url: string;
  /* Texto utilizado para customizar o assinante das Campanhas */
  name: string;
}

interface Community {
  /* Imagem da Comunidade, utilizado para assinatura de Campanhas */
  image?: string;
  /* Nome da Comunidade, utilizado como padrão para assinatura de Campanhas quando signature não é preenchido */
  name: string;
  /* Informações customizadas para assinatura de Campanhas */
  signature?: CommunitySignature;
}

interface Mobilization {
  /* Identificador desta Campanha dentro da base de dados */
  id: number;
  /* Nome da Campanha */
  name: string;
  /* Data de criação da Campanha dentro da plataforma */
  created_at: string;
  /* Esquema de cores, utilizados em mobilizações antigas que possuem padrão de template como Meu Rio */
  color_scheme?: string;
  /* Código utilizado para rastreio do Google Analytics */
  google_analytics_code?: string;
  /* Descrição sobre o objetivo da Campanha, utilizado no compartilhamento da página */
  goal: string;
  /* Esquema de fontes para header, utilizados em mobilizações antigas que possuem padrão de template como Meu Rio */
  header_font?: string;
  /* Esquema de fontes para body, utilizados em mobilizações antigas que possuem padrão de template como Meu Rio */
  body_font?: string;
  /* Informação sobre título usado para compartilhamento com Facebook */
  facebook_share_title?: string;
  /* Informação sobre descrição usado para compartilhamento com Facebook */
  facebook_share_description?: string;
  /* Informação sobre imagem usado para compartilhamento com Facebook */
  facebook_share_image?: string;
  /* SLUG é padrão formado primeiramente a partir do nome da Campanha e utilizado como subdominio para acesso a Visão pública */
  slug: string;
  /* Domínio customizado utilizado para acesso a Visão pública, substitui slug caso seja preenchido */
  custom_domain?: string;
  /* Informação sobre descrição usado para compartilhamento com Twitter */
  twitter_share_text?: string;
  /* Identificador que relaciona Campanha com Comunidade */
  community_id: number;
  /* Linguagem padrão utilizada para tradução de textos estáticos */
  language: 'pt-BR' | 'es';
  /* Objeto instanciado da relação de Campanha com Comunidade */
  community: Community
  /* Imagem utilizada na aba dos navegadores para identificação do site (Campanha) */
  favicon?: string;
  /* Status de controle sobre a Campanha utilizado por Mobilizadores */
  status: 'active' | 'archived'
}
```

### Blocos

Segundo nível da estrutura de renderização, Blocos possuem atributos relacionado a Ordernação e Navegação representando as Seções de uma página.

```typescript
interface Block {
  /* Identificador deste Bloco dentro da base de dados */
  id: number;
  /* Define se este Bloco possui navigação no Menu da Visão pública */
  menu_hidden?: boolean;
  /* Define se este Bloco é renderizado na Visão pública */
  hidden?: boolean;
  /* Cor de fundo do Bloco */
  bg_class?: string;
  /* Imagem de fundo do Bloco, substitui bg_class caso seja preenchido */
  bg_image?: string;
  /* Nome do Bloco utilizado no Menu da Visão pública */
  name?: string;
  /* Posição do Bloco na renderização da Campanha */
  position: number;
  /* Identificador que relaciona Bloco com Mobilização */
  mobilization_id: number;
}
```

### Widgets

Terceiro nível da estrutura de renderização, Widget é a menor parte de página de Campanha, é onde adicionamos Conteúdo ou Ação. No contexto dessa aplicação são consideradas Plugins por plugarem a uma Mobilização dos componentes da sessão *bonde-webpage*.

```typescript
interface WidgetSettings {
  /* Título do formulário, configuração parte dos atributos de Ajuste da Widget */
  call_to_action?: string;
  /* Cor principal do formulário, configuração parte dos atributos de Ajuste da Widget */
  main_color?: string;
  /* Botão de submissão do formulário, configuração parte dos atributos de Ajuste da Widget */
  button_text?: string;
  /* Assunto do e-mail, configuração parte dos atributos de Pós ação da Widget */
  email_subject?: string;
  /* E-mail do remetente, configuração parte dos atributos de Pós ação da Widget */
  sender_email?: string;
  /* Nome do remetente, configuração parte dos atributos de Pós ação da Widget */
  sender_name?: string;
  /* Texto do e-mail, configuração parte dos atributos de Pós ação da Widget */
  email_text?: string;
}

interface Widget {
  /* Identificador desta Widget dentro da base de dados */
  id: number;
  /*
   * Tática de mobilização utilizada
   * 
   * TODO: Descrever táticas de mobilização
   */
  kind: 'draft' | 'donation' | 'form' | 'pressure' | 'pressure-phone' | 'plip' | 'content'
  /* Objetivo da Campanha, utilizado para tática de Doação */
  goal?: string;
  /* Informações de configuração da Widget */
  settings: WidgetSettings;
  /* Identificador que relaciona Widget com Bloco */
  block_id: number;
  /* Data de criação da Widget */
  created_at: string;
  /* Data da última atualização da Widget */
  updated_at: string;
  /* Redimensionar Widget de maneira responsiva, configurado a partir do template de Bloco. (min-width: 40em) */
  sm_size: string;
  /* Redimensionar Widget de maneira responsiva, configurado a partir do template de Bloco. (min-width: 52em) */
  md_size: string;
  /* Redimensionar Widget de maneira responsiva, configurado a partir do template de Bloco. (min-width: 64em) */
  lg_size: string;
  /* Total de inscrições em formulário de pressão */
  activist_pressures_aggregate {
    aggregate {
      count
    }
  }
  /* Total de inscrições em formulário */
  form_entries_aggregate {
    aggregate {
      count
    }
  }
  /* Total de inscrições em formulário de doação */
  donations_aggregate {
    aggregate {
      count
    }
  }
}
```

## Plugins

São componentes que renderizam um tipo (`kind`) de Widget, classificamos os plugins em 2 grupos: **Conteúdo** (um editor de texto capaz de renderizar textos customizados pelo próprio usuário Mobilizador) e **Ações** (táticas de mobilização que requerem interação de um usuário externo Ativista).

Por serem táticas de mobilização, **Ações** exigem uma estrutura de desenvolvimento que depdende não só da Renderização do componente na Visão Pública, mas também, de acordo com a lógica de negócio, da criação de Modelo de dados, comunicação com API GraphQL e até integração com serviços terceirizados.

#### Doação

#### Formulário

#### Pressão por e-mail

#### Pressão por telefone

#### PLIP