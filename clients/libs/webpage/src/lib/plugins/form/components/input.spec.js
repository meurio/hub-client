import * as React from 'react'
import sinon from 'sinon'
import test from 'ava'
import { shallow } from 'enzyme'
import Input from './input'

let props = {
  name: 'field-name-1',
  onChange: () => 'field-name-1-clicked',
  mobilization: { body_font: '' }
}

test('should call renderFieldKind', t => {
  props.field = {}
  sinon.spy(Input.prototype, 'renderFieldKind')

  shallow(<Input {...props} />)
  t.true(Input.prototype.renderFieldKind.calledOnce)
})

test('should render a select input when field kind equals dropdown', t => {
  props.field = { kind: 'dropdown', placeholder: '1,2,3' }

  let wrapper = shallow(<Input {...props} />)
  t.is(wrapper.find('select').length, 1)
})

test('should render a input text when field kind not equals dropdown or greetings', t => {
  props.field = { kind: 'dummy', placeholder: '' }

  let wrapper = shallow(<Input {...props} />)
  t.is(wrapper.find('input').length, 1)
})
