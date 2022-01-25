import * as React from 'react';
import { Header } from 'bonde-components';
import { useMutation, useSession, gql } from 'bonde-core-tools';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoginForm from './Form';

const LoginMutation = gql`
  mutation authenticate($email: String!, $password: String!){
    authenticate(email: $email, password: $password) {
      valid
      token
    }
  }
`

const LoginPage: React.FC = (to: any) => {
  const { login } = useSession();
  const { search } = useLocation();
  const [authenticate] = useMutation(LoginMutation);
  const { t } = useTranslation('auth');

  return (
    <>
      <Header.H1>{t('welcome.subtitle')}</Header.H1>
      <LoginForm
        onSubmit={async (values: any) => {
          try {
            const { data } = await authenticate({ variables: values });
            login(data.authenticate)
              .then(() => {
                // Redirect form after login on session
                const urlParams = new URLSearchParams(search);
                const nextUrl = urlParams.get('next');
                window.location.href = nextUrl ? nextUrl : to;
              });
          } catch (err: any) {
            if (err.graphQLErrors && err.graphQLErrors.filter((e: any) => e.message === 'email_password_dismatch').length > 0) {
              // return { email: 'Ops! Email ou senha incorretos' };
              return { email: t('form.authError') }
            }
            console.log('LoginFailed', err);
          }
        }}
      />
    </>
  )
};

export default LoginPage;
