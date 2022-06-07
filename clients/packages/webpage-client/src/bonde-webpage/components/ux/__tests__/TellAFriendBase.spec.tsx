/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TranslateContext } from '../../MobilizationClass';
import TellAFriendBase from '../TellAFriendBase';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

const renderTellAFriend = (props: any) => render(
  <TranslateContext.Provider
    value={{
      t: (key: string, args: any) => `${key} ${args ? args.app : null}`,
      Trans: () => <div />,
      i18n: { language: 'pt-BR' }
    }}
  >
    <TellAFriendBase {...props} />
  </TranslateContext.Provider>
);

describe('Tell a Friend Base', () => {
  it('should render three buttons', () => {
    const { container } = renderTellAFriend({
      mobilization: {
        twitter_share_text: 'Twitter Share Text',
      },
      widget: {
        settings: {
          whatsapp_text: 'Foo Bar',
        },
      },
      message: "Foo Bar Message",
      href: "http://foo.bar",
      imageUrl: ""
    });
    const buttons = container.getElementsByTagName('button');
    const link = container.getElementsByTagName('a');
    expect(buttons).toHaveLength(2);
    expect(link).toHaveLength(1);
  });

  it('should call the window open once', () => {
    const { getByText } = renderTellAFriend({
      mobilization: {
        twitter_share_text: 'Twitter Share Text',
      },
      widget: {
        settings: {
          whatsapp_text: 'Foo Bar',
        },
      },
      message: "Foo Bar Message",
      href: "http://foo.bar",
      imageUrl: ""
    });
    const submitButton = getByText(/facebook/i);
    (global as any).open = jest.fn();
    fireEvent.click(submitButton);
    expect((global as any).open).toBeCalledTimes(1);
  });
});
