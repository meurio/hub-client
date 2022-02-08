import * as React from 'react'
import test from 'ava'
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper'
import { Form } from '.'
import { pressureUtils } from '../utils'
import { JSDOM } from 'jsdom'
import { IntlProvider } from 'react-intl'
import { mount } from 'enzyme'

let wrapper
const targets = ['Foo Bar <foo@bar.com>', 'Bar Foo <bar@foo.com>', 'Foo Baz <foo@baz.com>']
const widget = { settings: {} }
const analyticsEvents = {
  pressureIsFilled: () => { }
}
const defaultProps = { targets, widget, analyticsEvents }
const jsdom = new JSDOM()
global.document = jsdom.window.document
global.window = jsdom.window

test.beforeEach(() => {
  wrapper = mountWithIntl(<Form {...defaultProps} />)
})

test('should render ok by default', t => {
  t.truthy(wrapper)
  // check if errors not render without submit
  t.is(wrapper.find('span.red').length, 0)
})

test('should render buttonColor according passed in props', t => {
  wrapper.setProps({ buttonColor: '#fff' })
  t.is(wrapper.find('button[type="submit"]').props().style.backgroundColor, '#fff')
})

test('should return onSubmit values of state when clicked button', t => {
  const form = wrapper.find(Form.WrappedComponent)
  let returned
  const state = {
    email: 'igor@local.cc',
    phone: '',
    name: 'igor',
    lastname: 'santos',
    city: '',
    subject: 'subject',
    body: 'body',
    pressureType: pressureUtils.PRESSURE_TYPE_EMAIL
  }
  wrapper.setProps({ onSubmit: data => { delete data.callManagement; returned = data } })
  form.setState(state)

  form.find('form').simulate('submit')
  t.deepEqual(returned, state)
})

test('should render children', t => {
  wrapper.setProps({
    children: <div className='foo-bar-children' />
  })
  t.is(wrapper.find('.foo-bar-children').length, 1)
})

test('should set default subject and body by props', t => {
  const wrapper = mountWithIntl(
    <Form
      {...defaultProps}
      subject='subject default'
      body='body default'
    />
  ).find(Form.WrappedComponent)

  t.is(wrapper.instance().state.subject, 'subject default')
  t.is(wrapper.instance().state.body, 'body default')
})

test('should change text of button when buttonText passed', t => {
  wrapper.setProps({
    buttonText: 'Enviar e-mail para o alvo'
  })
  t.is(wrapper.find('button[type="submit"]').text(), 'Enviar e-mail para o alvo')
})

test('should render error and not call onSubmit if any field not fill', t => {
  let submitted;
  const wrapper = mountWithIntl(
    <Form
      {...defaultProps}
      widget={{ settings: { show_city: 'city-true' } }}
      buttonText='Enviando...'
      buttonColor='#666'
      // eslint-disable-next-line no-undef
      onSubmit={data => { submitted = data }}
    />
  )
  wrapper.find('form').simulate('submit')
  t.is(wrapper.find('span.error').length, 3)
  t.is(submitted, undefined)
})

function setupWrapper() {
  const targetsPhone = [
    'Isabelle Maitê <+551199999-9999>',
    'Betina Natália <+551199999-9999>',
    'Evelyn Pereira <+551199999-9999>',
    'Agatha Stefany Costa <+551199999-9999>'
  ]
  return mountWithIntl(
    <Form
      {...defaultProps}
      // eslint-disable-next-line no-undef
      onSubmit={data => { submitted = data }}
      targetList={targetsPhone}
    />
  )
}

test('should render phone field when targets have phone number', t => {
  const wrapper = setupWrapper()
  t.is(wrapper.find('#pressure-sender-phone-id').length, 1)
})

test('should not render email field when targets have phone number', t => {
  const wrapper = setupWrapper()
  wrapper.setProps({...defaultProps, targetList: undefined})
  t.is(wrapper.find('#pressure-sender-email-id').length, 0)
})

// test('phone should render error and not call onSubmit if any field not fill', t => {
//   const form = wrapper.find(Form.WrappedComponent)
//   let submitted
//   wrapper.setProps({
//     ...wrapper.props(),
//     onSubmit: data => { submitted = data }
//   })
//   form.find('form').simulate('submit')
//   form.findWhere(i => i.text() && i.text().endsWith() === 'obrigatório').forEach(i => {
//     console.log('i', i.getElement())
//   })
//   t.is(form.find('span.error').length, 3)
//   t.is(submitted, undefined)
// })
