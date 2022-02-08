/* eslint-disable no-unused-expressions */
import React from "react";
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import NavbarForm from './navbar-form';

// const realUseState = React.useState

const handleCloseForm = jest.fn()
const block = {name: 'My block'}
const blockUpdate = jest.fn()

// const stubState: any = { name: block.name }

const useStateSpy = jest.spyOn(React, 'useState')


describe('client/components/navigation/navbar/navbar-form', () => {
  it('should initialize state with a name', () => {
    shallow(
      <NavbarForm
        handleCloseForm={handleCloseForm}
        block={block}
        blockUpdate={blockUpdate}
        defaultValue={block.name}
      />
    )
    expect(useStateSpy.mock.results[0].value[0]).to.be.eq(block.name)
  })

  describe('#componentDidshallow', () => {
    it.skip('should add an event listenter for the window', () => {
      sinon.spy(window, 'addEventListener')
      shallow(
        <NavbarForm
          handleCloseForm={handleCloseForm}
          block={block}
          blockUpdate={blockUpdate}
          defaultValue={block.name}
        />
      )
      expect(window.addEventListener).to.have.been.calledOnce
    })
  })

  describe('#componentWillUnshallow', () => {
    it.skip('should remove an event listenter from the window', () => {
      sinon.spy(window, 'removeEventListener')
      expect(window.removeEventListener).to.have.been.calledOnce
    })
  })

  describe('#handleKeyUp', () => {
    it.skip('should call submit when ESC is pressed', () => {
      const wrapper: any = shallow(
        <NavbarForm
          handleCloseForm={handleCloseForm}
          block={block}
          blockUpdate={blockUpdate}
          defaultValue={block.name}
        />
      )
      sinon.spy(wrapper.instance(), 'submit')
      wrapper.simulate('keyUp', { preventDefault: () => {}, keyCode: 27 })
      expect(wrapper.instance().submit).to.have.been.calledOnce
    })
  })

  describe('#submit', () => {

    it.skip('should call close form callback', () => {
      const mockedHandleCloseForm = sinon.spy()
      const wrapper: any = shallow(
        <NavbarForm
          handleCloseForm={mockedHandleCloseForm}
          block={block}
          blockUpdate={blockUpdate}
          defaultValue={block.name}
        />
      )
      wrapper.instance().submit({ preventDefault: () => {} })
      expect(mockedHandleCloseForm).to.have.been.calledOnce
    })
  })
})
