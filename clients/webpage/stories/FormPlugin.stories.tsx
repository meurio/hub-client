import React from 'react';
// import { action } from '@storybook/addon-actions';
import {
  FormPlugin,
  FinishMessageCustom,
  FormTellAFriend,
  FormAnalytics,
  // asyncFormEntryCreate,
  ShareButtons,
} from '../src';
import FormProps from './mocks/plugin/form';

export const Form = () => {
  return (
    <FormPlugin
      {...FormProps}
      asyncFormEntryCreate={async e => Promise.resolve(console.log(e))}
      analyticsEvents={FormAnalytics}
      overrides={{
        FinishCustomMessage: {
          component: FinishMessageCustom,
          props: {},
        },
        FinishDefaultMessage: {
          component: FormTellAFriend,
          props: {
            imageUrl:
              'https://www.pngfind.com/pngs/m/169-1695521_kisspng-computer-icons-check-mark-presentation-symbol-ok.png',
            href: 'http://mapalgbt.bonde.org',
          },
        },
      }}
    />
  );
};

export const Share = () => {
  return (
    <ShareButtons
      {...FormProps}
      overrides={{
        FinishCustomMessage: {
          component: FinishMessageCustom,
          props: {},
        },
        FinishDefaultMessage: {
          component: FormTellAFriend,
          props: {
            imageUrl:
              'https://www.pngfind.com/pngs/m/169-1695521_kisspng-computer-icons-check-mark-presentation-symbol-ok.png',
            href: 'http://mapalgbt.bonde.org',
          },
        },
      }}
    />
  );
};

export default {
  title: 'FormPlugin',
};
