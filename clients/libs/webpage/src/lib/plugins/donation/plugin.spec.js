import * as React from 'react'
import test from 'ava'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import DonationPlugin, { DonationSubmitButton } from './plugin'

let plugin

test.beforeEach((t) => {
  t.context.props = {
    widget: { settings: { donation_value1: 10 } },
    mobilization: {},
    intl: { formatMessage: (key) => `{${key}}` },
    handleDonationTransactionCreate: () => new Promise((res, rej) => {
      return res({ donation: {} })
    }),
    overrides: {
      FinishCustomMessage: { component: () => <div className='finish-custom-message'/> },
      FinishDefaultMessage: { component: () => <div className='finish-default-message'/> },
      FinishDonationMessage: { component: () => <div className='finish-donation-message'/> }
    }
  }
  t.context.plugin = shallow(<DonationPlugin {...t.context.props} />)
})

test('should be render DonationPlugin its ok', t => {
  const { plugin } = t.context

  t.true(plugin.hasClass('widget'))
})

test('change state to success when resolve handleDonationTransactionCreate', t => {
  const { plugin } = t.context  
  return plugin.find(DonationSubmitButton).invoke('onClick')().then(() => {
    t.is(plugin.state('success'), true)
  })
})

test('render FinishDonationMessage.component when pos action is donation-recurrent', t => {
  const { plugin, props: { overrides: { FinishDonationMessage } } } = t.context
  // pos action is donation-recurrent
  const widget = { id: 1, settings: { finish_message_type: 'donation-recurrent' }}
  plugin.setProps({ widget })
  // simulate donation click button
  return plugin.find(DonationSubmitButton).invoke('onClick')().then(() => {
    t.is(plugin.find(FinishDonationMessage.component).length, 1)
  })
})

test('render FinishDefaultMessage.component when pos action is share', t => {
  const { plugin, props: { overrides: { FinishDefaultMessage } } } = t.context
  // pos action is share
  const widget = { id: 1, settings: { finish_message_type: 'share' }}
  plugin.setProps({ widget })
  // simulate donation click button
  return plugin.find(DonationSubmitButton).invoke('onClick')().then(() => {
    t.is(plugin.find(FinishDefaultMessage.component).length, 1)
  })
})

test('render FinishCustomMessage.component when pos action is custom', t => {
  const { plugin, props: { overrides: { FinishCustomMessage } } } = t.context
  // pos action is custom
  const widget = { id: 1, settings: { finish_message_type: 'custom' }}
  plugin.setProps({ widget })
  // simulate donation click button
  return plugin.find(DonationSubmitButton).invoke('onClick')().then(() => {
    t.is(plugin.find(FinishCustomMessage.component).length, 1)
  })
})

test('pass extra props when FinishDonationMessage is rendered', t => {
  const {
    plugin,
    props: {
      overrides: {
        FinishDonationMessage,
        FinishDefaultMessage
      }
    }
  } = t.context
  const handleDonationTransactionCreate = () => new Promise((res, rej) => {
    return res({ donation })
  })
  const donation = { id: 10, payment_method: 'cartao-credito' }
  const widget = { id: 1, settings: { finish_message_type: 'donation-recurrent' }}
  plugin.setProps({
    widget,
    handleDonationTransactionCreate
  })

  // simulate donation click button
  return plugin.find(DonationSubmitButton).invoke('onClick')().then(() => {
    const donationProps = plugin.find(FinishDonationMessage.component).props()

    t.is(donationProps.defaultSelectedValue, plugin.state('selected_value'))
    t.is(donationProps.handleDonationTransactionCreate, handleDonationTransactionCreate)
    t.is(donationProps.finishDonationComponent, FinishDonationMessage.component)
  })
})

test('call handleDonationTransactionConvert when confirm donation-recurrent', t => {
  const {
    plugin,
    props: {
      overrides: {
        FinishDonationMessage
      }
    }
  } = t.context
  const selectedValue = 1
  const donation = { id: 10, payment_method: 'cartao-credito' }
  const widget = { id: 1, settings: { finish_message_type: 'donation-recurrent', donation_value_1: '10' }}
  const handleDonationTransactionConvert = sinon.fake()

  plugin.setProps({
    widget,
    handleDonationTransactionConvert,
    handleDonationTransactionCreate: () => new Promise((res, rej) => {
      return res({ donation })
    })
  })

  return plugin.find(DonationSubmitButton).invoke('onClick')().then(() => {
    const donationProps = plugin.find(FinishDonationMessage.component).props()
    // const donationState = plugin.state()

    donationProps.onClickDonation(selectedValue)
    t.true(handleDonationTransactionConvert.calledWith({
      amount: widget.settings['donation_value' + selectedValue] + '00',
      donation_id: donation.id
    }))
  })
})


test('should render the default post-action when payment is not made by credit card', t => {
  const {
    plugin,
    props: {
      overrides: {
        FinishDefaultMessage
      }
    }
  } = t.context
  const selectedValue = 1
  const donation = { id: 10, payment_method: 'boleto' }
  const widget = { id: 1, settings: { finish_message_type: 'donation-recurrent', donation_value_1: '10' }}
  const handleDonationTransactionConvert = sinon.fake()

  plugin.setProps({
    widget,
    donation,
    handleDonationTransactionConvert,
    handleDonationTransactionCreate: () => new Promise((res, rej) => {
      return res({ donation })
    })
  })

  return plugin.find(DonationSubmitButton).invoke('onClick')().then(() => {
    t.is(plugin.find(FinishDefaultMessage.component).length, 1)
  })
})