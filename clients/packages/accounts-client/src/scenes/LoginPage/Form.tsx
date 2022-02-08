import React from 'react';
import {
  Button,
  ConnectedForm,
  InputField,
  Link as LinkStyled,
  Stack,
  Validators,
} from 'bonde-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { composeValidators, required, isEmail, min } = Validators;

interface LoginFormProps {
  onSubmit: any;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation('auth');

  return (
    <ConnectedForm onSubmit={onSubmit}>
      {({ submitting }: any) => (
        <>
          <InputField
            name='email'
            label={t('fields.email.label')}
            placeholder={t('fields.email.placeholder')}
            validate={composeValidators(
              required(t('fields.email.errors.isEmpty')),
              isEmail(t('fields.email.errors.isEmail'))
            )}
          />
          <InputField
            name='password'
            label={t('fields.password.label')}
            placeholder={t('fields.password.placeholder')}
            type='password'
            validate={composeValidators(
              required(t('fields.password.errors.isEmptyLogin')),
              min(6, t('fields.password.errors.min'))
            )}
          />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <LinkStyled component={Link} to='/forget-password'>
              {t('links.forgetPassword')}
            </LinkStyled>

            <Button type='submit' disabled={submitting}>
              {t('button.submit')}
            </Button>
          </Stack>
        </>
      )}
    </ConnectedForm>
  );
};

export default LoginForm;