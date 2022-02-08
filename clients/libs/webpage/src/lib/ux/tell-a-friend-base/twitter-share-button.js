import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

const TwitterShareButton = ({ href, text, intl }) => {
  const handleClick = () => {
    // Optional Query params
    // via: twitter user to associate with the tweet
    // related: additional users related to the tweet comma-separated
    // hashtags: comma-separated list without #
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${href}`,
      intl.formatMessage({
        id: 'share.components--twitter-share-button.text',
        defaultMessage: 'Compartilhar no Twitter'
      }),
      'width=800,height=600'
    )
  }

  return (
    <button
      className='btn white h3 p3 col-12 caps h5 rounded'
      onClick={handleClick}
      style={{backgroundColor: '#3DD1F4'}}
    >
      <FormattedMessage
        id='share.components--twitter-share-button.text'
        defaultMessage='Compartilhar no Twitter'
      />
    </button>
  )
}

TwitterShareButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  intl: intlShape.isRequired
}

export default injectIntl(TwitterShareButton)
