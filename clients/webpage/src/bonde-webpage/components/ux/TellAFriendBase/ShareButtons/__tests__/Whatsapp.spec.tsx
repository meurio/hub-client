import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TranslateContext } from '../../../../MobilizationClass';
import Whatsapp from '../Whatsapp';

const renderButton = (props: any) => render(
  <TranslateContext.Provider
    value={{
      t: (key: string, { app }: any) => `${key} ${app}`,
      Trans: () => <div />,
      i18n: { language: 'pt-BR' }
    }}
  >
    <Whatsapp {...props} />
  </TranslateContext.Provider>
);

describe('Whatsapp share button', () => {
  const whatsappText = 'Foo bar text';
  it('should render button with text', () => {
    const { getByText } = renderButton({ whatsappText });
    expect(getByText(/whatsapp/i)).toHaveTextContent(
      'Share Social Midia WhatsApp'
    );
  });

  it('should render a link with specific text', () => {
    const text = encodeURIComponent(whatsappText);
    const { getByText } = renderButton({ whatsappText });
    const link = `https://web.whatsapp.com/send?text=${text}`;
    const component = getByText(/whatsApp/i) as HTMLAnchorElement;
    const href = component.getAttribute('href');
    expect(href).toBe(link);
  });
});
