import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import ReactS3Uploader from 'react-s3-uploader'


import * as paths from 'paths'

import ColorPicker from 'components/color-picker'
import { Tabs, Tab } from 'components/navigation'
import { SettingsPageLayout, SettingsPageContentLayout, SettingsPageMenuLayout } from 'components/layout'
import { DivFloat, Button } from 'ux/components'
import BlockMiniature from 'mobilizations/blocks/components/block-miniature'
import BLOCK_LAYOUTS from 'mobilizations/blocks/constants/block-layouts'

if (require('exenv').canUseDOM) require('./page.scss')

class BlocksCreatePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLayout: BLOCK_LAYOUTS[0],
      color: undefined,
      bgImage: undefined,
      uploading: undefined
    }
  }

  render () {
    const { mobilization, location, onCreateBlock } = this.props
    const { color_scheme: colorScheme } = mobilization
    const newBlockPath = paths.createBlock(mobilization)

    return (
      <SettingsPageLayout>
        {/* Menu */}
        <SettingsPageMenuLayout title={
          <FormattedMessage
            id='page--block-create.title'
            defaultMessage='Adicione um bloco de conteúdo'
          />
        }
        >
          <Tabs>
            <Tab
              path={newBlockPath}
              text={
                <FormattedMessage
                  id='page--block-create.tabs.blank-blocks'
                  defaultMessage='Blocos em branco'
                />
              }
              isActive={newBlockPath === location.pathname}
            />
          </Tabs>
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout>
          <div className='col-12 clearfix py3 pr4 pl3'>
            <p className='lightgray mb2'>
              <FormattedMessage
                id='page--block-create.helper-text'
                defaultMessage='Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a qualquer momento'
              />
            </p>

            <label className='block-type bold mb1 block gray20'>
              <FormattedMessage
                id='page--block-create.type.label'
                defaultMessage='Tipo de bloco'
              />
            </label>
            <div className='mxn1 clearfix'>
              {BLOCK_LAYOUTS.map((layout, index) => (
                <BlockMiniature
                  key={index}
                  layout={layout}
                  selectedLayout={this.state.selectedLayout}
                  onClick={() => this.setState({ selectedLayout: layout })}
                />
              ))}
            </div>

            <label className='block-type bold mb1 block gray20'>
              <FormattedMessage
                id='page--block-create.background.label'
                defaultMessage='Fundo'
              />
            </label>
            <div className='col-12'>
              <ColorPicker
                color={this.state.color}
                onChangeColor={color => this.setState({ color: color.rgb })}
                theme={colorScheme && colorScheme.replace('-scheme', '')}
                className='left'
              />
              <div
                className={
                  'border border-gray94 rounded p2 bg-white center relative' +
                  ' overflow-hidden inline-block'
                }
              >
                <div className='clearfix' style={{ width: 240 }}>
                  {this.state.bgImage ? (
                    <div
                      className='bg-cover square'
                      style={{ backgroundImage: `url(${this.state.bgImage})` }}
                    />
                  ) : (
                    <div className='square-float'>
                      <i
                        className='fa fa-image silver'
                        style={{ fontSize: '7em', marginTop: '2.5rem' }}
                      />
                    </div>
                  )}
                  <div className={this.state.bgImage ? 'hide' : null}>
                    <div className='mb1 gray'>
                      <FormattedMessage
                        id='page--block-create.background.image.placeholder.text'
                        defaultMessage='Selecione a imagem de fundo'
                      />
                    </div>
                  </div>
                  <div className='overflow-hidden'>
                    {
                      this.state.uploading
                      ? <i className='fa fa-spin fa-refresh' />
                      : <ReactS3Uploader
                        id='blockBackgroundImage'
                        signingUrl={`${process.env.REACT_APP_DOMAIN_API_REST}/uploads`}
                        accept='image/*'
                        onProgress={progress =>
                          !this.state.uploading && this.setState({ uploading: progress })
                        }
                        onFinish={image => {
                          const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
                          this.setState({ bgImage: imageUrl, uploading: undefined })
                        }}
                        className='border-none bg-darken-4 rounded p1 white'
                        style={{
                          position: 'absolute',
                          left: '50%',
                          bottom: '1rem',
                          width: '80%',
                          marginLeft: '-40%'
                        }}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
            <DivFloat>
              <Button
                onClick={() => {
                  const block = {
                    bg_class: this.state.color ? JSON.stringify(this.state.color) : undefined,
                    bg_image: this.state.bgImage,
                    widgets_attributes: this.state.selectedLayout.map(col => ({ kind: 'draft', ...col })),
                    mobilization_id: mobilization.id
                  }
                  onCreateBlock(block)
                    .then(() => {
                      this.props.history.push(
                        `${paths.editMobilization(mobilization.id)}?newBlock=true`
                      )
                    })
                }}
              >
                <FormattedMessage
                  id='page--block-create.button-add.text'
                  defaultMessage='Adicionar'
                />
              </Button>
            </DivFloat>
          </div>
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

BlocksCreatePage.contextTypes = {
  router: PropTypes.object
}

BlocksCreatePage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  mobilization: PropTypes.object.isRequired,
  onCreateBlock: PropTypes.func.isRequired
}

export default BlocksCreatePage
