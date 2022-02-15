export default {
  // page account login
  // filepath: /routes/admin/not-authenticated/account-login/page.js
  // routepath: /login
  'page--account-login.label.email': 'Email',
  'page--account-login.label.password': 'Senha',
  'page--account-login.placeholder.email': 'exemplo@email.com',
  'page--account-login.loading': 'Carregando...',
  'page--account-login.signin': 'Entrar',
  'page--account-login.ask-register': 'Ainda não se cadastrou?',
  'page--account-login.cta-signup': 'Clique para entrar no BONDE',
  'page--account-login.auth.error-message': 'Senha incorreta...',
  'page--account-login.auth.error-message.retrieve-password.link': 'Esqueceu sua senha?',

  // page account login (connected)
  // filepath: /routes/admin/not-authenticated/account-login/page.connected.js
  // routepath: /login
  'p--account-login.form.email.validation.required': 'Informe seu email',
  'p--account-login.form.email.validation.invalid': 'Email inválido',
  'p--account-login.form.password.validation.required': 'Informe sua senha',

  // page account register
  // filepath: /routes/admin/not-authenticated/account-register/page.js
  // routepath: /register
  'page--account-register.title': 'Crie sua conta no BONDE.',
  'p--account-retrieve.title.first-line': 'Relaxa, vamos enviar uma nova senha pra você :)',
  'p--account-retrieve.title.second-line': 'Preencha o campo abaixo com seu email de login:',
  'page--account-register.form.name.label': 'Nome',
  'page--account-register.form.name.placeholder': 'Seu nome',
  'page--account-register.form.name.validation.required': 'Informe seu nome',
  'page--account-register.form.lastname.label': 'Sobrenome',
  'page--account-register.form.lastname.placeholder': 'Seu sobrenome',
  'page--account-register.form.email.label': 'Email',
  'page--account-register.form.email.placeholder': 'exemplo@email.com.br',
  'page--account-register.form.email.validation.required': 'Informe seu email',
  'page--account-register.form.email.validation.invalid-email-format': 'Email inválido',
  'page--account-register.form.password.label': 'Senha',
  'page--account-register.form.password.label.validation.required': 'Crie uma senha',
  'page--account-register.form.password.label.validation.min-length': 'Sua senha precisa ter no mínimo 8 caracteres',
  'page--account-register.form.password-confirm.label': 'Confirme sua senha',
  'page--account-register.form.password-confirm.label.validation.match': 'Ops, não deu "match"',
  'page--account-register.form.submit-button.default': 'Criar conta',
  'page--account-register.form.submit-button.saving': 'Salvando...',

  // page account retrieve password
  // filepath: /routes/admin/not-authenticated/account-retrieve/page.connected.js
  // routepath: /account/retrieve
  'p--account-retrieve.form.email.validation.required': 'Informe seu email',
  'p--account-retrieve.form.email.validation.invalid-email-format': 'Email inválido',
  'p--account-retrieve.form.email.label': 'Email',
  'p--account-retrieve.form.email.placeholder': 'exemplo@email.com.br',
  'p--account-retrieve.form.submit-button.sending': 'Enviando...',
  'p--account-retrieve.form.submit-button.default': 'Enviar',

  // page account edit
  // filepath: /routes/admin/authenticated/sidebar/account-edit/page.js
  // routepath: /account/edit
  'page--account-edit.header.title': 'Sua conta',
  'page--account-edit.header.tabs.user': 'Perfil',
  'page--account-edit.form.name.label': 'Nome',
  'page--account-edit.form.lastname.label': 'Sobrenome',
  'page--account-edit.form.email.label': 'Email',

  // page subscription edit
  // filepath: /routes/public/subscription-edit/page.js
  // routepath: /subscriptions/:id/edit
  'page--subscription-edit.title': 'Sua doação',
  'page--subscription-edit.helper-text': 'O que você quer mudar na sua doação?',
  'page--subscription-edit.button.creditcard': 'Cartão de crédito',
  'page--subscription-edit.button.recurring': 'Data da doação',
  'page--subscription-edit.cancel-subscription.confirm': 'Você está prestes a cancelar seu apoio. Tem certeza que quer continuar?',
  'page--subscription-edit.link.cancel-subscription': 'Quero cancelar a minha doação.',

  // form subscription credit card
  // filepath: /client/subscriptions/forms/credit-card-form.js
  // routepath: /subscriptions/:id/edit
  'form--subscription-creditcard.helper-text': 'Preencha os campos abaixo para alterar o cartão da sua doação:',

  'form--subscription-creditcard.previous-data.title': 'Dados do último cartão',
  'form--subscription-creditcard.previous-data.name': 'Nome',
  'form--subscription-creditcard.previous-data.expiration-date': 'Data de validade',

  'form--subscription-creditcard.form.number.label': 'Número',
  'form--subscription-creditcard.form.number.placeholder': 'Ex: 0000 0000 0000 0000',
  'form--subscription-creditcard.form.name.label': 'Nome',
  'form--subscription-creditcard.form.name.placeholder': '(igual ao que aparece no cartão)',
  'form--subscription-creditcard.form.expiration-date.label': 'Data de validade',
  'form--subscription-creditcard.form.expiration-date.placeholder': '00/00',
  'form--subscription-creditcard.form.cvv.label': 'CVV',
  'form--subscription-creditcard.form.cvv.placeholder': 'Ex: 000',
  'form--subscription-creditcard.form.submit-button.text': 'Salvar',
  'form--subscription-creditcard.form.validation.required': 'Obrigatório',

  // form subscription recurring
  // filepath: /client/subscriptions/forms/recurring-form.js
  // routepath: /subscriptions/:id/edit
  'form--subscription-recurring.helper-text': 'Preencha os campos abaixo para alterar o dia do mês em que sua doação recorrente é processada:',
  'form--subscription-recurring.form.process-at.label': 'Nova data',
  'form--subscription-recurring.form.process-at.placeholder': 'Ex: DD/MM/AAAA',
  'form--subscription-recurring.form.submit-button.text': 'Salvar',
  'form--subscription-recurring.form.validation.required': 'Obrigatório',
  'form--subscription-recurring.form.validation.invalid-date-format': 'Formato de data inválido',

  // notifications
  // filepath: /client/utils/notifications.js
  // routepath:
  //   - /account/retrieve
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/new
  //   - /subscriptions/:id/edit
  //   - /community/invite
  'notification--generic-request-error.title': 'Ops!',
  'notification--generic-request-error.message': 'Confira se preencheu os campos certinho, se o problema continuar tente de novo daqui a pouco ;)',

  'notification--generic-save-success.title': 'Oba!',
  'notification--generic-save-success.message': 'Dados salvos com sucesso :)',
  'notification--slug-updated-message.title': 'Importante',
  'notification--slug-updated-message.message': 'O identificador (slug) da sua página foi alterado. Se você faz algum redirecionamento de DNS via CNAME, não se esqueça de atualizá-lo.',

  'notification--message-pressure-targets-remove-all.title': 'Atenção',
  'notification--message-pressure-targets-remove-all.message': 'Lembre-se que você precisa clicar no botão salvar, no canto superior direito da tela, para que os alvos sejam atualizados na ferramenta ;)',

  'notification--account-password-retrieve-success.title': 'Pronto!',
  'notification--account-password-retrieve-success.message': 'Acabamos de te enviar um email com uma nova senha. Confira sua caixa de entrada e use ela para fazer login ;)',

  'notification--community-invite-success.title': 'Oba!',
  'notification--community-invite-success.message': 'O convite para {email} foi enviado com sucesso! Seu BONDE tá crescendo :)',

  'notification--subscription-cancel-success.title': 'Assinatura cancelada',
  'notification--subscription-cancel-success.message': 'Obrigado pelo seu apoio até aqui - e esperamos que volte a nos apoiar novamente! ',

  // community dns notifications
  // filepath: /client/community/notifications/dns.js
  // routepath: /community/domain
  'notify.community.check--dns--success.title': 'Boa!',
  'notify.community.check--dns--success.text': 'Os servidores DNS foram sincronizados com sucesso! Agora você pode configurar domínios e emails na sua comunidade :)',
  'notify.community.check--dns--failure.title': 'Ops...',
  'notify.community.check--dns--failure.text': 'A sincronização de servidores DNS ainda está pendente. Se você já alterou eles no site em que comprou, tente de novo daqui a pouco.',
  'notify.community.add--dns-hosted-zone--failure.title': 'Ops...',
  'notify.community.add--dns-hosted-zone--failure.text': 'Ocorreu um erro, verifique se este domínio já não foi inserido.',

  // page community list
  // filepath: /routes/admin/authenticated/external/community-list/page.js
  // routepath: /community
  'page--community-list.title': 'Olá {name},',
  'page--community-list.subtitle': 'Em qual comunidade você quer causar?',
  'page--community-list.or': '{link}',
  'page--community-list.new': 'Crie uma nova comunidade',

  // component community settings menu
  // filepath: /client/community/components/settings-menu.js
  // routepath:
  //   - /community/domain
  //   - /community/domain/add
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/recipient
  //   - /community/report
  'community.components--settings-menu.title': 'Configurações da sua comunidade',
  'community.components--settings-menu.tabs.info': 'Informações',
  'community.components--settings-menu.tabs.mobilizers': 'Mobilizadores',
  'community.components--settings-menu.tabs.mailchimp': 'Mailchimp',
  'community.components--settings-menu.tabs.recipient': 'Conta bancária',
  'community.components--settings-menu.tabs.metrics': 'Dados',
  'community.components--settings-menu.tabs.domains': 'Domínios',

  // component community domain preview
  // filepath: /client/community/components/dns/dns-preview/domain-preview.js
  // routepath: /community/domain/add
  'community.components--domain-preview.li.domain.header': 'Qual domínio quer adicionar à sua comunidade?',

  // component community subdomain preview and form
  // filepath: /routes/admin/authenticated/sidebar/community-settings/domain/page.js
  // routepath: /community/domain
  'community.components--subdomain-preview-header.name': 'Nome',
  'community.components--subdomain-preview-header.record-type': 'Tipo',
  'community.components--subdomain-preview-header.value': 'Valor',
  'community.components--domain.preview.label.domain': 'Domínio da comunidade',
  'community.page--domain-list.header.dns-records': 'Registros DNS',
  'community.page--domain-list.header.dns-server': 'Servidores DNS',
  'community.page--domain-list.button.add-new-record': 'Adicionar novo registro',
  'community.page--domain-list.button.add-new-domain': 'Adicionar novo domínio',
  'community.page--domain-list.dialog.domain-confirm-message': 'Tem certeza que deseja remover o domínio',
  'community.page--domain-list.dns-record-description.first-paragraph': 'Os Servidores DNS são endereços utilizados pelas organizações de registro de domínios como registro.br ou godaddy.com, para identificarem em qual servidor se encontram as informações sobre o domínio registrado.',
  'community.page--domain-list.dns-record-description.second-paragraph': 'Complete a ativação do domínio alterando os servidores DNS, onde o domínio foi registrado, para os endereços abaixo:',
  'community.page--domain-list.dns-server-description': 'Os Servidores DNS são endereços utilizados pelas organizações de registro de domínios como {registroBr} ou {goDaddy}, para identificarem em qual servidor se encontra as informações sobre o domínio registrado. Tire suas dúvidas {trilho}.',
  'community.page--domain-list.dns-server-description.trilho.link': 'no site de ajuda',

  // component community subdomain form
  // filepath: /client/community/components/dns/subdomain-form/index.js
  // routepath: /community/domain
  'community.components--subdomain.name.label': 'Nome',
  'community.components--subdomain.name.placeholder': 'subdominio',
  'community.components--subdomain.record-type.label': 'Tipo',
  'community.components--subdomain.value.label': 'Valor',
  'community.components--subdomain.value.placeholder':
    `redirecionamento.dominio.com
ou
servidor-01.dominio.com
servidor-02.dominio.com
servidor-03.dominio.com`,
  'community.components--subdomain.form.submit-button': 'Adicionar',

  // page community domain
  // filepath: /routes/admin/authenticated/sidebar/community-settings/domain/page.js
  // routepath: /community/domain
  'page--community-domain.form.validation.required': 'Campo obrigatório',

  'page--community-domain.header.info.title': '',
  'page--community-domain.header.info.text': 'Esta é a lista de domínios cadastrados na sua comunidade. Quando for publicar uma página, vai poder usar eles como endereços ou criar subdomínios de maneira bem fácil e rápida :) Se algum domínio da sua lista estiver com um "X", certifique-se de ter alterado direitinho os servidores DNS conforme orientamos.',

  'page--community-domain.domain-preview.success-icon.title': 'Servidores DNS ativos',
  'page--community-domain.domain-preview.failure-icon.title': 'Aguardando alteração dos servidores DNS',

  'page--community-domain.section--dns-hosted-zone.add': 'Adicionar novo domínio',
  'page--community-domain.section--dns-hosted-zone.menu.subdomains': 'Subdomínios',
  'page--community-domain.section--dns-hosted-zone.menu.remove': 'Remover domínio',
  'page--community-domain.section--dns-hosted-zone.menu.remove.dialog.text': 'Tem certeza que deseja remover o domínio {domainName}?',
  'page--community-domain.section--dns-hosted-zone.menu.check-dns': 'Testar a conexão',

  'page--community-domain.section--dns-records.menu.remove': 'Remover subdomínio',
  'page--community-domain.section--dns-records.menu.remove.dialog.text': 'Tem certeza que deseja remover o registro {recordName}?',

  // component dialog
  // filepath: /client/ux/components/dialog/index.js
  // routepath: /community/domain
  'ux.components--dialog.button.confirm.text': 'Confirmar',
  'ux.components--dialog.button.cancel.text': 'Cancelar',

  // page community domain create
  // filepath: /routes/admin/authenticated/sidebar/community-settings/domain-create/page.js
  // routepath: /community/domain/add
  'page--community-domain-create.step-add.title': 'Insira o domínio desejado',
  'page--community-domain-create.step-add.form.domain-name.label': 'Domínio da sua comunidade',
  'page--community-domain-create.step-add.form.domain-name.placeholder': 'Ex. minhacomunidade.org',
  'page--community-domain-create.step-add.form.domain-name.validation.required': 'Campo obrigatório.',
  'page--community-domain-create.step-add.form.domain-name.validation.invalid-domain-format': 'Domínio inválido',
  'page--community-domain-create.step-add.form.cancel-button.text': 'Cancelar',
  'page--community-domain-create.step-add.form.button.text': 'Adicionar',

  'page--community-domain-create.step-dns-servers.step-title': 'Altere os servidores do seu provedor DNS',
  'page--community-domain-create.step-dns-servers.title': 'O que são servidores DNS?',
  'page--community-domain-create.step-dns-servers.subtitle.first-paragraph': 'Os Servidores DNS são endereços utilizados pelas organizações de registro de domínios como {registroBr} ou {goDaddy}, para identificarem em qual servidor se encontram as informações sobre o domínio registrado.',
  'page--community-domain-create.step-dns-servers.subtitle.second-paragraph': 'Complete a ativação do domínio alterando os servidores DNS, onde o domínio foi registrado, para os endereços abaixo:',
  'page--community-domain-create.step-dns-servers.change-later-button.text': 'Trocar depois',
  'page--community-domain-create.step-dns-servers.button.text': 'Próxima parada',

  'page--community-domain-create.step-check.title': 'Teste a conexão',
  'page--community-domain-create.step-check.first-paragraph': 'Clique no botão abaixo para verificar se tudo está certo.',
  'page--community-domain-create.step-check.second-paragraph': 'Atenção: a mudança de DNS pode demorar até 48 horas para ser propagada pela internet.',
  'page--community-domain-create.step-check.test-later-button.text': 'Testar depois',
  'page--community-domain-create.step-check.button.text': 'Testar',

  // page community info
  // filepath: /routes/admin/authenticated/sidebar/community-settings/info/page.js
  // routepath: /community/info
  'page--community-info.form.successMessage': 'Dados salvos com sucesso :)',
  'page--community-info.form.logo.label': 'Logo da sua comunidade',
  'page--community-info.form.name.label': 'Nome da comunidade',
  'page--community-info.form.name.placeholder': 'Insira o nome da sua comunidade',
  'page--community-info.form.name.validation.required': 'Campo obrigatório',
  'page--community-info.form.description.label': 'Descrição',
  'page--community-info.form.description.placeholder': 'Para que sua comunidade vem ao mundo?',
  'page--community-info.form.city.label': 'Cidade',
  'page--community-info.form.city.validation.required': 'Informe em qual cidade sua comunidade atua',
  'page--community-info.form.custom-from-email.label': 'Email padrão para comunicação',
  'page--community-info.form.custom-from-email.helper-text': 'Esse email é utilizado como remetente padrão das comunicações enviadas através do BONDE.',
  'page--community-info.form.custom-from-email.placeholder': 'Insira neste formato: Nome do remetente<remetente@email.com>',
  'page--community-info.form.custom-from-email.validation.invalid-email-format': 'Formato inválido',

  // page community invite
  // filepath: /routes/admin/authenticated/sidebar/community-settings/invite/page.js
  // routepath: /community/invite
  'page--community-invite.info.title': '',
  'page--community-invite.info.content': 'Quanto mais gente, mais potente! Para convidar outros mobilizadores, é só preencher o campo abaixo. Mas lembre-se, a galera que você convidar vai ser literalmente parte do seu bonde: com acesso aos dados da comunidade e edição das páginas.',
  'page--community-invite.form.email.label': 'Enviar convite para:',
  'page--community-invite.form.email.placeholder': 'Insira aqui o email de cadastro de quem quiser convidar.',
  'page--community-invite.form.submit-button.default': 'Convidar',

  // page community invite (connected)
  // filepath: /routes/admin/authenticated/sidebar/community-settings/invite/page.connected.js
  // routepath: /community/invite
  'page--community-invite.form.email.validation.required': 'Obrigatório',
  'page--community-invite.form.email.validation.invalid': 'Email inválido',

  // component settings form
  // filepath: /client/ux/components/settings-form/index.js
  // routepath:
  //   - /account/edit
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/recipient
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/sharing
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'ux.components--settings-form.button.text': 'Salvar',
  'ux.components--settings-form.success-message': 'Dados salvos com sucesso :)',

  // page community mailchimp
  // filepath: /routes/admin/authenticated/sidebar/community-settings/mailchimp/page.js
  // routepath: /community/mailchimp
  'page--community-mailchimp.warning.title': 'Integração com Mailchimp',
  'page--community-mailchimp.warning.content': `
Se você tem uma conta no Mailchimp, pode integrá-la à sua comunidade. Assim, vão ser criados "segmentos estáticos" lá com os usuários que agirem em alguma página que criou aqui no BONDE. A gente captura os dados e integra eles pra você poder se comunicar e reengajar essa galera!
{br}
Os segmentos criados no Mailchimp a partir do BONDE seguem o seguinte formato: M999P000, M999F000, M999D000 (M=Mobilização, P=Pressão, F=Formulário, D=Doação)
{br}{br}
Caso sua base de ações não esteja sincronizada com o Mailchimp, você pode forçar a sincronia no botão abaixo:`,
  'page--community-mailchimp.form.api-key.label': 'Mailchimp API Key',
  'page--community-mailchimp.form.api-key.helper-text.title': 'Onde encontro essa informação?',
  'page--community-mailchimp.form.api-key.helper-text.step-01': 'Faça login na sua conta no Mailchimp e clique no seu nome de usuário. Você vai ver um menu surgir, clique na opção {accountStrong}.',
  'page--community-mailchimp.form.api-key.helper-text.step-02': 'Depois, siga os passos: {extrasStrong} > {apiKeysStrong} > {yourApiKeysStrong} > {createKeyStrong}',
  'page--community-mailchimp.form.api-key.helper-text.step-03': 'Agora é só copiar o código e colar no campo abaixo {apiKeyStrong}.',
  'page--community-mailchimp.form.api-key.placeholder': 'Insira aqui o conteúdo de "API key"',
  'page--community-mailchimp.form.list-id.label': 'Mailchimp ID da lista',
  'page--community-mailchimp.form.list-id.helper-text.title': 'Onde encontro essa informação?',
  'page--community-mailchimp.form.list-id.helper-text.step-01': 'Faça login na sua conta no Mailchimp e clique no seu nome de usuário. Surgirá um menu, clique na opção {listStrong}.',
  'page--community-mailchimp.form.list-id.helper-text.step-02': 'Selecione a lista correspondente e siga os passos: {settingsStrong} > {listAndDefaultsStrong}',
  'page--community-mailchimp.form.list-id.helper-text.step-03': 'Agora é só colar no campo abaixo o conteúdo da coluna a direita, abaixo do título {listIdStrong}',
  'page--community-mailchimp.form.list-id.placeholder': 'Insira aqui o "ID da lista"',
  'page--community-mailchimp.form.button.save': 'Salvar',
  'page--community-mailchimp.form.button.sync': 'Sincronizar',

  // page community twilio settings
  // filepath: /routes/admin/authenticated/sidebar/community-settings/twilio/page.js
  // routepath: /community/twilio
  'page--community-twilio.helper-text.title': 'Onde encontro essa informação?',
  'page--community-twilio.helper-text.twilio-login': 'É só seguir estes passos: Faça login na {link}',
  'page--community-twilio.helper-text.twilio-login.link': 'sua conta no Twilio',

  'page--community-twilio.form.twilio-account-sid.label': 'Twilio Account SID',
  'page--community-twilio.form.twilio-auth-token.label': 'Twilio Auth Token',
  'page--community-twilio.form.twilio-auth-token.helper-text.eye-icon': 'Clicar no ícone do olho',
  'page--community-twilio.form.twilio-number.label': 'Twilio Number',
  'page--community-twilio.form.twilio-number.helper-text.menu-item': 'Clique em {strongPhoneNumber} (símbolo de {strongHashtag} no menu da esquerda)',
  'page--community-twilio.form.twilio-number.helper-text.choice-number': 'Escolha qual número do Twilio quer usar',

  // page community new
  // filepath: /routes/admin/authenticated/external/community-new/page.js
  // routepath: /community/new
  'page--community-new.title': 'Crie uma comunidade',
  'page--community-new.subtitle': 'É na comunidade que tudo acontece: onde você cria e publica páginas de ação, gerencia seus dados e, claro, chama seu bonde pra chegar junto!.',
  'page--community-new.form.name.label': 'Nome da comunidade',
  'page--community-new.form.name.placeholder': 'Exemplo: Meu Rio',
  'page--community-new.form.city.label': 'Cidade da comunidade',
  'page--community-new.form.city.placeholder': 'Exemplo: Rio de Janeiro',
  'page--community-new.form.submit-button.text.default': 'Criar comunidade',
  'page--community-new.form.submit-button.text.saving': 'Salvando...',

  // page community new (connected)
  // filepath: /routes/admin/authenticated/external/community-new/page.connected.js
  // routepath: /community/new
  'page--community-new.form.name.validation.required': 'Informe o nome da comunidade',
  'page--community-new.form.city.validation.required': 'Informe em qual cidade sua comunidade atua',

  // page community recipient
  // filepath: /routes/admin/authenticated/sidebar/community-settings/recipient/page.js
  // routepath: /community/recipient
  'page--community-recipient.warning.title': 'Importante',
  'page--community-recipient.warning.content.list.li-01': 'A partir do momento em que você preencher os campos abaixo, você vai poder começar a arrecadar pela ferramenta de crowdfunding!',
  'page--community-recipient.warning.content.list.li-02': 'Atenção: qualquer quantia arrecadada pelas páginas da sua comunidade vai ser automaticamente transferida para a conta cadastrada aqui no dia do mês (ou da semana) que selecionar abaixo.',
  'page--community-recipient.warning.content.list.li-03': 'Atenção 2: As doações só ficam disponíveis 31 dias após a transação de cartão de crédito ter sido criada (29 dias corridos + 2 dias úteis) no caso de transações com uma parcela e 2 dias úteis após o pagamento do boleto bancário. Caso a transação tenha de 2 a 12 parcelas, o recebimento normal será da seguinte forma: primeira parcela em 31 dias, segunda em 61, terceira em 91, e assim por diante.',
  'page--community-recipient.title': 'Data de Transferência',
  'page--community-recipient.form.transfer-interval.label': 'Recorrência',
  'page--community-recipient.form.transfer-interval.value.weekly': 'Semanal',
  'page--community-recipient.form.transfer-interval.value.monthly': 'Mensal',
  'page--community-recipient.form.transfer-day.label': 'Dia de transferência',
  'page--community-recipient.form.transfer-day.weekly.mon': 'Segundas',
  'page--community-recipient.form.transfer-day.weekly.tue': 'Terças',
  'page--community-recipient.form.transfer-day.weekly.wed': 'Quartas',
  'page--community-recipient.form.transfer-day.weekly.thu': 'Quintas',
  'page--community-recipient.form.transfer-day.weekly.fri': 'Sextas',
  'page--community-recipient.section--account.title': 'Conta bancária',
  'page--community-recipient.form.bank-account-type.label': 'Tipo de conta',
  'page--community-recipient.form.bank-account-type.value.checking-account': 'Corrente',
  'page--community-recipient.form.bank-account-type.value.savings-account': 'Poupança',
  'page--community-recipient.form.bank-code.label': 'Banco',
  'page--community-recipient.form.bank-code.value.default': 'Selecione o banco',
  'page--community-recipient.form.bank-agency.label': 'Agência',
  'page--community-recipient.form.bank-agency.placeholder': 'Digite apenas números',
  'page--community-recipient.form.bank-agency-dv.label': 'Dígito',
  'page--community-recipient.form.bank-agency-dv.placeholder': 'Ex: 0',
  'page--community-recipient.form.bank-account.label': 'Conta',
  'page--community-recipient.form.bank-account.plcaeholder': 'Digite apenas números',
  'page--community-recipient.form.bank-account-dv.label': 'Dígito',
  'page--community-recipient.form.bank-account-dv.plcaeholder': 'Ex: 00',
  'page--community-recipient.form.bank-legal-name.label': 'Nome / Razão Social',
  'page--community-recipient.form.bank-legal-name.placeholder': 'Ex: Minha Sampa',
  'page--community-recipient.form.bank-document-number.label': 'CPF / CNPJ',
  'page--community-recipient.form.bank-document-number.placeholder': 'Digite apenas números',

  // page community recipient (connected)
  // filepath: /routes/admin/authenticated/sidebar/community-settings/recipient/page.connected.js
  // routepath: /community/recipient
  'page--community-recipient.form.validation.required': 'Campo obrigatório',
  'page--community-recipient.form.bank-agency.validation.max-length': 'Deve conter no máximo 5 dígitos',
  'page--community-recipient.form.bank-agency-dv.validation.length': 'Deve conter apenas 1 dígito',
  'page--community-recipient.form.bank-account.validation.max-length': 'Deve conter no máximo 13 dígitos',
  'page--community-recipient.form.bank-account-dv.validation.max-length': 'Deve conter no máximo 2 caracteres',
  'page--community-recipient.form.bank-document-number.validation.cnpj-length': 'CNPJ deve conter 14 dígitos',
  'page--community-recipient.form.bank-document-number.validation.cpf-length': 'CPF deve conter 11 dígitos',
  'page--community-recipient.form.bank-document-number.validation.invalid-cpf-format': 'CPF inválido',
  'page--community-recipient.form.bank-document-number.validation.invalid-cnpj-format': 'CNPJ inválido',

  // metrics data table component
  // filepath: /client/components/metrics/components/metrics-data-table.js
  // routepath: /community/report
  'c--metrics.unique.activists.title': 'ATIVISTAS',
  'c--metrics.unique.activists.subtitle': 'Total de pessoas que já agiram em alguma página publicada pela sua comunidade',
  'c--metrics.total.active.activists.title': 'ATIVISTAS RECENTES',
  'c--metrics.total.active.activists.subtitle': 'Total de pessoas que agiram na sua comunidade {br} nos últimos 90 dias',

  'c--metrics.total.pressure.actions.title': 'PRESSÕES',
  'c--metrics.total.pressure.actions.subtitle': 'Total de ações de pressão {br} feitas em páginas da sua comunidade nos últimos 90 dias',
  'c--metrics.total.subscriptions.actions.title': 'INSCRIÇÕES',
  'c--metrics.total.subscriptions.actions.subtitle': 'Total de ações de cadastro em formulários publicados pela sua comunidade {br} nos últimos 90 dias',

  'c--metrics.total.unique.donations.title': 'DOAÇÕES ÚNICAS',
  'c--metrics.total.unique.donations.subtitle': 'Valor total das doações únicas confirmadas na sua comunidade nos últimos 30 dias',
  'c--metrics.total.recurrent.donations.title': 'DOAÇÕES RECORRENTES',
  'c--metrics.total.recurrent.donations.subtitle': 'Valor total das doações recorrentes confirmadas na sua comunidade nos últimos 30 dias',
  'c--metrics.total.unique-and-recurrent.donations.title': 'DOAÇÕES GERAIS',
  'c--metrics.total.unique-and-recurrent.donations.subtitle': 'Valor total de doações únicas e recorrentes arrecadadas pela sua comunidade até agora {br}(confirmadas / aguardando pagamento)',

  'c--metrics.total.donations.charged-back-amount': 'Valor total de devolução das doações coletadas até agora:',
  'c--metrics.total.donations.refunded-amount': 'Valor total de reembolso das doações coletadas até agora:',
  'c--metrics.total.donations.refused-amount': 'Valor total de reembolso das doações coletadas até agora:',

  // page community report
  // filepath: /routes/admin/authenticated/sidebar/community-settings/report/page.js
  // routepath: /community/report
  'page--community-report.title.metrics': 'Métricas',
  'page--community-report.title.reports': 'Relatórios',

  'page--community-report.section-button.donation.title': 'RELATÓRIO DE DOAÇÕES',
  'page--community-report.section-button.donation.helper-text': 'Clique no botão abaixo para baixar o relatório com dados de todas as doações feitas na sua comunidade.',
  'page--community-report.section-button.donation.text': 'Baixar',

  'page--community-report.section-button.actions.title': 'RELATÓRIO DE AÇÕES',
  'page--community-report.section-button.actions.helper-text': 'Clique no botão abaixo para baixar o relatório com dados de todas as ações feitas na sua comunidade.',
  'page--community-report.section-button.actions.text': 'Baixar',

  'page--community-report.section-button.activists.title': 'RELATÓRIO DE ATIVISTAS',
  'page--community-report.section-button.activists.helper-text': 'Clique no botão abaixo para baixar o relatório com dados de todas as pessoas que agiram na sua comunidade.',
  'page--community-report.section-button.activists.text': 'Baixar',

  // component sidebar
  // filepath: /client/components/navigation/sidebar/sidebar.js
  // routepath:
  //   - /account/edit
  //   - /community/domain
  //   - /community/domain/add
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/recipient
  //   - /community/report
  //   - /mobilizations
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/blocks/create
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/edit
  //   - /mobilizations/:mobilization_id/launch
  //   - /mobilizations/:mobilization_id/launch/end
  //   - /mobilizations/:mobilization_id/sharing
  //   - /mobilizations/:mobilization_id/templates/choose
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  //   - /mobilizations/:mobilization_id/templates/create
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/export
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - /mobilizations/new
  //   - /mobilizations/templates/list
  'components.navigation--sidebar.community-settings.item.mobilizations': 'Páginas',
  'components.navigation--sidebar.community-settings.item.info': 'Comunidade',
  'components.navigation--sidebar.community-settings.item.metrics': 'Dados',
  'components.navigation--sidebar.community-settings.item.domains': 'Domínios',

  'components.navigation--sidebar.mobilization-settings.item.launch': 'Publicar página',
  'components.navigation--sidebar.mobilization-settings.item.launched': 'Página publicada',
  'components.navigation--sidebar.mobilization-settings.item.edit': 'Editar página',
  'components.navigation--sidebar.mobilization-settings.item.add-block': 'Adicionar bloco',
  'components.navigation--sidebar.mobilization-settings.item.open-at-new-tab': 'Visualizar',
  'components.navigation--sidebar.mobilization-settings.item.config': 'Configurações da página',

  'components.navigation--sidebar.footer.account': 'Sua Conta',
  'components.navigation--sidebar.footer.sign-out': 'Sair',

  // component sidenav
  // filepath: /client/components/navigation/sidenav/sidenav.js
  // routepath:
  //   - /account/edit
  //   - /community/domain
  //   - /community/domain/add
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/recipient
  //   - /community/report
  //   - /mobilizations
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/blocks/create
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/edit
  //   - /mobilizations/:mobilization_id/launch
  //   - /mobilizations/:mobilization_id/launch/end
  //   - /mobilizations/:mobilization_id/sharing
  //   - /mobilizations/:mobilization_id/templates/choose
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  //   - /mobilizations/:mobilization_id/templates/create
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/export
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - /mobilizations/new
  //   - /mobilizations/templates/list
  'components.navigation--sidenav.config': 'Comunidade',
  'components.navigation--sidenav.change-community': 'Trocar',

  // page mobilizations list
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-list/page.js
  // routepath: /mobilizations
  'page--mobilizations-list.page-header.title': 'Suas páginas',
  'page--mobilizations-list.more-menu-action.open': 'Abrir página',
  'page--mobilizations-list.more-menu-action.create-template': 'Criar template',
  'page--mobilizations-list.more-menu-action.archived': 'Arquivar',
  'page--mobilizations-list.more-menu-action.active': 'Ativar',

  // component mobilizations page header
  // filepath: /client/mobilizations/components/page-header.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  'mobilizations.components--page-header.button.text': 'Nova página',
  'mobilizations.components--page-header.tabs.actives': 'Ativas',
  'mobilizations.components--page-header.tabs.templates': 'Templates',
  'mobilizations.components--page-header.tabs.archived': 'Arquivadas',

  // component mobilizations list item: name
  // filepath: /client/mobilizations/components/list/items/name/index.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  //   - /mobilizations/:mobilization_id/templates/create
  'mobilizations.components--list.items.name.header.text': 'Nome',

  // component mobilizations list item: created at
  // filepath: /client/mobilizations/components/list/items/created-at.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  //   - /mobilizations/:mobilization_id/templates/create
  'mobilizations.components--list.items.created-at.header.text': 'Criada em',

  // component mobilizations list item: users
  // filepath: /client/mobilizations/components/list/items/users.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  'mobilizations.components--list.items.users.header.text': 'Ações',

  // component mobilizations list item: fund raising
  // filepath: /client/mobilizations/components/list/items/fund-raising.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  'mobilizations.components--list.items.fund-raising.header.text': 'Arrecadação',
  'mobilizations.components--list.items.fund-raising.currency': 'R$',

  // component mobilizations list item: fund raising
  // filepath: /client/mobilizations/components/list/items/copy-number.js
  // routepath:
  //   - /mobilizations/templates/list
  'mobilizations.components--list.items.copy-number.header.text': 'Núm. Cópias',

  // component mobilizations page tab layout
  // filepath: /client/mobilizations/components/page-tab-layout.js
  // routepath:
  //   - /mobilizations/new
  //   - /mobilizations/:mobilization_id/templates/choose
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  'mobilizations.components--page-tab-layout.title': 'Nova página',
  'mobilizations.components--page-tab-layout.tabs.goal': 'Informações',
  'mobilizations.components--page-tab-layout.tabs.templates': 'Modelo',

  // page mobilizations new
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-new/page.js
  // routepath: /mobilizations/new
  'page--mobilizations-new.title': 'Qual o objetivo da sua página?',
  'page--mobilizations-new.footer': 'Relaxa! Você pode atualizar estes campos nas configurações da sua página quando quiser ;)',

  // component mobilizations mobilization basics form
  // filepath: /client/mobilizations/components/mobilization-basics-form.js
  // routepath:
  //   - /mobilizations/new
  //   - /mobilizations/:mobilization_id/basics
  'mobilizations.components--basics-form.name.label': 'Nome',
  'mobilizations.components--basics-form.name.placeholder': 'Ex: Ação contra PEC 181',
  'mobilizations.components--basics-form.name.validation.required': 'Insira o nome da página',
  'mobilizations.components--basics-form.name.validation.max-length': 'Ops, o nome que você escolheu tá muito longo...',
  'mobilizations.components--basics-form.slug.label': 'Identificador da página',
  'mobilizations.components--basics-form.slug.helper-text': 'O identificador (ou "slug") é usado para referenciar a página - como no domínio padrão do BONDE, por exemplo: {example}',
  'mobilizations.components--basics-form.slug.helper-example': 'Ex: 123-slug-que-escolher',
  'mobilizations.components--basics-form.slug.validation.required': 'Insira o identificador da página',
  'mobilizations.components--basics-form.slug.validation.max-length': 'Ops, seu identificador tá muito longo...',
  'mobilizations.components--basics-form.goal.label': 'Objetivo',
  'mobilizations.components--basics-form.goal.placeholder': 'Qual impacto você quer gerar ao publicar está página?',
  'mobilizations.components--basics-form.goal.validation.required': 'Insira o objetivo da página',
  'mobilizations.components--basics-form.goal.validation.max-length': 'Ops, você passou do limite de caracteres...',

  // component control buttons
  // filepath: /client/components/forms/control-buttons.js
  // routepath:
  //   - /account/edit
  //   - /community/domain
  //   - /community/domain/add
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/new
  //   - /community/recipient
  //   - /login
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/launch
  //   - /mobilizations/:mobilization_id/sharing
  //   - /mobilizations/:mobilization_id/templates/create
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - /mobilizations/new
  //   - /register
  //   - /subscriptions/:id/edit
  'components--control-buttons.cancel': 'Voltar',
  'components--control-buttons.input.value.default': 'Próxima parada',
  'components--control-buttons.input.value.saving': 'Salvando...',

  // page mobilizations templates choose
  // filepath: /routes/admin/authenticated/sidebar/templates-choose/page.js
  // routepath: /mobilizations/:mobilization_id/templates/choose
  'page--mobilizations.templates-choose.title': 'Como você quer começar?',
  'page--mobilizations.templates-choose.browsable-list-item.blank': 'Criar página do zero',
  'page--mobilizations.templates-choose.browsable-list-item.templates-custom': 'Usar um template',
  'page--mobilizations.templates-choose.browsable-list-item.templates-global': 'Templates globais',

  // component mobilizations templates selectable list
  // filepath: /client/mobilizations/templates/components/template-selectable-list.js
  // routepath:
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  'templates.components--selectable-list.filterable-search-bar.placeholder': 'Buscar template',
  'templates.components--selectable-list.empty-list-text': 'Ops, não existe nenhum template com esse nome...',
  'templates.components--selectable-list.button.back': 'Voltar',
  'templates.components--selectable-list.button.next': 'Próxima parada',

  // page mobilizations templates choose custom
  // filepath: /routes/admin/authenticated/sidebar/templates-choose-custom/page.js
  // routepath: /mobilizations/:mobilization_id/templates/choose/custom
  'page--mobilizations.templates-choose-custom.title': 'Seus Templates',

  // page mobilizations templates choose global
  // filepath: /routes/admin/authenticated/sidebar/templates-choose-global/page.js
  // routepath: /mobilizations/:mobilization_id/templates/choose/global
  'page--mobilizations.templates-choose-global.title': 'Templates Globais',

  // component mobilizations settings menu
  // filepath: /client/mobilizations/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/sharing
  'mobilizations.components--settings-menu.title': 'Configurações da sua página',
  'mobilizations.components--settings-menu.tabs.info': 'Informações',
  'mobilizations.components--settings-menu.tabs.sharing': 'Compartilhamento',
  'mobilizations.components--settings-menu.tabs.metrics': 'Métricas',
  'mobilizations.components--settings-menu.tabs.domain': 'Domínio',

  // page mobilizations settings analytics
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-analytics/page.js
  // routepath: /mobilizations/:mobilization_id/analytics
  'page--mobilizations-analytics.first-paragraph': 'Quer acesso a dados específicos? Quantos acessos diários sua página recebe? A origem deles? Quantos ativistas estão online na sua página agora? Você pode acompanhar essas e muitas outras métricas conectando sua página a uma conta no Google Analytics :)',
  'page--mobilizations-analytics.second-paragraph': 'Cola aqui que a gente explica:',
  'page--mobilizations-analytics.ol.create-analytics-account': 'Primeiro, crie uma conta no Google Analytics {analyticsLink}',
  'page--mobilizations-analytics.ol.create-analytics-account.link': 'clicando aqui',
  'page--mobilizations-analytics.ol.keep-up-with': 'Obtenha sua ID de acompanhamento no Google Analytics. É um código que começa sempre com as letras UA, que você vai ver depois de criar sua conta lá.',
  'page--mobilizations-analytics.ol.paste-ga-code': 'Copie a ID de acompanhamento e cole no campo abaixo:',
  'page--mobilizations-analytics.ol.form.ga-code.label': 'ID de acompanhamento',
  'page--mobilizations-analytics.ol.done': 'Pronto! Você já pode acompanhar as estatísticas da sua página no Google Analytics :)',

  // page mobilizations settings analytics (connected)
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-analytics/page.connected.js
  // routepath: /mobilizations/:mobilization_id/analytics
  'page--mobilizations-analytics.ol.form.ga-code.validation.invalid.ga-code.format': 'Ops, ID inválida :/',

  // page block create
  // filepath: /routes/admin/authenticated/sidebar/blocks-create/page.js
  // routepath: /mobilizations/:mobilization_id/blocks/create
  'page--block-create.title': 'Adicionando um bloco de conteúdo',
  'page--block-create.tabs.blank-blocks': 'Configurações',
  'page--block-create.helper-text': 'Aqui, você deve escolher o layout das colunas e a imagem/cor de fundo do seu bloco. Lembre-se que em cada coluna você vai poder adicionar uma ferramenta diferente - conteúdo, pressão, crowdfunding ou formulário - e depois pode organizar e reorganizar os blocos como quiser, afinal, o esse bonde é seu :)',
  'page--block-create.type.label': 'Layout do bloco',
  'page--block-create.background.label': 'Fundo do bloco',
  'page--block-create.background.image.placeholder.text': 'Você tambm pode selecionar uma imagem de fundo :)',
  'page--block-create.button-add.text': 'Criar bloco',

  // page mobilizations domain
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-domain/page.js
  // routepath: /mobilizations/:mobilization_id/customDomain
  'page--mobilizations-domain.form-domain.success-message': 'As informações do seu domínio foram salvas com sucesso!',

  // component mobilizations form domain
  // filepath: /client/mobilizations/components/form-domain.js
  // routepath:
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/launch
  'mobilizations.components--form-domain.helper-text-first-line': 'Estamos na reta final! Para publicar sua página, você precisa cadastrar aqui o domínio que quer direcionar pra ela. Esse vai ser o "endereço" da sua página para o público ;)',
  'mobilizations.components--form-domain.helper-text-second-line': 'Se você já cadastrou domínios principais nas configurações da comunidade, é só escolher a opção que preferir abaixo.',
  'mobilizations.components--form-domain.helper-text-third-line': 'Quer cadastrar um domínio principal? {link}.',
  'mobilizations.components--form-domain.helper-text-third-line.link': 'Só clicar aqui!',

  'mobilizations.components--form-domain.create-domain-text.first-line': 'Ops, você ainda não tem domínios principais cadastrados na comunidade... Se quiser cadastar, {link}.',
  'mobilizations.components--form-domain.create-domain-text.first-line.link': 'clique aqui',
  'mobilizations.components--form-domain.create-domain-text.second-line': 'Você também pode usar um domínio externo para cadastrar como endereço desta página, é só selecionar a opção abaixo ;)',

  'mobilizations.components--form-domain.basic.header-toggle.use-existing-domain': 'Criar um subdomínio',
  'mobilizations.components--form-domain.basic.helper-text': 'Abaixo, escolha o domínio principal que quer usar e preencha o campo com o subdomínio que quiser:',
  'mobilizations.components--form-domain.basic.form.subdomain.label': 'Subdomínio',
  'mobilizations.components--form-domain.basic.form.subdomain.placeholder': 'nomedapagina',
  'mobilizations.components--form-domain.basic.form.domain.label': 'Domínio Principal',
  'mobilizations.components--form-domain.basic.form.domain.button.choice': 'Escolha...',

  'mobilizations.components--form-domain.root.header-toggle.use-root-domain': 'Usar um domínio principal',
  'mobilizations.components--form-domain.root.helper-text': 'Escolha o domínio principal (ou seja, já cadastrado nas configurações da sua comunidade) que você quer usar como endereço da sua página:',

  'mobilizations.components--form-domain.advanced.header-toggle': 'Direcionar para um domínio externo',
  'mobilizations.components--form-domain.advanced.helper-text': 'Se você quer usar um domínio que comprou mas não cadastrou aqui na sua comunidade, tudo bem! É só preencher o campo abaixo e seguir as orientações:',
  'mobilizations.components--form-domain.advanced.form.external-domain.label': 'Domínio externo',
  'mobilizations.components--form-domain.advanced.form.external-domain.placeholder': 'meudominio.com.br',

  'mobilizations.components--form-domain.cname-table.helper-text': '{strong}: já que escolheu um domínio externo, você ainda precisa configurar este domínio no servidor em que cadastrou ele para que o endereço seja redirecionado à sua página. Pra isso, você vai precisar dessas informações aqui embaixo, anota aí:',
  'mobilizations.components--form-domain.cname-table.helper-text.strong': 'Próximo passo:',
  'mobilizations.components--form-domain..cname-table.ip': 'IP: 54.156.173.29',
  'mobilizations.components--form-domain.cname-table.footer.helper-text': 'Se tiver alguma dúvida sobre como fazer isso, dá uma olhada no nosso FAQ, {link} no item 5.',
  'mobilizations.components--form-domain.cname-table.footer.helper-text.link': 'aqui',

  // component mobilizations form domain (connected)
  // filepath: /client/mobilizations/components/form-domain.connected.js
  // routepath:
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/launch
  'mobilizations.components--form-domain.validation.required': 'Preenchimento obrigatório',
  'mobilizations.components--form-domain.validation.subdomain.required-domain': 'Preenchimento obrigatório',
  'mobilizations.components--form-domain.validation.subdomain.required': 'Preenchimento obrigatório',
  'mobilizations.components--form-domain.validation.subdomain.invalid': 'Ops! Subdomínio inválido...',
  'mobilizations.components--form-domain.validation.external-domain.invalid': 'Ops! Domínio inválido...',

  // component mobrender mobilization
  // filepath: /client/mobrender/components/mobilization.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'mobrender.components--mobilization.footer.slogan': 'Feito pra causar. Feito com',
  'mobrender.components--mobilization.add-block-content': 'Adicionar bloco de conteúdo',

  // component mobrender block config menu
  // filepath: /client/mobrender/components/block-config-menu.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--block-config-menu.item.duplicate': 'Duplicar',
  'mobrender.components--block-config-menu.item.change-background': 'Alterar fundo',
  'mobrender.components--block-config-menu.item.toggle-visibility.show': 'Mostrar',
  'mobrender.components--block-config-menu.item.toggle-visibility.hide': 'Esconder',
  'mobrender.components--block-config-menu.item.remove': 'Remover',
  'mobrender.components--block-config-menu.item.remove.confirm': 'Você tem certeza que quer remover este bloco?',
  'mobrender.components--block-config-menu.item.move-up': 'Mover para cima',
  'mobrender.components--block-config-menu.item.move-down': 'Mover para baixo',

  // component mobrender block change background
  // filepath: /client/mobrender/components/block-change-background.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--block-change-background.button.save': 'Salvar',
  'mobrender.components--block-change-background.button.cancel': 'Cancelar',

  // component mobrender block
  // filepath: /client/mobrender/components/block.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--block.hidden-tag': 'Bloco escondido',

  // component navigation navbar edition wrapper
  // filepath: /client/components/navigation/navbar/navbar-edition-wrapper.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'components.navigation--navbar-edition-wrapper.block': 'Bloco {position}',

  // component mobilizations form share
  // filepath: /client/mobilizations/components/form-share.js
  // routepath:
  //   - /mobilizations/:mobilization_id/launch
  //   - /mobilizations/:mobilization_id/sharing
  'mobilizations.components--form-share.facebook.title': 'Link de compartilhamento',
  'mobilizations.components--form-share.facebook.helper-text': 'Como você quer que sua página apareça quando compartilharem o link dela nas redes sociais? Essa é mais uma oportunidade de deixar tudo do seu jeito. Abaixo, você deve escolher a imagem, o título e o subtítulo do compartilhamento.',
  'mobilizations.components--form-share.facebook.fb.image.helper-text': 'Use uma imagem com 470x270 pixels, assim ela vai encaixar direitinho :)',
  'mobilizations.components--form-share.facebook.fb.image.link': 'Saiba mais',
  'mobilizations.components--form-share.facebook.form.share-image.label': 'Imagem',
  'mobilizations.components--form-share.facebook.form.share-title.label': 'Título',
  'mobilizations.components--form-share.facebook.form.share-title.placeholder': 'Um título bem claro que passe o objetivo da sua página',
  'mobilizations.components--form-share.facebook.form.share-description.label': 'Subtítulo',
  'mobilizations.components--form-share.facebook.form.share-description.placeholder': 'Use este espaço para completar a informação do título e engajar o público',

  'mobilizations.components--form-share.twitter.title': 'Twitter',
  'mobilizations.components--form-share.twitter.helper-text': 'Se quiser, você também pode deixar pronto um "tweet padrão" pra quando alguém compartilhar por ali já saber o que falar. É só preencher abaixo:',
  'mobilizations.components--form-share.twitter.form.share-text.label': 'Texto padrão do tweet',
  'mobilizations.components--form-share.twitter.form.share-text.placeholder': 'Insira uma frase que chame outras pessoas a se engajarem na sua página!',

  // page mobilizations launch
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-launch/page.js
  // routepath: /mobilizations/:mobilization_id/launch
  'page--mobilizations-launch.title': 'Publicando sua página',
  'page--mobilizations-launch.steps.form-domain.title': '1ª parada: endereço da página',
  'page--mobilizations-launch.steps.form-share.title': '2ª parada: informações de compartilhamento',
  'page--mobilizations-launch.steps.done.title': 'Uhul! Sua página foi publicada :)',
  'page--mobilizations-launch.steps.done.helper-text': 'Em uma nova aba, digite o endereço/domínio que cadastrou aqui para se certificar de que ela já está no ar. Se ainda não estiver, dê uma olhada se cadastrou os domínios corretamente. Está tudo certo? Então é só esperar propagar pela internet :)',
  'page--mobilizations-launch.steps.done.button.open': 'Visualizar página',
  'page--mobilizations-launch.button.saving': 'Salvando...',
  'page--mobilizations-launch.button.launch': 'Publicar página',
  'page--mobilizations-launch.button.next': 'Próxima parada',
  'page--mobilizations-launch.form-share.validation.required': 'Obrigatório',

  // page mobilizations launch end
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-launch-end/page.js
  // routepath: /mobilizations/:mobilization_id/launch/end
  'page--mobilizations-launch-end.heading.all-done': 'Tudo pronto?',
  'page--mobilizations-launch-end.heading.just-launch': 'Agora é só lançar pro mundo e compartilhar com a galera!',
  'page--mobilizations-launch-end.title': 'Chegou a hora',
  'page--mobilizations-launch-end.button': 'Publicar página',

  // page templates list
  // filepath: /routes/admin/authenticated/sidebar/templates-list/page.js
  // routepath: /mobilizations/templates/list
  'page--templates-list.header.title': 'Seus templates',
  'page--templates-list.empty-list.no-template': 'Sua comunidade ainda não tem nenhum template...',
  'page--templates-list.empty-list.create-one': 'Mas você pode criar a partir de uma página.',
  'page--templates-list.empty-list.mobilization-list': 'Lista de páginas',
  'page--templates-list.more-menu-action.remove.text': 'Remover',
  'page--templates-list.more-menu-action.remove.confirm': 'Tem certeza que deseja remover este template? Ao confirmar, não será possível desfazer esta ação.',

  // page templates create
  // filepath: /routes/admin/authenticated/sidebar/templates-create/page.js
  // routepath: /mobilizations/:mobilization_id/templates/create
  'page--templates-create.header.title': 'Crie um template a partir da página',
  'page--templates-create.form.name.label': 'Nome do seu template',
  'page--templates-create.form.name.placeholder': 'Para crowdfundings',
  'page--templates-create.form.goal.label': 'Descrição',
  'page--templates-create.form.goal.placeholder': 'Escreva um texto curto explicando para que serve o template que está criando. Ex: template para páginas de crowdfunding',

  // page templates create (connected)
  // filepath: /routes/admin/authenticated/sidebar/templates-create/page.connected.js
  // routepath: /mobilizations/:mobilization_id/templates/create
  'page--templates-create.form.validation.required': 'Preenchimento obrigatório',

  // component donation widget settings menu
  // filepath: /client/mobilizations/widgets/__plugins__/donation/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  'donation.components--settings-menu.title': 'Configurações da ferramenta',
  'donation.components--settings-menu.tabs.adjusts': 'Ajustes',
  'donation.components--settings-menu.tabs.autofire': 'Mensagem de agradecimento',
  'donation.components--settings-menu.tabs.post-action': 'Pós-ação',
  'donation.components--settings-menu.tabs.info': 'Configurações',

  // page donation widget
  // filepath: /routes/admin/authenticated/sidebar/widgets-donation-settings/donation/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/donation
  'page--donation-widget.form.donation-value-title': 'Clique para definir este valor como padrão.',
  'page--donation-widget.form.submit-button': 'Salvar',
  'page--donation-widget.form.success-message': 'Oba! Suas configurações foram salvas com sucesso :)',
  'page--donation-widget.form.payment-type.label': 'Tipo de crowdfunding',
  'page--donation-widget.form.payment-type.unique': 'Doação única',
  'page--donation-widget.form.payment-type.recurring': 'Doação recorrente',
  'page--donation-widget.form.payment-type.users-choice': 'Deixar o usuário escolher',
  'page--donation-widget.form.payment-interval.label': 'Intervalo da recorrência',
  'page--donation-widget.form.payment-interval.monthly': 'Mensal',
  'page--donation-widget.form.payment-interval.semiannually': 'Semestral',
  'page--donation-widget.form.payment-interval.annually': 'Anual',
  'page--donation-widget.form.goal.label': 'Meta da campanha',
  'page--donation-widget.form.goal.placeholder': 'Ex.: 50000',
  'page--donation-widget.goal-date-limit.label': 'Prazo de arrecadação',
  'page--donation-widget.goal-date-limit.placeholder': 'Ex.: DD/MM/AAAA',
  'page--donation-widget.form.donation-default-value.label': 'Valores das doações',
  'page--donation-widget.form.donation-default-value.helper-text': 'Você pode escolher até 5 valores em cada ferramenta de crowdfunding - mas pode ter mais de uma ferramenta por página ;) Lembre-se: preencha apenas com números inteiros (Ex: 50)',
  'page--donation-widget.form.default-value-01.label': 'Valor 1',
  'page--donation-widget.form.default-value-01.placeholder': 'R$20',
  'page--donation-widget.form.default-value-02.label': 'Valor 2',
  'page--donation-widget.form.default-value-02.placeholder': 'R$50',
  'page--donation-widget.form.default-value-03.label': 'Valor 3',
  'page--donation-widget.form.default-value-03.placeholder': 'R$100',
  'page--donation-widget.form.default-value-04.label': 'Valor 4',
  'page--donation-widget.form.default-value-04.placeholder': 'R$200',
  'page--donation-widget.form.default-value-05.label': 'Valor 5',
  'page--donation-widget.form.default-value-05.placeholder': 'R$500',
  'page--donation-widget.form.default-value.radio.text': 'Padrão',
  'page--donation-widget.form.default-value.helper-text': '*todos os valores são em reais, o BONDE ainda não processa transações em outras moedas...',
  'page--donation-widget.form.donation-title.label': 'Título',
  'page--donation-widget.form.donation-title.placeholder': 'Ex: Escolha um valor e contribua agora!',
  'page--donation-widget.form.main-color.label': 'Cor',
  'page--donation-widget.form.main-color.helper-text': 'Você pode escolher a cor na caixinha abaixo ou inserir o valor que quiser em hex - por exemplo: #DC3DCE.',
  'page--donation-widget.form.button-text.label': 'Texto do botão',
  'page--donation-widget.form.button-text.placeholder': 'Ex.: Doar agora!',
  'page--donation-widget.form.payment-method.label': 'Quer habilitar o pagamento por boleto?',
  'page--donation-widget.form.payment-method.helper-text': 'O pagamento por boleto só está disponível para doações únicas. Cada boleto pago terá um custo adicional de R$3,00.',
  'page--donation-widget.form.payment-method.radio.yes': 'Sim',
  'page--donation-widget.form.payment-method.radio.no': 'Não',
  'page--donation-widget.form.bank-account.label': 'Conta bancária',
  'page--donation-widget.form.bank-account.helper-text': 'Esta campanha está associada à conta bancária cadastrada nas configurações dessa comunidade. O valor arrecadado vai ser transferido para a conta na data que tiver cadastrado lá ;)',

  // page donation widget (connected)
  // filepath: /routes/admin/authenticated/sidebar/widgets-donation-settings/donation/page.connected.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/donation
  'page--donation-widget.form.validation.invalid': 'Ops, formato inválido...',
  'page--donation-widget.form.validation.button-text.required': 'Insira o texto do botão',
  'page--donation-widget.form.validation.button-text.max-length': 'Você atingiu o limite de caracteres...',
  'page--donation-widget.form.validation.goal.format': 'Insira o valor neste formato: 1000',
  'page--donation-widget.form.validation.goal-date-limit.format': 'Insira a data neste formato: DD/MM/AAAA',
  'page--donation-widget.form.validation.goal-date-limit.invalid-date': 'Data inválida.',
  'page--donation-widget.form.validation.goal-date-limit.date-must-be-higher': 'Ops, seu prazo já expirou! Escolha outra data',

  // component widget autofire
  // filepath: /client/mobilizations/widgets/components/form-autofire.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  'widgets.components--form-autofire.form.submit-button': 'Salvar',
  'widgets.components--form-autofire.form.success-message': 'Mensagem de agradecimento configurada com sucesso!',
  'widgets.components--form-autofire.form.sender-name.label': 'Nome do(a) remetente',
  'widgets.components--form-autofire.form.sender-name.placeholder': 'É o nome que vai aparecer como remetente do email de agradecimento.',
  'widgets.components--form-autofire.form.sender-email.label': 'Email do(a) remetente',
  'widgets.components--form-autofire.form.sender-email.placeholder': 'É o email do qual vão ser enviadas as mensagens de agradecimento.',
  'widgets.components--form-autofire.form.sender-email.validation.invalid-email-format': 'Ops, email inválido...',
  'widgets.components--form-autofire.form.email-subject.label': 'Assunto do email',
  'widgets.components--form-autofire.form.email-subject.placeholder': 'Defina o assunto da mensagem de agradecimento.',
  'widgets.components--form-autofire.form.email-text.label': 'Texto do email',
  'widgets.components--form-autofire.form.email-text.placeholder': 'Aqui você deve escrever o texto que vai no corpo da mensagem de agradecimento. se Ex: Muito obrigada por apostar na força da ação coletiva em rede! Sua participação é muito importante e, agora, precisamos da sua ajuda para que mais gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um dos links abaixo. Um abraço.',

  // component widget form finish message
  // filepath: /client/mobilizations/widgets/components/form-finish-message/index.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'widgets.components--form-finish-message.success-message': 'Oba! Informaçes salvas com sucesso :)',
  'widgets.components--form-finish-message.type.label': 'Tipo de mensagem',
  'widgets.components--form-finish-message.type.radio.share': 'Padrão',
  'widgets.components--form-finish-message.type.radio.custom': 'Customizar',
  'widgets.components--form-finish-message.type.validation.required': 'Você precisa selecionar um tipo de mensagem ;)',
  'widgets.components--form-finish-message.share.whatsapp-text.label': 'Texto para o WhatsApp',
  'widgets.components--form-finish-message.share.whatsapp-text.placeholder': 'Você pode deixar pronto aqui um textinho padrão. Assim, quando alguém compartilhar sua página pelo WhatsApp no pós-ação, já vai ter uma sugestão do que falar :)',
  'widgets.components--form-finish-message.preview.label': 'Preview',
  'widgets.components--form-finish-message.custom.message.default': 'Clique aqui para editar sua mensagem de pós-ação.',

  // component share tell-a-friend
  // filepath: /client/components/share/tell-a-friend.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--tell-a-friend.text': 'Compartilhe com a sua galera pra aumentarmos nosso impacto!',

  // component share facebook-share-button
  // filepath: /client/components/share/facebook-share-button.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--facebook-share-button.text': 'Compartilhar no Facebook',

  // component share twitter-share-button
  // filepath: /client/components/share/twitter-share-button.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--twitter-share-button.text': 'Compartilhar no Twitter',

  // component share whatsapp-share-button
  // filepath: /client/components/share/whatsapp-share-button.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--whatsapp-share-button.text': 'Compartilhar no WhatsApp',

  // page donation widget finish
  // filepath: /routes/admin/authenticated/sidebar/widgets-donation-settings/finish/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  'page--donation-widget-finish.form.success-message': 'Oba! Informações salvas com sucesso :)',

  // component donation widget tell-a-friend
  // filepath: /client/mobilizations/widgets/__plugins__/donation/components/donation-tell-a-friend.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - (public) /
  'donation.components--tell-a-friend.message': 'Oba, sua doação foi registrada! Se selecionou a opção "boleto", dá uma olhada no seu email que o link vai chegar por lá ;) ',

  // config mobrender widgets
  // filepath: /client/mobrender/widgets/config.js
  // routepath: /mobilizations/:mobilization_id/edit
  'widgets.config--content.label': 'Conteúdo',
  'widgets.config--content.default': 'Clique para editar a ferramenta',
  'widgets.config--form.label': 'Formulário',
  'widgets.config--form.default': 'Obrigado por apostar na força da ação coletiva! Sua participação é muito importante e, agora, precisamos da sua ajuda para potencializar nosso impacto. Compartilhe nas suas redes clicando em um dos links abaixo.\n\nUm abraço',
  'widgets.config--pressure.label': 'Pressão por email',
  'widgets.config--pressure.default.title': 'Envie um email para quem pode tomar essa decisão',
  'widgets.config--pressure.default.button-text': 'Enviar email',
  'widgets.config--donation.label': 'Crowdfunding',
  // Pressure by phone
  'widgets.config--pressure-phone.label': 'Pressão por telefone',
  'widgets.config--pressure-phone.default.title': 'Ligue para quem pode tomar essa decisão',
  'widgets.config--pressure-phone.default.button-text': 'Ligar',

  // component donation widget
  // filepath: /client/mobilizations/widgets/__plugins__/donation/components/__donation__/index.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'widgets.components--donation.default.button-text': 'Doar agora',
  'widgets.components--donation.default.title-text': 'Clique para editar a ferramenta',
  'widgets.components--donation.period-label-options.month': 'mês',
  'widgets.components--donation.period-label-options.halfyear': 'semestre',
  'widgets.components--donation.period-label-options.year': 'ano',
  'widgets.components--donation.users-choice.recurring': 'Apoiar todo {periodLabelCurrent}',
  'widgets.components--donation.users-choice.unique': 'Doação pontual',
  'widgets.components--donation.reattempt.message.title': 'Ops!',
  'widgets.components--donation.reattempt.message.text.line-01': 'Aconteceu algum problema :(',
  'widgets.components--donation.reattempt.message.text.line-02': 'Clique no botão abaixo pra tentar de novo.',
  'widgets.components--donation.reattempt.message.button.text': 'Nova tentativa',
  'widgets.components--donation.progress-bar.collected': 'arrecadados',
  'widgets.components--donation.progress-bar.supports': `
    {totalDonations} {totalDonations, plural,
      one {apoio}
      other {apoio}
    }
  `,
  'widgets.components--donation.progress-bar.goal': 'Meta:',
  'widgets.components--donation.progress-bar.date.last-day': 'último dia!',
  'widgets.components--donation.progress-bar.date.last-days': 'últimos dias!',
  'widgets.components--donation.progress-bar.date.last-week': 'última semana!',
  'widgets.components--donation.progress-bar.date.remaining': `
    faltam {goalDateRemaining} {goalDateRemaining, plural,
      one {dia}
      other {dias}
    }
  `,

  // component form widget settings menu
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  'form-widget.components--settings-menu.title': 'Configurações da ferramenta',
  'form-widget.components--settings-menu.items.fields': 'Configurações',
  'form-widget.components--settings-menu.items.adjusts': 'Ajustes',
  'form-widget.components--settings-menu.items.autofire': 'Mensagem de agradecimento',
  'form-widget.components--settings-menu.items.report': 'Relatório',
  'form-widget.components--settings-menu.items.post-action': 'Pós-ação',

  // page form widget
  // filepath: /routes/admin/authenticated/sidebar/widgets-form-settings/form/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form
  'page--form-widget.form.success-message': 'Oba! Ferramenta configurada com sucesso :)',
  'page--form-widget.form.widget-title.label': 'Título',
  'page--form-widget.form.widget-title.placeholder': 'Ex: Preencha o formulário abaixo para assinar a petição.',
  'page--form-widget.form.button-text.label': 'Botão',
  'page--form-widget.form.button-text.placeholder': 'Defina o texto do botão de confirmação do formulário.',
  'page--form-widget.form.counter-text.label': 'Contador',
  'page--form-widget.form.counter-text.placeholder': 'Defina o texto que ficará ao lado do número de pessoas que agiram.',

  // component data export
  // filepath: /client/mobilizations/widgets/components/data-export.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  'widgets.components--data-export.formated-export-at': '{date} às {time}',
  'widgets.components--data-export.loading.message': 'Processando...',
  'widgets.components--data-export.exported.message': 'Última exportação: {formatedExportAt}.',
  'widgets.components--data-export.export.label': 'Relatório de ações',
  'widgets.components--data-export.export.helper-text': 'Clique no botão abaixo para baixar um relatório com todos os dados capturados pelo formulário.',
  'widgets.components--data-export.export.button': 'Baixar',

  // action async widget data export
  // filepath: /client/mobrender/redux/action-creators/async-widget-data-export.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  'action--async-widget-data-export.no-data': 'Ops, não encontramos nenhum dado para ser exportado...',

  // content widget
  // filepath: /client/mobilizations/widgets/__plugins__/content/components/__content__.js
  // routepath: /mobilizations/:mobilization_id/edit
  'c--content-widget.delete-widget.confirm.message': 'Quer remover a ferramenta?',

  // slate editor implementation component
  // filepath: /client/mobilizations/widgets/__plugins__/content/components/editor-slate/index.js
  // routepath: /mobilizations/:mobilization_id/edit
  'c--editor-slate.button-save.text': 'Salvar',
  'c--editor-slate.button-cancel.text': 'Cancelar',
  'c--editor-slate.button-cancel.message': 'Quer mesmo sair do modo edição? Suas alterações não serão salvas.',

  // page form widget fields
  // filepath: /routes/admin/authenticated/sidebar/widgets-form-settings/fields/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  'page--form-widget-fields.add-button': 'Adicionar um campo',
  'page--form-widget-fields.helper-text.still-empty': 'Aqui você pode adicionar, remover, editar e ordenar os campos do seu formulário do jeito que quiser :)',
  'page--form-widget-fields.helper-text.manage-fields': 'Aqui você pode adicionar, remover, editar e ordenar os campos do seu formulário do jeito que quiser :)',

  // component form widget
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/__form__.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'form-widget.components--form.default.title-text': 'Clique para editar sua ferramenta...',
  'form-widget.components--form.default.button-text': 'Enviar',

  // component form widget input
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/input.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  'form-widget.components--input.click-to-edit': 'Clique para editar',
  'form-widget.components--input.field-dropdown.options.default': 'Selecione...',
  'form-widget.components--input.field-greetings.title': 'Mensagem de sucesso alterada para:',

  // component form widget input form
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/input-form.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  'form-widget.components--input-form.handle-remove.confirm': 'Você quer mesmo remover este campo?',
  'form-widget.components--input-form.handle-overlay-click.confirm': 'Ao sair sem salvar você vai perder suas alterações... Quer sair mesmo assim?',
  'form-widget.components--input-form.field-title.label': 'Título do campo',
  'form-widget.components--input-form.field-title.placeholder': 'Ex: Email',
  'form-widget.components--input-form.field-helper-text.label': 'Texto de ajuda',
  'form-widget.components--input-form.field-helper-text.placeholder': 'Ex: Insira aqui o seu email',
  'form-widget.components--input-form.field-type.label': 'Tipo de campo',
  'form-widget.components--input-form.field-type.options.text': 'Texto',
  'form-widget.components--input-form.field-type.options.email': 'E-mail',
  'form-widget.components--input-form.field-type.options.number': 'Número',
  'form-widget.components--input-form.field-type.options.dropdown': 'Dropdown &#9733;',
  'form-widget.components--input-form.field-type.options.greetings': 'Saudação &#9733;',
  'form-widget.components--input-form.field-required.label': 'Obrigatório',
  'form-widget.components--input-form.field-required.radio.yes.label': 'Sim',
  'form-widget.components--input-form.field-required.radio.no.label': 'Não',
  'form-widget.components--input-form.button-move-up': 'Mover para cima',
  'form-widget.components--input-form.button-move-down': 'Mover para baixo',
  'form-widget.components--input-form.button-remove': 'Remover',
  'form-widget.components--input-form.button-cancel': 'Cancelar',
  'form-widget.components--input-form.button-save.saving': 'Salvando...',
  'form-widget.components--input-form.button-save.default': 'Salvar',

  // component mobrender widget overlay
  // filepath: /client/mobrender/components/widget-overlay.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--widget-overlay.button.edit.title': 'Editar',
  'mobrender.components--widget-overlay.button.remove.title': 'Remover',

  // page form widget finish
  // filepath: /routes/admin/authenticated/sidebar/widgets-form-settings/finish/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  'page--form-widget-finish.success-message': 'Oba! Configurações salvas com sucesso :)',

  // component form widget tell a friend
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/form-tell-a-friend.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - (public) /
  'form-widget.components--tell-a-friend.message': 'Oba! Sua ação foi registrada :)',

  // component pressure widget form
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/pressure-form/index.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'pressure-widget.components--pressure-form.validation.required': 'Preenchimento obrigatório',
  'pressure-widget.components--pressure-form.email.validation.invalid-email-format': 'Email inválido',
  'pressure-widget.components--pressure-form.email.validation.sender-is-target': 'O email que você está tentando usar é de um dos alvos da ferramenta...',
  'pressure-widget.components--pressure-form.phone.validation.ddd': 'Informe o código do país e o DDD com dois dígitos. Ex: +5521',
  'pressure-widget.components--pressure-form.phone.validation.invalid': 'Ops! Telefone inválido...',
  'pressure-widget.components--pressure-form.phone.validation.caller-is-target': 'O telefone que você está tentando usar é de um dos alvos da ferramenta...',
  'pressure-widget.components--pressure-form.email.label': 'Email',
  'pressure-widget.components--pressure-form.email.placeholder': 'Insira seu email',
  'pressure-widget.components--pressure-form.phone.label': 'Telefone',
  'pressure-widget.components--pressure-form.phone.placeholder': 'Insira seu telefone. Ex: +5511987654321',
  'pressure-widget.components--pressure-form.name.label': 'Nome',
  'pressure-widget.components--pressure-form.name.placeholder': 'Insira seu nome',
  'pressure-widget.components--pressure-form.lastname.label': 'Sobrenome',
  'pressure-widget.components--pressure-form.lastname.placeholder': 'Insira seu sobrenome',
  'pressure-widget.components--pressure-form.city.label': 'Cidade',
  'pressure-widget.components--pressure-form.city.placeholder': 'Insira sua cidade',
  'pressure-widget.components--pressure-form.subject.label': 'Assunto',
  'pressure-widget.components--pressure-form.body.label': 'Corpo do email',
  'pressure-widget.components--pressure-form.phone-calls.ringing': 'Ligação em andamento...',
  'pressure-widget.components--pressure-form.phone-calls.retry': 'Ligar de novo',
  'pressure-widget.components--pressure-form.phone-calls.call': 'Ligar de novo',
  'pressure-widget.components--pressure-form.phone.how-it-works.title': 'Como funciona?',
  'pressure-widget.components--pressure-form.phone.how-it-works.list-item-01': 'Estamos conectando com o alvo da vez...',
  'pressure-widget.components--pressure-form.phone.how-it-works.list-item-02': 'Assim que alguém atender do lado de lá, vamos te ligar',
  'pressure-widget.components--pressure-form.phone.how-it-works.list-item-03': 'Quando você atender, conectamos as ligações',
  'pressure-widget.components--pressure-form.phone.how-it-works.list-item-04': 'Agora é com você, hora de pressionar!',
  'pressure-widget.components--pressure-form.phone.finish-and-share': 'Encerrar e Compartilhar',

  // component pressure widget settings menu
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'pressure-widget.components--settings-menu.title': 'Configurações da ferramenta',
  'pressure-widget.components--settings-menu.items.form': 'Ajustes',
  'pressure-widget.components--settings-menu.items.pressure-email': 'Configurações',
  'pressure-widget.components--settings-menu.items.autofire': 'Mensagem de agradecimento',
  'pressure-widget.components--settings-menu.items.post-action': 'Pós-ação',

  // page pressure widget
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/pressure-count.js
  // routepath: /mobilizations/:mobilization_id/edit
  'c--pressure-count.text.default': 'pressões feitas',

  // page pressure widget
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/pressure/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  'page--pressure-widget.success-message': 'Oba! Configurações salvas com sucesso :)',
  'page--pressure-widget.form.title-text.label': 'Título',
  'page--pressure-widget.form.title-text.placeholder': 'Clique para editar sua ferramenta...',
  'page--pressure-widget.form.button-text.label': 'Texto do botão',
  'page--pressure-widget.form.button-text.placeholder': 'Pressionar',
  'page--pressure-widget.form.main-color.label': 'Cor',
  'page--pressure-widget.form.show-counter.label': 'Mostrar contador de pressão?',
  'page--pressure-widget.form.show-counter.radio.yes.label': 'Sim',
  'page--pressure-widget.form.show-counter.radio.no.label': 'Não',
  'page--pressure-widget.form.counter-text.label': 'Texto do contador',
  'page--pressure-widget.form.counter-text.placeholder': 'pressões feitas',
  'page--pressure-widget.form.show-city-field.label': 'Mostrar campo de cidade?',
  'page--pressure-widget.form.show-city-field.radio.yes.label': 'Sim',
  'page--pressure-widget.form.show-city-field.radio.no.label': 'Não',

  // page pressure widget (connected)
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/pressure/page.connected.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  'page--pressure-widget.form.validation.title-text.required': 'Preenchimento obrigatório',
  'page--pressure-widget.form.validation.button-text.required': 'Preenchimento obrigatório',

  // component widgets input tag
  // filepath: /client/mobilizations/widgets/components/input-tag.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  'widgets.components--input-tag.tags.label': 'Alvos cadastrados ({targetsCount})',
  'widgets.components--input-tag.insert-tag.placeholder': 'Nome do primeiro alvo <primeiro@alvo.com>\nNome do segundo alvo <segundo@alvo.com>\nNome do terceiro alvo <terceiro@alvo.com>\nNome do quarto alvo <quarto@alvo.com>\nNome do quinto alvo <quinto@alvo.com>\n...',
  'widgets.components--input-tag.insert-tag.placeholder-phone': 'Nome do primeiro alvo <+5511999999999>\nNome do segundo alvo <+5521888888888>\nNome do terceiro alvo <+5531777777777>\nNome do quarto alvo <+5527999999999>\n...',
  'widgets.components--input-tag.button.remove-all': 'Remover todos',

  // page pressure widget email
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/email/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  'page--pressure-widget-email.success-message': 'Oba! Configurações salvas com sucesso :)',
  'page--pressure-widget-email.form.input-tag.label': 'Adicionar alvos',
  'page--pressure-widget-email.form.input-tag.validation.invalid-target-format': 'Ops, formato inválido... Preencha do jeito que explicamos acima ;)',
  'page--pressure-widget-email.form.input-tag.validation.type-email-registered': 'Parece que você já cadastrou este alvo para receber pressão...',
  'page--pressure-widget-email.form.input-tag.validation.type-phone-registered': 'Parece que você já cadastrou este alvo para receber pressão...',
  'page--pressure-widget-email.form.email-subject.label': 'Assunto do email para os alvos',
  'page--pressure-widget-email.form.email-body.label': 'Corpo do email para os alvos',
  'page--pressure-widget-email.form.disable-edit-field.label': 'Desabilitar edição de assunto e corpo do email?',
  'page--pressure-widget-email.form.disable-edit-field.value.yes': 'Sim',
  'page--pressure-widget-email.form.disable-edit-field.value.no': 'Não',

  'p--pressure-widget--input-tag.info.title': 'Como cadastrar alvos',
  'p--pressure-widget--input-tag.info.text': 'O cadastro de alvos é bem simples e pode ser feito com mais de um alvo por vez. Você precisa separar os alvos, em linhas distintas e, cada alvo deve seguir o formato descrito abaixo. Para cadastrar basta pressionar {keyboardTrigger}. E não se esqueça de salvar depois, clicando no botão no canto superior direito da tela.',
  'p--pressure-widget--input-tag.info.item.target-format': 'Formato do alvo: {format} (obrigatório usar os caractéres {lt} e {gt} para agrupar o email)',
  'p--pressure-widget--input-tag.info.item.target-format.example': 'Nome <email@provedor.com>',
  'p--pressure-widget--input-tag.info.item.special-chars': 'Em ambos os tipos de pressão é obrigatório o uso dos caractéres {lt} e {gt} para agrupar o email ou telefone',
  'p--pressure-widget--input-tag.info.item.sorting': 'Os alvos serão exibidos em ordem aleatória na widget de pressão. Ou seja, cada vez que a mobilização for acessada, a ordem de exibição será diferente.',

  // page pressure widget email (connected)
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/email/page.connected.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  'page--pressure-widget-email.form.validation.required': 'Preenchimento obrigatório',

  // page pressure widget finish
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/finish/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'page--pressure-widget-finish.success-message': 'Oba! Configurações salvas com sucesso :)',

  // component pressure widget tell a friend
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/pressure-tell-a-friend.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'pressure-widget--tell-a-friend.message': 'Oba, sua pressão foi enviada!',

  // component pressure widget: target list
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/target-list/index.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'pressure-widget--target-list.label.email': `
    Quem você vai pressionar ({targetsCount} {targetsCount, plural,
      one {alvo}
      other {alvos}
    })
  `,
  'pressure-widget--target-list.label.pressure': `
    Selecione quem você quer pressionar ({targetsCount} {targetsCount, plural,
      one {alvo}
      other {alvos}
    })
  `,

  //
  // page activists management
  // filepath: {incoming-for-v0.6.x release}
  //
  // if the namenclature of the items was not matching when implementing
  // this feature, consider to make the necessary changes. after it,
  // remove this comment and place the respective filepath of the
  // translation keys.
  //
  // maybe, new intl key name convention can be implemented.
  //   e.g.
  //   - page      ~> `p--`
  //   - component ~> `c--`
  //
  'p--activists-management.header.title': 'Sua comunidade',
  'p--activists-management.header.button.upload.text': 'Importar dados (csv)',
  'p--activists-management.header.button.download.text': 'Exportar dados (csv)',
  'p--activists-management.content.title': '{totalNumber} pessoas',
  'p--activists-management.content.button.tagging.text': 'Tags',
  'p--activists-management.content.button.email.text': 'Email',
  'p--activists-management.content.form-tagging.tags.placeholder': 'Digite tags separadas por vírgula',
  'p--activists-management.content.form-tagging.button.text': 'Adicionar tag',
  'p--activists-management.content.form-tagging.success.message': 'Tags adicionadas com sucesso a {taggedNumber} pessoas',
  'p--activists-management.content.form-tagging.success.undo': 'Desfazer',
  'p--activists-management.content.activist-spotlight.title': 'Perfil selecionado',
  'p--activists-management.content.activist-spotlight.email.label': 'Email',
  'p--activists-management.content.activist-spotlight.phone.label': 'Telefone',
  'p--activists-management.content.activist-spotlight.mobilizations.label': 'Páginas em que agiu',
  'p--activists-management.content.activist-spotlight.tags.label': 'Tags',
  'p--activists-management.content.activist-spotlight.form-tagging.button.text': 'Adicionar',

  // component activists management filterable list
  // filepath: {incoming-for-v0.6.x release}
  'activists-management.c--filterable-list.activist.placeholder': 'Quem você está procurando?',

  'activists-management.c--filterable-list.suggest.placeholder': 'Filtre por páginas ou ferramentas',
  'activists-management.c--filterable-list.suggest.operators.label': 'Operadores',
  'activists-management.c--filterable-list.suggest.operators.options.or.label': 'ou',
  'activists-management.c--filterable-list.suggest.operators.options.and.label': 'e',
  'activists-management.c--filterable-list.suggest.segment.donations.label': 'Ferramenta: crowdfunding',
  'activists-management.c--filterable-list.suggest.segment.pressures.label': 'Ferramenta: pressão',
  'activists-management.c--filterable-list.suggest.segment.gen-forms.label': 'Ferramenta: formulário',
  'activists-management.c--filterable-list.suggest.segment.other-tags.label': 'Outras tags',

  'activists-management.c--filterable-list.period.options.today': 'Hoje',
  'activists-management.c--filterable-list.period.options.last-week': 'Última semana',
  'activists-management.c--filterable-list.period.options.last-fortnight': 'Últimos 15 dias',
  'activists-management.c--filterable-list.period.options.last-month': 'Últimos 30 dias',
  'activists-management.c--filterable-list.period.options.last-quarter': 'Últimos 3 meses',
  'activists-management.c--filterable-list.period.options.last-year': 'Último ano',
  'activists-management.c--filterable-list.period.options.always': 'Escolha um período',
  'activists-management.c--filterable-list.period.options.custom-period': 'Customizar período',

  // Activists (CRM)
  // filepath: routes/admin/authenticated/sidebar/activists
  // route: /activists
  'routes.admin.sidebar.activists.container.title': 'Sua comunidade',
  'routes.admin.sidebar.activists.container.filter-placeholder': 'Filtre por páginas ou ferramentas',
  'routes.admin.sidebar.activists.container.empty-list': 'Ops! Ninguém com esse filtro :(',
  'routes.admin.sidebar.activists.container.counter': `{totalCount} {totalCount, plural,
    one {pessoa}
    other {pessoas}
  }`,
  'routes.admin.sidebar.activists.container.import-csv': 'Importar dados (csv)',
  'routes.admin.sidebar.activists.container.export-csv': 'Exportar dados (csv)',
  'routes.admin.sidebar.activists.import-csv.insertActivists.title.success': 'Importação concluída com sucesso!',
  'routes.admin.sidebar.activists.import-csv.insertActivists.message.success': '{length} pessoas foram adicionadas à sua comunidade.',
  'routes.admin.sidebar.activists.import-csv.insertActivists.title.fail': 'Ops!',
  'routes.admin.sidebar.activists.import-csv.insertActivists.message.fail': '{error}',

  // createForm validations
  // path: client/storybook/forms/validate
  'createForm.validate.email': 'Ops! Email invlálido...',
  'createForm.validate.required': 'Preenchimento obrigatório',
  'createForm.validate.cnpj.length': 'CNPJ deve ter 14 dígitos',
  'createForm.validate.cnpj.invalid': 'Ops! CNPJ inválido',
  'createForm.validate.cpf.length': 'CPF deve conter 11 dígitos',
  'createForm.validate.cpf.invalid': 'CPF inválido',
  // settingsForm
  // path: client/storybook/settings/forms
  'settingsForm.submitLabel.default': 'Salvar',
  'settingsForm.sucessMessage.default': 'Dados salvos com sucesso :)',

  // adjustmentsForms
  'adjustmentnsForm.validate.call_to_action.required': 'Insira o título',
  'adjustmentnsForm.validate.button_text.required': 'Insira o texto do botão',
  'adjustmentnsForm.validate.button_text.length': 'O limite de caracteres foi atingido.',
  'adjustments.form.successMessage': 'Formulário configurado com sucesso!',
  'adjustments.form.call-to-action.label': 'Título do formulário',
  'adjustments.form.call-to-action.placeholder': 'Ex: Preencha o formulário abaixo para assinar a petição.',
  'adjustments.form.button-text.label': 'Botão',
  'adjustments.form.button-text.placeholder': 'Defina o texto do botão de confirmação do formulário.',
  'adjustments.form.count-text.label': 'Contador',
  'adjustments.form.count-text.placeholder': 'Defina o texto que ficará ao lado do número de pessoas que agiram.',
  'adjustments.form.count-text.helpBlock': 'O contador será mostrado se existir um texto definido.',
  'adjustments.form.main-color.label': 'Cor padrão',
  'adjustments.form.main-color.helpBlock': 'Selecione a cor no box abaixo ou insira o valor em hex, por exemplo: #DC3DCE.',


  // FinishPostDonation component - finish-post-donation.js
  'widgets.components--donation.finish-post-donation.value-list': '$ {value} / mês',
  'widgets.components--donation.finish-post-donation.no-action': 'Nenhuma ação disponível',
  'widgets.components--donation.finish-post-donation.title-component': 'OBA! Sua doação foi processada :)',
  'widgets.components--donation.finish-post-donation.improve-impact-question': 'Você acabou de apoiar a estrutura básica do Panela de Pressão, mas para ele atingir seu potencial máximo vamos precisar contratar uma pessoa totalmente dedicada a apoiar todos que quiserem criar suas campanhas na plataforma. Com uma pequena doação recorrente, você nos ajuda a contratar essa pessoa!',
  'widgets.components--donation.finish-post-donation.improve-impact-solution': 'Faça sua contribuição agora:',
  'widgets.components--donation.finish-post-donation.improve-impact-explanation': 'Sua contribuição será processada automaticamente a partir do mês que vem',
  'widgets.components--donation.finish-post-donation.support-every-month': 'APOIAR TODO MÊS',
  'widgets.components--donation.finish-post-donation.not-now': 'AGORA NÃO',
  'widgets.components--donation.finish-post-donation-messages.donation-ok': 'MUITO OBRIGADA! Sua doação foi registrada :) Ela será processada automaticamente uma vez ao mês, começando daqui a 31 dias.',
  'widgets.components--donation.finish-post-donation-messages.not-now': 'Tudo bem! Valeu por seu apoio :)',
  'widgets.components--donation.finish-post-donation-messages.tell-a-friend.text': 'Compartilhe com a sua galera para espalhar o Mutirão Ativista por todos os cantos:'
}
