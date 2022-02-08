import AnalyticsBase from '../../analytics-base'

const DONATION_STARTED = {
  category: 'Doação',
  action: 'Escolheu Valor'
}

const DONATION_FINISHED = {
  category: 'Doação',
  action: 'Servidor Recebeu Dados'
}

class Analytics extends AnalyticsBase {
  

  donationSetValue () {
    return this.sendEvent(DONATION_STARTED)
  }

  donationFinishRequest (value) {
    return this.sendEvent({ ...DONATION_FINISHED, label: value })
  }
}

export default new Analytics()
