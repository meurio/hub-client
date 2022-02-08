import React from 'react'
import PropTypes from 'prop-types'
import { FinishPostDonation } from 'bonde-webpage/lib/plugins/donation/components'

const imageUrl = require('exenv').canUseDOM ? require('../share/check-mark-image.png') : null

const FinishPostDonationComponent = ({
  mobilization,
  widget,
}) => {
  return (
    <div className='center p3 bg-white darkengray rounded'>
      <FinishPostDonation
        mobilization={mobilization}
        widget={widget}
        preview
        onClickDonation={() => null}
        defaultSelectedValue={1}
        finishDonationComponent={FinishPostDonation}
        imageUrl={imageUrl}
      />
    </div>
  )
}

FinishPostDonationComponent.propTypes = {
  preview: PropTypes.bool,
  widget: PropTypes.object,
  mobilization: PropTypes.object,
  href: PropTypes.string,
}

export default FinishPostDonationComponent
