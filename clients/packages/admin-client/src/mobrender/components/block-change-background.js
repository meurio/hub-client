import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { ColorPicker } from 'components/color-picker'
import FileUploader from './file-uploader'

export const BLOCK_UPLOAD_KEY = 'bgBlock'

class ColorPickerButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }

  onChangeColor (color) {
    this.props.onChange(JSON.stringify(color.rgb))
  }

  render () {
    return (
      <div>
        <button
          className={classnames('btn white', { 'bg-darken-4': this.state.show })}
          style={{ height: '55px', borderRight: '1px solid rgba(119, 119, 119, 0.33)' }}
          onClick={() => this.setState({ show: !this.state.show })}
        >
          <i className='fa fa-eyedropper' />
        </button>
        <div className='fixed z5'>
          <ColorPicker
            theme={this.props.theme}
            showColorPicker={this.state.show}
            color={this.props.color}
            onChangeColor={this.onChangeColor.bind(this)}
          />
        </div>
      </div>
    )
  }
}

const rgba = block => {
  if (block.bg_class) {
    try {
      const rgba = JSON.parse(block.bg_class)
      return rgba
    } catch (ex) {
      // Silent error because use className
    }
  }
}

const BlockChangeBackground = ({ mobilization, block, onChangeBackground, progress, onUploadFile, onCancelEdit, update }) => (
  <div className='absolute col-12 top-0 left-0 bg-darken-4 z5'>
    <div className='flex flex-wrap'>
      <ColorPickerButton
        color={rgba(block)}
        theme={mobilization.color_scheme}
        onChange={color => {
          onChangeBackground({ ...block, bg_class: color })
        }}
      />
      <FileUploader
        file={block.bg_image}
        progress={progress}
        onProgress={progress => onUploadFile(BLOCK_UPLOAD_KEY, progress)}
        onRemove={() => onChangeBackground({ ...block, bg_image: '' })}
        onFinish={file => {
          onUploadFile(BLOCK_UPLOAD_KEY)
          onChangeBackground({...block, bg_image: file})
        }}
      />
      <div className='absolute right-0 mt1 mr2 nowrap'>
        <button
          className='btn caps bg-darken-4 white rounded mr1 save-btn'
          style={{ heigth: '40px' }}
          disabled={progress !== undefined}
          onClick={() => {
            update(block)
            onCancelEdit(block)
          }}
        >
          <FormattedMessage
            id='mobrender.components--block-change-background.button.save'
            defaultMessage='Salvar'
          />
        </button>
        <button
          className='btn caps bg-darken-4 white rounded cancel-btn'
          style={{ heigth: '40px' }}
          onClick={() => onCancelEdit(block)}
        >
          <FormattedMessage
            id='mobrender.components--block-change-background.button.cancel'
            defaultMessage='Cancelar'
          />
        </button>
      </div>
    </div>
    <div
      className='fixed top-0 right-0 bottom-0 left-0 z3'
      style={{ marginTop: '50px' }}
      onClick={() => onCancelEdit(block)}
    />
  </div>
)

BlockChangeBackground.propTypes = {
  block: PropTypes.object.isRequired,
  // Injected by redux
  mobilization: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  onChangeBackground: PropTypes.func,
  onCancelEdit: PropTypes.func,
  onUploadFile: PropTypes.func,
  progress: PropTypes.number
}

export default BlockChangeBackground
