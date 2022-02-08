import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

const FacebookShareButton = ({ href, intl }) => {
  const handleClick = () => {
    window.open(
      `http://www.facebook.com/sharer.php?u=${href}`,
      intl.formatMessage({
        id: 'share.components--facebook-share-button.text',
        defaultMessage: 'Compartilhar no Facebook'
      }),
      'width=800,height=600'
    )
  }

  return (
    <button
      className='btn white h3 p3 col-12 caps h5 rounded'
      onClick={handleClick}
      style={{ backgroundColor: '#2D88ED' }}
    >
      <FormattedMessage
        id='share.components--facebook-share-button.text'
        defaultMessage='Compartilhar no Facebook'
      />
    </button>
  )
}

FacebookShareButton.propTypes = {
  href: PropTypes.string.isRequired,
  intl: intlShape.isRequired
}

export default injectIntl(FacebookShareButton)
