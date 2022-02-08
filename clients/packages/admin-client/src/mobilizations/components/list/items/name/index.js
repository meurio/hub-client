import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'

// Current module dependencies
if (require('exenv').canUseDOM) require('./index.scss')

const Name = ({ name, goal, className, style, maxLength }) => (
  <div className={classnames('name px3 py2 col col-5', className)} style={style}>
    <b className='block mb1 truncate'>{name}</b>
    <div className='truncate'>{goal}</div>
  </div>
)

Name.propTypes = {
  name: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
}

export default Name

const Header = () => (
  <div className='name-header px3 col col-5'>
    <FormattedMessage
      id='mobilizations.components--list.items.name.header.text'
      defaultMessage='Nome'
    />
    {' '}<i className='fa fa-long-arrow-down ml1' />
  </div>
)
Name.Header = Header
