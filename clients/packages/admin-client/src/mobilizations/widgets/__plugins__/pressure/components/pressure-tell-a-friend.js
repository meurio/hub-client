import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { TellAFriend } from 'components/share'

const PressureTellAFriend = ({ preview, mobilization, widget }) => (
  <TellAFriend
    preview={preview}
    mobilization={mobilization}
    widget={widget}
    message={
      <FormattedMessage
        id='pressure-widget--tell-a-friend.message'
        defaultMessage='Pressão enviada'
      />
    }
  />
)

PressureTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default PressureTellAFriend
