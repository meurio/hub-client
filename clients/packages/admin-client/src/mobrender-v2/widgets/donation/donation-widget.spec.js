import React from 'react'
import { expect } from 'chai'
import { Map } from 'immutable'
import { mountWithIntl } from 'intl/helpers'
import { factoryDonation } from 'mobrender-v2/widgets/donation'

const TellAFriend = () => (<div />)
const FinishMessageCustom = () => (<div />)
const DonationWidget = factoryDonation({
  finishMessageCustom: FinishMessageCustom,
  tellAFriend: TellAFriend
})

describe.skip('<DonationWidget />', () => {
  let donationWidget
  const props = Map({
    mobilization: Map({ id: 1, header_font: 'Ubuntu Mono' }),
    widget: Map({ id: 3, kind: 'donation', settings: {} }),
    editable: true
  })

  beforeEach(() => {
    donationWidget = mountWithIntl(<DonationWidget {...props.toJS()} />)
  })

  it('should render without crash', () => {
    // TODO: Change displayName for this component
    expect(DonationWidget.displayName).to.equal('Donation')
    // eslint-disable-next-line
    expect(donationWidget).to.be.ok
  })

  it('should insert Pagarme script', () => {
    const pagarmeScriptHTML = `
(function(i,s,o,g,r,a,m){i['PagarMeCheckoutObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://assets.pagar.me/checkout/checkout.js','PagarMeCheckout');`
    expect(donationWidget.find('script').props()).to.deep.equal({
      dangerouslySetInnerHTML: { __html: pagarmeScriptHTML }
    })
  })

  it('should set a default donation value in component state', () => {
    const defaultDonationValue = 10
    const newProps = props.mergeDeep({
      widget: Map({
        settings: Map({ default_donation_value: defaultDonationValue })
      })
    }).toJS()
    expect(
      mountWithIntl(<DonationWidget {...newProps} />)
        .instance()
        .state.selected_value
    ).to.equal(defaultDonationValue)
  })

  it('should set success in state when is loading and receive props', () => {
    // TODO: This behavior is confused
    donationWidget.instance().setState({ loading: true, sucess: false })
    const newProps = props.mergeDeep(Map({ isSaved: true })).toJS()
    donationWidget.setProps(newProps)
    expect(donationWidget.instance().state.loading).to.equal(false)
    expect(donationWidget.instance().state.success).to.equal(true)
  })

  it('should render tell a friend on finish submission by default', () => {
    // TODO: This behavior is confused
    donationWidget.setState({ loading: false, success: true })
    expect(donationWidget.find(TellAFriend).length).to.equal(1)
  })

  it('should render finish message custom when type "custom" is defined', () => {
    // TODO: This behavior is confused
    donationWidget.instance().setState({ loading: false, success: true })
    const newProps = props.mergeDeep(Map({
      widget: Map({
        settings: Map({
          finish_message_type: 'custom'
        })
      })
    })).toJS()
    donationWidget.setProps(newProps)
    expect(donationWidget.find(FinishMessageCustom).length).to.equal(1)
  })

  it('should render only unique payment method', () => {
    expect(donationWidget.find('a.payment-type').length).to.equal(0)
  })

  describe('when payment method is users_choice', () => {
    beforeEach(() => {
      const newProps = props.mergeDeep(Map({
        widget: Map({
          settings: Map({ payment_type: 'users_choice' })
        })
      })).toJS()
      donationWidget.setProps(newProps)
    })

    it('should render options to user choice between recurring or unique', () => {
      expect(donationWidget.find('a.payment-type').length).to.equal(2)
    })

    it('should render a different period for recurring payment', () => {
      const paymentType = 'users_choice'
      // render recurring period monthly by default
      expect(donationWidget.find('a.payment-type').at(0).text())
        .to.equal('Apoiar todo mês')
      // render recurring period semiannualy
      donationWidget.setProps(props.mergeDeep(Map({
        widget: Map({
          settings: Map({ payment_type: paymentType, recurring_period: 180 })
        })
      })).toJS())
      expect(donationWidget.find('a.payment-type').at(0).text())
        .to.equal('Apoiar todo semestre')
      // render recurring period annualy
      donationWidget.setProps(props.mergeDeep(Map({
        widget: Map({
          settings: Map({ payment_type: paymentType, recurring_period: 365 })
        })
      })).toJS())
      expect(donationWidget.find('a.payment-type').at(0).text())
        .to.equal('Apoiar todo ano')
    })

    it('should select payment type recurring', () => {
      // simulate a click on recurring payment type
      donationWidget.find('a.payment-type').at(0).simulate('click')
      expect(donationWidget.instance().state.selected_payment_type)
        .to.equal('recurring')
    })

    it('should select payment type unique', () => {
      // simulate a click on unique payment type
      donationWidget.find('a.payment-type').at(1).simulate('click')
      expect(donationWidget.instance().state.selected_payment_type)
        .to.equal('unique')
    })
  })

  describe('donation values', () => {
    const values = [5, 10, 20, 25, 30]

    beforeEach(() => {
      const newProps = props.mergeDeep(Map({
        widget: Map({
          settings: Map({
            payment_type: 'users_choice',
            donation_value1: values[0],
            donation_value2: values[1],
            donation_value3: values[2],
            donation_value4: values[3],
            donation_value5: values[4]
          })
        })
      }))
      donationWidget.setProps(newProps.toJS())
    })

    it('should render a correct options for donation', () => {
      expect(donationWidget.find('a.value-option').length).to.equal(values.length)
    })

    it('should render label according of selected payment type', () => {
      // recurring monthly by default
      values.map((value, i) => {
        expect(donationWidget.find('a.value-option').at(i).text())
          .to.equal(`R$ ${value} /mês`)
      })
      // unique
      donationWidget.setState({ selected_payment_type: 'unique' })
      values.map((value, i) => {
        expect(donationWidget.find('a.value-option').at(i).text())
          .to.equal(`R$ ${value}`)
      })
    })

    it('should select a donation value', () => {
      // TODO: this behavior is correct?
      values.map((value, i) => {
        donationWidget.find('a.value-option').at(i).simulate('click')
        expect(donationWidget.instance().state.selected_value)
          .to.equal(i + 1)
      })
    })
  })

  it('should render a button with button text config', () => {
    donationWidget.setProps(props.mergeDeep(Map({
      widget: Map({ settings: Map({ button_text: 'Apoiar!' }) })
    })).toJS())
    expect(donationWidget.find('a.btn').text()).to.equal('Apoiar!')
  })

  it('should submit a donation when click on button', () => {
    // TODO: refactor widget for change pagarme checkout
    const data = {
      mobilization: props.toJS().mobilization,
      widget: props.toJS().widget,
      selectedValue: 1,
      selectedPaymentType: 'recurring',
      storedDonationCustomerData: undefined
    }
    let expected

    const handleDonationTransactionCreate = data => new Promise(resolve => {
      expected = data
      return resolve()
    })
    donationWidget.setProps({ handleDonationTransactionCreate })
    donationWidget.instance().setState({
      selectedValue: data.selectedValue,
      selectedPaymentType: data.selectedPaymentType
    })

    donationWidget.find('.btn').simulate('click')
    expect(expected).to.deep.equal(data)
  })

  describe('donation progress bar', () => {
    it('should render the progress bar if `donationGoalStats` and `widget.goal` exists', () => {
      donationWidget.setProps({
        widget: { ...props.widget, goal: 1000.50 },
        donationGoalStats: {
          data: '{ "progress": 50, "goal": 1000 }',
          loading: false
        }
      })
      expect(donationWidget.find('Progress')).to.have.length(1)
    })

    it('should render the progress bar if only `widget.goal` exists', () => {
      donationWidget.setProps({
        widget: { ...props.widget, goal: 1000.50 }
      })
      expect(donationWidget.find('Progress')).to.have.length(1)
    })

    it('should render the progress bar if only `widget.settings.goal_date_limit` exists', () => {
      const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
      const [year, month, day] = new Date().toLocaleString('pt-BR', dateOptions).split('-')

      donationWidget.setProps({
        widget: { ...props.widget,
          settings: {
            goal_date_limit: `${day}/${month}/${year}` }
        }
      })
      expect(donationWidget.find('Progress')).to.have.length(1)
    })

    it('should not render the progress bar if all goal props does not exists', () => {
      // const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }

      donationWidget.setProps(props)
      expect(donationWidget.find('Progress')).to.have.length(0)
    })

    it('should not render the progress bar if `loading` is true', () => {
      donationWidget.setProps({
        donationGoalStats: {
          data: '{ "progress": 50, "goal": 1000 }',
          loading: true
        }
      })
      expect(donationWidget.find('.donation-goal-progress')).to.have.length(0)
    })
  })
})
