import React from "react";
import classnames from "classnames";
import Progress from './progress';
import * as formatNumberHelper from "./format-number-helper";

import('./donation.scss');

interface DonationProperties {
  mobilization: any,
  widget: any,
  editable: boolean,
  // intl?: intlShape
  donationGoalStats: any
}

class Donation extends React.Component<DonationProperties> {

  renderProgressBar(mainColor): React.ReactElement {
    let goalDateRemaining
    const { donationGoalStats, widget: { settings, goal } } = this.props

    const goalStats = (
      !donationGoalStats ||
      !donationGoalStats.data ||
      donationGoalStats.loading
    )
      ? undefined
      : JSON.parse(donationGoalStats.data)

    if (settings && settings.goal_date_limit) {
      const now: any = new Date()
      const [day, month, year] = settings.goal_date_limit.split('/')
      const goalDate: any = new Date(`${year}-${month}-${day}`)
      goalDateRemaining = Math.ceil((goalDate - now) / (1000 * 60 * 60 * 24))
    }

    const properties: any = {
      value: 0,
      valueTopLeft: '',
      valueTopRight: '',
      valueBottomLeft: '',
      valueBottomRight: ''
    }

    if (goalStats) {
      if (goalStats.pledged) {
        properties.valueTopCenter = (
          <div>
            <div style={{
              color: mainColor,
              fontSize: '2.5em',
              lineHeight: '1em',
              fontWeight: 'bold'
            }}>
              {formatNumberHelper.currencyInt(goalStats.pledged)}
            </div>
            <div style={{
              color: '#666',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              margin: '0.4rem 0 0'
            }}>
              arrecadados
              {/* <FormattedMessage
                id='widgets.components--donation.progress-bar.collected'
                defaultMessage='arrecadados'
              /> */}
            </div>
          </div>
        )
      }
      if (goalStats.progress) {
        properties.value = goalStats.progress
      }
      if (goalStats.total_donations) {
        properties.valueBottomLeft = (
          <span style={{ color: '#999999' }}>
            {goalStats.total_donations > 1 ? "apoios" : "apoio"}
            {/* <FormattedMessage
              id='widgets.components--donation.progress-bar.supports'
              defaultMessage={`
                {totalDonations} {totalDonations, plural,
                  one {apoio}
                  other {apoios}
                }
              `}
              values={{ totalDonations: goalStats.total_donations }}
            /> */}
          </span>
        )
      }
    }

    if (goal) {
      properties.valueBottomCenter = (
        <b>
          <span style={{ color: '#999999' }}>
            Meta:
            {/* <FormattedMessage
              id='widgets.components--donation.progress-bar.goal'
              defaultMessage='Meta:'
            /> */}
          </span>
          {' '}{formatNumberHelper.currencyInt(goal)}
        </b>
      )
    }
    if (goalDateRemaining !== undefined) {
      if (goalDateRemaining === 0) {
        properties.valueBottomRight = (
          "último dia!"
          // <FormattedMessage
          //   id='widgets.components--donation.progress-bar.date.last-day'
          //   defaultMessage='último dia!'
          // />
        )
      } else if (goalDateRemaining > 0 && goalDateRemaining < 7) {
        properties.valueBottomRight = (
          "últimos dias!"
          // <FormattedMessage
          //   id='widgets.components--donation.progress-bar.date.last-days'
          //   defaultMessage='últimos dias!'
          // />
        )
      } else if (goalDateRemaining === 7) {
        properties.valueBottomRight = (
          "última semana!"
          // <FormattedMessage
          //   id='widgets.components--donation.progress-bar.date.last-week'
          //   defaultMessage='última semana!'
          // />
        )
      } else if (goalDateRemaining > 0) {
        properties.valueBottomRight = (
          `faltam ${goalDateRemaining > 1 ? "dias" : "dia"}`
          // <FormattedMessage
          //   id='widgets.components--donation.progress-bar.date.remaining'
          //   defaultMessage={`
          //     faltam {goalDateRemaining} {goalDateRemaining, plural,
          //       one {dia}
          //       other {dias}
          //     }
          //   `}
          //   values={{ goalDateRemaining }}
          // />
        )
      }

      properties.valueBottomRight = (
        <b style={{ color: mainColor }}>
          {properties.valueBottomRight}
        </b>
      )
    }

    return (goal || goalDateRemaining !== undefined) && (
      <Progress fillColor={mainColor} {...properties} />
    )
  }

