import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  InputField,
  Validators,
  SelectField,
  Grid,
  GridItem,
  Heading,
  Box
} from 'bonde-components';
import { FieldPrefix, PrefixedField } from './FieldPrefix';
import BankField from './BankField';
import * as normalize from './normalize';
import { cpfCnpj } from './validators';

const AccountPanel: React.FC = () => {
  const { t } = useTranslation('community');
  const { composeValidators, required } = Validators;

  return (
    <FieldPrefix prefix='community.recipient.bank_account'>
      <Box>
        <Heading as="h4" size="lg" mb={3}>{t('recipient.form.titles.account')}</Heading>
        {/* reset rowGap to use only FormField margin */}
        <Grid templateColumns="repeat(12, 1fr)" gap={[null, 6, 8, 16]} rowGap="0!important">
          <GridItem colSpan={[null, 12, null, 6]}>
            <PrefixedField
              name='bank_code'
              label={t('recipient.form.fields.bank_account.bank_code.label')}
              component={BankField}
              emptyText={t('recipient.form.fields.bank_account.bank_code.options.empty')}
              validate={required(t('recipient.form.fields.bank_account.bank_code.errors.required'))}
            />
          </GridItem>
          <GridItem colSpan={[null, 12, null, 6]}>
            <PrefixedField
              name='type'
              label={t('recipient.form.fields.bank_account.type.label')}
              component={SelectField}
            >
              <option value='conta_corrente'>{t('recipient.form.fields.bank_account.type.options.conta_corrente')}</option>
              <option value='conta_poupanca'>{t('recipient.form.fields.bank_account.type.options.conta_poupanca')}</option>
            </PrefixedField>
          </GridItem>
          <GridItem colSpan={[null, null, 8, 4]}>
            <PrefixedField
              name='agencia'
              label={t('recipient.form.fields.bank_account.agencia.label')}
              placeholder={t('recipient.form.fields.bank_account.agencia.placeholder')}
              parse={normalize.max(4)}
              component={InputField}
              validate={required(t('recipient.form.fields.bank_account.agencia.errors.required'))}
            />
          </GridItem>
          <GridItem colSpan={[null, null, 4, 2]}>
            <PrefixedField
              name='agencia_dv'
              label={t('recipient.form.fields.bank_account.agencia_dv.label')}
              placeholder='Ex: 0'
              parse={normalize.max(1)}
              component={InputField}
            />
          </GridItem>
          <GridItem colSpan={[null, null, 8, 4]}>
            <PrefixedField
              name='conta'
              label={t('recipient.form.fields.bank_account.conta.label')}
              placeholder={t('recipient.form.fields.bank_account.conta.placeholder')}
              parse={normalize.max(13)}
              component={InputField}
              validate={required(t('recipient.form.fields.bank_account.conta.errors.required'))}
            />
          </GridItem>
          <GridItem colSpan={[null, null, 4, 2]}>
            <PrefixedField
              name='conta_dv'
              label={t('recipient.form.fields.bank_account.conta_dv.label')}
              placeholder='Ex: 0'
              parse={normalize.max(2)}
              component={InputField}
              validate={required(t('recipient.form.fields.bank_account.conta_dv.errors.required'))}
            />
          </GridItem>
          <GridItem colSpan={[null, null, 12, 6]}>
            <PrefixedField
              name='legal_name'
              label={t('recipient.form.fields.bank_account.legal_name.label')}
              placeholder={t('recipient.form.fields.bank_account.legal_name.placeholder')}
              component={InputField}
              validate={required(t('recipient.form.fields.bank_account.legal_name.errors.required'))}
            />
          </GridItem>
          <GridItem colSpan={[null, null, 12, 6]}>
            <PrefixedField
              name='document_number'
              label={t('recipient.form.fields.bank_account.document_number.label')}
              placeholder={t('recipient.form.fields.bank_account.document_number.placeholder')}
              parse={normalize.document}
              component={InputField}
              validate={composeValidators(
                required(t('recipient.form.fields.bank_account.document_number.errors.required')),
                cpfCnpj({
                  cpf: t('recipient.form.fields.bank_account.document_number.errors.cpf'),
                  cnpj: t('recipient.form.fields.bank_account.document_number.errors.cnpj')
                })
              )}
            />
          </GridItem>
        </Grid>
      </Box>
    </FieldPrefix>
  );
}

export default AccountPanel;
