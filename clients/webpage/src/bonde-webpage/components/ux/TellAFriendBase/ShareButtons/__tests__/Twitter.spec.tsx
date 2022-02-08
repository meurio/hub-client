import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TranslateContext } from '../../../../MobilizationClass';
import Twitter from '../Twitter';

const renderButton = (props: any) => render(
  <TranslateContext.Provider
    value={{
      t: (key: string, { app }: any) => `${key} ${app}`,
      Trans: () => <div />,
      i18n: { language: 'pt-BR' }
    }}
  >
    <Twitter {...props} />
  </TranslateContext.Provider>
);

describe('Twitter share button', () => {
  it('should render button with text', () => {
    const { getByText } = renderButton({ href: "http://mapalgbt.bonde.org", text: "test" });
    expect(getByText(/twitter/i)).toHaveTextContent('Share Social Midia Twitter');
  });
});
