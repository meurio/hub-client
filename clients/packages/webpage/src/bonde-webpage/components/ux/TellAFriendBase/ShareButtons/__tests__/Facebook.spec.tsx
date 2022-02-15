import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TranslateContext } from '../../../../MobilizationClass';
import Facebook from '../Facebook';

const renderButton = (props: any) => render(
  <TranslateContext.Provider
    value={{
      t: (key: string, { app }: any) => `${key} ${app}`,
      Trans: () => <div />,
      i18n: { language: 'pt-BR' }
    }}
  >
    <Facebook {...props} />
  </TranslateContext.Provider>
);

describe('Facebook share button', () => {
  it('should render button with text', () => {
    const { getByText } = renderButton({ href: "http://mapalgbt.bonde.org" });
    expect(getByText(/facebook/i)).toHaveTextContent(
      'Share Social Midia Facebook'
    );
  });
});
