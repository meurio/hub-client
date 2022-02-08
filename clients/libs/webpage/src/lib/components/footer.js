import React from 'react'
import { BondeIcon } from './icons'
// TODO: Remover dependencia dos componentes de tradução
import { FormattedMessage } from 'react-intl'

const Footer = () => (
  <div id='footer' className='col-10 mx-auto'>
    <div className='col col-10'>
      <a
        href='http://www.bonde.org/?utm_source=footer-logo'
        style={{ 'color': '#000', 'textDecoration': 'none', 'lineHeight': '85px' }}
        target='_blank'
        rel='noopener noreferrer'
      >
        <FormattedMessage
          id='mobrender.components--mobilization.footer.slogan'
          defaultMessage='Feito pra causar. Feito com'
        />
        <strong> BONDE.</strong>
      </a>
    </div>
    <div className='col col-2'>
      <a
        href='http://www.bonde.org/?utm_source=footer-slogan'
        className='right my2'
        target='_blank'
        rel='noopener noreferrer'
      >
        <BondeIcon />
      </a>
    </div>
  </div>
)

export default Footer
