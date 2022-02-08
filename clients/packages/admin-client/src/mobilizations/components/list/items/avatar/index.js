import PropTypes from 'prop-types'
import React from 'react'

// Current module dependencies
if (require('exenv').canUseDOM) require('./index.scss')

const Avatar = ({
  image,
  facebook_share_image: facebookShareImage,
  imageSize
}) => (
  <div className='avatar left'>
    {
      image || facebookShareImage ? (
        <div
          className='avatar-width avatar-height bg-cover bg-center overflow-hidden'
          style={{
            backgroundImage: `url(${image || facebookShareImage})`,
            width: imageSize.width,
            height: imageSize.height
          }}
        />
      ) : (
        <div className='avatar-width avatar-height bg-darken-2 table'>
          <i className='fa fa-picture-o white table-cell align-middle center' />
        </div>
      )
    }
  </div>
)

Avatar.propTypes = {
  image: PropTypes.string,
  facebook_share_image: PropTypes.string,
  imageSize: PropTypes.shape({ width: PropTypes.string, height: PropTypes.string })
}

Avatar.defaultProps = {
  imageSize: { width: '90px', height: '90px' }
}

export default Avatar
