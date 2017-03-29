import React, { PropTypes } from 'react'
import classnames from 'classnames'
import DocumentMeta from 'react-document-meta'

import Block from '~mobilizations/blocks/components'
import { Navbar } from './navbar'

if (require('exenv').canUseDOM) {
  var logoIcon = require('~components/navigation/sidenav/logo-icon-no-border.svg')
}

const Mobilization = props => {
  const {
    mobilization: {
      name,
      goal,
      facebook_share_title,
      facebook_share_description,
      facebook_share_image,
      color_scheme: colorScheme,
      header_font: headerFont,
      body_font: bodyFont
    },
    blocks,
    blockUpdate,
    editable,
    blockEditionMode
  } = props

  const themeClassName = `${colorScheme} ${headerFont}-header ${bodyFont}-body`
  const layoutClassName = editable ? 'flex-auto relative' : 'absolute'
  const layoutStyle = !editable ? { top: 0, bottom: 0, left: 0, right: 0 } : undefined

  const visibleBlocks = blocks.filter(block => !editable ? !block.hidden : true)

  return (
    <div className={classnames('flex flex-column', themeClassName, layoutClassName)} style={layoutStyle}>
      {!blockEditionMode && (
        <Navbar
          mobilization={props.mobilization}
          blocks={blocks}
          editable={editable}
          blockUpdate={blockUpdate}
        />
      )}
      {/* render blocks */}
      <div id='blocks-list' className='flex-auto' style={{ overflowY: 'scroll' }}>
        {visibleBlocks.map((block, index) => (
          <Block
            key={`block-${block.id}`}
            editable={editable}
            block={block}
            canMoveUp={index !== 0}
            canMoveDown={index !== blocks.length - 1}
            {...props}
          />
        ))}
        <div className='col-10 mx-auto'>
          <div className='col col-10'>
            <a
              href='http://www.bonde.org/'
              style={{ 'color': '#000', 'text-decoration': 'none', 'line-height': '85px' }}
              target='_blank'>
              Feito pra causar. Feito com
              <strong> BONDE.</strong>
            </a>
          </div>
          <div className='col col-2'>
            <a
              href='http://www.bonde.org/'
              className='right my2'
              target='_blank'>
              <img src={logoIcon} alt='B' style={{ width: '45px' }} />
            </a>
          </div>
        </div>
      </div>
      {/* render document met to show mobilzation */}
      {!editable ? (
        <DocumentMeta
          title={name}
          description={goal}
          meta={{
            name: {
              'viewport': 'width=device-width, initial-scale=1',
              'og:title': facebook_share_title,
              'og:description': facebook_share_description,
              'og:image': facebook_share_image
            }
          }}
        />
      ) : null}
    </div>
  )
}

Mobilization.propTypes = {
  editable: PropTypes.bool.isRequired,
  mobilization: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  blockUpdate: PropTypes.func,
  blockIsRequest: PropTypes.bool,
  widgets: PropTypes.array.isRequired,
  blockEditionMode: PropTypes.bool
}

Mobilization.defaultProps = {
  editable: false,
  blockIsRequest: false,
  blocks: [],
  widgets: []
}

export default Mobilization
