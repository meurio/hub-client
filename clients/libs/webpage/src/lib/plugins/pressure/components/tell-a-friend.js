import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { TellAFriendBase } from '../../../ux'

const PressureTellAFriend = ({ preview, mobilization, widget, ...props }) => (
  <TellAFriendBase
    preview={preview}
    mobilization={mobilization}
    widget={widget}
    message={
      <FormattedMessage
        id='pressure-widget--tell-a-friend.message'
        defaultMessage='Pressão enviada'
      />
    }
    {...props}
  />
)

PressureTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default PressureTellAFriend