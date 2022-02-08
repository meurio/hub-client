import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import ReactS3Uploader from 'react-s3-uploader'
import FileUploader from 'mobrender/components/file-uploader'

describe('mobrender/components/file-uploader', () => {
  let confirmStub
  let uploader
  const props = {
    file: 'tmp://myimage.png',
    onRemove: () => {}
  }

  beforeEach(() => {
    uploader = mount(<FileUploader {...props} />)
    confirmStub = sinon.stub(window, 'confirm')
  })

  afterEach(() => {
    confirmStub.restore()
  })

  it('should rende preview file only when pass file', () => {
    expect(uploader.find(`img[src="${props.file}"]`).length).to.equal(1)
    uploader.setProps({ file: undefined })
    expect(uploader.find('img').length).to.equal(0)
  })

  it('should render react-s3-uploader', () => {
    expect(uploader.find(ReactS3Uploader).length).to.equal(1)
  })

  it('should render progress instead of react-s3-uploader when pass progress', () => {
    uploader.setProps({ progress: 10 })
    expect(uploader.find(ReactS3Uploader).length).to.equal(0)

    expect(uploader.find('Progress').length).to.equal(1)
    expect(uploader.find('Progress').props().percent).to.equal(10)
  })

  describe('render remove button', () => {
    it('should render trash icon', () => {
      expect(uploader.find('button > i.fa-trash').length).to.equal(1)
    })

    it('should not render when onRemove not pass', () => {
      uploader.setProps({ onRemove: undefined })
      expect(uploader.find('button.remove').length).to.equal(0)
    })

    it('should call window.confirm when clicked in remove button', () => {
      uploader.find('button.remove').simulate('click')
      expect(confirmStub.called).to.equal(true)
    })

    it('shoulld call onRemove if clicked in button and confirm message', () => {
      let result
      confirmStub.returns(true)
      uploader.setProps({ onRemove: file => { result = file } })
      uploader.find('button.remove').simulate('click')
      expect(result).to.equal(props.file)
    })
  })
})
