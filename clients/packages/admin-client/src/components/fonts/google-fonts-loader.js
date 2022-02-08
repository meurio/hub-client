import PropTypes from 'prop-types'
import React from 'react'

import { getGoogleFontsLoadURL, needsToLoadGoogleFonts } from 'utils/font-name-handler'

const GoogleFontsLoader = ({ fonts }) => (
  needsToLoadGoogleFonts(fonts)
    ? <link href={getGoogleFontsLoadURL(fonts)} rel='stylesheet' />
    : <no-script />
)

GoogleFontsLoader.propTypes = {
  fonts: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
}

export default GoogleFontsLoader
GoogleFontsLoader.displayName = 'GoogleFontsLoader'
