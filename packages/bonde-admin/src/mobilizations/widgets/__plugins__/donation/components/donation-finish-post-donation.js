import React from 'react'
import { bool, object } from 'prop-types'

import { FinishPostDonation } from 'components/post-donation'

const DonationFinishPostDonation = ({ preview, mobilization, widget }) => {
  return (
    <FinishPostDonation
      preview={preview}
      mobilization={mobilization}
      widget={widget}
    />
  )
}

DonationFinishPostDonation.propTypes = {
  preview: bool,
  mobilization: object.isRequired,
  widget: object.isRequired
}

export default DonationFinishPostDonation
