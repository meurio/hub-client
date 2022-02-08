import FinishPostDonation from './'
import { shallow, mount } from 'enzyme'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import test from 'ava'
import sinon from 'sinon'
import FormSelect from './form-select'

import {JSDOM} from 'jsdom'
const doc = new JSDOM('<!doctype html><html><body></body></html>')
global.window = doc.window
global.document = window.document

const finishDonationStub = sinon.fake.returns('oi')

const props = {
  widget: {
    settings: {
      donation_value1: '10',
      donation_value2: '20', 
      donation_value3: '30', 
      donation_value4: '40', 
      donation_value5: '50',
    }
  },
  mobilization: {
    header_font: 'ubuntu'
  },
  defaultSelectedValue: '3',
  onClickDonation: sinon.spy(),
  finishDonationComponent: finishDonationStub
}

function setupFinishPostDonation() {
  const wrapper = mount(<IntlProvider>
    <FinishPostDonation {...props} />
  </IntlProvider>)

  return wrapper
}

test('FormSelect rendered', t => {
  const wrapper = setupFinishPostDonation()
  t.is(wrapper.find(FormSelect).length, 1)
})

test('submit buttons are rendered on form-select', t => {
  const wrapper = setupFinishPostDonation()
  t.is(wrapper.find('button').length, 2)
})

test('default value for select its the same of donation configuration option', t => {
  const wrapper = setupFinishPostDonation()
  t.is(wrapper.find('select[value="3"]').length, 1)
})

test('selecting an option changes component state', t => {
  const wrapper = setupFinishPostDonation().find(FinishPostDonation)
  wrapper.find('select').invoke('onChange')({currentTarget: {value: '2'}})
  t.is(wrapper.state('value'), 2)
})

test('donate submit button call onSubmit with default selected value', t => {
  const wrapper = setupFinishPostDonation()
  wrapper.find('#donate-btn').simulate('click')
  t.true(props.onClickDonation.calledWith('3'))
})

test('donate submit button call onSubmit with undefined value', t => {
  const wrapper = setupFinishPostDonation()
  wrapper.find('#donate-btn').simulate('click')
  t.true(props.onClickDonation.calledWith('3'))
})