  renderButton(): React.ReactElement {
    const {
      widget: { settings },
      mobilization: { header_font: headerFont },
      // intl
    } = this.props

    const buttonText = (settings && settings.button_text) || (
      'Doar agora'
      // <FormattedMessage
      //   id='widgets.components--donation.default.button-text'
      //   defaultMessage='Doar agora'
      // />
    )
    const titleText = (settings && (settings.call_to_action || settings.title_text)) || (
      'Clique para configurar seu bloco de doação'
      // <FormattedMessage
      //   id='widgets.components--donation.default.title-text'
      //   defaultMessage='Clique para configurar seu bloco de doação'
      // />
    )

    const donationValue1 = (settings && settings.donation_value1) || 0
    const donationValue2 = (settings && settings.donation_value2) || 0
    const donationValue3 = (settings && settings.donation_value3) || 0
    const donationValue4 = (settings && settings.donation_value4) || 0
    const donationValue5 = (settings && settings.donation_value5) || 0
    const mainColor = (settings && settings.main_color) || '#54d0f6'

    const paymentType = (settings && settings.payment_type) || 'unique'
    const recurringPeriod = (settings && settings.recurring_period) || 30

    const isUniquePayment = paymentType === 'unique'
    const periodLabelOptions = {
      30: 'mês',
      // intl.formatMessage({
      //   id: 'widgets.components--donation.period-label-options.month',
      //   defaultMessage: 'mês'
      // }),
      180: 'semestre',
      // intl.formatMessage({
      //   id: 'widgets.components--donation.period-label-options.halfyear',
      //   defaultMessage: 'semestre'
      // }),
      365: 'ano',
      // intl.formatMessage({
      //   id: 'widgets.components--donation.period-label-options.year',
      //   defaultMessage: 'ano'
      // })
    }
    const periodLabelCurrent = periodLabelOptions[recurringPeriod]
    const periodLabel = isUniquePayment ? '' : periodLabelCurrent
    const selectedValue = settings.default_donation_value;

    return (
      <div className='donation center clearfix'>
        <h2
          className='p2 m0 white rounded-top'
          style={{ fontFamily: headerFont, backgroundColor: mainColor }}
        >
          {titleText}
        </h2>

        <div className='p3 relative'>
          {paymentType === 'users_choice' ? <div className='mb2 clearfix'>
            <a
              href='/'
              style={{ color: mainColor }}
              className='payment-type bold py1 col col-6 active'>
              <i className='icon-payment-recurring' />
              {`Apoiar todo ${periodLabelCurrent}`}
              {/* <FormattedMessage
                id='widgets.components--donation.users-choice.recurring'
                defaultMessage='Apoiar todo {periodLabelCurrent}'
                values={{ periodLabelCurrent }}
              /> */}
            </a>
            <a href='/'
              className='payment-type bold py1 col col-6'>
              <i className='icon-payment-unique' />
              Doação única
              {/* <FormattedMessage
                id='widgets.components--donation.users-choice.unique'
                defaultMessage='Doação única'
              /> */}
            </a>
          </div> : ''}

          {donationValue1 <= 0 ? null : (
            <a
              href='/'
              style={selectedValue === 1 ? { backgroundColor: this.convertHex(mainColor, 35), color: mainColor } : undefined}
              className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 1 ? 'active' : 'bg-darken-1')}
            >
              {`R$ ${donationValue1}${paymentType === 'recurring' ? ' /' : ''}${periodLabel}`}
            </a>
          )}
          {donationValue2 <= 0 ? null : (
            <a
              href='/'
              style={selectedValue === 2 ? { backgroundColor: this.convertHex(mainColor, 35), color: mainColor } : undefined}
              className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 2 ? 'active' : 'bg-darken-1')}
            >
              {`R$ ${donationValue2}${paymentType === 'recurring' ? ' /' : ''}${periodLabel}`}
            </a>
          )}
          {donationValue3 <= 0 ? null : (
            <a
              href='/'
              style={selectedValue === 3 ? { backgroundColor: this.convertHex(mainColor, 35), color: mainColor } : undefined}
              className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 3 ? 'active' : 'bg-darken-1')}
            >
              {`R$ ${donationValue3}${paymentType === 'recurring' ? ' /' : ''}${periodLabel}`}
            </a>
          )}
          {donationValue4 <= 0 ? null : (
            <a
              href='/'
              style={selectedValue === 4 ? { backgroundColor: this.convertHex(mainColor, 35), color: mainColor } : undefined}
              className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 4 ? 'active' : 'bg-darken-1')}
            >
              {`R$ ${donationValue4}${paymentType === 'recurring' ? ' /' : ''}${periodLabel}`}
            </a>
          )}
          {donationValue5 <= 0 ? null : (
            <a
              href='/'
              style={selectedValue === 5 ? { backgroundColor: this.convertHex(mainColor, 35), color: mainColor } : undefined}
              className={classnames('value-option block mb1 py1 col-12 bold hover no-underscore', selectedValue === 5 ? 'active' : 'bg-darken-1')}
            >
              {`R$ ${donationValue5}${paymentType === 'recurring' ? ' /' : ''}${periodLabel}`}
            </a>
          )}

          <a
            href='/'
            style={{ backgroundColor: mainColor }}
            className='btn white caps bg-darken-4 p2 mt1 col-12 rounded border-box'
          >
            {buttonText}
          </a>
        </div>

        <div className='p3' style={{ boxShadow: '#E3E3E3 0px 15px 18px -10px inset' }}>
          {this.renderProgressBar(mainColor)}
        </div>
      </div>
    )
  }

  convertHex(hex, opacity): string {
    hex = hex.replace('#', '')
    const r = Number.parseInt(hex.slice(0, 2), 16)
    const g = Number.parseInt(hex.slice(2, 4), 16)
    const b = Number.parseInt(hex.slice(4, 6), 16)

    const result = `rgba(${r},${g},${b},${opacity / 100})`
    return result
  }

  renderForm(): React.ReactElement {
    const { editable } = this.props
    const className = classnames({ 'relative': editable })

    return (
      <div className={className}>
        {this.renderButton()}
      </div>
    )
  }

  render(): React.ReactElement {
    return (
      <div className='bg-white widget rounded'>
        {this.renderForm()}
      </div>
    )
  }
}

export default Donation;