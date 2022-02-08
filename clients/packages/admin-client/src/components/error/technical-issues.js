import React, { Component } from 'react'

if (require('exenv').canUseDOM) {
  require('./technical-issues.scss')
}

class TechnicalIssues extends Component {
  render () {
    return (
      <div className='errors-technical-issues lg-col-9 sm-col-12'>
        <div className='container'>
          <div className='logo-icon' />
          <div className='scrollable'>
            <h1 className='blacker'>OLÁ :)</h1>
            <article>
              Parece que estamos tendo problemas técnicos na página que você está procurando…
            </article>
            <p className='contact link'>
              <span className='bold blacker'>Primeiro, certifique-se de que preencheu os campos da página corretamente. </span>
              Se o problema persistir, vamos dar nosso máximo para resolver e pedimos que tente entrar novamente daqui a pouco ; )
            </p>
            <p>Qualquer dúvida, pode falar com a gente pelo e-mail: <a href='mailto:contato@bonde.org?Subject=Problemas%20Técnicos' target='_blank' rel="noopener noreferrer">contato@bonde.org</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default TechnicalIssues
