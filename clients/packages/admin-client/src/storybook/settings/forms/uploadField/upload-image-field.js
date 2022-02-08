import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactS3Uploader from 'react-s3-uploader'

if (require('exenv').canUseDOM) require('./upload-image-field.scss')

class UploadImageField extends Component {
  constructor (props) {
    super(props)
    this.state = { loading: false }
  }

  onProgress () {
    if (!this.state.loading) {
      this.setState({ loading: true })
    }
  }

  onError () {
    this.setState({ loading: false })
  }

  onFinish (image) {
    this.setState({ loading: false })
    this.props.onChange({
      target: {
        value: image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
      }
    })
  }

  onClick () {
    ReactDOM.findDOMNode(this.refs.inputFile).click()
  }

  render () {
    const { loading } = this.state
    const { className, signingUrl, theme, value } = this.props

    let content = (<i className='fa fa-image' />)
    if (loading) {
      content = <i className='fa fa-circle-o-notch fa-spin fa-w' />
    } else if (value) {
      content = <img src={value} alt='' />
    }

    if (theme === 'icon') {
      return (
        <div className='upload-image-file'>
          <button
            type='button'
            disabled={loading}
            className={className}
            onClick={this.onClick.bind(this)}
          >
            {content}
          </button>
          <ReactS3Uploader
            signingUrl={signingUrl}
            accept='image/*'
            onProgress={this.onProgress.bind(this)}
            onError={this.onError.bind(this)}
            onFinish={this.onFinish.bind(this)}
            ref='inputFile'
          />
        </div>
      )
    }
    // if theme === 'classic'
    return loading ? <i className='fa fa-spin fa-refresh' /> : (
      <ReactS3Uploader
        signingUrl={signingUrl}
        accept='image/*'
        onProgress={this.onProgress.bind(this)}
        onError={this.onError.bind(this)}
        onFinish={this.onFinish.bind(this)}
        ref='inputFile'
        className='border-none bg-darken-4 rounded p1 white'
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '1rem',
          width: '80%',
          marginLeft: '-40%'
        }}
      />
    )
  }
}

UploadImageField.propTypes = {
  className: PropTypes.string,
  signingUrl: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['classic', 'icon'])
}

UploadImageField.defaultProps = {
  theme: 'icon'
}

export default UploadImageField
