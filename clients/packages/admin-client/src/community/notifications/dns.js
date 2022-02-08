export const checkDNSSuccess = intl => ({
  title: intl.formatMessage({
    id: 'notify.community.check--dns--success.title',
    defaultMessage: 'Uhuu!'
  }),
  status: 'success',
  message: intl.formatMessage({
    id: 'notify.community.check--dns--success.text',
    defaultMessage: (
      'Os servidores DNS foram sincronizados, ' +
      'agora você pode configurar seu e-mail e outros ' +
      'serviços, assim como escolher o domínio da sua ' +
      'mobilização.'
    )
  }),
  dismissAfter: 7000,
  dismissable: true,
  closeButton: false
})

export const checkDNSFailure = intl => ({
  title: intl.formatMessage({
    id: 'notify.community.check--dns--failure.title',
    defaultMessage: 'Ooops!'
  }),
  status: 'error',
  message: intl.formatMessage({
    id: 'notify.community.check--dns--failure.text',
    defaultMessage: (
      'A alteração de servidores DNS ' +
      'ainda está pendente. Você pode tentar ' +
      'de novo em alguns minutos.'
    )
  }),
  dismissAfter: 0,
  dismissable: true,
  closeButton: false
})

export const addHostedZoneFailure = intl => ({
  title: intl.formatMessage({
    id: 'notify.community.add--dns-hosted-zone--failure.title',
    defaultMessage: 'Ooops!'
  }),
  status: 'error',
  message: intl.formatMessage({
    id: 'notify.community.add--dns-hosted-zone--failure.text',
    defaultMessage: (
      'Ocorreu um erro no servidor, ' +
      'verifique se este domínio já não foi inserido.'
    )
  }),
  dismissAfter: 0,
  dismissable: true,
  closeButton: false
})
