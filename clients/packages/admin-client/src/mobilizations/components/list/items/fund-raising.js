import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const FundRaising = ({ total_fund_raising: totalFundRaising }) => (
  <div className='fund-raising px3 col col-2'>
    <FormattedMessage
      id='mobilizations.components--list.items.fund-raising.currency'
      defaultMessage='R$'
    />
    {' '}{totalFundRaising || '-'}
  </div>
)

FundRaising.propTypes = {
  total_fund_raising: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default FundRaising

const Header = () => (
  <div className='fund-raising-header px3 col col-2'>
    <FormattedMessage
      id='mobilizations.components--list.items.fund-raising.header.text'
      defaultMessage='Arrecadações'
    />
  </div>
)
FundRaising.Header = Header
