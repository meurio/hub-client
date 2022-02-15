import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    PagarMeCheckout: any;
  }
}

type Props = {
  pagarmeKey?: string;
  createTransaction: any;
  donationComponent: any;
};

type Options = {
  mobilization: any;
  widget: any;
  formValues: {
    value: string;
    paymentType: string;
    recurringPeriod: string;
  };
  customerData?: any;
};

const PagarMeCheckout = (props: Props | any) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://assets.pagar.me/checkout/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);
  const [customerData, setCustomerData] = useState();
  const { donationComponent: Donation } = props;

  const handleTransactionCreate = (opts: Options) => {
    const { mobilization, widget, formValues } = opts;
    const amount = widget.settings['donation_value' + formValues.value] + '00';

    return new Promise((resolve: any, reject: any) => {
      const mainColor = widget.settings.mainColor || '#43a2cc';
      const checkout = new window.PagarMeCheckout.Checkout({
        encryption_key: props.pagarmeKey || 'setup env var',
        success: (data: any) => {
          data.subscription = formValues.paymentType !== 'unique';
          data.recurring_period = formValues.recurringPeriod;
          data.mobilization_id = mobilization.id;
          data.widget_id = widget.id;
          data.amount = amount;

          return props
            .createTransaction(data)
            .then((resp: any) => {
              // TODO: analyticsEvents.donationFinishRequest()
              return resolve({ donation: resp.data });
            })
            .catch((failure: any) => {
              if (failure.config && failure.config.data) {
                try {
                  const failureData = JSON.parse(failure.config.data);
                  setCustomerData(failureData.donation.customer);
                } catch (error) {
                  console.error(
                    'Customer data is not parsable. Cannot store the customer data.'
                  );
                  console.error(error);
                }
              } else {
                console.error(failure);
              }
            });
        },
        error: (err: any) => {
          console.error(err);
          return reject();
        },
      });

      const data: any = {};
      if (opts.customerData) {
        const d = opts.customerData;

        // reference: https://docs.pagar.me/v2017-07-17/docs/inserindo-o-formulario
        data.customerName = d.name;
        data.customerDocumentNumber = d.document_number;
        data.customerEmail = d.email;
        data.customerPhoneDdd = d.phone.ddd;
        data.customerPhoneNumber = d.phone.number;
        data.customerAddressZipcode = d.address.zipcode;
        data.customerAddressStreet = d.address.street;
        data.customerAddressStreetNumber = d.address.street_number;
        data.customerAddressComplementary = d.address.complementary;
        data.customerAddressNeighborhood = d.address.neighborhood;
        data.customerAddressCity = d.address.city;
        data.customerAddressState = d.address.state;
      }

      const params = {
        amount,
        createToken: 'false',
        customerData: 'true',
        uiColor: mainColor,
        paymentMethods:
          widget.settings.payment_methods === 'true'
            ? 'credit_card,boleto'
            : 'credit_card',
        paymentButtonText: widget.settings.button_text,
        ...data,
      };

      // TODO: analyticsEvents.donationSetValue()
      checkout.open(params);
    });
  };

  return (
    <>
      <Donation
        {...props}
        donationCustomerData={customerData}
        asyncDonationCreate={handleTransactionCreate}
      />
    </>
  );
};

export default PagarMeCheckout;
