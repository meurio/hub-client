import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'
import { isMobile } from 'react-device-detect'

const WhatsAppShareButton = ({ whatsappText }) => {
  const baseUrl = isMobile ? 'whatsapp://' : 'https://api.whatsapp.com/'

  return (
    <a
      className={classnames('btn white h3 p3 col-12 caps h5 rounded border-box')}
      href={`${baseUrl}send?text=${encodeURIComponent(whatsappText)}`}
      style={{ backgroundColor: '#4CEC68', color: '#fff' }}
    >
      <FormattedMessage
        id='share.components--whatsapp-share-button.text'
        defaultMessage='Compartilhar no WhatsApp'
      />
    </a>
  )
}

WhatsAppShareButton.propTypes = {
  whatsappText: PropTypes.string
}

export default WhatsAppShareButton
