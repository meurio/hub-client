import React from 'react';
import { Loading } from 'bonde-components';
import { useQuery, gql } from 'bonde-core-tools';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ResetPasswordForm from './Form';

const verifyTokenQuery = gql`
  query TokenVerify ($token: String!) {
    reset_password_verify(token: $token) {
      id
    }
  }
`;

export default (): JSX.Element => {
  const { t } = useTranslation('auth');
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const { loading, error } = useQuery(verifyTokenQuery, {
    variables: { token: params.get('token') },
  });

  if (loading) return <Loading message={t('resetPassword.checkingToken')} />;

  if (error) return <p>error...</p>;

  return <ResetPasswordForm token={params.get('token')} />;
}
