import AnalyticsBase from '../../analytics-base'

const FORM_FILLED = {
  category: 'Formulário',
  action: 'Preenchimento Iniciado'
}

const FORM_SAVED = {
  category: 'Formulário',
  action: 'Dados Salvos com Sucesso'
}

class Analytics extends AnalyticsBase {

  formIsFilled () {
    return this.sendEvent(FORM_FILLED)
  }

  formSavedData () {
    return this.sendEvent(FORM_SAVED)
  }
}

export default new Analytics()
