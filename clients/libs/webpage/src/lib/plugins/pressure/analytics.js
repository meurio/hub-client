import AnalyticsBase from '../../analytics-base'

const PRESSURE_FILLED = {
  category: 'Pressão',
  action: 'Preenchimento Iniciado'
}

const PRESSURE_SAVED = {
  category: 'Pressão',
  action: 'Dados Salvos com Sucesso'
}

class Analytics extends AnalyticsBase {
  
  pressureIsFilled () {
    return this.sendEvent(PRESSURE_FILLED)
  }

  pressureSavedData () {
    return this.sendEvent(PRESSURE_SAVED)
  }
}

export default new Analytics()
