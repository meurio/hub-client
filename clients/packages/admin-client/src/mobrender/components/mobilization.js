import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'

import Block from './block.connected'
import Navbar from './navbar'
import * as paths from 'paths'
import LogoIconNoBorder from 'components/navigation/sidenav/logo-icon-no-border'

if (require('exenv').canUseDOM) require('./add-new-block.scss')

class Mobilization extends React.Component {
  constructor (props) {
    super(props)

    const { editable, blocks } = props

    this.state = {
      blocks: blocks.filter(block => !editable ? !block.hidden : true)
    }
  }

  componentWillReceiveProps (props) {
    if (this.props.blocks !== props.blocks) {
      const { editable, blocks } = props

      this.setState({
        blocks: blocks.filter(block => !editable ? !block.hidden : true)
      })
    }
  }

  componentDidMount () {
    const { editable, mobilization, blocks, blocksIsLoaded } = this.props
    if (editable && blocksIsLoaded && blocks.length === 0) {
      this.props.history.push(paths.mobilizationTemplatesChoose(mobilization))
    }

    if (require('exenv').canUseDOM) {
      let blocksTotalHeight = 0
      const blocksWithOffsetTop = []

      // get the offsetTop of each block and put it on state
      this.state.blocks.map((block, index) => {
        const { offsetTop, offsetHeight } = document.querySelector(`#block-${block.id}`)
        const scrollTopReached = index === 0

        blocksWithOffsetTop.push({ ...block, offsetTop, scrollTopReached })
        blocksTotalHeight += offsetHeight
        return blocksWithOffsetTop
      })
      this.setState({ blocks: blocksWithOffsetTop })

      // watch the scroll event
      document.querySelector('#blocks-list').onscroll = ({ target }) => {
        //
        // check if the current scroll position is greater or equals
        // than one of the blocks offsetTop
        //
        this.state.blocks.map(block => {
          const scrollPassed = (target.scrollTop + 120) >= block.offsetTop

          if (scrollPassed && !block.scrollTopReached) {
            this.updateBlock(block, { scrollTopReached: true })
          }
          return scrollPassed
        })

        //
        // small fix if the last block is small than viewport
        // if the scroll position is greater or equals than
        // sum of all blocks height, sinalyze that the last block was reached
        //
        const viewportBottom = target.scrollTop + target.offsetHeight
        const isBottom = viewportBottom >= blocksTotalHeight
        const lastBlock = this.state.blocks.slice(-1)[0]

        if (isBottom && !lastBlock.scrollTopReached) {
          this.updateBlock(lastBlock, { scrollTopReached: true })
        }
      }
    }
  }

  updateBlock (block, newProps) {
    const { blocks } = this.state
    const index = blocks.findIndex(currentBlock => currentBlock.id === block.id)

    this.setState({
      blocks: [
        ...blocks.slice(0, index),
        { ...blocks[index], ...newProps },
        ...this.state.blocks.slice(index + 1)
      ]
    })
  }

  render () {
    const {
      mobilization: {
        color_scheme: colorScheme,
        header_font: headerFont,
        body_font: bodyFont
      },
      blocks,
      widgets,
      blockUpdate,
      editable,
      blockEditionMode,
      history
    } = this.props

    const themeClassName = `${colorScheme} ${headerFont}-header ${bodyFont}-body`
    const layoutClassName = editable ? 'flex-auto relative' : 'absolute'
    const layoutStyle = !editable ? { top: 0, bottom: 0, left: 0, right: 0 } : undefined

    return (
      <div className={classnames('flex flex-column', themeClassName, layoutClassName)} style={layoutStyle}>
        {!blockEditionMode && (
          <Navbar
            mobilization={this.props.mobilization}
            blocks={blocks}
            editable={editable}
            blockUpdate={blockUpdate}
          />
        )}
        {/* render blocks */}
        <div id='blocks-list' className='flex-auto' style={{ overflowY: 'scroll' }}>
          {this.state.blocks.map((block, index) => (
            <Block
              history={history}
              key={`block-${block.id}`}
              editable={editable}
              block={block}
              widgets={widgets.filter(w => w.block_id === block.id)}
            />
          ))}
          {editable && (
            <div
              className='add-new-block'
              onClick={() => {
                history.push(
                  paths.createBlock(this.props.mobilization)
                )
              }}
            >
              <i className='fa fa-plus' />
              <FormattedMessage
                id='mobrender.components--mobilization.add-block-content'
                defaultMessage='Adicionar bloco de conteúdo'
                />
            </div>
          )}
          <div className='col-10 mx-auto'>
            <div className='col col-10'>
              <a
                href='http://www.bonde.org/?utm_source=footer-logo'
                style={{ 'color': '#000', 'textDecoration': 'none', 'lineHeight': '85px' }}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FormattedMessage
                  id='mobrender.components--mobilization.footer.slogan'
                  defaultMessage='Feito pra causar. Feito com'
                />
                <strong> BONDE.</strong>
              </a>
            </div>
            <div className='col col-2'>
              <a
                href='http://www.bonde.org/?utm_source=footer-slogan'
                className='right my2'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LogoIconNoBorder />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Mobilization.propTypes = {
  editable: PropTypes.bool.isRequired,
  // Injected by redux
  mobilization: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  blockUpdate: PropTypes.func,
  widgets: PropTypes.array.isRequired,
  blockEditionMode: PropTypes.bool,
  blocksIsLoaded: PropTypes.bool
}

Mobilization.defaultProps = {
  editable: false,
  blocks: [],
  widgets: []
}

export default Mobilization
