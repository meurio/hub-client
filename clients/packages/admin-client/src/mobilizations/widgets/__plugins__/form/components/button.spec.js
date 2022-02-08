/* eslint-disable no-unused-expressions */
import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, shallow } from 'enzyme'

import { Button } from 'mobilizations/widgets/__plugins__/form/components'

describe('client/mobilizations/widgets/__plugins__/form/components/button', () => {
  let props = {
    success: false,
    buttonText: 'Salvar',
    loading: false,
    handleClick: () => {},
    mobilization: {}
  }

  describe('when it static', () => {
    it('should render with buttonText label', () => {
      let wrapper = render(<Button {...props} />)

      expect(wrapper.text()).to.equal(props.buttonText)
    })

    it('should set disabled when button loading', () => {
      props.loading = true

      let wrapper = shallow(<Button {...props} />)
      let buttonNode = wrapper.find('button').at(0)
      expect(buttonNode.props().disabled).to.equal(true)
    })

    it('should display message success when success click', () => {
      props.success = true

      let wrapper = shallow(<Button {...props} />)
      let divNode = wrapper.find('div').at(0)
      expect(divNode.text()).to.be.ok
    })
  })

  describe('when it click', () => {
    it('should call handleClick when clicked button', () => {
      props.handleClick = sinon.spy()

      let wrapper = shallow(<Button {...props} />)
      wrapper.find('button').simulate('click')

      expect(props.handleClick.calledOnce).to.equal(true)
    })
  })
})
