import React from 'react';
import { useTranslation } from 'react-i18next';
import Form from './Form';
import RegisterVerify from './RegisterVerify';

const RegisterPage = (props: any) => {
  // Reduce unnecessary loading for subpages
  const { t } = useTranslation('auth');

  return (
    <RegisterVerify t={t}>
      <Form {...props} t={t} />
    </RegisterVerify>
  );
};

export default RegisterPage;