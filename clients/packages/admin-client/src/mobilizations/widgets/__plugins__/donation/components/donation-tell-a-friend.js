import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import * as paths from 'paths'
import { TellAFriend } from 'components/share'

const DonationTellAFriend = ({ preview, mobilization, widget }) => {
  return (
    <TellAFriend
      preview={preview}
      mobilization={mobilization}
      widget={widget}
      message={
        <FormattedMessage
          id='donation.components--tell-a-friend.message'
          defaultMessage='Oba, doação registrada! Sua doação é via boleto? Verifique seu email.'
        />
      }
      href={paths.mobilization(mobilization)}
    />
  )
}

DonationTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default DonationTellAFriend
