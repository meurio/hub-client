import { expect } from 'chai'
import { mount } from "enzyme";
import DonationWidget from './__donation__';

describe.skip('<DonationWidget />', () => {
  let donationWidget
  const props = {
    mobilization: { id: 1, header_font: 'Ubuntu Mono' },
    widget: { id: 3, kind: 'donation', settings: {} },
    editable: true,
    donationGoalStats: {}
  }

  beforeEach(() => {
    donationWidget = mount(<DonationWidget {...props} />)
  })

  it('should render only unique payment method', () => {
    expect(donationWidget.find('a.payment-type').length).to.equal(0)
  })

  describe('when payment method is users_choice', () => {
    beforeEach(() => {
      const newProps = {
        ...props,
        widget: {
          ...props.widget,
          settings: { payment_type: 'users_choice' }
        }
      }
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
      donationWidget.setProps({
        ...props,
        widget: {
          ...props.widget,
          settings: { payment_type: paymentType, recurring_period: 180 }
        }
      })
      expect(donationWidget.find('a.payment-type').at(0).text())
        .to.equal('Apoiar todo semestre')
      // render recurring period annualy
      donationWidget.setProps({
        ...props,
        widget: {
          ...props.widget,
          settings: { payment_type: paymentType, recurring_period: 365 }
        }
      })
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
      const newProps = {
        ...props,
        widget: {
          ...props.widget,
          settings: {
            payment_type: 'users_choice',
            donation_value1: values[0],
            donation_value2: values[1],
            donation_value3: values[2],
            donation_value4: values[3],
            donation_value5: values[4]
          }
        }
      }
      donationWidget.setProps(newProps)
    })

    it('should render a correct options for donation', () => {
      expect(donationWidget.find('a.value-option').length).to.equal(values.length)
    })
  })

  it('should render a button with button text config', () => {
    donationWidget.setProps({
      ...props,
      widget: {
        ...props.widget,
        settings: { button_text: 'Apoiar!' }
      }
    })
    expect(donationWidget.find('a.btn').text()).to.equal('Apoiar!')
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
      const dateOptions: any = { day: '2-digit', month: '2-digit', year: 'numeric' }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const [year, month, day] = new Date().toLocaleString('pt-BR', dateOptions).split('-')

      donationWidget.setProps({
        widget: {
          ...props.widget,
          settings: {
            goal_date_limit: `${day}/${month}/${year}`
          }
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
