import React from 'react';
// import { action } from '@storybook/addon-actions';
import { ContentPlugin } from '../src';
import ContentProps from './mocks/plugin/content';

export const Content = () => (
  <ContentPlugin
    {...ContentProps}
    handleSave={() => console.log('save')}
    handleDelete={() => console.log('delete')}
  />
);

export default {
  title: 'ContentPlugin',
};
