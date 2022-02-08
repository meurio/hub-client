import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import * as paths from 'paths'
import { PageTabLayout } from 'mobilizations/components'
import MobilizationBasicsForm from 'mobilizations/components/mobilization-basics-form'

const MobilizationsNewPage = props => (
  <PageTabLayout location={props.location}>
    <div className='page-add'>
      <h2 className='h1 mt0 mb3 center'>
        <FormattedMessage
          id='page--mobilizations-new.title'
          defaultMessage='Qual o objetivo da sua mobilização?'
        />
      </h2>
      <MobilizationBasicsForm
        className='bg-white'
        onFinishSubmit={mobilization => {
          mobilization && props.history.push(
            paths.mobilizationTemplatesChoose(mobilization)
          )
        }}
        {...props}
      />
      <p className='lightgray center' style={{ fontSize: '.9rem', marginTop: '1.5rem' }}>
        <FormattedMessage
          id='page--mobilizations-new.footer'
          defaultMessage='Fique tranquil@ vc poderá editar depois se achar necessário.'
        />
      </p>
    </div>
  </PageTabLayout>
)

MobilizationsNewPage.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default MobilizationsNewPage
