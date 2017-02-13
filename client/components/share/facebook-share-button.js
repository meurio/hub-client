import React, { PropTypes } from 'react'

const FacebookShareButton = props => {
  const handleClick = () => {
    window.open(
      `http://www.facebook.com/sharer.php?u=${props.href}`,
      'Compartilhar no Facebook',
      'width=800,height=600'
    )
  }

  return (
    <button
      ref='button'
      className='btn white h3 p3 col-12 caps h5 rounded'
      onClick={handleClick}
      style={{ backgroundColor: '#2D88ED' }}
    >
      Compartilhar no Facebook
    </button>
  )
}

FacebookShareButton.propTypes = {
  href: PropTypes.string.isRequired
}

export default FacebookShareButton
