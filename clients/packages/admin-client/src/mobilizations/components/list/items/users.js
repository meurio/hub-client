import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const Users = ({ users_count: usersCount }) => (
  <div className='users px3 col col-2'>
    {usersCount || '-'}
  </div>
)

Users.propTypes = {
  users_count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default Users

const Header = () => (
  <div className='users-header px3 col col-2'>
    <FormattedMessage
      id='mobilizations.components--list.items.users.header.text'
      defaultMessage='Usuários'
    />
  </div>
)
Users.Header = Header
