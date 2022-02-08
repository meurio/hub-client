import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text,
  SelectField,
  Grid,
  GridItem,
  Heading,
  Stack,
  UnorderedList,
  ListItem
} from 'bonde-components';
import { FieldPrefix, PrefixedField } from './FieldPrefix';
import SpyField from '../../../components/SpyField';

const TransferPanel: React.FC = () => {
  const { t } = useTranslation('community');

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={[null, 6, 16]} rowGap="0!important">
      <GridItem colSpan={[null, null, 12, 6]}>
        <Stack direction="column" spacing={2} mb={3}>
          <Heading as="h5" size="lg">{t('recipient.form.titles.transfer_date')}</Heading>
          <Text className='about'>Defina o dia em que o valor arrecadado pela sua comunidade será automaticamente transferido para a conta cadastrada aqui.</Text>
        </Stack>
        <FieldPrefix prefix="community.recipient">
          <PrefixedField
            component={SelectField}
            name="transfer_interval"
            label={t('recipient.form.fields.transfer_interval.label')}
          >
            <option value='weekly'>{t('recipient.form.fields.transfer_interval.options.weekly')}</option>
            <option value='monthly'>{t('recipient.form.fields.transfer_interval.options.monthly')}</option>
          </PrefixedField>
          <PrefixedField
            name="transfer_day"
            label={t('recipient.form.fields.transfer_day.label')}
            component={SelectField}
          >
            <SpyField field='community.recipient.transfer_interval'>
              {({ value }: any) => (
                value === 'weekly' ? (
                  <>
                    <option value='1'>{t('recipient.form.fields.transfer_day.options.mon')}</option>
                    <option value='2'>{t('recipient.form.fields.transfer_day.options.tue')}</option>
                    <option value='3'>{t('recipient.form.fields.transfer_day.options.wed')}</option>
                    <option value='4'>{t('recipient.form.fields.transfer_day.options.thu')}</option>
                    <option value='5'>{t('recipient.form.fields.transfer_day.options.fri')}</option>
                  </>
                ) : (
                  <>
                    <option value='1'>1</option>
                    <option value='6'>6</option>
                    <option value='11'>11</option>
                    <option value='16'>16</option>
                    <option value='21'>21</option>
                    <option value='26'>26</option>
                  </>
                )
              )}
            </SpyField>
          </PrefixedField>
        </FieldPrefix>
      </GridItem>
      <GridItem colSpan={[null, null, 12, 6]}>
        <Stack direction="column" spacing={2} mb={3}>
          <Heading as="h5" size="lg">Observações</Heading>
        </Stack>
        <UnorderedList>
          <ListItem>
            <Text>As doações só ficam disponíveis 31 dias após a transação de cartão de crédito ter sido criada (29 dias corridos + 2 dias úteis) no caso de transações com uma parcela e 2 dias úteis após o pagamento do boleto bancário.</Text>
          </ListItem>
          <ListItem>
            <Text>Caso a transação tenha de 2 a 12 parcelas, o recebimento normal será assim: primeira parcela em 31 dias, segunda em 61, terceira em 91, e assim por diante.</Text>
          </ListItem>
        </UnorderedList>
      </GridItem>
    </Grid>
  );
}

export default TransferPanel;
