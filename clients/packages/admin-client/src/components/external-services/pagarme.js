import React, { Component } from 'react'
import exenv from 'exenv'

class Pagarme extends Component {
  componentWillMount () {
    if (exenv.canUseDOM) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://assets.pagar.me/js/pagarme.js'
      script.async = true
      document.body.appendChild(script)
    }
  }

  render () {
    return <span />
  }
}

export default Pagarme
