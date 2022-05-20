import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useLocation, Link } from 'react-router-dom';
import { useMutation, gql } from 'bonde-core-tools';
import { ConnectedForm, InputField, Hint, Link as LinkStyled, Validators } from 'bonde-components';
import { Flex, Heading, Button, Stack } from 'bonde-components/chakra';

const { composeValidators, required, min } = Validators;

const registerUserMutation = gql`
  mutation Register ($input: RegisterInput!) {
    register(input: $input) {
      first_name
      token
    }
  }
`

const Styles = styled.div`
  & > span {
    display: block;
    margin-bottom: 15px;
    text-align: right;
  }
`

const RegisterForm: React.FC<{ to: string, t: any }> = ({ to, t }) => {
  const { search } = useLocation();
  const [error, setError] = useState(undefined);
  const [registerUser] = useMutation(registerUserMutation);

  const urlParams = new URLSearchParams(search);
  const code = urlParams.get('code');
  const email = urlParams.get('email');

  return (
    <>
      <Heading size="6xl" lineHeight={1} mb={6}>{t('welcome.subtitle')}</Heading>
      <ConnectedForm
        initialValues={{ input: { email, code } }}
        onSubmit={async (values: any) => {
          try {
            await registerUser({ variables: values })
            window.location.href = to;
          } catch (err) {
            if (err && (err as any).message && (err as any).message.indexOf('invalid_invitation_code') !== -1) {
              setError(t('form.register.token.invalid'))
              console.log('err', err)
            }
            console.log('RegisterFailed', err)
          }
        }}
      >
        {({ submitting }: any) => (
          <Styles>
            {error && <Hint color='error'>{error}</Hint>}
            <Stack direction="row" spacing={2}>
              <InputField
                name='input.first_name'
                label={t('fields.firstName.label')}
                placeholder={t('fields.firstName.placeholder')}
                validate={required(t('fields.firstName.errors.isEmpty'))}
              />
              <InputField
                name='input.last_name'
                label={t('fields.lastName.label')}
                placeholder={t('fields.lastName.placeholder')}
                onBlur={required(t('fields.lastName.errors.isEmpty'))}
              />
            </Stack>
            <InputField
              disabled
              name='input.email'
              label={t('fields.email.label')}
              placeholder={t('fields.email.placeholder')}
            />
            <InputField
              type='password'
              name='input.password'
              label={t('fields.password.label')}
              placeholder={t('fields.password.placeholder')}
              validate={composeValidators(
                required(t('fields.password.errors.isEmptyRegister')),
                min(6, t('fields.password.errors.min'))
              )}
            />
            <Flex direction="row" justify="space-between" align="center">
              <LinkStyled to='/login' component={Link}>
                {t('links.iHaveAccount')}
              </LinkStyled>
              <Button type='submit' disabled={submitting}>
                {t('button.submit')}
              </Button>
            </Flex>
          </Styles>
        )}
      </ConnectedForm>
    </>
  );
};

export default RegisterForm;
