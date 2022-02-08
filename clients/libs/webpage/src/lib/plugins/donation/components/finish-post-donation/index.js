import React from 'react'
import FormSelect from './form-select'
import PropTypes from 'prop-types'
import { TellAFriend } from '..';
import { FormattedMessage } from 'react-intl';

class FinishPostDonation extends React.Component {
  constructor(p) {
    super(p)
    this.state = {
      value: this.props.defaultSelectedValue,
      success: false
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const {value} = e.currentTarget
    this.setState({ value: Number(value) })
  }

  render() {
    const {
      // Passed Donation to Finish by props
      mobilization,
      widget,
      donationCustomerData,
      // Passed Donation to Finish by state
      defaultSelectedValue,
      onClickDonation,
      finishDonationComponent: FinishDonationComponent,
      imageUrl
    } = this.props
  
    return this.state.success ? (
      <TellAFriend
        {...this.props}
        mobilization={mobilization}
        widget={widget}
        message={<FormattedMessage
          id={this.state.donationValue
            ? 'widgets.components--donation.finish-post-donation-messages.donation-ok'
            : 'widgets.components--donation.finish-post-donation-messages.not-now'}
        />}
        imageUrl={this.state.donationValue && imageUrl}
      />
    ) : (
      <FormSelect
        mobilization={mobilization}
        widget={widget}
        onChange={this.handleChange}
        value={this.state.value}
        onSubmit={async (value) => {
          await onClickDonation(value)
          this.setState({
            success: true,
            donationValue: value
          })
        }}
      />
    )
  }
}

FinishPostDonation.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired.isRequired,
  donationCustomerData: PropTypes.object.isRequired,
  defaultSelectedValue: PropTypes.number.isRequired,
  onClickDonation: PropTypes.func.isRequired,
  finishDonationComponent: PropTypes.func.isRequired,
  imageUrl: PropTypes.string
}

export default FinishPostDonation