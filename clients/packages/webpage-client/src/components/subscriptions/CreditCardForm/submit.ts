import getConfig from 'next/config';
import recharge from '../../../apis/rest/recharge';

const { serverRuntimeConfig } = getConfig();

const submit = (values: any) => {
  //
  // The `PagarMe` object is injected into the global scope by the <Pagarme /> component
  // located in `client/components/external-services/pagarme.js`. By default, the
  // `<CreditCardForm />` component renders that component, so, we can use it here.
  //
  // It needs to use some other approach instead of inject the .min file of the library
  // directly into the DOM. I tried to use the official CJS module package provided by the
  // Pagarme team https://github.com/pagarme/pagarme-js but, it's bundle size is too big.
  // It have an issue that may will enhance the bundle size a litte, see:
  // https://github.com/pagarme/pagarme-js/issues/35
  //
  const promise = new Promise((resolve, reject) => {
    // eslint-disable-next-line
    (window as any).PagarMe.encryption_key = serverRuntimeConfig.pagarmeKey;

    // eslint-disable-next-line
    const card = new (window as any).PagarMe.creditCard();

    // Mount card with Pagarme lib to check validation
    const expiration = values.expiration.match(/(\d{2})\/(\d{2})/);
    card.cardHolderName = values.name;
    card.cardExpirationMonth = expiration[1];
    card.cardExpirationYear = expiration[2];
    card.cardNumber = values.creditcard;
    card.cardCVV = values.cvv;

    const errors = card.fieldErrors();

    /* eslint-disable prefer-promise-reject-errors */
    Object.keys(errors).length > 0
      ? reject({
          cvv: errors.card_cvv,
          expiration: errors.card_expiration_month,
          name: errors.card_holder_name,
          creditcard: errors.card_number,
        })
      : card.generateHash((cardHash: string) => {
          resolve(
            recharge({
              id: values.id,
              token: values.token,
              card_hash: cardHash,
            })
          );
        });
    /* eslint-disable prefer-promise-reject-errors */
  });

  return Promise.resolve(promise).then((action) => action);
}

export default submit;