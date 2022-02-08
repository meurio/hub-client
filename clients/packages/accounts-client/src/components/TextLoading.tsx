import React from 'react';
import { Loading } from 'bonde-components';

interface TextLoadingProps {
  fetching: 'session' | 'redirect'
}

const TextLoading = ({ fetching }: TextLoadingProps) => {
  const messages = {
    session: 'Carregando sessão...',
    redirect: 'Redirecionando app...'
  };

  return (
    <Loading
      fullsize
      message={messages[fetching]}
    />
  )
};

export default TextLoading;