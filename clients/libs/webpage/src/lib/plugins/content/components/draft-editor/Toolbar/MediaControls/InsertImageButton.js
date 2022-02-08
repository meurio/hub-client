import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactS3Uploader from 'react-s3-uploader'

class InsertImageButton extends Component {
  constructor (props) {
    super(props)
    this.state = { showInsertDialog: false, isLoading: false, image: null }
  }

  handleToggleDialog (e) {
    this.setState({ showInsertDialog: !this.state.showInsertDialog })
  }

  handleUploadProgress () {
    this.setState({ isLoading: true })
  }

  handleUploadError () {
    this.setState({ isLoading: false })
  }

  handleUploadFinish (e) {
    const { handleUploadFinish } = this.props
    const imgUrl = e.signedUrl.substring(0, e.signedUrl.indexOf('?'))
    this.setState({ isLoading: false, image: imgUrl })

    handleUploadFinish(imgUrl)
  }

  handleOpenDialog () {
    ReactDOM.findDOMNode(this.inputFile).click()
  }

  render () {
    const { buttonClassName } = this.props

    return (
      <div>
        <button className={buttonClassName} onClick={this.handleOpenDialog.bind(this)}>
          <i className='fa fa-image' />
        </button>
        <ReactS3Uploader
          signingUrl={`${process.env.REACT_APP_DOMAIN_API_REST}/uploads`}
          accept='image/*'
          onProgress={this.handleUploadProgress.bind(this)}
          onError={this.handleUploadError.bind(this)}
          onFinish={this.handleUploadFinish.bind(this)}
          ref={input => { this.inputFile = input }}
          style={{
            position: 'absolute',
            visibility: 'hidden'
          }}
        />
      </div>
    )
  }
}

InsertImageButton.propTypes = {
  buttonClassName: PropTypes.string,
  popoverClassName: PropTypes.string,
  handleUploadFinish: PropTypes.func.isRequired
}

export default InsertImageButton
