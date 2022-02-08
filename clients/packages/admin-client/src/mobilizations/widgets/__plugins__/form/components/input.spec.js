import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Input } from 'mobilizations/widgets/__plugins__/form/components'

describe('client/mobilizations/widgets/__plugins__/form/components/input', () => {
  describe('when render form edit input settings', () => {
    let props = {
      uid: '',
      initializeEditing: true,
      editable: true,
      configurable: true,
      mobilization: {
        body_font: ''
      }
    }

    it('should call renderForm when initialize editable', () => {
      sinon.spy(Input.prototype, 'renderForm')

      shallow(<Input {...props} />)
      expect(Input.prototype.renderForm.calledOnce).to.equal(true)
    })
  })

  describe('when render input form', () => {
    let props = {
      uid: '',
      initializeEditing: false,
      editable: true,
      configurable: true,
      mobilization: {
        body_font: ''
      }
    }

    it('should call renderInput, renderInstructions, renderFieldKind when not initialize editable', () => {
      props.field = { }

      sinon.spy(Input.prototype, 'renderInput')
      sinon.spy(Input.prototype, 'renderInstructions')
      sinon.spy(Input.prototype, 'renderFieldKind')

      shallow(<Input {...props} />)
      expect(Input.prototype.renderInput.calledOnce).to.equal(true)
      expect(Input.prototype.renderInstructions.calledOnce).to.equal(true)
      expect(Input.prototype.renderFieldKind.calledOnce).to.equal(true)
    })

    it('should render a select input when field kind equals dropdown', () => {
      props.field = { kind: 'dropdown', placeholder: '1,2,3' }

      let wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('select')).to.have.length(1)
    })

    it('should render a input text when field kind not equals dropdown or greetings', () => {
      props.field = { kind: 'dummy', placeholder: '' }

      let wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('input')).to.have.length(1)
    })

    it('should render success message when field kind equals greetings', () => {
      props.field = { kind: 'greetings', placeholder: 'new message' }

      let wrapper = shallow(<Input {...props} />)
      expect(wrapper.find('p')).to.have.length(1)

      let node = wrapper.find('p').at(0)
      expect(node.text()).to.have.string(props.field.placeholder)
    })

    it('should change hasMouseOver state for render link edit when mouseOver', () => {
      let wrapper = shallow(<Input {...props} />)

      wrapper.simulate('mouseEnter')
      expect(wrapper.state('hasMouseOver')).to.equals(true)

      wrapper.simulate('mouseLeave')
      expect(wrapper.state('hasMouseOver')).to.equals(false)
    })

    it('should editMode when click on block', () => {
      let wrapper = shallow(<Input {...props} />)
      wrapper.simulate('click')

      expect(wrapper.state('editing')).to.equals(true)
    })

    it('should not click to go edit mode when configurable is False', () => {
      props.configurable = false

      let wrapper = shallow(<Input {...props} />)
      wrapper.simulate('click')

      expect(wrapper.state('editing')).to.equals(false)
    })
  })
})
