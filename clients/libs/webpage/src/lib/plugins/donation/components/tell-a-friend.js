import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import { TellAFriendBase } from '../../../ux'

const DonationTellAFriend = ({ preview, mobilization, widget, ...props }) => {
  return (
    <TellAFriendBase
      preview={preview}
      mobilization={mobilization}
      widget={widget}
      message={
        <FormattedMessage
          id='donation.components--tell-a-friend.message'
          defaultMessage='Oba, doação registrada! Sua doação é via boleto? Verifique seu email.'
        />
      }
      {...props}
    />
  )
}

DonationTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default DonationTellAFriend
