import PropTypes from 'prop-types'
import React from 'react'

const ListItem = ({ onClick, community: { id, name, image } }) => (
  <div className='ListItem' onClick={() => onClick(id)} style={{ cursor: 'pointer' }}>
    <u
      className='logo-icon nossas left'
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        boxShadow: 'none'
      }}
    />
    <p>
      <span>{name}</span>
      <i className='fa fa-arrow-right gray right' aria-hidden='true' />
    </p>
  </div>
)

ListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  community: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string
  })
}

export default ListItem
