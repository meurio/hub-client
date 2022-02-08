/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'

import { NavbarForm } from 'components/navigation/navbar'

const handleCloseForm = () => {}
const mobilization = {}
const block = {name: 'My block'}
const blockUpdate = () => {}
const auth = {}

function generateComponent (options = {}) {
  return (
    <NavbarForm
      handleCloseForm={options.handleCloseForm || handleCloseForm}
      mobilization={options.mobilization || mobilization}
      block={options.block || block}
      blockUpdate={options.blockUpdate || blockUpdate}
      auth={options.auth || auth}
      defaultValue={block.name}
    />
  )
}

describe('client/components/navigation/navbar/navbar-form', () => {
  it('should initialize state with a name', () => {
    const wrapper = mount(generateComponent())
    expect(wrapper.state().name).to.be.eq(block.name)
  })

  describe('#componentDidMount', () => {
    it.skip('should add an event listenter for the window', () => {
      sinon.spy(window, 'addEventListener')
      mount(generateComponent())
      expect(window.addEventListener).to.have.been.calledOnce
    })
  })

  describe('#componentWillUnmount', () => {
    it.skip('should remove an event listenter from the window', () => {
      sinon.spy(window, 'removeEventListener')
      expect(window.removeEventListener).to.have.been.calledOnce
    })
  })

  describe('#handleKeyUp', () => {
    it.skip('should call submit when ESC is pressed', () => {
      const wrapper = mount(generateComponent())
      sinon.spy(wrapper.instance(), 'submit')
      wrapper.simulate('keyUp', { preventDefault: () => {}, keyCode: 27 })
      expect(wrapper.instance().submit).to.have.been.calledOnce
    })
  })

  describe('#submit', () => {
    it.skip('should dispatch the edit block action', () => {
      const mockedDispatch = sinon.spy()
      const wrapper = mount(generateComponent({ blockUpdate: mockedDispatch }))
      wrapper.instance().submit({ preventDefault: () => {} })
      expect(mockedDispatch).to.have.been.calledOnce
    })

    it.skip('should call close form callback', () => {
      const mockedHandleCloseForm = sinon.spy()
      const wrapper = mount(generateComponent({ handleCloseForm: mockedHandleCloseForm }))
      wrapper.instance().submit({ preventDefault: () => {} })
      expect(mockedHandleCloseForm).to.have.been.calledOnce
    })
  })
})
