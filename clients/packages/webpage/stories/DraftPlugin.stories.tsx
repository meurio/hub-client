import React from 'react';
// import { action } from '@storybook/addon-actions';
import { DraftPlugin } from '../src';
import DraftProps from './mocks/plugin/draft';

export const Draft = () => <DraftPlugin {...DraftProps} />;

export default {
  title: 'DraftPlugin',
};
