export default {
  // page account login
  // filepath: /routes/admin/not-authenticated/account-login/page.js
  // routepath: /login
  'page--account-login.label.email': 'Correo electrónico',
  'page--account-login.label.password': 'Contraseña',
  'page--account-login.placeholder.email': 'ejemplo@email.com',
  'page--account-login.loading': 'Cargando...',
  'page--account-login.signin': 'Iniciar sesión',
  'page--account-login.ask-register': '¿Todavía no te has inscrito?',
  'page--account-login.cta-signup': 'Haz click para entrar a BONDE',
  'page--account-login.auth.error-message': 'Contraseña incorrecta...',
  'page--account-login.auth.error-message.retrieve-password.link': '¿Olvidaste tu contraseña?',

  // page account login (connected)
  // filepath: /routes/admin/not-authenticated/account-login/page.connected.js
  // routepath: /login
  'p--account-login.form.email.validation.required': 'Ingresa tu correo electrónico',
  'p--account-login.form.email.validation.invalid': 'Correo electrónico inválido',
  'p--account-login.form.password.validation.required': 'Ingresa tu contraseña',

  // page account register
  // filepath: /routes/admin/not-authenticated/account-register/page.js
  // routepath: /register
  'page--account-register.title': 'Crea tu cuenta en BONDE',
  'p--account-retrieve.title.first-line': 'Tranquilo, vamos a mandarte una nueva contraseña :)',
  'p--account-retrieve.title.second-line': 'Llena el campo acá abajo con tu correo electrónico de ingreso',
  'page--account-register.form.name.label': 'Nombre',
  'page--account-register.form.name.placeholder': 'Tu nombre',
  'page--account-register.form.name.validation.required': 'Ingresa tu nombre',
  'page--account-register.form.lastname.label': 'Apellido',
  'page--account-register.form.lastname.placeholder': 'Tu apellido',
  'page--account-register.form.email.label': 'Correo electrónico',
  'page--account-register.form.email.placeholder': 'ejemplo@email.com',
  'page--account-register.form.email.validation.required': 'Ingresa tu correo electrónico ',
  'page--account-register.form.email.validation.invalid-email-format': 'Correo electrónico inválido',
  'page--account-register.form.password.label': 'Contraseña',
  'page--account-register.form.password.label.validation.required': 'Crea una contrseña',
  'page--account-register.form.password.label.validation.min-length': 'Tu contraseña debe tener al menos 8 caracteres',
  'page--account-register.form.password-confirm.label': 'Confirma tu constraseña',
  'page--account-register.form.password-confirm.label.validation.match': 'Oops, ¡las constraseñas no coinciden!',
  'page--account-register.form.submit-button.default': 'Crear cuenta',
  'page--account-register.form.submit-button.saving': 'Guardando...',

  // page account retrieve password
  // filepath: /routes/admin/not-authenticated/account-retrieve/page.connected.js
  // routepath: /account/retrieve
  'p--account-retrieve.form.email.validation.required': 'Ingresa tu correo electrónico',
  'p--account-retrieve.form.email.validation.invalid-email-format': 'Correo electrónico inválido',
  'p--account-retrieve.form.email.label': 'Correo electrónico',
  'p--account-retrieve.form.email.placeholder': 'ejemplo@email.com',
  'p--account-retrieve.form.submit-button.sending': 'Enviando...',
  'p--account-retrieve.form.submit-button.default': 'Enviar',

  // page account edit
  // filepath: /routes/admin/authenticated/sidebar/account-edit/page.js
  // routepath: /account/edit
  'page--account-edit.header.title': 'Tu cuenta',
  'page--account-edit.header.tabs.user': 'Perfil',
  'page--account-edit.form.name.label': 'Nombre',
  'page--account-edit.form.lastname.label': 'Apellido',
  'page--account-edit.form.email.label': 'Correo electrónico',

  // page subscription edit
  // filepath: /routes/public/subscription-edit/page.js
  // routepath: /subscriptions/:id/edit
  'page--subscription-edit.title': 'Tu donación',
  'page--subscription-edit.helper-text': '¿Qué quieres modificar de tu donación?',
  'page--subscription-edit.button.creditcard': 'Tarjeta de crédito',
  'page--subscription-edit.button.recurring': 'Información de la donación',
  'page--subscription-edit.cancel-subscription.confirm': 'Estás a punto de cancelar tu apoyo. ¿Estás seguro de querer continuar?',
  'page--subscription-edit.link.cancel-subscription': 'Quiero cancelar mi donación',

  // form subscription credit card
  // filepath: /client/subscriptions/forms/credit-card-form.js
  // routepath: /subscriptions/:id/edit
  'form--subscription-creditcard.helper-text': 'Llena los campos acá abajo para cambiar la tarjeta de tu donación:',
  'form--subscription-creditcard.previous-data.title': 'Datos de la tarjeta anterior',
  'form--subscription-creditcard.previous-data.name': 'Nombre',
  'form--subscription-creditcard.previous-data.expiration-date': 'Fecha de expiración',

  'form--subscription-creditcard.form.number.label': 'Número',
  'form--subscription-creditcard.form.number.placeholder': 'Ejm: 0000 0000 0000 0000',
  'form--subscription-creditcard.form.name.label': 'Nombre',
  'form--subscription-creditcard.form.name.placeholder': '(igual que el que aparece en la tarjeta)',
  'form--subscription-creditcard.form.expiration-date.label': 'Fecha de expiración',
  'form--subscription-creditcard.form.expiration-date.placeholder': '00/00',
  'form--subscription-creditcard.form.cvv.label': 'CVV',
  'form--subscription-creditcard.form.cvv.placeholder': 'Ejm: 000',
  'form--subscription-creditcard.form.submit-button.text': 'Guardar',
  'form--subscription-creditcard.form.validation.required': 'Obligatorio',

  // form subscription recurring
  // filepath: /client/subscriptions/forms/recurring-form.js
  // routepath: /subscriptions/:id/edit
  'form--subscription-recurring.helper-text': 'Llena los campos acá abajo para modificar el día del mes en que tu donación recurrente es procesada:',
  'form--subscription-recurring.form.process-at.label': 'Nueva fecha',
  'form--subscription-recurring.form.process-at.placeholder': 'Ejm: DD/MM/AAAA',
  'form--subscription-recurring.form.submit-button.text': 'Guardar',
  'form--subscription-recurring.form.validation.required': 'Obligatorio',
  'form--subscription-recurring.form.validation.invalid-date-format': 'Formato de fecha inválido',

  // notifications
  // filepath: /client/utils/notifications.js
  // routepath:
  //   - /account/retrieve
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/new
  //   - /subscriptions/:id/edit
  //   - /community/invite
  'notification--generic-request-error.title': '¡Oops!',
  'notification--generic-request-error.message': 'Asegúrate de haber llenado bien los campos, si el problema persiste vuelve a intentar dentro de un rato ;)',

  'notification--generic-save-success.title': '¡Listo!',
  'notification--generic-save-success.message': 'Los datos han sido guardados exitosamente :)',
  'notification--slug-updated-message.title': 'Importante',
  'notification--slug-updated-message.message': 'El identificador (slug) de tu página fue modificado.  Si realizas alguna redirección de DNS via CNAME, no te olvides de actualizarlo.',

  'notification--message-pressure-targets-remove-all.title': 'Atención',
  'notification--message-pressure-targets-remove-all.message': 'Recuerda que debes hacer click en el botón guardar, en la esquina superior derecha de la pantalla, para que los objetivos sean actualizados en la herramienta ;)',

  'notification--account-password-retrieve-success.title': '¡Listo!',
  'notification--account-password-retrieve-success.message': 'Acabamos de mandarte un correo con una nueva contrasena. Revisa el buzon de entrada de tu correo y usa la nueva contrasena para iniciar sesion ;)',

  'notification--community-invite-success.title': '¡Listo!',
  'notification--community-invite-success.message': '¡La invitación para {email} fue enviada exitosamente! Tu BONDE está creciendo :)',

  'notification--subscription-cancel-success.title': 'Suscripción cancelada',
  'notification--subscription-cancel-success.message': 'Gracias por tu apoyo hasta aquí - ¡y esperamos que nos vuelvas a apoyar nuevamente! ',

  // community dns notifications
  // filepath: /client/community/notifications/dns.js
  // routepath: /community/domain
  'notify.community.check--dns--success.title': '¡Bien!',
  'notify.community.check--dns--success.text': '¡Los servidores DNS fueron sincronizados exitosamente! Ahora puedes configurar domininos y correos electrónicos en tu comunidad :)',
  'notify.community.check--dns--failure.title': 'Oops...',
  'notify.community.check--dns--failure.text': 'La sincronización de servidores DNS todavía está en curso. Si ya los modificaste en la página en la que compraste el dominio, vuelve a intentarlo dentro de un rato.',
  'notify.community.add--dns-hosted-zone--failure.title': 'Oops...',
  'notify.community.add--dns-hosted-zone--failure.text': 'Ocurrió un error, verifica que este dominio no haya sido insertado ya',

  // page community list
  // filepath: /routes/admin/authenticated/external/community-list/page.js
  // routepath: /community
  'page--community-list.title': '¡Hola {name}!,',
  'page--community-list.subtitle': '¿En qué comunidad te quieres movilizar?',
  'page--community-list.or': '{link}',
  'page--community-list.new': 'Crea una nueva comunidad',

  // component community settings menu
  // filepath: /client/community/components/settings-menu.js
  // routepath:
  //   - /community/domain
  //   - /community/domain/add
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/recipient
  //   - /community/report
  'community.components--settings-menu.title': 'Configuraciones de tu comunidad',
  'community.components--settings-menu.tabs.info': 'Información',
  'community.components--settings-menu.tabs.mobilizers': 'Movilizadores',
  'community.components--settings-menu.tabs.mailchimp': 'Mailchimp',
  'community.components--settings-menu.tabs.recipient': 'Cuenta bancaria',
  'community.components--settings-menu.tabs.metrics': 'Datos',
  'community.components--settings-menu.tabs.domains': 'Dominios',

  // component community domain preview
  // filepath: /client/community/components/dns/dns-preview/domain-preview.js
  // routepath: /community/domain/add
  'community.components--domain-preview.li.domain.header': '¿Qué dominio quieres agregar a tu comunidad?',

  // component community subdomain preview and form
  // filepath: /routes/admin/authenticated/sidebar/community-settings/domain/page.js
  // routepath: /community/domain
  'community.components--subdomain-preview-header.name': 'Nombre',
  'community.components--subdomain-preview-header.record-type': 'Tipo',
  'community.components--subdomain-preview-header.value': 'Valor',
  'community.components--domain.preview.label.domain': 'Dominio de la comunidad',
  'community.page--domain-list.header.dns-records': 'Registros DNS',
  'community.page--domain-list.header.dns-server': 'Servidores DNS',
  'community.page--domain-list.button.add-new-record': 'Agregar un nuevo registro',
  'community.page--domain-list.button.add-new-domain': 'Agregar un nuevo dominio',
  'community.page--domain-list.dialog.domain-confirm-message': '¿Estás seguro/a de que quieres eliminar el dominio?',
  'community.page--domain-list.dns-record-description.first-paragraph': 'Los servidores DNS son direcciones utilizadas por las organizaciones de registro de dominios como registro.br o godaddy.com, para identificar en qué servidor se encuentra la información sobre el dominio registrado.',
  'community.page--domain-list.dns-record-description.second-paragraph': 'Completa la activación del dominio modificando los servidores DNS, donde el dominio fue registrado, para las direcciones acá abajo:',
  'community.page--domain-list.dns-server-description': 'Los servidores DNS son direcciones utilizadas por las organizaciones de registro de dominios como {registroBr} o {goDaddy}, para identificar en qué servidor se encuentra la información sobre el dominio registrado. Aclara tus dudas {trilho}.',
  'community.page--domain-list.dns-server-description.trilho.link': 'en la página de ayuda',

  // component community subdomain form
  // filepath: /client/community/components/dns/subdomain-form/index.js
  // routepath: /community/domain
  'community.components--subdomain.name.label': 'Nombre',
  'community.components--subdomain.name.placeholder': 'Subdominio',
  'community.components--subdomain.record-type.label': 'Tipo',
  'community.components--subdomain.value.label': 'Valor',
  'community.components--subdomain.value.placeholder':
            `redirecionamento.dominio.com
ou
servidor-01.dominio.com
servidor-02.dominio.com
servidor-03.dominio.com`,
  'community.components--subdomain.form.submit-button': 'Agregar',

  // page community domain
  // filepath: /routes/admin/authenticated/sidebar/community-settings/domain/page.js
  // routepath: /community/domain
  'page--community-domain.form.validation.required': 'Campo obligatorio',

  'page--community-domain.header.info.title': 'Información',
  'page--community-domain.header.info.text': "Esta es la lista de dominios registrados en tu comunidad. Cuando vayas a publicar una página, vas a poder usarlos como direcciones o crear subdominios muy fácilmente y rápido :) Si algún dominio de tu lista estuviera con una 'X' , asegúrate de haber modificado correctamente los servidores DNS de la manera que lo explicamos.",

  'page--community-domain.domain-preview.success-icon.title': 'Servidores DNS activos',
  'page--community-domain.domain-preview.failure-icon.title': 'Esperando la modificación de los servidores DNS',

  'page--community-domain.section--dns-hosted-zone.add': 'Agregar un nuevo dominio',
  'page--community-domain.section--dns-hosted-zone.menu.subdomains': 'Subdominios',
  'page--community-domain.section--dns-hosted-zone.menu.remove': 'Quitar dominio',
  'page--community-domain.section--dns-hosted-zone.menu.remove.dialog.text': '¿Estás seguro/a de querer quitar el domimio {domainName}?',
  'page--community-domain.section--dns-hosted-zone.menu.check-dns': 'Probar la conexión',

  'page--community-domain.section--dns-records.menu.remove': 'Quitar subdominio',
  'page--community-domain.section--dns-records.menu.remove.dialog.text': '¿Estás seguro/a de querer quitar el registro {recordName}?',

  // component dialog
  // filepath: /client/ux/components/dialog/index.js
  // routepath: /community/domain
  'ux.components--dialog.button.confirm.text': 'Confirmar',
  'ux.components--dialog.button.cancel.text': 'Cancelar',

  // page community domain create
  // filepath: /routes/admin/authenticated/sidebar/community-settings/domain-create/page.js
  // routepath: /community/domain/add
  'page--community-domain-create.step-add.title': 'Ingresa el dominio deseado',
  'page--community-domain-create.step-add.form.domain-name.label': 'Dominio de tu comunidad',
  'page--community-domain-create.step-add.form.domain-name.placeholder': 'Ejm. micomunidad.org',
  'page--community-domain-create.step-add.form.domain-name.validation.required': 'Campo obligatorio.',
  'page--community-domain-create.step-add.form.domain-name.validation.invalid-domain-format': 'Dominio inválido',
  'page--community-domain-create.step-add.form.cancel-button.text': 'Cancelar',
  'page--community-domain-create.step-add.form.button.text': 'Agregar',

  'page--community-domain-create.step-dns-servers.step-title': 'Modifica los servidores de tu proveedor DNS',
  'page--community-domain-create.step-dns-servers.title': '¿Qué son servidores DNS?',
  'page--community-domain-create.step-dns-servers.subtitle.first-paragraph': 'Los servidores DNS son direcciones utilizadas por las organizaciones de registro de dominios como {registroBr} o {goDaddy}, para identificar en qué servidor se encuentra la información sobre el dominio registrado.',
  'page--community-domain-create.step-dns-servers.subtitle.second-paragraph': 'Completa la activación del dominio modificando los servidores DNS, donde el dominio fue registrado, para las direcciones acá abajo:',
  'page--community-domain-create.step-dns-servers.change-later-button.text': 'Modificar después',
  'page--community-domain-create.step-dns-servers.button.text': 'Próxima parada',

  'page--community-domain-create.step-check.title': "Pruebe la conexión'",
  'page--community-domain-create.step-check.first-paragraph': 'Haz click en el botón de abajo para ver que todo esté en orden.',
  'page--community-domain-create.step-check.second-paragraph': 'Atención: la modificación de DNS puede demorar hasta 48 horas para ser propagada por el Internet.',
  'page--community-domain-create.step-check.test-later-button.text': 'Probar luego',
  'page--community-domain-create.step-check.button.text': 'Probar',

  // page community info
  // filepath: /routes/admin/authenticated/sidebar/community-settings/info/page.js
  // routepath: /community/info
  'page--community-info.form.successMessage': 'Datos guardados exitosamente :)',
  'page--community-info.form.logo.label': 'Logo de tu comunidad',
  'page--community-info.form.name.label': 'Nombre de la comunidad',
  'page--community-info.form.name.placeholder': 'Inserta el nombre de tu comunidad',
  'page--community-info.form.name.validation.required': 'Campo obligatprio',
  'page--community-info.form.description.label': 'Descripción',
  'page--community-info.form.description.placeholder': '¿Cuál es el propósito de tu comunidad?',
  'page--community-info.form.city.label': 'Ciudad',
  'page--community-info.form.city.validation.required': 'Informa en qué ciudad actúa tu comunidad',
  'page--community-info.form.custom-from-email.label': 'Correo patrón para la comunicación',
  'page--community-info.form.custom-from-email.helper-text': 'Este correo es usado como remitente patrón de las comunicaciones enviadas a través de BONDE.',
  'page--community-info.form.custom-from-email.placeholder': 'Inserta con este formato: Nombre del remitente<remitente@email.com>',
  'page--community-info.form.custom-from-email.validation.invalid-email-format': 'Formato inválido',

  // page community invite
  // filepath: /routes/admin/authenticated/sidebar/community-settings/invite/page.js
  // routepath: /community/invite
  'page--community-invite.info.title': '',
  'page--community-invite.info.content': 'Mientras más gente, ¡más fuerza! Es hora de invitar a los otros integrantes que quieran generar un impacto y que compartan tu causa. Pero recuerda, el grupo que vas a invitar literalmente va a ser parte de tu BONDE: podrán acceder a los datos de tu comunidad y editar páginas. ',
  'page--community-invite.form.email.label': 'Mandar invitación a:',
  'page--community-invite.form.email.placeholder': 'Inserta aquí el correo electrónico de registro de quien quieras invitar.',
  'page--community-invite.form.submit-button.default': 'Invitar',

  // page community invite (connected)
  // filepath: /routes/admin/authenticated/sidebar/community-settings/invite/page.connected.js
  // routepath: /community/invite
  'page--community-invite.form.email.validation.required': 'Obligatorio',
  'page--community-invite.form.email.validation.invalid': 'Correo electrónico inválido',

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
  'ux.components--settings-form.button.text': 'Guardar',
  'ux.components--settings-form.success-message': 'Datos guardados exitosamente :)',

  // page community mailchimp
  // filepath: /routes/admin/authenticated/sidebar/community-settings/mailchimp/page.js
  // routepath: /community/mailchimp
  'page--community-mailchimp.warning.title': 'Integración con Mailchimp',
  'page--community-mailchimp.warning.content': `
Si tienes una cuenta en Mailchimp, puedes integrarla a tu comunidad. Al hacerlo, se crearán allí unos "segmentos estáticos" con los usuarios que actúen en alguna página que creaste aquí en BONDE. ¡Nosotros captamos los datos y los integramos directamente para que puedas comunicarte y volver a comprometer ese grupo en el futuro!
{br}
Los segmentos creados en Mailchimp a partir de BONDE toman el siguiente formato: M999P000, M999F000, M999D000 (M=Movilización, P=Presión, F=Formulario, D=Donación)
{br}{br}
En caso de que tu base de acciones no esté sincronizada con Mailchimp, puedes forzar la sincronización con el botón abajo:`,
  'page--community-mailchimp.form.api-key.label': 'Mailchimp API Key',
  'page--community-mailchimp.form.api-key.helper-text.titlev': '¿Dónde encuentro esta información?',
  'page--community-mailchimp.form.api-key.helper-text.step-01': 'Inicia sesión en tu cuenta de Mailchimp y haz click en tu nombre de usuario. Aparecerá un menú, haz click en la opción {accountStrong}.',
  'page--community-mailchimp.form.api-key.helper-text.step-02': 'Luego, sigue los siguientes pisos: {extrasStrong} > {apiKeysStrong} > {yourApiKeysStrong} > {createKeyStrong}',
  'page--community-mailchimp.form.api-key.helper-text.step-03': 'Ahora solo tienes que copiar el código y pegarlo en el campo de abajo {apiKeyStrong}.',
  'page--community-mailchimp.form.api-key.placeholder': "Inserta aquí el contenido de 'API key'",
  'page--community-mailchimp.form.list-id.label': 'Mailchimp ID de la lista',
  'page--community-mailchimp.form.list-id.helper-text.title': '¿Dónde encuentro esta información?',
  'page--community-mailchimp.form.list-id.helper-text.step-01': 'Inicia sesión en tu cuenta de Mailchimp y haz click en tu nombre de usuario. Aparecerá un menú, haz click en la opción {listStrong}.',
  'page--community-mailchimp.form.list-id.helper-text.step-02': 'Selecciona la lista correspondiente y sigue los siguientes pasos: {settingsStrong} > {listAndDefaultsStrong}',
  'page--community-mailchimp.form.list-id.helper-text.step-03': 'Ahora solo tienes que pegar en el campo de abajo el contenido de la columna a la mano derecha, debajo del título {listIdStrong}',
  'page--community-mailchimp.form.list-id.placeholder': "Inserta aquí el 'ID de la lista'",
  'page--community-mailchimp.form.button.save': 'Guardar',
  'page--community-mailchimp.form.button.sync': 'Sincronizar',

  // page community twilio settings
  // filepath: /routes/admin/authenticated/sidebar/community-settings/twilio/page.js
  // routepath: /community/twilio
  'page--community-twilio.helper-text.title': '¿Dónde encuentro esta información?',
  'page--community-twilio.helper-text.twilio-login': 'Solo tienes que seguir los siguientes pasos: inicia sesión en {link}',
  'page--community-twilio.helper-text.twilio-login.link': 'tu cuenta de Twilio',

  'page--community-twilio.form.twilio-account-sid.label': 'Twilio Account SID',
  'page--community-twilio.form.twilio-auth-token.label': 'Twilio Auth Token',
  'page--community-twilio.form.twilio-auth-token.helper-text.eye-icon': 'Hacer click en el ícono del ojo',
  'page--community-twilio.form.twilio-number.label': 'Twilio Number',
  'page--community-twilio.form.twilio-number.helper-text.menu-item': 'Haz click en {strongPhoneNumber} (símbolo de {strongHashtag} en el menú a la mano izquierda)',
  'page--community-twilio.form.twilio-number.helper-text.choice-number': 'Escoge qué número de Twilio quieres usar',

  // page community new
  // filepath: /routes/admin/authenticated/external/community-new/page.js
  // routepath: /community/new
  'page--community-new.title': 'Crea una comunidad',
  'page--community-new.subtitle': 'Es en la comunidad que todo sucede: donde creas y publicas páginas de acción, gestionas sus datos y, clara, ¡llamas a tu BONDE para llegar juntos!',
  'page--community-new.form.name.label': 'Nombre de la comunidad',
  'page--community-new.form.name.placeholder': 'Ejemplo: Meu Rio',
  'page--community-new.form.city.label': 'Ciudad de la comunidad',
  'page--community-new.form.city.placeholder': 'Ejemplo: Rio de Janeiro',
  'page--community-new.form.submit-button.text.default': 'Crear comunidad',
  'page--community-new.form.submit-button.text.saving': 'Guardando...',

  // page community new (connected)
  // filepath: /routes/admin/authenticated/external/community-new/page.connected.js
  // routepath: /community/new
  'page--community-new.form.name.validation.required': 'Ingresa el nombre de la comunidad',
  'page--community-new.form.city.validation.required': 'Ingresa la ciudad en que tu comunidad actúa',

  // page community recipient
  // filepath: /routes/admin/authenticated/sidebar/community-settings/recipient/page.js
  // routepath: /community/recipient
  'page--community-recipient.warning.title': 'Importante',
  'page--community-recipient.warning.content.list.li-01': 'A partir del momento en que llenes los campos de abajo, vas a poder comenzar a recaudar fondos con la herramienta de crowdfunding!',
  'page--community-recipient.warning.content.list.li-02': 'Atención: cualquier cantidad recaudada por las páginas de tu comunidad será automáticamente transferida a la cuenta registrada aquí el día del mes (o de la semana) que selecciones a continuación.',
  'page--community-recipient.warning.content.list.li-03': 'Atención 2: Las donaciones sólo quedan disponibles 31 días después de la transacción de la tarjeta de crédito se ha creado (29 días + 2 días hábiles) en el caso de transacciones con una cuota y 2 días hábiles después del pago del boleto bancario. En caso de que la transacción tenga de 2 a 12 cuotas, la recepción normal será de la siguiente forma: primer cuota en 31 días, segunda en 61, tercera en 91, y así sucesivamente.',
  'page--community-recipient.title': 'Fecha de transferencia',
  'page--community-recipient.form.transfer-interval.label': 'Frecuencia',
  'page--community-recipient.form.transfer-interval.value.weekly': 'Semanal',
  'page--community-recipient.form.transfer-interval.value.monthly': 'Mensual',
  'page--community-recipient.form.transfer-day.label': 'Día de transferencia',
  'page--community-recipient.form.transfer-day.weekly.mon': 'Lunes',
  'page--community-recipient.form.transfer-day.weekly.tue': 'Martes',
  'page--community-recipient.form.transfer-day.weekly.wed': 'Miércoles',
  'page--community-recipient.form.transfer-day.weekly.thu': 'Jueves',
  'page--community-recipient.form.transfer-day.weekly.fri': 'Viernes',
  'page--community-recipient.section--account.title': 'Cuenta bancaria',
  'page--community-recipient.form.bank-account-type.label': 'Tipo de cuenta',
  'page--community-recipient.form.bank-account-type.value.checking-account': 'Corriente',
  'page--community-recipient.form.bank-account-type.value.savings-account': 'Ahorro',
  'page--community-recipient.form.bank-code.label': 'Banco',
  'page--community-recipient.form.bank-code.value.default': 'Selecciona el banco',
  'page--community-recipient.form.bank-agency.label': 'Agencia',
  'page--community-recipient.form.bank-agency.placeholder': 'Únicamente digite números',
  'page--community-recipient.form.bank-agency-dv.label': 'Dígito',
  'page--community-recipient.form.bank-agency-dv.placeholder': 'Ejm: 0',
  'page--community-recipient.form.bank-account.label': 'Cuenta',
  'page--community-recipient.form.bank-account.plcaeholder': 'Únicamente digite números',
  'page--community-recipient.form.bank-account-dv.label': 'Dígito',
  'page--community-recipient.form.bank-account-dv.plcaeholder': 'Ejm: 00',
  'page--community-recipient.form.bank-legal-name.label': 'Nombre / Razón social',
  'page--community-recipient.form.bank-legal-name.placeholder': 'Ejm: Minha Sampa',
  'page--community-recipient.form.bank-document-number.label': 'CPF / CNPJ',
  'page--community-recipient.form.bank-document-number.placeholder': 'Únicamente digite números',

  // page community recipient (connected)
  // filepath: /routes/admin/authenticated/sidebar/community-settings/recipient/page.connected.js
  // routepath: /community/recipient
  'page--community-recipient.form.validation.required': 'Campo obLigatOrio',
  'page--community-recipient.form.bank-agency.validation.max-length': 'Debe contener como máximo 5 dígitos',
  'page--community-recipient.form.bank-agency-dv.validation.length': 'Debe contener únicamente 1 dígito',
  'page--community-recipient.form.bank-account.validation.max-length': 'Debe contener como máximo 13 dígitos',
  'page--community-recipient.form.bank-account-dv.validation.max-length': 'Debe contener como máximo 2 caracteres',
  'page--community-recipient.form.bank-document-number.validation.cnpj-length': 'CNPJ debe contener como máximo 14 dígitos',
  'page--community-recipient.form.bank-document-number.validation.cpf-length': 'CPF debe contener 11 dígitos',
  'page--community-recipient.form.bank-document-number.validation.invalid-cpf-format': 'CPF inválido',
  'page--community-recipient.form.bank-document-number.validation.invalid-cnpj-format': 'CNPJ inválido',

  // metrics data table component
  // filepath: /client/components/metrics/components/metrics-data-table.js
  // routepath: /community/report
  'c--metrics.unique.activists.title': 'ACTIVISTAS',
  'c--metrics.unique.activists.subtitle': 'Total de personas que ya han actuado en alguna de las páginas publicadas por tu comunidad',
  'c--metrics.total.active.activists.title': 'ACTIVISTAS RECIENTES',
  'c--metrics.total.active.activists.subtitle': 'Total de personas que han actuado en tu comunidad {br} en los últimos 90 días',

  'c--metrics.total.pressure.actions.title': 'PRESIONES',
  'c--metrics.total.pressure.actions.subtitle': 'Total de acciones de presión {br} hechas en páginas de tu comunidad en los últimos 90 días',
  'c--metrics.total.subscriptions.actions.title': 'INSCRIPCIONES',
  'c--metrics.total.subscriptions.actions.subtitle': 'Total de acciones de inscripción en los formularios publicados por tu comunidad {br} en los últimos 90 días',

  'c--metrics.total.unique.donations.title': 'DONACIONES ÚNICAS',
  'c--metrics.total.unique.donations.subtitle': 'Valor total de las donaciones únicas confirmadas en tu comunidad en los últimos 30 dias',
  'c--metrics.total.recurrent.donations.title': 'DONACIONES RECURRENTES',
  'c--metrics.total.recurrent.donations.subtitle': 'Valor total de las donaciones recurrentes confirmadas en tu comunidad en los últimos 30 dias',
  'c--metrics.total.unique-and-recurrent.donations.title': 'DONACIONES GENERALES',
  'c--metrics.total.unique-and-recurrent.donations.subtitle': 'Valor total de donaciones únicas y recurrentes recaudadas por tu comunidad hasta ahora {br}(confirmadas / esperando el pago)',

  'c--metrics.total.donations.charged-back-amount': 'Valor total de devolución de las donaciones colectadas hasta ahora:',
  'c--metrics.total.donations.refunded-amount': 'Valor total de reembolso de las donaciones colectadas hasta ahora:',
  'c--metrics.total.donations.refused-amount': 'Valor total de reembolso de las donaciones colectadas hasta ahora:',

    // page community report
    // filepath: /routes/admin/authenticated/sidebar/community-settings/report/page.js
    // routepath: /community/report
  'page--community-report.title.metrics': 'Métricas',
  'page--community-report.title.reports': 'Reportes',

  'page--community-report.section-button.donation.title': 'REPORTE DE DONACIONES',
  'page--community-report.section-button.donation.helper-text': 'Haz click en el botón de abajo para descargar el reporte con datos de todas las donaciones hechas en tu comunidad',
  'page--community-report.section-button.donation.text': 'Descargar',

  'page--community-report.section-button.actions.title': 'REPORTE DE ACCIONES',
  'page--community-report.section-button.actions.helper-text': 'Haz click en el botón de abajo para descargar el reporte con datos de todas las acciones hechas en tu comunidad',
  'page--community-report.section-button.actions.text': 'Descargar',

  'page--community-report.section-button.activists.title': 'REPORTE DE ACTIVISTAS',
  'page--community-report.section-button.activists.helper-text': 'Haz click en el botón de abajo para descargar el reporte con datos de todas las personas que han actuado en tu comunidad',
  'page--community-report.section-button.activists.text': 'Descargar',

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
  'components.navigation--sidebar.community-settings.item.info': 'Comunidad',
  'components.navigation--sidebar.community-settings.item.metrics': 'Datos',
  'components.navigation--sidebar.community-settings.item.domains': 'Dominios',

  'components.navigation--sidebar.mobilization-settings.item.launch': 'Publicar página',
  'components.navigation--sidebar.mobilization-settings.item.launched': 'Página publicada',
  'components.navigation--sidebar.mobilization-settings.item.edit': 'Editar página',
  'components.navigation--sidebar.mobilization-settings.item.add-block': 'Agregar bloque',
  'components.navigation--sidebar.mobilization-settings.item.open-at-new-tab': 'Visualizar',
  'components.navigation--sidebar.mobilization-settings.item.config': 'Configuraciones de la página',

  'components.navigation--sidebar.footer.account': 'Tu cuenta',
  'components.navigation--sidebar.footer.sign-out': 'Salir',

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
  'components.navigation--sidenav.config': 'Comunidad',
  'components.navigation--sidenav.change-community': 'Modificar',

  // page mobilizations list
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-list/page.js
  // routepath: /mobilizations
  'page--mobilizations-list.page-header.title': 'Tus páginas',
  'page--mobilizations-list.more-menu-action.open': 'Abrir página',
  'page--mobilizations-list.more-menu-action.create-template': 'Crear plantilla',
  'page--mobilizations-list.more-menu-action.archived': 'Archivar',
  'page--mobilizations-list.more-menu-action.active': 'Activar',

  // component mobilizations page header
  // filepath: /client/mobilizations/components/page-header.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  'mobilizations.components--page-header.button.text': 'Nueva página',
  'mobilizations.components--page-header.tabs.actives': 'Activas',
  'mobilizations.components--page-header.tabs.templates': 'Plantillas',
  'mobilizations.components--page-header.tabs.archived': 'Archivadas',

  // component mobilizations list item: name
  // filepath: /client/mobilizations/components/list/items/name/index.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  //   - /mobilizations/:mobilization_id/templates/create
  'mobilizations.components--list.items.name.header.text': 'Nombre',

  // component mobilizations list item: created at
  // filepath: /client/mobilizations/components/list/items/created-at.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  //   - /mobilizations/:mobilization_id/templates/create
  'mobilizations.components--list.items.created-at.header.text': 'Creada en',

  // component mobilizations list item: users
  // filepath: /client/mobilizations/components/list/items/users.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  'mobilizations.components--list.items.users.header.text': 'Acciones',

  // component mobilizations list item: fund raising
  // filepath: /client/mobilizations/components/list/items/fund-raising.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  'mobilizations.components--list.items.fund-raising.header.text': 'Recaudación',
  'mobilizations.components--list.items.fund-raising.currency': 'R$',

  // component mobilizations list item: fund raising
  // filepath: /client/mobilizations/components/list/items/copy-number.js
  // routepath:
  //   - /mobilizations/templates/list
  'mobilizations.components--list.items.copy-number.header.text': 'Núm. Copias',

  // component mobilizations page tab layout
  // filepath: /client/mobilizations/components/page-tab-layout.js
  // routepath:
  //   - /mobilizations/new
  //   - /mobilizations/:mobilization_id/templates/choose
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  'mobilizations.components--page-tab-layout.title': 'Nueva página',
  'mobilizations.components--page-tab-layout.tabs.goal': 'Información',
  'mobilizations.components--page-tab-layout.tabs.templates': 'Modelo',

  // page mobilizations new
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-new/page.js
  // routepath: /mobilizations/new
  'page--mobilizations-new.title': '¿Cuál es el objetivo de tu página?',
  'page--mobilizations-new.footer': '¡Tranquilo! Puedes actualizar estos campos en las configuraciones de tu página cuando quieras ;)',

  // component mobilizations mobilization basics form
  // filepath: /client/mobilizations/components/mobilization-basics-form.js
  // routepath:
  //   - /mobilizations/new
  //   - /mobilizations/:mobilization_id/basics
  'mobilizations.components--basics-form.name.label': 'Nombre',
  'mobilizations.components--basics-form.name.placeholder': 'Ejm: Acción contra PEC 181',
  'mobilizations.components--basics-form.name.validation.required': 'Inserta el nombre de la página',
  'mobilizations.components--basics-form.name.validation.max-length': 'Oops, el nombre que escogiste está demasiado largo...',
  'mobilizations.components--basics-form.slug.label': 'Identificador de la página',
  'mobilizations.components--basics-form.slug.helper-text': "El identificador (o 'slug') es usado para referenciar la página - como en el dominio patrón de BONDE, por ejemplo: {example}",
  'mobilizations.components--basics-form.slug.helper-example': 'Ejm: 123-slug-que-escojas',
  'mobilizations.components--basics-form.slug.validation.required': 'Ingrese el identificar de la página',
  'mobilizations.components--basics-form.slug.validation.max-length': 'Oops, tu identificador está demasiado largo...',
  'mobilizations.components--basics-form.goal.label': 'Objetivo',
  'mobilizations.components--basics-form.goal.placeholder': '¿Qué impacto quieres generar al publicar esta página?',
  'mobilizations.components--basics-form.goal.validation.required': 'Inserta el objetivo de la página',
  'mobilizations.components--basics-form.goal.validation.max-length': 'Oops, te excediste del límite de caracteres...',

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
  'components--control-buttons.cancel': 'Regresar',
  'components--control-buttons.input.value.default': 'Próxima parada',
  'components--control-buttons.input.value.saving': 'Guardando...',

  // page mobilizations templates choose
  // filepath: /routes/admin/authenticated/sidebar/templates-choose/page.js
  // routepath: /mobilizations/:mobilization_id/templates/choose
  'page--mobilizations.templates-choose.title': '¿Cómo quieres comenzar?',
  'page--mobilizations.templates-choose.browsable-list-item.blank': 'Crear página desde cero',
  'page--mobilizations.templates-choose.browsable-list-item.templates-custom': 'Usar una plantilla',
  'page--mobilizations.templates-choose.browsable-list-item.templates-global': 'Plantillas globales',

  // component mobilizations templates selectable list
  // filepath: /client/mobilizations/templates/components/template-selectable-list.js
  // routepath:
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  'templates.components--selectable-list.filterable-search-bar.placeholder': 'Buscar plantilla',
  'templates.components--selectable-list.empty-list-text': 'Oops, no existe ninguna plantilla con ese nombre...',
  'templates.components--selectable-list.button.back': 'Regresar',
  'templates.components--selectable-list.button.next': 'Próxima parada',

  // page mobilizations templates choose custom
  // filepath: /routes/admin/authenticated/sidebar/templates-choose-custom/page.js
  // routepath: /mobilizations/:mobilization_id/templates/choose/custom
  'page--mobilizations.templates-choose-custom.title': 'Tus plantillas',

  // page mobilizations templates choose global
  // filepath: /routes/admin/authenticated/sidebar/templates-choose-global/page.js
  // routepath: /mobilizations/:mobilization_id/templates/choose/global
  'page--mobilizations.templates-choose-global.title': 'Plantillas globales',

  // component mobilizations settings menu
  // filepath: /client/mobilizations/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/sharing
  'mobilizations.components--settings-menu.title': 'Configuraciones de tu página',
  'mobilizations.components--settings-menu.tabs.info': 'Información',
  'mobilizations.components--settings-menu.tabs.sharing': 'Compartir',
  'mobilizations.components--settings-menu.tabs.metrics': 'Métricas',
  'mobilizations.components--settings-menu.tabs.domain': 'Dominio',

  // page mobilizations settings analytics
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-analytics/page.js
  // routepath: /mobilizations/:mobilization_id/analytics
  'page--mobilizations-analytics.first-paragraph': '¿Quieres acceder a datos específicos? ¿Cuántos accesos diarios recibe tu BONDE? ¿De dónde vienen? ¿Cuántos activistas están en este momento en línea en tu BONDE? Puedes hacerle seguimiento a esas y muchas otras métricas más conectando tu página a una cuenta de Google Analytics :)',
  'page--mobilizations-analytics.second-paragraph': 'Te explicamos cómo:',
  'page--mobilizations-analytics.ol.create-analytics-account': 'Primero, Crea una cuenta en Google Analytics {analyticsLink}',
  'page--mobilizations-analytics.ol.create-analytics-account.link': 'haciendo click aquí',
  'page--mobilizations-analytics.ol.keep-up-with': 'Obtén tu ID de seguimiento en Google Analytics. La ID es un código que comienza siempre con las letras UA y que podrás ver después de crear tu cuenta.',
  'page--mobilizations-analytics.ol.paste-ga-code': 'Copia la ID de seguimiento y pégala en el campo de acá abajo:',
  'page--mobilizations-analytics.ol.form.ga-code.label': 'ID de seguimiento',
  'page--mobilizations-analytics.ol.done': '¡Listo! Ya puedes hacerle seguimiento a las estadísticas de tu página en Google Analytics :)',

  // page mobilizations settings analytics (connected)
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-analytics/page.connected.js
  // routepath: /mobilizations/:mobilization_id/analytics
  'page--mobilizations-analytics.ol.form.ga-code.validation.invalid.ga-code.format': 'Oops, ID inválida :/',

  // page block create
  // filepath: /routes/admin/authenticated/sidebar/blocks-create/page.js
  // routepath: /mobilizations/:mobilization_id/blocks/create
  'page--block-create.title': 'Agregando un bloque de contenido',
  'page--block-create.tabs.blank-blocks': 'Configuraciones',
  'page--block-create.helper-text': 'Aquí, debes escoger el layout de las columnas y la imagen/el color de fondo de tu bloque. Recuerda que en cada columna vas a poder agregar una herramienta diferente - contenido, presión, crowdfunding o formulario - y después puedes organizar y reorganizar los bloques como quieras, al final, ¡este BONDE es tuyo! :)',
  'page--block-create.type.label': 'Layout del bloque',
  'page--block-create.background.label': 'Fondo del bloque',
  'page--block-create.background.image.placeholder.text': 'También puedes seleccionar una imagen de fondo :)',
  'page--block-create.button-add.text': 'Crear bloque',

  // page mobilizations domain
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-domain/page.js
  // routepath: /mobilizations/:mobilization_id/customDomain
  'page--mobilizations-domain.form-domain.success-message': '¡La información de tu dominio fue guardada exitosamente!',

  // component mobilizations form domain
  // filepath: /client/mobilizations/components/form-domain.js
  // routepath:
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/launch
  'mobilizations.components--form-domain.helper-text-first-line': "¡Estamos en la recta final! Para publicar tu página, tienes que registrar aquí el dominio que quieres redirgir hacia ella. Esa será la 'direccion' de tu página para el público ;)",
  'mobilizations.components--form-domain.helper-text-second-line': 'Si ya registraste dominios principales en las configuraciones de la comunidad, solo tienes que elegir a continuación la opción que prefieras.',
  'mobilizations.components--form-domain.helper-text-third-line': '¿Quieres registrar un dominio principal? {link}.',
  'mobilizations.components--form-domain.helper-text-third-line.link': '¡Haz click aquí!',

  'mobilizations.components--form-domain.create-domain-text.first-line': 'Oops, todavía no tienes dominios principales registrados en la comunidad... si quieres hacerlo, {link}.',
  'mobilizations.components--form-domain.create-domain-text.first-line.link': 'haz click aquí',
  'mobilizations.components--form-domain.create-domain-text.second-line': 'También puedes usar un dominio externo para registrarlo como dirección de esta página, solo tienes que seleccionar la opción de abajo ;)',

  'mobilizations.components--form-domain.basic.header-toggle.use-existing-domain': 'Crear un subdominio',
  'mobilizations.components--form-domain.basic.helper-text': 'Abajo, escoge el dominio principal que quieres usar y llena el campo con el subdominio que quieras:',
  'mobilizations.components--form-domain.basic.form.subdomain.label': 'Subdominio',
  'mobilizations.components--form-domain.basic.form.subdomain.placeholder': 'nombredelapagina',
  'mobilizations.components--form-domain.basic.form.domain.label': 'Dominio principal',
  'mobilizations.components--form-domain.basic.form.domain.button.choice': 'Escoge...',

  'mobilizations.components--form-domain.root.header-toggle.use-root-domain': 'Usar un dominio principal',
  'mobilizations.components--form-domain.root.helper-text': 'Escoge el dominio principal (o sea, ya registrado en las configuraciones de tu comunidad) que quieras usar como dirección de tu página:',

  'mobilizations.components--form-domain.advanced.header-toggle': 'Redirigir hacia un dominio externo',
  'mobilizations.components--form-domain.advanced.helper-text': 'Si quieres usar un dominio que has comprado pero que nos registrado aquí en tu comunidad, ¡todo bien! Solo tienes que llenar el campo de abajo y seguir las indicaciones:',
  'mobilizations.components--form-domain.advanced.form.external-domain.label': 'Dominio externo',
  'mobilizations.components--form-domain.advanced.form.external-domain.placeholder': 'midominio.com.br',

  'mobilizations.components--form-domain.cname-table.helper-text': '{strong}: ahora que ya escogiste un dominio externo, todavía tienes que configurar ese dominio en el servidor en que lo registraste para que la dirección sea redirigida a tu página. Para eso, vas a necesitar los datos siguientes:',
  'mobilizations.components--form-domain.cname-table.helper-text.strong': 'Próximo paso:',
  'mobilizations.components--form-domain.cname-table.header.name': 'Nombre',
  'mobilizations.components--form-domain.cname-table.header.record-type': 'Tipo',
  'mobilizations.components--form-domain.cname-table.header.data': 'Dados',
  'mobilizations.components--form-domain.cname-table.footer.helper-text': 'Si tuvieras alguna duda sobre cómo hacer esto, dale una mirada a nuestro FAQ, {link}.',
  'mobilizations.components--form-domain.cname-table.footer.helper-text.link': 'aquÍ',

  // component mobilizations form domain (connected)
  // filepath: /client/mobilizations/components/form-domain.connected.js
  // routepath:
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/launch
  'mobilizations.components--form-domain.validation.required': 'Campo obligatorio',
  'mobilizations.components--form-domain.validation.subdomain.required-domain': 'Campo obligatorio',
  'mobilizations.components--form-domain.validation.subdomain.required': 'Campo obligatorio',
  'mobilizations.components--form-domain.validation.subdomain.invalid': '¡Oops! Subdominio inválido...',
  'mobilizations.components--form-domain.validation.external-domain.invalid': '¡Oops! Dominio inválido...',

  // component mobrender mobilization
  // filepath: /client/mobrender/components/mobilization.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'mobrender.components--mobilization.footer.slogan': 'Hecho para movilizar. Hecho con',
  'mobrender.components--mobilization.add-block-content': 'Agregar bloque de contenido',

  // component mobrender block config menu
  // filepath: /client/mobrender/components/block-config-menu.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--block-config-menu.item.duplicate': 'Duplicar',
  'mobrender.components--block-config-menu.item.change-background': 'Modificar fondo',
  'mobrender.components--block-config-menu.item.toggle-visibility.show': 'Mostrar',
  'mobrender.components--block-config-menu.item.toggle-visibility.hide': 'Esconder',
  'mobrender.components--block-config-menu.item.remove': 'Eliminar',
  'mobrender.components--block-config-menu.item.remove.confirm': '¿Estás seguro/a de querer eliminar este bloque?',
  'mobrender.components--block-config-menu.item.move-up': 'Mover para arriba',
  'mobrender.components--block-config-menu.item.move-down': 'Mover para abajo',

  // component mobrender block change background
  // filepath: /client/mobrender/components/block-change-background.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--block-change-background.button.save': 'Guardar',
  'mobrender.components--block-change-background.button.cancel': 'Cancelar',

  // component mobrender block
  // filepath: /client/mobrender/components/block.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--block.hidden-tag': 'Bloque oculto',

  // component navigation navbar edition wrapper
  // filepath: /client/components/navigation/navbar/navbar-edition-wrapper.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'components.navigation--navbar-edition-wrapper.block': 'Bloque {position}',

  // component mobilizations form share
  // filepath: /client/mobilizations/components/form-share.js
  // routepath:
  //   - /mobilizations/:mobilization_id/launch
  //   - /mobilizations/:mobilization_id/sharing
  'mobilizations.components--form-share.facebook.title': 'Enlace para compartir',
  'mobilizations.components--form-share.facebook.helper-text': '¿Cómo quieres que tu página aparezca cuando compartas el enlace en las redes sociales? Esta es una oportunidad más para que todo esté exactamente como lo quieras. Abajo, tienes que escoger la imagen, el título y el subtítulo para compartir.',
  'mobilizations.components--form-share.facebook.fb.image.helper-text': 'Usa una imagen de 470x270 pixeles, así encaja perfecto :)',
  'mobilizations.components--form-share.facebook.fb.image.link': 'Sepa más',
  'mobilizations.components--form-share.facebook.form.share-image.label': 'Imagen',
  'mobilizations.components--form-share.facebook.form.share-title.label': 'Título',
  'mobilizations.components--form-share.facebook.form.share-title.placeholder': 'Un título bien claro que transmita el objetivo de tu página',
  'mobilizations.components--form-share.facebook.form.share-description.label': 'Subtítulo',
  'mobilizations.components--form-share.facebook.form.share-description.placeholder': 'Usa este espacio para completar la información del título y comprometer el público',

  'mobilizations.components--form-share.twitter.title': 'Twitter',
  'mobilizations.components--form-share.twitter.helper-text': 'Si quieres, también puedes dejar listo un “tweet patrón” para que cuando alguien comparta ya sepa qué decir. Solo tienes que ponerlo acá abajo:',
  'mobilizations.components--form-share.twitter.form.share-text.label': 'Texto patrón para el tweet',
  'mobilizations.components--form-share.twitter.form.share-text.placeholder': '¡Inserta una frase que llame a otras personas a comprometerse con tu página!',

  // page mobilizations launch
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-launch/page.js
  // routepath: /mobilizations/:mobilization_id/launch
  'page--mobilizations-launch.title': 'Publicando tu página',
  'page--mobilizations-launch.steps.form-domain.title': '1ª parada: dirección de la página',
  'page--mobilizations-launch.steps.form-share.title': '2ª parada: información para compartir',
  'page--mobilizations-launch.steps.done.title': '¡Bien! Tu página fue publicada :)',
  'page--mobilizations-launch.steps.done.helper-text': 'En una nueva pestaña, ingresa la dirección/dominio que registraste aquí para asegurarte de que ya se lanzó la página. Si todavía no lo está, verifica que hayas registrado los dominios correctamente. ¿Todo en orden? Entonces solo debes esperar a que se propague por el Internet :)',
  'page--mobilizations-launch.steps.done.button.open': 'Visualizar página',
  'page--mobilizations-launch.button.saving': 'Guardando...',
  'page--mobilizations-launch.button.launch': 'Publicar página',
  'page--mobilizations-launch.button.next': 'Próxima parada',
  'page--mobilizations-launch.form-share.validation.required': 'Obligatorio',

  // page mobilizations launch end
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-launch-end/page.js
  // routepath: /mobilizations/:mobilization_id/launch/end
  'page--mobilizations-launch-end.heading.all-done': '¿Todo en orden?',
  'page--mobilizations-launch-end.heading.just-launch': '¡Ahora solo tienes que lanzarla y compartir tu página con el mundo!',
  'page--mobilizations-launch-end.title': 'Llegó la hora',
  'page--mobilizations-launch-end.button': 'Publicar página',

  // page templates list
  // filepath: /routes/admin/authenticated/sidebar/templates-list/page.js
  // routepath: /mobilizations/templates/list
  'page--templates-list.header.title': 'Tus plantillas',
  'page--templates-list.empty-list.no-template': 'Tu comunidad todavía no tiene ninguna plantilla...',
  'page--templates-list.empty-list.create-one': 'Pero puedes crear una a partir de una página.',
  'page--templates-list.empty-list.mobilization-list': 'Lista de páginas',
  'page--templates-list.more-menu-action.remove.text': 'Eliminar',
  'page--templates-list.more-menu-action.remove.confirm': '¿Estás seguro/a de querer eliminar esta plantilla? Una vez hecha, no será posible deshacer esta acción.',

  // page templates create
  // filepath: /routes/admin/authenticated/sidebar/templates-create/page.js
  // routepath: /mobilizations/:mobilization_id/templates/create
  'page--templates-create.header.title': 'Crea una plantilla a partir de la página',
  'page--templates-create.form.name.label': 'Nombre de tu plantilla',
  'page--templates-create.form.name.placeholder': 'Para crowdfundings',
  'page--templates-create.form.goal.label': 'Descripción',
  'page--templates-create.form.goal.placeholder': 'Escribe un texto corto explicando para qué sirve la plantilla que estás creando. Ejm. plantilla para páginas de crowdfunding',

  // page templates create (connected)
  // filepath: /routes/admin/authenticated/sidebar/templates-create/page.connected.js
  // routepath: /mobilizations/:mobilization_id/templates/create
  'page--templates-create.form.validation.required': 'Campo obligatorio',

  // component donation widget settings menu
  // filepath: /client/mobilizations/widgets/__plugins__/donation/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  'donation.components--settings-menu.title': 'Configuraciones de la herramienta',
  'donation.components--settings-menu.tabs.adjusts': 'Ajustes',
  'donation.components--settings-menu.tabs.autofire': 'Mensaje de agradecimiento',
  'donation.components--settings-menu.tabs.post-action': 'Post-acción',
  'donation.components--settings-menu.tabs.info': 'Configuraciones',

  // page donation widget
  // filepath: /routes/admin/authenticated/sidebar/widgets-donation-settings/donation/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/donation
  'page--donation-widget.form.donation-value-title': 'Haz click para definir este valor como patrón.',
  'page--donation-widget.form.submit-button': 'Guardar',
  'page--donation-widget.form.success-message': '¡Listo! Tus configuraciones fueron guardadas exitosamente :)',
  'page--donation-widget.form.payment-type.label': 'Tipo de crowdfunding',
  'page--donation-widget.form.payment-type.unique': 'Donación única',
  'page--donation-widget.form.payment-type.recurring': 'Donación recurrente',
  'page--donation-widget.form.payment-type.users-choice': 'Dejar que el usuario escoja',
  'page--donation-widget.form.payment-interval.label': 'Intervalo da frecuencia',
  'page--donation-widget.form.payment-interval.monthly': 'Mensual',
  'page--donation-widget.form.payment-interval.semiannually': 'Semestral',
  'page--donation-widget.form.payment-interval.annually': 'Anual',
  'page--donation-widget.form.goal.label': 'Meta de la campaña',
  'page--donation-widget.form.goal.placeholder': 'Ejm.: 50000',
  'page--donation-widget.goal-date-limit.label': 'Plazo de recaudación',
  'page--donation-widget.goal-date-limit.placeholder': 'Ejm.: DD/MM/AAAA',
  'page--donation-widget.form.donation-default-value.label': 'Valores de las donaciones',
  'page--donation-widget.form.donation-default-value.helper-text': 'Puedes escoger hasta 5 valores en cada herramienta de crowdfunding - pero puedes tener más de una herramienta por página ;) Recuerda: coloca únicamente números enteros (Ejm.: 50)',
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
  'page--donation-widget.form.default-value.radio.text': 'Patrón',
  'page--donation-widget.form.default-value.helper-text': '*todos los valores son en reales, BONDE todavía no procesa transacciones en otras monedas...',
  'page--donation-widget.form.donation-title.label': 'Título',
  'page--donation-widget.form.donation-title.placeholder': 'Ejm: ¡Escoge un valor y contribuye ahora!',
  'page--donation-widget.form.main-color.label': 'Color',
  'page--donation-widget.form.main-color.helper-text': 'Puedes escoger el color en la cajita de abajo o insertar el valor que quieras en HEX - por ejemplo: #DC3DCE.',
  'page--donation-widget.form.button-text.label': 'Texto del botón',
  'page--donation-widget.form.button-text.placeholder': 'Ejm.: ¡Donar ahora!',
  'page--donation-widget.form.payment-method.label': '¿Quieres habilitar el pago por boleto?',
  'page--donation-widget.form.payment-method.helper-text': 'El pago por boleto sólo está disponible para donaciones únicas. Cada boleto pagado tendrá un costo adicional de R $ 3,00.',
  'page--donation-widget.form.payment-method.radio.yes': 'Sí',
  'page--donation-widget.form.payment-method.radio.no': 'No',
  'page--donation-widget.form.bank-account.label': 'Cuenta bancaria',
  'page--donation-widget.form.bank-account.helper-text': 'Esta campaña está asociada a la cuenta bancaria registrada en las configuraciones de esta comunidad. El valor recaudado será transferido a la cuenta en la fecha que hayas registrado allí ;)',

  // page donation widget (connected)
  // filepath: /routes/admin/authenticated/sidebar/widgets-donation-settings/donation/page.connected.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/donation
  'page--donation-widget.form.validation.invalid': 'Oops, formato inválido...',
  'page--donation-widget.form.validation.button-text.required': 'Inserta el texto del botón',
  'page--donation-widget.form.validation.button-text.max-length': 'Has llegado al límite de caracteres...',
  'page--donation-widget.form.validation.goal.format': 'Inserta el valor en este formato: 1000',
  'page--donation-widget.form.validation.goal-date-limit.format': 'Inserta la fecha en este formato: DD/MM/AAAA',
  'page--donation-widget.form.validation.goal-date-limit.invalid-date': 'Fecha inválida.',
  'page--donation-widget.form.validation.goal-date-limit.date-must-be-higher': 'Oops, ¡tu plazo ya expiró! Escoge otra fecha',

  // component widget autofire
  // filepath: /client/mobilizations/widgets/components/form-autofire.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  'widgets.components--form-autofire.form.submit-button': 'Guardar',
  'widgets.components--form-autofire.form.success-message': '¡Mensaje de agradecimiento configurado exitosamente!',
  'widgets.components--form-autofire.form.sender-name.label': 'Nombre del/de la remitente',
  'widgets.components--form-autofire.form.sender-name.placeholder': 'Es el nombre que aparecera como remitente del mensaje de agradecimiento.',
  'widgets.components--form-autofire.form.sender-email.label': 'Correo electrónico del/de la remitente',
  'widgets.components--form-autofire.form.sender-email.placeholder': 'Es el correo electrónico del cual serán enviados los mensajes de agradecimiento.',
  'widgets.components--form-autofire.form.sender-email.validation.invalid-email-format': 'Oops, correo electrónico inválido...',
  'widgets.components--form-autofire.form.email-subject.label': 'Asunto del mensaje',
  'widgets.components--form-autofire.form.email-subject.placeholder': 'Define el asunto del mensaje de agradecimento.',
  'widgets.components--form-autofire.form.email-text.label': 'Texto del correo electrónico',
  'widgets.components--form-autofire.form.email-text.placeholder': 'Aquí tienes que escribir el texto que va en el cuerpo del mensaje de agradecimiento. Ejm. ¡Muchas gracias por apostar en la fuerza de la acción colectiva en redes¡ Tu participación es muy importante y, ahora, necesitamos tu ayuda para que más personas colaboren con esta movilización. Comparte en tus redes haciendo click en uno de los enlaces acá abajo. Un abrazo.',

  // component widget form finish message
  // filepath: /client/mobilizations/widgets/components/form-finish-message/index.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'widgets.components--form-finish-message.success-message': '¡Listo! Información guardada exitosamente :)',
  'widgets.components--form-finish-message.type.label': 'Tipo de mensaje',
  'widgets.components--form-finish-message.type.radio.share': 'Patrón',
  'widgets.components--form-finish-message.type.radio.custom': 'Personalizar',
  'widgets.components--form-finish-message.type.validation.required': 'Selecciona un tipo de mensaje ;)',
  'widgets.components--form-finish-message.share.whatsapp-text.label': 'Texto para WhatsApp',
  'widgets.components--form-finish-message.share.whatsapp-text.placeholder': 'Aquí puedes dejar listo un texto patrón. Así, cuando alguien comparta tu página por WhatsApp en la post-acción, ya tendrás una sugerencia sobre qué hablar :)',
  'widgets.components--form-finish-message.preview.label': 'Vista previa',
  'widgets.components--form-finish-message.custom.message.default': 'Haz click aquí para editar tu mensaje de post-acción.',

  // component share tell-a-friend
  // filepath: /client/components/share/tell-a-friend.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--tell-a-friend.text': '¡Comparte con tus amigos para aumentar nuestro impacto!',

  // component share facebook-share-button
  // filepath: /client/components/share/facebook-share-button.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--facebook-share-button.text': 'Compartir en Facebook',

  // component share twitter-share-button
  // filepath: /client/components/share/twitter-share-button.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--twitter-share-button.text': 'Compartir en Twitter',

  // component share whatsapp-share-button
  // filepath: /client/components/share/whatsapp-share-button.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--whatsapp-share-button.text': 'Compartir en WhatsApp',

  // page donation widget finish
  // filepath: /routes/admin/authenticated/sidebar/widgets-donation-settings/finish/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  'page--donation-widget-finish.form.success-message': '¡Listo! La información fue guardada exitosamente :)',

  // component donation widget tell-a-friend
  // filepath: /client/mobilizations/widgets/__plugins__/donation/components/donation-tell-a-friend.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - (public) /
  'donation.components--tell-a-friend.message': "Listo, ¡tu donación fue registrada¡ Si seleccionaste la opción 'boleto', dale una mirada a tu correo electrónico ya que el enlace te llegará allí ;) ",

  // config mobrender widgets
  // filepath: /client/mobrender/widgets/config.js
  // routepath: /mobilizations/:mobilization_id/edit
  'widgets.config--content.label': 'Contenido',
  'widgets.config--content.default': 'Haz click para editar la herramienta',
  'widgets.config--form.label': 'Formulario',
  'widgets.config--form.default': '¡Gracias por apostar en la fuerza de la acción colectiva! Tu participación es muy importante y, ahora, necesitamos tu ayuda para potenciar nuestro impacto. Comparte en tus redes sociales haciendo click en uno de los enlaces acá abajo.\n\nUn abrazo',
  'widgets.config--pressure.label': 'Presión',
  'widgets.config--pressure.default.title': 'Manda un correo electrónico a quien pueda tomar una decisión',
  'widgets.config--pressure.default.button-text': 'Mandar un correo electrónico',
  'widgets.config--donation.label': 'Crowdfunding',

  // component donation widget
  // filepath: /client/mobilizations/widgets/__plugins__/donation/components/__donation__/index.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'widgets.components--donation.default.button-text': 'Donar ahora',
  'widgets.components--donation.default.title-text': 'Haz click para editar la herramienta',
  'widgets.components--donation.period-label-options.month': 'Mes',
  'widgets.components--donation.period-label-options.halfyear': 'Semestre',
  'widgets.components--donation.period-label-options.year': 'Año',
  'widgets.components--donation.users-choice.recurring': 'Apoyar todo {periodLabelCurrent}',
  'widgets.components--donation.users-choice.unique': 'Donación puntual',
  'widgets.components--donation.reattempt.message.title': '¡Oops!',
  'widgets.components--donation.reattempt.message.text.line-01': 'Ocurrió un problema :(',
  'widgets.components--donation.reattempt.message.text.line-02': 'Haz click en el botón de abajo para intentar de nuevo.',
  'widgets.components--donation.reattempt.message.button.text': 'Nuevo intento',
  'widgets.components--donation.progress-bar.collected': 'recaudados',
  'widgets.components--donation.progress-bar.supports': `
    {totalDonations} {totalDonations, plural,
      one {apoyo}
      other {apoyo}
    }
  `,
  'widgets.components--donation.progress-bar.goal': 'Meta:',
  'widgets.components--donation.progress-bar.date.last-day': '¡último día!',
  'widgets.components--donation.progress-bar.date.last-days': '¡últimos días!',
  'widgets.components--donation.progress-bar.date.last-week': '¡última semana!',
  'widgets.components--donation.progress-bar.date.remaining': `
    faltam {goalDateRemaining} {goalDateRemaining, plural,
      one {día}
      other {días}
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
  'form-widget.components--settings-menu.title': 'Configuraciones de la herramienta',
  'form-widget.components--settings-menu.items.fields': 'Configuraciones',
  'form-widget.components--settings-menu.items.adjusts': 'Ajustes',
  'form-widget.components--settings-menu.items.autofire': 'Mensaje de agradecimiento',
  'form-widget.components--settings-menu.items.report': 'Reporte',
  'form-widget.components--settings-menu.items.post-action': 'Post-acción',

  // page form widget
  // filepath: /routes/admin/authenticated/sidebar/widgets-form-settings/form/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form
  'page--form-widget.form.success-message': '¡Listo! La herramienta fue configurada exitosamente :)',
  'page--form-widget.form.widget-title.label': 'Título',
  'page--form-widget.form.widget-title.placeholder': 'Ejm: Llena el formulario de acá abajo para firmar la petición.',
  'page--form-widget.form.button-text.label': 'Botón',
  'page--form-widget.form.button-text.placeholder': 'Define el texto del botón de confirmación del formulario.',
  'page--form-widget.form.counter-text.label': 'Contador',
  'page--form-widget.form.counter-text.placeholder': 'Define el texto que estará al lado del número de personas que se están movilizando.',

  // component data export
  // filepath: /client/mobilizations/widgets/components/data-export.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  'widgets.components--data-export.formated-export-at': '{date} a las {time}',
  'widgets.components--data-export.loading.message': 'Procesando...',
  'widgets.components--data-export.exported.message': 'Última exportación: {formatedExportAt}.',
  'widgets.components--data-export.export.label': 'Reporte de acciones',
  'widgets.components--data-export.export.helper-text': 'Haz click en el botón de abajo para descargar un informe con todos los datos captados por el formulario.',
  'widgets.components--data-export.export.button': 'Descargar',

  // action async widget data export
  // filepath: /client/mobrender/redux/action-creators/async-widget-data-export.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  'action--async-widget-data-export.no-data': 'Oops, no encontramos ningún dato para exportar...',

  // content widget
  // filepath: /client/mobilizations/widgets/__plugins__/content/components/__content__.js
  // routepath: /mobilizations/:mobilization_id/edit
  'c--content-widget.delete-widget.confirm.message': '¿Quieres eliminar la herramienta?',

  // slate editor implementation component
  // filepath: /client/mobilizations/widgets/__plugins__/content/components/editor-slate/index.js
  // routepath: /mobilizations/:mobilization_id/edit
  'c--editor-slate.button-save.text': 'Guardar',
  'c--editor-slate.button-cancel.text': 'Cancelar',
  'c--editor-slate.button-cancel.message': '¿Estás seguro/a de querer salir del modo edición? Tus modificaciones no serán guardadas.',

  // page form widget fields
  // filepath: /routes/admin/authenticated/sidebar/widgets-form-settings/fields/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  'page--form-widget-fields.add-button': 'Agregar un campo',
  'page--form-widget-fields.helper-text.still-empty': 'Aquí puedes agregar, eliminar y ordenar los campos de tu formulario de la manera que quieras :)',
  'page--form-widget-fields.helper-text.manage-fields': 'Aquí puedes agregar, eliminar y ordenar los campos de tu formulario de la manera que quieras :)',

  // component form widget
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/__form__.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'form-widget.components--form.default.title-text': 'Haz click para editar tu herramienta...',
  'form-widget.components--form.default.button-text': 'Enviar',

  // component form widget input
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/input.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  'form-widget.components--input.click-to-edit': 'Haz click para editar',
  'form-widget.components--input.field-dropdown.options.default': 'Selecciona...',
  'form-widget.components--input.field-greetings.title': 'Mensaje de éxito modificado para:',

  // component form widget input form
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/input-form.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  'form-widget.components--input-form.handle-remove.confirm': '¿Estás seguro/a de querer eliminar este campo?',
  'form-widget.components--input-form.handle-overlay-click.confirm': 'Al salir sin guardar perderás tus modificaciones... ¿aun así quieres salir?',
  'form-widget.components--input-form.field-title.label': 'Título del campo',
  'form-widget.components--input-form.field-title.placeholder': 'Ejm: Correo electrónico',
  'form-widget.components--input-form.field-helper-text.label': 'Texto de ayuda',
  'form-widget.components--input-form.field-helper-text.placeholder': 'Ejm: Inserta aquí tu correo electrónico',
  'form-widget.components--input-form.field-type.label': 'Tipo de campo',
  'form-widget.components--input-form.field-type.options.text': 'Texto',
  'form-widget.components--input-form.field-type.options.email': 'Correo electrónico',
  'form-widget.components--input-form.field-type.options.number': 'Número',
  'form-widget.components--input-form.field-type.options.dropdown': 'Dropdown &#9733;',
  'form-widget.components--input-form.field-type.options.greetings': 'Saludo &#9733;',
  'form-widget.components--input-form.field-required.label': 'Obligatorio',
  'form-widget.components--input-form.field-required.radio.yes.label': 'Sí',
  'form-widget.components--input-form.field-required.radio.no.label': 'No',
  'form-widget.components--input-form.button-move-up': 'Mover para arriba',
  'form-widget.components--input-form.button-move-down': 'Mover para abajo',
  'form-widget.components--input-form.button-remove': 'Eliminar',
  'form-widget.components--input-form.button-cancel': 'Cancelar',
  'form-widget.components--input-form.button-save.saving': 'Guardando...',
  'form-widget.components--input-form.button-save.default': 'Guardar',

  // component mobrender widget overlay
  // filepath: /client/mobrender/components/widget-overlay.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--widget-overlay.button.edit.title': 'Editar',
  'mobrender.components--widget-overlay.button.remove.title': 'Eliminar',

  // page form widget finish
  // filepath: /routes/admin/authenticated/sidebar/widgets-form-settings/finish/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  'page--form-widget-finish.success-message': '¡Listo! Configuraciones guardadas exitosamente :)',

  // component form widget tell a friend
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/form-tell-a-friend.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - (public) /
  'form-widget.components--tell-a-friend.message': '¡Listo! Tu acción fue registrada :)',

  // component pressure widget form
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/pressure-form/index.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'pressure-widget.components--pressure-form.validation.required': 'Campo obligatorio',
  'pressure-widget.components--pressure-form.email.validation.invalid-email-format': 'Correo electrónico inválido',
  'pressure-widget.components--pressure-form.email.validation.sender-is-target': 'El correo electrónico que estás intentando usar es uno de los objetivos de la herramienta...',
  'pressure-widget.components--pressure-form.phone.validation.ddd': 'Ingresa el código del país y el DDD con dos dígitos. Ejm: +5521',
  'pressure-widget.components--pressure-form.phone.validation.invalid': '¡Oops! Teléfono inválido...',
  'pressure-widget.components--pressure-form.phone.validation.caller-is-target': 'El teléfono que estás intentando usar es uno de los objetivos de la herramienta...',
  'pressure-widget.components--pressure-form.email.label': 'Correo electrónico',
  'pressure-widget.components--pressure-form.email.placeholder': 'Ingresa tu correo electrónico',
  'pressure-widget.components--pressure-form.phone.label': 'Teléfono',
  'pressure-widget.components--pressure-form.phone.placeholder': 'Ingresa tu teléfono. Ejm: +5511987654321',
  'pressure-widget.components--pressure-form.name.label': 'Nombre',
  'pressure-widget.components--pressure-form.name.placeholder': 'Ingresa tu nombre',
  'pressure-widget.components--pressure-form.lastname.label': 'Apellido',
  'pressure-widget.components--pressure-form.lastname.placeholder': 'Ingresa tu apellido',
  'pressure-widget.components--pressure-form.city.label': 'Ciudad',
  'pressure-widget.components--pressure-form.city.placeholder': 'Ingresa tu ciudad',
  'pressure-widget.components--pressure-form.subject.label': 'Asunto',
  'pressure-widget.components--pressure-form.body.label': 'Cuerpo del correo electrónico',
  'pressure-widget.components--pressure-form.phone-calls.ringing': 'Llamada en proceso...',
  'pressure-widget.components--pressure-form.phone-calls.retry': 'Llamar de nuevo',
  'pressure-widget.components--pressure-form.phone-calls.call': 'Llamar de nuevo',
  'pressure-widget.components--pressure-form.phone.how-it-works.title': '¿Cómo funciona?',
  'pressure-widget.components--pressure-form.phone.how-it-works.list-item-01': 'Estamos conectando con el objetivo...',
  'pressure-widget.components--pressure-form.phone.how-it-works.list-item-02': 'El momento que alguien conteste del otro lado, te llamaremos',
  'pressure-widget.components--pressure-form.phone.how-it-works.list-item-03': 'Cuando contestes, conectamos las llamadas',
  'pressure-widget.components--pressure-form.phone.how-it-works.list-item-04': 'Ahora te toca a tí, ¡hora de presionar!',
  'pressure-widget.components--pressure-form.phone.finish-and-share': 'Terminar y compartir',

  // component pressure widget settings menu
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'pressure-widget.components--settings-menu.title': 'Configuraciones de la herramienta',
  'pressure-widget.components--settings-menu.items.form': 'Ajustes',
  'pressure-widget.components--settings-menu.items.pressure-email': 'Configuraciones',
  'pressure-widget.components--settings-menu.items.autofire': 'Mensaje de agradecimiento',
  'pressure-widget.components--settings-menu.items.post-action': 'Post-acción',

  // page pressure widget
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/pressure-count.js
  // routepath: /mobilizations/:mobilization_id/edit
  'c--pressure-count.text.default': 'presiones hechas',

  // page pressure widget
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/pressure/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  'page--pressure-widget.success-message': '¡Listo! Configuraciones guardadas exitosamente :)',
  'page--pressure-widget.form.title-text.label': 'Título',
  'page--pressure-widget.form.title-text.placeholder': 'Haz click para editar tu herramienta...',
  'page--pressure-widget.form.button-text.label': 'Texto del botón',
  'page--pressure-widget.form.button-text.placeholder': 'Presionar',
  'page--pressure-widget.form.main-color.label': 'Color',
  'page--pressure-widget.form.show-counter.label': '¿Mostrar contador de presiones?',
  'page--pressure-widget.form.show-counter.radio.yes.label': 'Sí',
  'page--pressure-widget.form.show-counter.radio.no.label': 'No',
  'page--pressure-widget.form.counter-text.label': 'Texto del contador',
  'page--pressure-widget.form.counter-text.placeholder': 'presiones hechas',
  'page--pressure-widget.form.show-city-field.label': '¿Mostrar campo de ciudad?',
  'page--pressure-widget.form.show-city-field.radio.yes.label': 'Sí',
  'page--pressure-widget.form.show-city-field.radio.no.label': 'No',

  // page pressure widget (connected)
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/pressure/page.connected.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  'page--pressure-widget.form.validation.title-text.required': 'Campo obligatorio',
  'page--pressure-widget.form.validation.button-text.required': 'Campo obligatorio',

  // component widgets input tag
  // filepath: /client/mobilizations/widgets/components/input-tag.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  'widgets.components--input-tag.tags.label': 'Objetivos registrados ({targetsCount})',
  'widgets.components--input-tag.insert-tag.placeholder': 'Nombre del primer objetivo <primer@objetivo.com>\nNombre del segundo objetivo <segundo@objetivo.com>\nNombre del tercer objetivo <tercer@objetivo.com>\nNombre del cuarto objetivo <cuarto@objetivo.com>\nNombre del quinto objetivo <quinto@objetivo.com>\n...',
  'widgets.components--input-tag.button.remove-all': 'Eliminar todos',

  // page pressure widget email
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/email/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  'page--pressure-widget-email.success-message': '¡Listo! Configuraciones guardadas exitosamente :)',
  'page--pressure-widget-email.form.input-tag.label': 'Agregar objetivos',
  'page--pressure-widget-email.form.input-tag.validation.invalid-target-format': 'Oops, formato inválido... agrega el objetivo como te lo explicamos arriba ;)',
  'page--pressure-widget-email.form.input-tag.validation.type-email-registered': 'Parece que ya has registrado este objetivo para ser presionado...',
  'page--pressure-widget-email.form.input-tag.validation.type-phone-registered': 'Parece que ya has registrado este objetivo para ser presionado...',
  'page--pressure-widget-email.form.email-subject.label': 'Asunto del mensaje para los objetivos',
  'page--pressure-widget-email.form.email-body.label': 'Cuerpo del mensaje para los objetivos',
  'page--pressure-widget-email.form.disable-edit-field.label': '¿Deshabilitar la edición del asunto y del cuerpo del mensaje?',
  'page--pressure-widget-email.form.disable-edit-field.value.yes': 'Sí',
  'page--pressure-widget-email.form.disable-edit-field.value.no': 'No',

  'p--pressure-widget--input-tag.info.title': 'Cómo registrar objetivos',
  'p--pressure-widget--input-tag.info.text': 'El registro de objetivos es bien simple y puede ser de más de un objetivo a la vez. Tienes que separar los objetivos, en líneas distintas, y cada objetivo debe seguir el formato descrito abajo. Para registrar basta con presionsar {keyboardTrigger}. Y no te olvides de guardar después, haciendo click en el botón de la esquina superior derecha de la pantalla.',
  'p--pressure-widget--input-tag.info.item.target-format': 'Formato del objetivo: {format} (es obligatorio usar los caracteres {lt} y {gt} para agrupar el correo)',
  'p--pressure-widget--input-tag.info.item.target-format.example': 'Nombre <correoelectrónico@provedor.com>',
  'p--pressure-widget--input-tag.info.item.special-chars': 'Para ambos tipos de presión es obligatorio el uso de los caracteres {lt} y {gt} para agrupar el correo electrónico o teléfono',
  'p--pressure-widget--input-tag.info.item.sorting': 'Los objetivos serán exhibidos en orden aleatorio en el widget de presión. O sea, cada vez que se acceda a la movilización, el orden de exhibición será diferente',

  // page pressure widget email (connected)
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/email/page.connected.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  'page--pressure-widget-email.form.validation.required': 'Campo obligatorio',

  // page pressure widget finish
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/finish/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'page--pressure-widget-finish.success-message': '¡Listo! Configuraciones guardadas exitosamente :)',

  // component pressure widget tell a friend
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/pressure-tell-a-friend.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'pressure-widget--tell-a-friend.message': '¡Listo, tu presión fue enviada!',

  // component pressure widget: target list
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/target-list/index.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'pressure-widget--target-list.label.email': `
    La persona que vas a presionar ({targetsCount} {targetsCount, plural,
      one {objetivo}
      other {objetivos}
    })
  `,
  'pressure-widget--target-list.label.pressure': `
    Selecciona la persona que quieres presionar ({targetsCount} {targetsCount, plural,
      one {objetivo}
      other {objetivos}
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
  'p--activists-management.header.title': 'Tu comunidad',
  'p--activists-management.header.button.upload.text': 'Importar datos (.csv)',
  'p--activists-management.header.button.download.text': 'Exportar datos (.csv)',
  'p--activists-management.content.title': '{totalNumber} personas',
  'p--activists-management.content.button.tagging.text': 'Etiquetas',
  'p--activists-management.content.button.email.text': 'Correo electrónico',
  'p--activists-management.content.form-tagging.tags.placeholder': 'Digita etiquetas separadas por comas',
  'p--activists-management.content.form-tagging.button.text': 'Agregar etiquetas',
  'p--activists-management.content.form-tagging.success.message': 'Etiquetas agregadas exitosamente a {taggedNumber} personas',
  'p--activists-management.content.form-tagging.success.undo': 'Deshacer',
  'p--activists-management.content.activist-spotlight.title': 'Perfil seleccionado',
  'p--activists-management.content.activist-spotlight.email.label': 'Correo electrónico',
  'p--activists-management.content.activist-spotlight.phone.label': 'Teléfono',
  'p--activists-management.content.activist-spotlight.mobilizations.label': 'Páginas en las que actuó',
  'p--activists-management.content.activist-spotlight.tags.label': 'Etiquetas',
  'p--activists-management.content.activist-spotlight.form-tagging.button.text': 'Agregar',

  // component activists management filterable list
  // filepath: {incoming-for-v0.6.x release}
  'activists-management.c--filterable-list.activist.placeholder': '¿A quién estás buscando?',

  'activists-management.c--filterable-list.suggest.placeholder': 'Filtra por páginas o herramientas',
  'activists-management.c--filterable-list.suggest.operators.label': 'Operadores',
  'activists-management.c--filterable-list.suggest.operators.options.or.label': 'o',
  'activists-management.c--filterable-list.suggest.operators.options.and.label': 'y',
  'activists-management.c--filterable-list.suggest.segment.donations.label': 'Herramienta: crowdfunding',
  'activists-management.c--filterable-list.suggest.segment.pressures.label': 'Herramienta: presión',
  'activists-management.c--filterable-list.suggest.segment.gen-forms.label': 'Herramienta: formulario',
  'activists-management.c--filterable-list.suggest.segment.other-tags.label': 'Otras etiquetas',

  'activists-management.c--filterable-list.period.options.today': 'Hoy',
  'activists-management.c--filterable-list.period.options.last-week': 'Última semana',
  'activists-management.c--filterable-list.period.options.last-fortnight': 'Últimos 15 días',
  'activists-management.c--filterable-list.period.options.last-month': 'Últimos 30 días',
  'activists-management.c--filterable-list.period.options.last-quarter': 'Últimos 3 meses',
  'activists-management.c--filterable-list.period.options.last-year': 'Último año',
  'activists-management.c--filterable-list.period.options.always': 'Escoje un periodo',
  'activists-management.c--filterable-list.period.options.custom-period': 'Personalizar periodo',

  // Activists (CRM)
  // filepath: routes/admin/authenticated/sidebar/activists
  // route: /activists
  'routes.admin.sidebar.activists.container.title': 'Tu comunidad',
  'routes.admin.sidebar.activists.container.filter-placeholder': 'Filtra por páginas o herramientas',
  'routes.admin.sidebar.activists.container.empty-list': '¡Oops! Nadie corresponde a ese filtro :(',
  'routes.admin.sidebar.activists.container.counter': `{totalCount} {totalCount, plural,
    one {persona}
    other {personas}
  }`,
  'routes.admin.sidebar.activists.container.import-csv': 'Importar datos (.csv)',
  'routes.admin.sidebar.activists.container.export-csv': 'Exportar datos (.csv)',
  'routes.admin.sidebar.activists.import-csv.insertActivists.title.success': '¡Importación concluida exitosamente!',
  'routes.admin.sidebar.activists.import-csv.insertActivists.message.success': '{length} personas fueron incorporadas a tu comunidd.',
  'routes.admin.sidebar.activists.import-csv.insertActivists.title.fail': '¡Oops!',
  'routes.admin.sidebar.activists.import-csv.insertActivists.message.fail': '{error}',

  // createForm validations
  // path: client/storybook/forms/validate
  'createForm.validate.email': '¡Oops! Correo electrónico inválido...',
  'createForm.validate.required': 'Campo obligatorio',
  'createForm.validate.cnpj.length': 'CNPJ debe tener 14 dígitos',
  'createForm.validate.cnpj.invalid': '¡Oops! CNPJ inválido',
  'createForm.validate.cpf.length': 'CPF debe contener 11 dígitos',
  'createForm.validate.cpf.invalid': 'CPF inválido',
  // settingsForm
  // path: client/storybook/settings/forms
  'settingsForm.submitLabel.default': 'Guardar',
  'settingsForm.sucessMessage.default': 'Datos guardados exitosamente :)',

  // adjustmentsForms
  'adjustmentnsForm.validate.call_to_action.required': 'Inserta el título',
  'adjustmentnsForm.validate.button_text.required': 'Inserta el texto del botón',
  'adjustmentnsForm.validate.button_text.length': 'El límite de caracteres fue alcanzado.',
  'adjustments.form.successMessage': 'Formulário configurado com sucesso!',
  'adjustments.form.call-to-action.label': 'Título',
  'adjustments.form.call-to-action.placeholder': 'Ejm: Llena el formulario de acá abajo para firmar la petición.',
  'adjustments.form.button-text.label': 'Botón',
  'adjustments.form.button-text.placeholder': 'Define el texto del botón de confirmación del formulario.',
  'adjustments.form.count-text.label': 'Contador',
  'adjustments.form.count-text.placeholder': 'Define el texto que estará al lado del número de personas que se están movilizando.',
  'adjustments.form.count-text.helpBlock': 'El contador será mostrado se existir um texto definido.',
  'adjustments.form.main-color.label': 'Color',
  'adjustments.form.main-color.helpBlock': 'Puedes escoger el color en la cajita de abajo o insertar el valor que quieras en HEX - por ejemplo: #DC3DCE.',

  // FinishPostDonation
  'widgets.components--donation.finish-post-donation-messages.donation-ok': '¡MUCHAS GRACIAS! Su donación fue registrada :) Se procesará automáticamente una vez al mes, comenzando dentro de 31 días.',
  'widgets.components--donation.finish-post-donation-messages.not-now': '¡Está bien! Gracias por tu apoyo :)',
  'widgets.components--donation.finish-post-donation.value-list': '$ {value} / mes',
  'widgets.components--donation.finish-post-donation.no-action': 'No hay acción disponible',
  'widgets.components--donation.finish-post-donation.title-component': ' OBA! Su donación fue procesada :)',
  'widgets.components--donation.finish-post-donation.improve-impact-question': 'Usted acaba de apoyar la estructura básica del Mutirão Activista, pero para él alcanzar su potencial máximo vamos a necesitar contratar a una persona totalmente dedicada a apoyar a todos los que quieran crear sus campañas en el Panela de Presión. Con una pequeña donación recurrente, usted nos ayuda a contratar a esa persona!',
  'widgets.components--donation.finish-post-donation.improve-impact-solution': 'Haz tu contribución ahora',
  'widgets.components--donation.finish-post-donation.improve-impact-explanation': 'Su contribución se realizará automáticamente una vez al mes, a partir de 31 días.',
  'widgets.components--donation.finish-post-donation.support-every-month': 'APOYA CADA MES',
  'widgets.components--donation.finish-post-donation.not-now': 'AHORA NO',
  'widgets.components--donation.finish-post-donation-messages.tell-a-friend.text': 'Compartir con su galera para esparcir el Mutirão Activista por todos los rincones:'
}

