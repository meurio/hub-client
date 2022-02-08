import PropTypes from 'prop-types'
import React, { Component } from 'react'
// Global module dependencies
import { Loading } from 'components/await'
import { GoogleFontsLoader } from 'components/fonts'
import * as arrayUtil from 'utils/array'
import * as paths from 'paths'

import Mobilization from 'mobrender/components/mobilization.connected'

export class MobilizationsEditPage extends Component {

  componentWillReceiveProps (nextProps) {
    const { mobilization, blocksIsLoaded, blocks } = nextProps
    if (blocksIsLoaded && blocks.length === 0) {
      this.props.history.push(paths.mobilizationTemplatesChoose(mobilization))
    }
  }

  render () {
    const { mobilization, renderIsLoading } = this.props

    if (!renderIsLoading) {
      const fonts = [mobilization.header_font, mobilization.body_font].filter(arrayUtil.distinct)
      return (
        <div className='flex flex-auto overflow-hidden'>
          <Mobilization editable history={this.props.history} />
          <GoogleFontsLoader fonts={fonts} />
        </div>
      )
    }
    return <Loading />
  }
}

MobilizationsEditPage.propTypes = {
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired,
    header_font: PropTypes.string,
    body_font: PropTypes.string
  }),
  renderIsLoading: PropTypes.bool,
  blocks: PropTypes.array,
  blockIsLoaded: PropTypes.bool
}

export default MobilizationsEditPage
