import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

/* eslint-disable camelcase */
const CreatedAt = ({ created_at, createdAt }) => {
  const date = new Date(Date.parse(created_at || createdAt))

  return (
    <div className='created-at px3 col col-2'>
      {`${`${date.getDate()}`.padStart(2, '0')}`}
      {`/${`${date.getMonth() + 1}`.padStart(2, '0')}`}
      {`/${date.getFullYear()}`}
    </div>
  )
}
/* eslint-disable camelcase */

CreatedAt.propTypes = {
  created_at: PropTypes.string,
  createdAt: PropTypes.string
}

export default CreatedAt

const Header = () => (
  <div className='created-at-header px3 col col-2'>
    <FormattedMessage
      id='mobilizations.components--list.items.created-at.header.text'
      defaultMessage='Criada em'
    />
  </div>
)
CreatedAt.Header = Header
