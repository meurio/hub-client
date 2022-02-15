import React from 'react';
import { TellAFriendBase } from '../src';
import TellAFriendProps from './mocks/ux/tell-a-friend';

export const TellAFriend = () => {
  return (
    <TellAFriendBase
      preview={TellAFriendProps.preview}
      mobilization={TellAFriendProps.mobilization}
      widget={TellAFriendProps.widget}
      message="Formulário submetido com sucesso!"
      {...TellAFriendProps}
    />
  );
};

export default {
  title: 'TellAFriend',
};
