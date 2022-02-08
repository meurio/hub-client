import ReactGA from 'react-ga'

class AnalyticsBase {

  sendEvent (event) {
    return ReactGA.event(event)
  }
}

export default AnalyticsBase
