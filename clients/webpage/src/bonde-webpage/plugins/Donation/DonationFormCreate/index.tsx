import React from 'react';
import DonationForm from './DonationForm';
import SelectPaymentType from './SelectPaymentType';
import DonationButton from './DonationButton';
import FetchDonationStats from './FetchDonationStats';

type Props = {
  asyncFetchDonationsStats?: any;
  widget: any;
  headerFont: string;
  mainColor: string;
  titleText: string;
  buttonText: string;
  loading: boolean;
  handleClickDonate: any;
  selectedValue: number;
  setSelectedValue: any;
  selectedPaymentType: string;
  setSelectedPaymentType: any;
  recurringLabel: string;
};

export default ({
  asyncFetchDonationsStats,
  widget,
  headerFont,
  mainColor,
  titleText,
  buttonText,
  loading,
  selectedValue,
  setSelectedValue,
  selectedPaymentType,
  setSelectedPaymentType,
  handleClickDonate,
  recurringLabel,
}: Props) => {
  const {
    settings: {
      goal_date_limit: goalDateLimit,
      payment_type: paymentType,
      donation_value1: donationValue1,
      donation_value2: donationValue2,
      donation_value3: donationValue3,
      donation_value4: donationValue4,
      donation_value5: donationValue5,
    },
  } = widget;

  return (
    <>
      <DonationForm
        headerFont={headerFont}
        mainColor={mainColor}
        title={titleText}
        buttonText={buttonText}
        onClickDonate={handleClickDonate}
        loading={loading}
      >
        {paymentType === 'users_choice' && (
          <SelectPaymentType
            mainColor={mainColor}
            selected={selectedPaymentType}
            onSelect={setSelectedPaymentType}
            uniqueLabel="Doação única"
            recurringLabel={`Doar todo ${recurringLabel}`}
          />
        )}
        {donationValue1 && (
          <DonationButton
            mainColor={mainColor}
            value={donationValue1}
            label={selectedPaymentType === 'unique' ? '' : recurringLabel}
            paymentType={selectedPaymentType}
            active={selectedValue === 1}
            onClick={() => setSelectedValue(1)}
          />
        )}
        {donationValue2 && (
          <DonationButton
            mainColor={mainColor}
            value={donationValue2}
            label={selectedPaymentType === 'unique' ? '' : recurringLabel}
            paymentType={selectedPaymentType}
            active={selectedValue === 2}
            onClick={() => setSelectedValue(2)}
          />
        )}
        {donationValue3 && (
          <DonationButton
            mainColor={mainColor}
            value={donationValue3}
            label={selectedPaymentType === 'unique' ? '' : recurringLabel}
            paymentType={selectedPaymentType}
            active={selectedValue === 3}
            onClick={() => setSelectedValue(3)}
          />
        )}
        {donationValue4 && (
          <DonationButton
            mainColor={mainColor}
            value={donationValue4}
            label={selectedPaymentType === 'unique' ? '' : recurringLabel}
            paymentType={selectedPaymentType}
            active={selectedValue === 4}
            onClick={() => setSelectedValue(4)}
          />
        )}
        {donationValue5 && (
          <DonationButton
            mainColor={mainColor}
            value={donationValue5}
            label={selectedPaymentType === 'unique' ? '' : recurringLabel}
            paymentType={selectedPaymentType}
            active={selectedValue === 5}
            onClick={() => setSelectedValue(5)}
          />
        )}
      </DonationForm>
      {asyncFetchDonationsStats && goalDateLimit && (
        <FetchDonationStats
          asyncFetchDonationsStats={asyncFetchDonationsStats}
          widgetId={widget.id}
          mainColor={mainColor}
          goalDateLimit={goalDateLimit}
        />
      )}
    </>
  );
};
