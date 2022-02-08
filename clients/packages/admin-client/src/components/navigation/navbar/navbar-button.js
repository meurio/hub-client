import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const NavbarButton = props => {
  const handleClick = e => {
    e.preventDefault()
    const { targetId } = props
    const target = document.getElementById(targetId)

    target.scrollIntoView({behavior: "smooth"})
  }

  const {className, children, hidden} = props
  return (
    <a
      href='/'
      className={classnames(className, 'navbar-button relative')}
      onClick={handleClick}>
      <span style={{ opacity: hidden ? '.25' : '1' }}>
        {children}
      </span>
      {hidden && (
        <div className='h2 absolute top-0 bottom-0 left-0 right-0 center flex flex-center'>
          <i className='fa fa-eye-slash flex-auto' />
        </div>
      )}
    </a>
  )
}

NavbarButton.propTypes = {
  targetId: PropTypes.string.isRequired,
  scrollableId: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.string,
  hidden: PropTypes.bool
}

export default NavbarButton
